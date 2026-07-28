require "bibtex"

module PubStats
  EXCLUDED_JOURNALS = ["preprint", "under review"].freeze

  def self.refereed_entries(site)
    scholar = site.config["scholar"] || {}
    bib_path = File.join(site.source, scholar["source"] || "_bibliography/", scholar["bibliography"] || "papers.bib")
    return [] unless File.exist?(bib_path)

    BibTeX.open(bib_path).reject do |entry|
      EXCLUDED_JOURNALS.include?(entry[:journal].to_s.strip.downcase)
    end
  end

  def self.first_or_cofirst?(entry, first_names)
    authors = entry[:author].to_s.split(" and ")
    authors.each_with_index.any? do |author_str, index|
      last, first = author_str.split(",", 2).map { |part| part.to_s.strip }
      is_self = first_names.include?(first)
      is_self && (index.zero? || last.include?("*"))
    end
  end

  def self.first_or_cofirst_refereed_count(site)
    scholar = site.config["scholar"] || {}
    first_names = Array(scholar["first_name"])
    refereed_entries(site).count { |entry| first_or_cofirst?(entry, first_names) }
  end

  def self.yearly_stats(site)
    scholar = site.config["scholar"] || {}
    first_names = Array(scholar["first_name"])

    stats = Hash.new { |h, k| h[k] = { "total" => 0, "first_author" => 0 } }
    refereed_entries(site).each do |entry|
      year = entry[:year].to_s.strip
      next if year.empty?

      stats[year]["total"] += 1
      stats[year]["first_author"] += 1 if first_or_cofirst?(entry, first_names)
    end
    stats.sort.to_h
  end
end

Jekyll::Hooks.register :site, :pre_render do |site|
  site.config["first_author_refereed_count"] = PubStats.first_or_cofirst_refereed_count(site)
  site.config["publication_yearly_stats"] = PubStats.yearly_stats(site)
end
