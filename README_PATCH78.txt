SNG-710 PATCH 78 - strict media cell fitting

Apply over Patch 77 or any later build based on the shared person-page template.

FIX
- Facebook and Instagram embeds are forced to fit completely inside their allocated media cell on desktop.
- The iframe cannot preserve an oversized intrinsic 476x476 / portrait height and spill into the story section.
- Social "open" links are included inside the same fixed-height cell rather than extending the card.
- Existing 1/2/3 item sizing rules remain intact.
- Site version bumped to 278 for cache refresh.

FILES
- assets/js/person-page.js
- assets/site-version.json
