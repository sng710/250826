SNG-710 PATCH 64 - split homepage + filters

Apply over Patch 63 (and the later content-only patches 56-61 if already applied; this patch does not replace people.js).

CHANGES
- Desktop homepage now uses a split layout: memorial introduction/poem in a sticky side panel and the memorial people list in the larger adjacent area.
- Mobile/tablet remain stacked and familiar.
- Adds useful list controls above the memorial grid:
  * הכול
  * חברי כיתות הכוננות
  * לפי יישוב (dropdown populated from current data, excluding non-council location 'תאילנד')
- Search and filters work together.
- Filter result changes are announced through the existing accessibility live region.
- No memorial content or person-page template changed.

FILES
- index.html
- assets/css/site.css
- assets/js/app.js
