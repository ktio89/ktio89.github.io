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

 

<small>ICLR * 1, EMNLP * 4, NAACL * 1, AAAI * 1, EACL * 1, IEEE Series * 1, Medical Journal * 4.</small>

<small>The asterisk (*) indicates co-first authorship.</small>
 

<script src="{{ '/assets/js/first-author-filter.js' | relative_url | bust_file_cache }}"></script>

<p class="mb-3">
  <code id="first-author-filter-toggle" role="button" tabindex="0" style="cursor: pointer; user-select: none;"><span style="font-weight: 600; color: inherit;">Click</span> to show only refereed "First- and Co-first Author Papers" (N = {{ site.first_author_refereed_count }})</code>
</p>

<div class="publications">

{% bibliography %}

</div>
