SNG-710 PATCH 54 - CENTRAL PERSON-PAGE ARCHITECTURE

Apply over Patch 53.

PURPOSE
This is the one-time migration that stops ordinary person-page design/structure changes from requiring edits to 154 individual HTML pages.

NEW ARCHITECTURE
1. assets/js/people.js
   - Single source of truth for memorial content.
   - Now also stores the already-approved static story sections, exact story-image positions, top media, page links, family-contact text, footer wording, and portrait alt text.

2. assets/js/person-page.js
   - Single active source of truth for ALL personal-page structure, personal-page design, responsive behavior, gallery/lightbox behavior, and accessibility interactions.
   - The CSS for personal pages is intentionally embedded in this file so a future personal-page design change requires editing only this one file.

3. people/<id>/index.html
   - Each of the 154 pages is now a tiny, stable loader containing only metadata, data-person-id, and references to people.js + person-page.js.
   - Existing public URLs are preserved exactly.
   - These loaders should not need to change for future design/layout/accessibility changes.

WHAT WAS MIGRATED WITHOUT RECLASSIFICATION
- 110 existing structured biographies from Patch 53.
- Exact paragraph order from Patch 53.
- Exact current section boundaries from Patch 53.
- 51 inline story photographs and their approved section/paragraph positions.
- 23 pages with embedded top media.
- Existing page links.
- 36 family-contact blocks.
- Existing male/female footer wording.

IMPORTANT VERIFIED CASES
- Omer Zadikevich: "עם תחילת המתקפה..." remains the first paragraph under "שבת ה7.10.2023".
- Neta Epstein: the revised 7 October paragraph and the family-loss paragraph remain under "שבת ה7.10.2023".
- Nadav Amikam: all seven story photographs remain represented by the central data/template system.

HOMEPAGE
- Homepage design remains in assets/css/site.css and homepage behavior remains in app.js.
- index.html now references assets/js/people.js without a version query, so future content-only edits to people.js do not require another homepage HTML edit just to change a cache key.

FUTURE PATCHES
- Person-page design/layout/accessibility change: normally ONLY assets/js/person-page.js.
- Memorial wording/facts/story/image-placement change: normally ONLY assets/js/people.js.
- Homepage-only design: assets/css/site.css / app.js as appropriate.
- No mass rewrite of people/*/index.html should be needed again unless the loader architecture itself changes.

VALIDATOR
Run:
  python tools/validate_memorial.py

It checks IDs, loader architecture, local asset references, story-image positions, duplicate paragraphs/media, and section-heading consistency.

OPTIONAL CLEANUP
The following older files are no longer referenced by personal pages after Patch 54 and may be removed in a future cleanup:
- assets/js/person-template.js
- assets/js/gallery-viewer.js

They are not deleted by this patch so applying the ZIP by simple overwrite is safe.
