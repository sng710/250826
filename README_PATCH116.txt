SNG-710 PATCH 116 — Facebook memorial videos

Scope: ONLY the Facebook video additions requested by the user.

Added:
- Neta Epstein (neta_e): 2 Facebook videos. Existing YouTube remains.
- Aviv Kutz (aviv_k): 1 Facebook video.
- Livnat Kutz (livnat_k): same requested Facebook video; existing Instagram reels remain.
- Michal Admoni (michal_a): 1 Facebook video.
- Guy Admoni (guy_a): same requested Facebook video.

Implementation:
- Uses the existing topMedia.facebook data model already supported by person-page.js.
- Preserves the user-supplied embed dimensions (560x314, 560x306, 560x316).
- No CSS, page HTML, stories, photos, ordering, or carousel/player logic changed.
- site-version bumped to 316 so person pages fetch the updated people.js instead of a cached copy.
