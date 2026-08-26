SNG-710 PATCH 45 - Nadav reading/layout refinement + favicon path fix

Apply this patch over Patch 44 / 250826-main.

NADAV AMIKAM
- Biography wording is unchanged.
- All 7 existing inline photographs are retained in the same positions/order.
- Desktop image cards are smaller and less vertically dominant, so text is not squeezed beside tall portrait photographs for long stretches.
- Images preserve their natural aspect ratio and are not cropped.
- The biography column now has a controlled readable line length.
- Alternating right/left editorial placement remains on desktop.
- At <= 900px the photographs stack cleanly between paragraphs instead of forcing a narrow text column.
- Mobile image height is capped to avoid oversized portrait images while preserving the full photo.
- Existing full-screen gallery/image-viewer behavior is preserved.
- Nadav's page CSS cache key is bumped from v=244 to v=245.

FAVICONS
- Adds assets/favicon-sng.svg and assets/favicon-sng.png.
- Existing HTML favicon links already point to these /assets paths, so this fixes those references without mass-editing memorial pages.
- The original root favicon-sng.svg/png files are intentionally not deleted because the homepage council identity lockup currently uses the root SVG as its visible emblem.

FILES IN PATCH
- assets/css/site.css
- assets/favicon-sng.svg
- assets/favicon-sng.png
- people/nadav_a/index.html
- README_PATCH45.txt
- QA_PATCH45.txt
- SHA256SUMS_PATCH45.txt

NO DELETIONS.
