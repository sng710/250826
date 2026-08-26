SNG-710 PATCH 53 - story heading cleanup + standalone editorial image design

Apply over Patch 52.

CHANGES
- Removes the redundant personal-life subheading across the site, including duplicated "סיפור חיים" subheadings on older records.
- "סיפור חיים" remains the single opening heading for the biography.
- Replaces forced text/image columns with standalone image breaks between paragraph groups.
- Image frames now hug the actual image proportions instead of stretching to match text height.
- Desktop retains a subtle alternating right/left editorial rhythm.
- Tablet/mobile centers images and stacks them naturally.
- Makes story typography slightly larger while keeping a controlled readable line length.
- Improves the visual hierarchy of "שבת ה7.10.2023" and "זיכרון, מורשת והנצחה" with restrained chapter markers.
- No biography text, facts, dates, names, image files, or memorial data are changed.

FILES
- assets/css/site.css
- index.html (CSS cache key only)
- people/*/index.html (CSS cache key; biography pages also remove the redundant opening subheading)
- README_PATCH53.txt
- QA_PATCH53.txt
- SHA256SUMS_PATCH53.txt
