Status: resolved

## Parent

- PRD: `.scratch/daily-mission-tracker/PRD.md`

## What to build

Create a premium glassmorphic modal (`#modal-mission-complete`) in `index.html`. 
When a father clicks `btn-complete-mission` (or completes an article-based mission):
1. Intercept the action and open the completion modal.
2. Display the active mission's details: Title, Description, and its specific Islamic and psychology validation references.
3. Provide a textarea for optional "Catatan Refleksi Ayah" (1-2 sentences).
4. Provide a "Simpan & Selesaikan" button. On click:
   - Construct a log entry object including child ID, mission ID, timestamp, reflection note, and validation references.
   - Save it into the profile's `completedMissionsHistory`.
   - Update `completedMissions` list and the profile's activeQuestDay.
   - Trigger a premium GSAP celebration scale/bounce animation on the dashboard card.
   - Trigger local profile saving and server backup synchronization.

## Acceptance criteria

- [ ] Modal displays the correct mission details and specific validation references.
- [ ] Textarea reflection note is captured and stored correctly.
- [ ] Click of "Simpan & Selesaikan" saves the entry, increments the activeQuestDay, and syncs data to the backend.
- [ ] Premium GSAP scale/bounce animation runs successfully on completion.

## Blocked by

- `.scratch/daily-mission-tracker/issues/01-schema-backend-integration.md`
