SNG-710 PATCH 55 - lock previous-years event heading

Apply over Patch 54.

- Previous-years memorials are now hard-locked in the shared person-page template to use:
  יום הנפילה והנסיבות
- Current-period memorials continue to use:
  שבת ה7.10.2023
- The central validator now also fails if a previous-years record is ever given a 7.10 event heading.
- No person loader files and no biography content were changed.

This demonstrates the new centralized architecture: only the shared template and validator needed updating.
