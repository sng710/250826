SNG-710 PATCH 79 - clean Instagram cards + remove broken Livnat Facebook video

Apply over Patch 78 or a later build containing the current central person-page template/data.

CHANGES
- All Instagram Reel items sitewide are now clean memorial-style link cards instead of full Instagram post embeds.
- Cards show a play/Instagram symbol, the stored media title, and "צפייה באינסטגרם".
- Clicking opens the original Instagram Reel in a new tab.
- Facebook videos remain embedded exactly as requested.
- Removed Livnat Kutz's Facebook reel 1921193012039933 because it cannot be embedded reliably.
- YouTube embeds are unchanged.
- QR/image media are unchanged.
- Version bumped to 279 for cache refresh.

FILES
- assets/js/people.js
- assets/js/person-page.js
- assets/site-version.json
- FACEBOOK_VIDEO_PAGES.txt
