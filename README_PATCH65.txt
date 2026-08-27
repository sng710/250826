SNG-710 PATCH 65 - respectful editorial cleanup + homepage navigation labels

Apply over Patch 64.

HOME PAGE
- Changes the two hero navigation labels to:
  * 2023
  * השנים הקודמות
- Keeps the same anchors/behavior.

EDITORIAL RESPECT PASS
- Removes or neutralizes wording that could define a memorialized person through personal difficulty, vulnerability, embarrassment, or a negative character judgment.
- Nitzan Libstein's short role is now factual: בוגר המכינה הקדם־צבאית גליל עליון.
- Removes the Nitzan phrases centered on fears, hardship, "improved model", and "תעצומות נפש" framing while retaining achievements, relationships, life facts and 7.10 facts.
- Similar conservative cleanup was applied to other clearly problematic passages, including Yotam Haim, Yiftach Kutz, Yam Goldstein-Almog, Rotem Kutz, Omer Hermesh, Niral Zini and selected older memorial records.
- Roles that defined a person primarily by abduction were changed to factual life descriptions for Tzachi Idan and Joshua Mollel.
- Objective historical facts, 7.10 circumstances, major life events, professional work involving trauma/crisis, and respectful memorial context are preserved.

CACHE
- Homepage people.js gets v=265.
- site-version.json bumped to 265 so person pages fetch the updated central data.

AUDIT
- EDITORIAL_RESPECT_AUDIT_PATCH65.txt contains before/after details for every edited field/paragraph.
- Updated validator understands the current person-bootstrap.js architecture.
- Validator result: PASS for 154 records / 154 loaders / all referenced local assets.
