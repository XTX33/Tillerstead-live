---
layout: default
title: Sitemap
permalink: /sitemap/
description: Quick links to every core Tillerstead page, including services, portfolio highlights, and legal policies.
body_class: page-legal
hero_eyebrow: Navigation
hero_title: Sitemap
hero_summary: >
  A human-friendly map of Tillerstead.com so you can quickly reach the services, portfolio, and legal pages you need.
sitemap_sections:
  - title: "Essentials"
    links:
      - label: "Home"
        url: "/"
      - label: "Contact"
        url: "/contact/"
      - label: "Services"
        url: "/services/"
      - label: "Plans"
        url: "/plans/"
      - label: "Process"
        url: "/process/"
  - title: "For homeowners & GCs"
    links:
      - label: "About Tillerstead"
        url: "/about/"
      - label: "For General Contractors"
        url: "/for-general-contractors/"
      - label: "Financing"
        url: "/financing/"
      - label: "Design Showcase"
        url: "/design-showcase/"
      - label: "Portfolio"
        url: "/portfolio/"
      - label: "Reviews"
        url: "/reviews/"
      - label: "Blog"
        url: "/blog/"
  - title: "Resources"
    links:
      - label: "Portfolio Highlights"
        url: "/portfolio/#highlights"
        note: "Jump to featured projects"
      - label: "Services Overview"
        url: "/services/#service-areas"
        note: "Maintenance, remodeling, and tile"
      - label: "Contact for an estimate"
        url: "/contact/#estimate"
        note: "Request a walkthrough or quote"
  - title: "Legal"
    links:
      - label: "Privacy Policy"
        url: "/privacy/"
      - label: "Terms & Conditions"
        url: "/terms/"
      - label: "Robots.txt"
        url: "/robots.txt"
      - label: "XML Sitemap"
        url: "/sitemap.xml"
        note: "For search engines"
---

<section class="prose pad" aria-labelledby="sitemap-heading">
  <p class="text-mono">Updated: November 2025</p>
  <h2 id="sitemap-heading">Find your way around Tillerstead.com</h2>
  <p>
    Use the sections below to jump directly to the page you need. The XML sitemap remains available for search engines
    and automated tools, while this page keeps things human-friendly.
  </p>
</section>

{% include sitemap-sections.html sections=page.sitemap_sections %}
