SNG-710 PATCH 82 - clean media engine

Apply over Patch 81 (or the current site after Patch 81).

This is not another CSS override. The top-media renderer now uses completely new class names so the accumulated legacy media CSS cannot affect it.

Behavior:
- 1 item: one centered column.
- 2 items: two stable columns.
- 3 items: three stable columns.
- YouTube/local video: true 16:9 player.
- Facebook: embedded and preserves its supplied original aspect ratio (landscape/square/portrait).
- Instagram: clean link card, not the full Instagram post embed.
- Images/QR: contained media card.
- Mobile: responsive horizontal media rail; ratios preserved.
- Media section has natural height, so it cannot overlap the story below.

FILES
- assets/js/person-page.js
- assets/site-version.json
