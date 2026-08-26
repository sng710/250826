SNG-710 PATCH 52 - Editorial structure finalization + larger typography + matched image/text rows

Apply over Patch 51.

MAIN CHANGE: STORY STRUCTURE IS NOW STATIC
- The person pages no longer depend on person-template.js to guess where story sections begin at runtime.
- All pages that contain biography/story content have their sections written directly into the HTML.
- 110 person pages contain story content and are now statically structured.
- 44 person pages contain profile/facts only and therefore have no biography block to divide.
- For current-period biographies the structure is:
  1. חיים אישיים ודרך חיים
  2. שבת ה7.10.2023
  3. זיכרון, מורשת והנצחה
- Previous-years biographies retain the historically appropriate middle heading "יום הנפילה והנסיבות".
- Existing text wording was not rewritten or removed during the conversion.
- person-template.js is no longer referenced by any person page. The old file can remain on the server harmlessly; it is unused.

IMAGE / TEXT PRESENTATION
- All inline story-image pages use the same shared editorial layout.
- On desktop, the image card stretches to the exact height of its neighboring text row.
- The photograph itself uses object-fit: contain, so it is not distorted or cropped.
- On tablet/mobile, images return to their natural proportional height and stack cleanly with the text.
- Nadav no longer uses a separate story-layout system; his biography now uses the exact same shared structure as other pages.
- Duplicate gallery images remain removed.

TYPOGRAPHY
- Increased biography text size on desktop and mobile.
- Increased story section-heading sizes.
- Increased person role/fact text.
- Increased homepage dedication, search, memorial-card names/places and navigation text.
- Increased preview-modal facts and role text.
- Layout widths/line heights were adjusted to keep the larger text readable rather than simply scaling everything up.

PRESERVED CORRECTIONS
- Omer Zadikevich: "עם תחילת המתקפה..." is the first paragraph under שבת ה7.10.2023.
- Neta Epstein: the updated 7 October paragraph and the family-loss paragraph remain under שבת ה7.10.2023.
- Patch 51 source-attribution wording cleanup is preserved.
- Patch 49 Asaf Siboni portrait replacement is preserved.
- The large central homepage council lockup remains removed; the small corner identity remains.
- Favicon path fix is preserved.

FILES IN PATCH
- index.html
- assets/css/site.css
- people/*/index.html (154 pages)
- README_PATCH52.txt
- QA_PATCH52.txt
- AUDIT_PATCH52.txt
- SHA256SUMS_PATCH52.txt

NO IMAGE FILES OR MEMORIAL DATA FILES ARE REPLACED IN THIS PATCH.
