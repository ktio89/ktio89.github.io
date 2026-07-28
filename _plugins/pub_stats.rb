require "bibtex"

module PubStats
  EXCLUDED_JOURNALS = ["preprint", "under review"].freeze

  def self.first_or_cofirst_refereed_count(site)
    scholar = site.config["scholar"] || {}
    first_names = Array(scholar["first_name"])
    bib_path = File.join(site.source, scholar["source"] || "_bibliography/", scholar["bibliography"] || "papers.bib")
    return 0 unless File.exist?(bib_path)

    bibliography = BibTeX.open(bib_path)

    bibliography.count do |entry|
      journal = entry[:journal].to_s.strip.downcase
      next false if EXCLUDED_JOURNALS.include?(journal)

      authors = entry[:author].to_s.split(" and ")
      authors.each_with_index.any? do |author_str, index|
        last, first = author_str.split(",", 2).map { |part| part.to_s.strip }
        is_self = first_names.include?(first)
        is_self && (index.zero? || last.include?("*"))
      end
    end
  end
end

Jekyll::Hooks.register :site, :pre_render do |site|
  site.config["first_author_refereed_count"] = PubStats.first_or_cofirst_refereed_count(site)
end
