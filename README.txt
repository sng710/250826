SNG-710 PATCH 32 - dedication restore + image viewer + gallery frames + animated candles

Apply after Patch 31.

TEXT
- Restores the complete dedication text from before Patch 31.
- Replaces ONLY the requested clause:
  "נזכור בכבוד ובאהבה את כל הנופלות והנופלים"
  with:
  "נזכור בכבוד ובאהבה את בנותינו ובנינו לנצח"
- No biography, facts, names, dates or other content changed.

PRIVATE PAGE IMAGES
- Main portrait remains the main portrait only; it is not shown again in the private-page gallery.
- Removed 18 visually duplicate gallery files across 18 people where the gallery image was effectively the same photo as the main portrait.
- Main portrait and gallery images are clickable / keyboard accessible and open at full size in an accessible lightbox.
- Viewer supports close, backdrop click, Escape, previous/next buttons and keyboard arrows.
- Gallery frames are more refined and images keep their natural aspect ratio instead of being forced into square crops.
- No original image file was edited or regenerated.

CANDLES
- Improved the existing memorial-candle placeholder with a warmer candle and a subtle CSS flame animation.
- Animation automatically stops for users who prefer reduced motion.
- No GIF or external asset is required.

See GALLERY_DEDUP.txt for the exact gallery duplicates removed.
