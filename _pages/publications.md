---
layout: page
permalink: /publications/
title: publications
nav: true
nav_order: 2
images:
    slider: true
---

<!-- _pages/publications.md: rebuild trigger for _plugins/pub_stats.rb (2022 chart fix) -->

<!-- Bibsearch Feature -->

{% comment %}
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
{% endcomment %}

 

 

<div style="max-width: 700px; margin: 1.5rem auto 0;">
  <h4 style="text-align: center; font-size: 16px; margin-bottom: 15px;">Publication at Top Venues (C + Q1 J) by Years</h4>
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
    console.log("publication yearly stats:", yearlyStats);
    const years = Object.keys(yearlyStats);
    const totalData = years.map((year) => yearlyStats[year].total);
    const firstAuthorData = years.map((year) => yearlyStats[year].first_author);
    const maxCount = Math.max(1, ...totalData, ...firstAuthorData);

    const rootStyle = getComputedStyle(document.documentElement);
    const themeColor = rootStyle.getPropertyValue("--global-theme-color").trim();
    const mutedColor = rootStyle.getPropertyValue("--global-text-color-light").trim();

    new Chart(canvas.getContext("2d"), {
      type: "line",
      data: {
        labels: years,
        datasets: [
          {
            label: "All Publications",
            data: totalData,
            borderColor: mutedColor,
            backgroundColor: mutedColor,
            fill: false,
            tension: 0.1,
            pointRadius: 4,
          },
          {
            label: "First-author Papers",
            data: firstAuthorData,
            borderColor: themeColor,
            backgroundColor: themeColor,
            fill: false,
            tension: 0.1,
            pointRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: { padding: 20 },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: maxCount,
            ticks: { stepSize: 1, precision: 0 },
            afterBuildTicks: (scale) => {
              const ticks = [];
              for (let value = 0; value <= maxCount; value++) {
                ticks.push({ value });
              }
              scale.ticks = ticks;
            },
          },
        },
      },
      plugins: [
        {
          id: "legendSpacing",
          beforeInit: function (chart) {
            const originalFit = chart.legend.fit;
            chart.legend.fit = function () {
              originalFit.bind(this)();
              this.height += 15;
            };
          },
        },
      ],
    });
  });
</script>

<script src="{{ '/assets/js/first-author-filter.js' | relative_url | bust_file_cache }}"></script>

<p class="mb-3" style="margin-top: 1.5rem;">
  <code id="first-author-filter-toggle" role="button" tabindex="0" style="cursor: pointer; user-select: none;"><span style="font-weight: 600; color: inherit;">CLICK</span> to show published first-author papers (N = {{ site.first_author_refereed_count }})</code>
</p>

<small>The asterisk (*) indicates co-first authorship.</small>


<div class="publications">

{% bibliography %}

</div>
