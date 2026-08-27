SNG-710 PATCH 62 - quiet visual polish + mobile-first refinement

Apply over Patch 61.

GOAL
Improve the site visually and on mobile without changing its established memorial identity or any memorial content.

HOMEPAGE
- Slightly calmer/shorter hero while preserving the existing composition and colors.
- More refined navigation links and search control.
- Cleaner portrait-card spacing and hover/focus treatment.
- True two-column memorial grid on phones instead of a squeezed desktop grid.
- Smaller, balanced portrait sizes on narrow screens.
- Improved mobile spacing around the previous-years divider.
- Preview modal rebuilt responsively for phones: one column, smaller portrait, readable facts, full-width actions.
- Homepage stylesheet cache key bumped to v=262.

PERSON PAGES
- Same visual identity, with softer card geometry and more consistent spacing.
- Slightly improved intro proportions, portrait sizing, facts, headings, and story typography.
- Story photos are no longer pushed to alternating outer edges.
- Story photos are centered as editorial breaks and automatically sized according to natural image orientation:
  landscape = wider, portrait = narrower, square-ish = medium width.
- Photos remain uncropped and unstretched.
- Videos and media cards receive more consistent sizing and spacing.
- Mobile page layout gets a sticky compact top bar, tighter intro, cleaner story padding, full-width media/link actions, and better small-screen typography.
- No person loader files need changing; all personal-page design remains centralized in assets/js/person-page.js.

CONTENT
- No people.js changes.
- No biography, fact, name, media URL, ordering, or memorial data changes.

FILES
- index.html
- assets/css/site.css
- assets/js/person-page.js
- README_PATCH62.txt
- QA_PATCH62.txt
- SHA256SUMS_PATCH62.txt
