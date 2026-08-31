SNG-710 PATCH 114 — homepage layout repair

Apply this patch to the CURRENT site from sng-710-main (2).zip.

Replace ONLY:
  index.html

Do NOT replace assets/css/site.css.
Do NOT remove the current Omer Tzadikovich page/video changes.

Fixes:
- restores the homepage search/filter geometry
- restores the "לפי יישוב" control to normal height
- restores the dropdown caret to 20x20 instead of the giant SVG
- prevents the search controls from overlapping the memorial dedication
- fixes the legacy decorative-rule selector that was shifting the desktop grid
- adds complete styling for the newer custom settlement dropdown
- preserves the existing mobile collapsible filter behavior

No memorial text, people data, biography content, images, CNAME or person pages are changed.
