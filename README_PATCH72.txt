SNG-710 PATCH 72 - single media frame alignment

Apply over Patch 71 or any later build that already contains the unified personal-page template.

WHAT THIS PATCH DOES
- Improves the layout when a memorial page has exactly one top-media item.
- Prevents the large media frame from stretching too wide around a single video/embed.
- Keeps the single item centered in a narrower, better-fitted media stage.
- Works for one YouTube video, one Instagram Reel, or one media image/QR item.
- Does not change the 2-item or 3-item layouts.
- Bumps the shared site version so browsers fetch the updated person-page.js.

FILES INCLUDED
- assets/js/person-page.js
- assets/site-version.json
