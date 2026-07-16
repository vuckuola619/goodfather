Status: resolved

## Parent

- PRD: `.scratch/daily-mission-tracker/PRD.md`

## What to build

Implement fixes identified in the code review:
1. **Wrong Completion Modal ID**: Update the completion modal's element ID from `mission-complete-modal` to `modal-mission-complete` in both `index.html` and `app.js` to conform with the PRD.
2. **Child Name in History Log**: Update the completed mission logs to record `childName` and render it in the Riwayat & Jurnal Misi list.
3. **Streak Decay Engine**: Check for streak decay/reset (when a day is missed) on profile initialization and view render in `app.js`.

## Acceptance criteria

- [x] Completion modal functions correctly using the ID `#modal-mission-complete`.
- [x] History log renders the child's name next to the mission title (e.g. "Hadir Tanpa HP untuk Yusuf").
- [x] Streaks decay to 0 if a full day has been missed since the last completion.
