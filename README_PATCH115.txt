SNG-710 — PATCH 115
===================

Scope: only the changes requested after Patch 114.

Changes
-------
1. Home page
   - Removes the visible heading "רקמה אנושית אחת" from the left memorial panel.
   - Removes the visible default result count ("מוצגות 154 תוצאות").
   - Keeps result announcements visually hidden for accessibility when searching/filtering.
   - Adds a compact mobile menu (2023 / previous years / search & filters).
   - On mobile, the council logo stays at the top of the page but is no longer fixed while scrolling.

2. Media / video embeds
   - Restores Instagram Reels to the clean /embed/ endpoint instead of /embed/captioned/.
   - Gives a single Instagram Reel (including Nitzan Libstein) enough vertical room on desktop and mobile.
   - YouTube embeds receive enablejsapi=1 + playsinline=1 + rel=0.
   - Mobile carousel stops the outgoing media item before showing the next one:
       * YouTube: pauseVideo command.
       * local video: pause().
       * Instagram/Facebook: outgoing iframe is safely reloaded to stop playback.
   - Omer's legacy page now also displays the Instagram Reel already configured for him, in addition to YouTube.

3. Personal pages / mobile reading
   - Removes the visible "רקמה אנושית אחת" brand from the personal-page top bar; the back link remains.
   - Mobile council logo is positioned at the page top and scrolls away instead of staying over the content.
   - Very long life stories open in a condensed mobile reading view with "המשך קריאה" / "צמצום הסיפור". The memorial text itself is unchanged.

Files replaced
--------------
index.html
assets/js/app.js
assets/js/person-page.js
assets/site-version.json
people/omer_z/index.html

QA
--
- JavaScript syntax: PASS (app.js, person-page.js, people.js).
- 154 memorial records/pages still present.
- Memorial people data (assets/js/people.js): byte-for-byte unchanged.
- Omer story paragraphs: byte-for-byte text-equivalent/unchanged (14/14).
- Configured video/social media audit: 41 items total:
    33 YouTube, 5 Instagram, 3 Facebook.
  All configured source URL formats passed structural validation.
- No duplicate HTML IDs in changed static pages.
- Existing repository validator reports the same 13 pre-existing warnings/issues before and after Patch 115; Patch 115 introduces no new validator issue.

Note
----
Remote platforms such as Instagram/YouTube/Facebook can still decide whether a particular public post is embeddable at request time. The site-side embed configuration and fallbacks were checked here.
