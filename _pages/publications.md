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
  <div id="pub-chart-legend" style="display: flex; justify-content: center; gap: 20px; margin-bottom: 10px; font-size: 13px;"></div>
  <div style="width: 100%; height: 260px; position: relative;">
    <canvas id="publications-by-year-chart"></canvas>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("publications-by-year-chart");
    const legendEl = document.getElementById("pub-chart-legend");
    if (!canvas || !legendEl) return;

    const yearlyStats = {{ site.publication_yearly_stats | jsonify }};
    console.log("publication yearly stats:", yearlyStats);
    const years = Object.keys(yearlyStats);
    const totalData = years.map((year) => yearlyStats[year].total);
    const firstAuthorData = years.map((year) => yearlyStats[year].first_author);
    const maxCount = Math.max(1, ...totalData, ...firstAuthorData);

    const rootStyle = getComputedStyle(document.documentElement);
    const themeColor = rootStyle.getPropertyValue("--global-theme-color").trim() || "#3366cc";
    const mutedColor = rootStyle.getPropertyValue("--global-text-color-light").trim() || "#888888";

    // Hand-rolled canvas chart (no charting library) so the y-axis grid is
    // drawn from an explicit list of whole numbers, 0..maxCount, and can
    // never end up with non-integer gridlines.
    const series = [
      { label: "All Publications", data: totalData, color: mutedColor },
      { label: "First-author Papers", data: firstAuthorData, color: themeColor },
    ];

    series.forEach((s) => {
      const item = document.createElement("span");
      item.style.display = "inline-flex";
      item.style.alignItems = "center";
      item.style.gap = "6px";
      const swatch = document.createElement("span");
      swatch.style.display = "inline-block";
      swatch.style.width = "12px";
      swatch.style.height = "12px";
      swatch.style.borderRadius = "2px";
      swatch.style.background = s.color;
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(s.label));
      legendEl.appendChild(item);
    });

    function draw(progress) {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";

      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const padding = { left: 28, right: 12, top: 10, bottom: 24 };
      const plotWidth = Math.max(0, width - padding.left - padding.right);
      const plotHeight = Math.max(0, height - padding.top - padding.bottom);

      const xForIndex = (i) =>
        padding.left + (years.length === 1 ? plotWidth / 2 : (plotWidth * i) / (years.length - 1));
      const yForValue = (v) => padding.top + plotHeight - (v / maxCount) * plotHeight;

      ctx.strokeStyle = "rgba(128, 128, 128, 0.25)";
      ctx.lineWidth = 1;
      ctx.fillStyle = mutedColor;
      ctx.font = "12px sans-serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (let value = 0; value <= maxCount; value++) {
        const y = Math.round(yForValue(value)) + 0.5;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        ctx.fillText(String(value), padding.left - 8, y);
      }

      ctx.fillStyle = mutedColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      years.forEach((year, i) => {
        ctx.fillText(year, xForIndex(i), height - padding.bottom + 8);
      });

      series.forEach((s) => {
        ctx.strokeStyle = s.color;
        ctx.fillStyle = s.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        s.data.forEach((v, i) => {
          const x = xForIndex(i);
          const y = yForValue(v * progress);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.stroke();
        s.data.forEach((v, i) => {
          const x = xForIndex(i);
          const y = yForValue(v * progress);
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        });
      });
    }

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    let currentProgress = 0;
    let animationFrame = null;

    function animateIn() {
      const duration = 900;
      const start = performance.now();
      if (animationFrame) cancelAnimationFrame(animationFrame);
      function step(now) {
        const t = Math.min(1, (now - start) / duration);
        currentProgress = easeOutCubic(t);
        draw(currentProgress);
        if (t < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      }
      animationFrame = requestAnimationFrame(step);
    }

    window.addEventListener("resize", () => draw(currentProgress));

    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      currentProgress = 1;
      draw(1);
    } else {
      animateIn();
    }
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
