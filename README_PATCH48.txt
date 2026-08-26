SNG-710 PATCH 48 - unified person-page template, clearer story structure, larger readable text, and accessibility upgrades

Apply this patch over Patch 47.
It is cumulative with the favicon-path and logo fixes from previous patches.

WHAT THIS PATCH DOES
- Creates one unified memorial-page template across all personal pages.
- Restructures the biography into clearer sections:
  1) personal life and way of life
  2) 7 October 2023 (or, for older records, day of death and circumstances)
  3) memory, legacy, and commemoration
- Keeps the embedded memorial video near the top of the page when a page includes video.
- Uses a Nadav-style editorial image treatment across memorial pages: accompanying photos are aligned beside the text in larger, non-cropped cards.
- Makes biography text larger and more readable where space allows.
- Keeps text content unchanged; the patch changes presentation, section grouping, and page behavior.
- Adds person-page progressive enhancement through a shared JS template layer rather than hand-editing every biography separately.

ACCESSIBILITY UPGRADES
- Adds a skip link on person pages.
- Improves focus-visible styling globally.
- Improves keyboard accessibility in the image viewer, including focus trapping.
- Adds live search-result announcements on the homepage.
- Adds clearer dialog semantics to homepage memorial cards.
- Improves reduced-motion handling.

IMPLEMENTATION NOTES
- A new shared script, assets/js/person-template.js, reconstructs each person page into the unified template on load.
- Existing biography wording is preserved; the script reorganizes paragraphs into clearer sections using heuristics.
- Existing image and links cards are incorporated into the unified story flow.
- Existing memorial videos are moved above the story content block on person pages.
- Shared stylesheet cache key is bumped to v=248 on the homepage and all person pages.
- The homepage app.js cache key is bumped to v=237.

FILES IN PATCH
- index.html
- assets/css/site.css
- assets/js/app.js
- assets/js/gallery-viewer.js
- assets/js/person-template.js
- assets/favicon-sng.svg
- assets/favicon-sng.png
- people/*/index.html
- README_PATCH48.txt
- QA_PATCH48.txt
- SHA256SUMS_PATCH48.txt

NO DELETIONS.
