SNG-710 PATCH 47 - Nadav paragraph layout and image/text alignment refinement

Apply this patch over Patch 46.
It is also safe to apply over Patch 45.

WHAT THIS PATCH DOES
- Rebuilds Nadav Amikam's biography flow so the text is clearly divided into readable paragraphs.
- Keeps the exact biography text unchanged; only paragraph breaks and layout structure were refined.
- Re-aligns each inline photograph with its related text block.
- Preserves the 7 existing inline photographs and their alternating right/left treatment on desktop.
- On tablet/mobile, the text and photographs stack cleanly without forcing awkward narrow lines.
- Keeps the cumulative favicon fix in /assets.

TEXT INTEGRITY
- No wording was changed.
- No facts were changed.
- No sentences were rewritten.
- Only paragraph grouping and layout markup were adjusted.

FILES IN PATCH
- assets/css/site.css
- assets/favicon-sng.svg
- assets/favicon-sng.png
- people/nadav_a/index.html
- README_PATCH47.txt
- QA_PATCH47.txt
- SHA256SUMS_PATCH47.txt

NO DELETIONS.
