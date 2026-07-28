document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("first-author-filter");
  if (!toggle) return;

  const isFirstOrCofirstAuthor = (entry) => {
    const marker = entry.querySelector("[data-first-author]");
    return !!marker && marker.dataset.firstAuthor === "true";
  };

  const applyFilter = () => {
    const onlyFirstAuthor = toggle.checked;

    document.querySelectorAll(".bibliography > li").forEach((entry) => {
      entry.classList.toggle("unloaded", onlyFirstAuthor && !isFirstOrCofirstAuthor(entry));
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

  toggle.addEventListener("change", applyFilter);
  applyFilter();
});
