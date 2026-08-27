SNG-710 PATCH 70 - Nitzan local memorial video + mobile personal-page refinement

Apply over Patch 69.

CONTENT
- Adds the supplied MP4 memorial video to Nitzan Libstein's central record.
- The video is stored locally at assets/media/nitzan-libstein-memorial.mp4.
- The MP4 was remuxed with fast-start metadata without re-encoding, so video/audio quality is unchanged.

CENTRAL TEMPLATE
- Adds native local MP4/WebM/Ogg support to the shared media stage.
- Local videos use HTML5 video controls, playsinline and preload=metadata.

MOBILE - ALL PERSONAL PAGES
- Compact phone header and reduced unused vertical space.
- Portrait + identity become a compact two-column introduction on phones.
- Facts span the full width below the identity block.
- Story text is slightly smaller/tighter on mobile only; no memorial text is removed.
- Chapter spacing/headings are reduced on mobile.
- Internal story photos use one consistent compact frame on mobile.
- Media area keeps a controlled height rather than stacking large embeds vertically.
- One media item fills the stage; two can sit side by side; three use a compact horizontal swipe strip on phones so players remain usable.
- Desktop Patch 68 behavior remains: up to three media items in one row.

VERSION
- assets/site-version.json -> 270
