SNG-710 PATCH 50 - audited story structure, cross-site image alignment, Omer cleanup, and Neta Epstein update

APPLY OVER
- Patch 49 (recommended baseline).

MAIN CHANGES
1. Unified story section detection was tightened across the site.
   - Current-period memorial pages use the heading: שבת ה7.10.2023
   - Previous-years pages retain a general day-of-death/circumstances heading where appropriate.
   - The detector no longer treats unrelated earlier mentions of death/injury as the beginning of the 7 October section.

2. OMER ZADIKOVICH
   - "עם תחילת המתקפה..." is now detected as the first paragraph of the 7 October section.
   - Redundant summary facts that repeated role/location/life-story information were removed from the facts panel.
   - Shared template logic defensively removes duplicate gallery images and duplicate embedded videos.

3. NADAV + CROSS-SITE IMAGES
   - The image/text layout was corrected globally, not only on Nadav's page.
   - Desktop images align to the top of their related text block.
   - Image cards use a consistent restrained width and preserve the entire photo with object-fit: contain.
   - Images alternate cleanly beside text on desktop and stack on smaller screens.
   - Image allocation is weighted toward longer text sections so short 7 October/legacy sections are not overloaded with images.
   - Biography text and section headings are slightly larger where screen space allows.

4. NETA EPSTEIN
   Replaced the requested 7 October paragraph with:
   "בבוקר 7 באוקטובר 2023 שהו נטע ואירן בממ״ד בדירתם כאשר מחבלים חדרו לדירה והחלו להשליך רימונים על עבר נטע ואירן, כאשר הושלך רימון לעברה של אירן, נטע זינק עליו בגבורה. במעשהו הציל את חייה של אירן."

   Added immediately after it:
   "באותו יום נרצחו ונפלו גם סבתו של נטע בלהה אפשטיין, דודיו אופיר ליבשטיין ואורי רוסו ובן דודו ניצן ליבשטיין."

5. ACCESSIBILITY / CONSISTENCY
   - Every personal page has a visible-on-focus skip link pointing to #mainContent.
   - Every personal page has a unique main-content target.
   - Every page is explicitly marked as current-period or previous-years for correct section labeling.
   - Existing favicon and small corner-logo fixes remain intact.

FILES IN THIS PATCH
- index.html
- assets/css/site.css
- assets/js/person-template.js
- assets/js/people.js
- people/*/index.html (all 154 personal pages; template metadata/cache-key updates plus requested content changes)
- README_PATCH50.txt
- AUDIT_PATCH50.txt
- SHA256SUMS_PATCH50.txt

NO DELETIONS.
