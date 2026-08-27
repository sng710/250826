SNG-710 PATCH 60 - Repair missing central person-page.js (404)

Apply over the current site after Patch 59.

WHY THIS PATCH EXISTS
The new lightweight person-page loaders request:
  ../../assets/js/person-page.js
A 404 for person-page.js means the shared central template file was not present at /assets/js/ on the deployed site.

THIS PATCH RESTORES
- assets/js/person-page.js   (shared person-page structure/design/accessibility engine, including previous-years heading lock)
- assets/js/people.js        (latest central memorial data through Patch 58)
- people/yehonatan_h/index.html (Patch 59 title/fallback: הי״ד)

EXPECTED SERVER PATHS AFTER APPLYING
/assets/js/person-page.js
/assets/js/people.js
/people/yehonatan_h/index.html

No other pages need to be changed.
