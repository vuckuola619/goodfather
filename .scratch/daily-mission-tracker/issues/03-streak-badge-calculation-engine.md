Status: resolved

## Parent

- PRD: `.scratch/daily-mission-tracker/PRD.md`

## What to build

Implement the calculation engine inside `app.js`:
1. **Streak Calculation**:
   - On completion of any mission, update `streakStats`.
   - Calculate consecutive days with at least one completed mission in `completedMissionsHistory`.
   - If a day is missed, reset the current streak. If the current streak exceeds `longestStreak`, update `longestStreak`.
2. **Badge Evaluation**:
   - Check the `completedMissionsHistory` to evaluate badge unlock conditions:
     - **Lencana Istiqamah**: Level 1 (3-day streak), Level 2 (7-day streak), Level 3 (30-day streak).
     - **Lencana Aman & Hadir**: Complete 3 connection missions (Days 1, 2, 3, 6, and girl/boy specific missions).
     - **Lencana Tameng Fitrah**: Complete 3 digital safety missions (Day 4, gadget crisis, fitrah digital articles).
     - **Lencana Luqman Al-Hakim**: Complete 3 faith & adab missions (Day 5, shalat habit articles, shalat crisis).
     - **Lencana Rahmah**: Complete 3 self-regulation missions (apologizing article, anger/tantrum crisis, breathing focus mode).
   - Update the badge's status (`unlocked` true/false, `unlockedAt` timestamp, `progress` e.g. "2/3").

## Acceptance criteria

- [ ] Streak calculation correctly handles timezone/date boundaries and resets on missed days.
- [ ] Badge conditions are evaluated correctly based on the category tags of completed missions.
- [ ] Profile state is updated with correct streak and badge data upon mission completion.

## Blocked by

- `.scratch/daily-mission-tracker/issues/01-schema-backend-integration.md`
- `.scratch/daily-mission-tracker/issues/02-completion-modal-data-hook.md`
