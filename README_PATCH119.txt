SNG-710 PATCH 119 — unified memorial media + early-years page parity
=====================================================================

Apply this ZIP over the current site (after Patch 118).

Requested changes only:
1. Cross-site memorial video layout:
   - all person pages now use the same media renderer;
   - on desktop, a section with exactly one embedded media item uses one shared player size;
   - on desktop, every section with 2+ embedded items uses the same two-column player size;
   - YouTube, Instagram and Facebook embeds stay playable/viewable inside the site;
   - mobile keeps the existing one-item-at-a-time carousel and playback-stop behavior.
2. Omer Tzadikovich (omer_z) is migrated from the last legacy static page to the common person-page template, so the cross-site rule applies to him too.
3. Early-years pages now display existing fullStory content through the same "סיפור חיים" template used by 2023 pages.
4. Early-years pages now automatically show:
   "אם אתם בני משפחה של {full name} וברצונכם להוסיף, לתקן או לעדכן מידע בעמוד, נשמח שתיצרו איתנו קשר."
   with the existing WhatsApp contact destination.
5. Patch 117's three supplied biographies are retained unchanged in people.js and are now actually rendered on their pages:
   - דוד סלומון
   - צבי גולדפלד
   - יצחק (זכי) דבאח

No names, biography text, images, ordering, homepage content, or unrelated styling were changed.
