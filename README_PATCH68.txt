SNG-710 PATCH 68 - unified private-page media and story layout

Apply over Patch 67.

WHAT CHANGED
- Top media now uses one fixed-height media stage on desktop for every personal page that contains media.
- Media automatically divides the available stage according to how many items exist:
  * 1 item: centered and larger
  * 2 items: two equal cells
  * 3 items: three equal cells in one row
- Video and image/QR items share the same media stage.
  * Ilan Fiorentino: all 3 videos appear in one row on desktop.
  * Yehonatan Hagbi-Zahavi: 2 YouTube videos + the Instagram QR appear in one row on desktop.
- On mobile, media stacks vertically for readability.

STORY LAYOUT
- Desktop story content is more compact:
  * personal-life story on the right
  * 7.10.2023 / historical circumstances on the left
  * legacy / commemoration full-width below
- Previous-years records still show "יום הנפילה והנסיבות" and never the 7.10 heading.
- Mobile returns to a natural single-column reading order.

IN-STORY PHOTOS
- All story photos now use one consistent editorial frame.
- Same frame height and spacing across people.
- Images use object-fit: contain: no stretching and no cropping.
- Legacy-section images use the same treatment with a controlled maximum width.

ARCHITECTURE
- Only the central assets/js/person-page.js template was changed.
- assets/site-version.json was bumped to 268 so personal pages fetch the new centralized design immediately.
- No personal loader pages and no memorial content were changed.
