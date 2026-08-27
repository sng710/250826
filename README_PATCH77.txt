SNG-710 PATCH 77 - desktop media equalization

Apply over Patch 76 or any later build that already contains the unified personal-page template.

WHAT THIS PATCH DOES
- Adds a final desktop-only override so all top media sections behave consistently.
- Makes the top media area match the compact contained style requested (same idea as Ilan Fiorentino).
- Keeps 1 item compact and centered.
- Keeps 2 items as two equal contained cards.
- Keeps 3 items as three smaller contained cards in one row.
- Prevents top media from visually dropping over the story text below.
- Bumps the site version so browsers fetch the new shared person-page template.

FILES INCLUDED
- assets/js/person-page.js
- assets/site-version.json
