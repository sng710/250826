SNG-710 PATCH 63 - visible design refinement + permanent person-page cache bootstrap

Apply over Patch 62.

VISIBLE DESIGN CHANGES
- Homepage hero has a clearer editorial hierarchy while retaining the same blue/leaf memorial identity.
- The main title and poem are visually separated instead of floating in one large flat field.
- Dedication is easier to read and the two navigation actions are more visible.
- Mobile hero is now a purpose-built stacked composition rather than a squeezed desktop composition.
- Mobile memorial grid remains two columns but uses tighter, better-balanced portrait/card sizing.
- Search/index transition and portrait presentation are more distinct.
- Personal story section is calmer and less box-like.
- 7.10 / legacy headings are clean chapter dividers instead of floating label-like headings.
- Story photos are always centered editorial pauses, with natural orientation-based sizing and no side-floating.

CACHE FIX
- The previous centralized person pages referenced people.js/person-page.js without a version query.
- Some browsers/servers can therefore keep an older cached person-page design.
- This patch performs ONE final loader migration: all 154 tiny loaders now load person-bootstrap.js.
- person-bootstrap.js fetches assets/site-version.json with no-store and then loads versioned people.js and person-page.js.
- Future content/design patches only need to update the central file(s) plus site-version.json. No more 154-page cache-key updates.

NO MEMORIAL CONTENT WAS CHANGED.
