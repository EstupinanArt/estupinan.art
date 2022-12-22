-[X] Use a conditional to control the style background in the navbar, the idea is: if the active page is the landing page 
  the background must be _estupinanDark_ in other case the same of the theme
-[ ] How to define style for tags like _h2_ from post?
  -[X] Add new theme definition (_invert_) into the tailwind.config.js file
    -[ ] Improve colors into _invert_ theme definition.
-[X] How to include the logo in the navbar in the blog page?
-[ ] Improve the responsive to the navbar
-[X] Add "under construction" banner into de landing page
---
From (for) about

<h1>{% t site.description %}</h1>

<p>{% tf about/site_about.md %}</p>