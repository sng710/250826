SNG-710 PATCH 76 - unified top media containment

Apply over Patch 75 or any later build that already contains the unified personal-page media template.

WHAT THIS PATCH DOES
- Makes all top-media sections behave like the compact contained layout used as the desired reference.
- Prevents videos / reels / embeds from overflowing downward over the story text.
- Keeps the media inside the dedicated top media frame.
- Constrains single and double media items so they do not grow too tall.
- Treats square Facebook items as height-constrained cards instead of stretching them like wide landscape videos.
- Preserves the responsive mobile media behavior.
- Bumps the central site version for cache refresh.

FILES INCLUDED
- assets/js/person-page.js
- assets/site-version.json
