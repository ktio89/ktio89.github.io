---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
images:
    slider: true
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

<!-- image sliders -->
<swiper-container style="max-width: 350px; margin: 0 auto;" keyboard="true" navigation="true" pagination="true" pagination-clickable="true" pagination-dynamic-bullets="true" rewind="true">
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/hac.jpg" class="img-fluid align-items-center" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/theanine.jpg" class="img-fluid align-items-center" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/selftaught.jpg" class="img-fluid align-items-center" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/multitask.jpg" class="img-fluid align-items-center" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/caffeine.jpg" class="img-fluid align-items-center" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/compiler.jpg" class="img-fluid align-items-center" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/clinicalreasoner.jpg" class="img-fluid align-items-center" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/worldmodel.jpg" class="img-fluid align-items-center" %}</swiper-slide>
  <swiper-slide>{% include figure.liquid loading="eager" path="assets/img/evidence.jpg" class="img-fluid align-items-center" %}</swiper-slide>
</swiper-container>

 

 

<div style="max-width: 700px; margin: 1.5rem auto 0;">
  <h4 style="text-align: center; font-size: 16px; margin-bottom: 15px;">Publications by Year</h4>
  <div style="width: 100%; height: 260px; position: relative;">
    <canvas id="publications-by-year-chart"></canvas>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js@3.7.1/dist/chart.min.js"></script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("publications-by-year-chart");
    if (!canvas) return;

    const yearlyStats = {{ site.publication_yearly_stats | jsonify }};
    const years = Object.keys(yearlyStats);
    const totalData = years.map((year) => yearlyStats[year].total);
    const firstAuthorData = years.map((year) => yearlyStats[year].first_author);

    const rootStyle = getComputedStyle(document.documentElement);
    const themeColor = rootStyle.getPropertyValue("--global-theme-color").trim();
    const mutedColor = rootStyle.getPropertyValue("--global-text-color-light").trim();

    new Chart(canvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: years,
        datasets: [
          {
            label: "All Publications",
            data: totalData,
            backgroundColor: mutedColor,
          },
          {
            label: "First-/Co-first Author Papers",
            data: firstAuthorData,
            backgroundColor: themeColor,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, position: "top" },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
          },
        },
      },
    });
  });
</script>

<script src="{{ '/assets/js/first-author-filter.js' | relative_url | bust_file_cache }}"></script>

<p class="mb-3">
  <code id="first-author-filter-toggle" role="button" tabindex="0" style="cursor: pointer; user-select: none;"><span style="font-weight: 600; color: inherit;">CLICK</span> to show published first-author papers (N = {{ site.first_author_refereed_count }})</code>
</p>

<small>The asterisk (*) indicates co-first authorship.</small>


<div class="publications">

{% bibliography %}

</div>
