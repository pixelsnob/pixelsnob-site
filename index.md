---
title: Luis A. Echeverria's Blog
exclude: true
---

Hello! I'm an experienced developer seeking steady employment, preferably on a remote team. <a href="articles/luis-a-echeverria-resume">Resume available here.</a>
  
  

## Skills

{% include skills.html %}

## Interests

{% include interests.html %}

<!--https://www.flickr.com/photos/pixelsnob-->

## Photos

<ul class="photos-list">
  {% for photo in site.data['flickr-photos'] %}
    <li class="photo">
      <a href="{{ photo.flickr_page_url }}" class="lazy-load" data-background-image="{{ photo.url_s }}" target="_blank"></a>
    </li>
  {% endfor %}
</ul>
