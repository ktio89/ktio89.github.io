document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("first-author-filter-toggle");
  if (!toggle) return;

  const isRefereedFirstOrCofirstAuthor = (entry) => {
    const marker = entry.querySelector("[data-first-author]");
    if (!marker) return false;
    return marker.dataset.firstAuthor === "true" && marker.dataset.refereed === "true";
  };

  const applyFilter = () => {
    const filterOn = toggle.classList.contains("active");

    document.querySelectorAll(".bibliography > li").forEach((entry) => {
      entry.classList.toggle("unloaded", filterOn && !isRefereedFirstOrCofirstAuthor(entry));
    });

    // Hide year headers/lists that end up with no visible entries.
    document.querySelectorAll("h2.bibliography").forEach((heading) => {
      let iterator = heading.nextElementSibling;
      let hideHeading = true;
      while (iterator && iterator.tagName !== "H2") {
        if (iterator.tagName === "OL") {
          const total = iterator.querySelectorAll(":scope > li").length;
          const hidden = iterator.querySelectorAll(":scope > li.unloaded").length;
          const empty = total > 0 && hidden === total;
          iterator.classList.toggle("unloaded", empty);
          if (!empty) hideHeading = false;
        }
        iterator = iterator.nextElementSibling;
      }
      heading.classList.toggle("unloaded", hideHeading);
    });
  };

  const toggleFilter = () => {
    toggle.classList.toggle("active");
    applyFilter();
  };

  toggle.addEventListener("click", toggleFilter);
  toggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFilter();
    }
  });
});
