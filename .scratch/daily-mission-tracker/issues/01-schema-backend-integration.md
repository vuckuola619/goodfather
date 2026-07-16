Status: resolved

## Parent

- PRD: `.scratch/daily-mission-tracker/PRD.md`

## What to build

Extend the client-side state schema for child profiles to support:
- `completedMissionsHistory` array (recording mission ID, title, type, timestamp, reflection note, and validation references).
- `streakStats` (currentStreak, lastCompletionDate, longestStreak).
- `badges` list (unlocked status and progress indicators).

Extend the backend mock database backup (`goodfather_backup.json` and API backup routes in `app.py`) to support saving and restoring these fields. Add unit tests in `test_goodfather.py` to verify backend persistence of these fields.

## Acceptance criteria

- [ ] Profiles in client-side state default to empty arrays/objects for `completedMissionsHistory`, `streakStats`, and `badges`.
- [ ] `/api/backup` successfully serializes and deserializes the extended profile structure.
- [ ] New backend tests added in `test_goodfather.py` pass cleanly when running `python -m pytest test_goodfather.py -v`.

## Blocked by

None - can start immediately
