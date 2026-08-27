SNG-710 PATCH 66 - improved settlement filter combobox design

Apply this patch over Patch 65 (or any later cumulative build that already includes the homepage filters).

WHAT THIS PATCH DOES
- Replaces the basic settlement select display with a custom-styled settlement combobox on the homepage.
- Improves the open dropdown panel design so it no longer appears as a plain white browser list.
- Keeps the existing place filter logic and data source.
- Preserves keyboard accessibility:
  - Enter / Space / click to open
  - Arrow keys to move between settlements
  - Enter / Space to choose
  - Escape to close
  - outside click closes the panel
- Keeps the native select in the DOM as the filter data source, but hides it from view.
- Updates cache keys in index.html so the new CSS and JS load immediately.

FILES IN PATCH
- index.html
- assets/css/site.css
- assets/js/app.js
- README_PATCH66.txt
- QA_PATCH66.txt
