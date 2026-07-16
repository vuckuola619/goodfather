Status: resolved

## Parent

- PRD: `.scratch/daily-mission-tracker/PRD.md`

## What to build

Implement the front-end user interface for the Progress Dashboard:
1. **Routing and Navigation Link**:
   - Add `<a href="#" class="nav-link" id="link-progress">Progres</a>` in `index.html`.
   - Add `<div id="view-progress" class="page-view">` with a container and dashboard layout.
   - Wire up `app.js` routing logic to toggle `view-progress` as active when `link-progress` is clicked.
2. **Hero Stats Grid**:
   - Display Current Streak, Longest Streak, and Total Completed Missions inside three sleek glassmorphic micro-cards with modern Lucide icons.
3. **Lencana Ayah (Badges Grid)**:
   - Render the 5 badge categories.
   - Unlocked badges should shine (gold/green accents with high-contrast text).
   - Locked badges should be greyed out with subtle transparency and a progress bar showing (e.g. "1/3 Selesai").
   - Click/hover on a badge reveals a tooltip describing the scientific/Islamic criteria to unlock it.
4. **Riwayat Misi (History Log)**:
   - Render a scrollable, chronological list of completed missions for the active profile.
   - Show the date/time, mission title, child name, reflection note, and a "Lihat Validasi" button.
   - The "Lihat Validasi" button opens a small popup/tooltip detailing the narrator, Hadith text, and psychology paper source for that mission.
5. **Styling and Polish**:
   - Apply the Titanium MDM theme (dark navy glassmorphism) using existing CSS variables in `style.css`.
   - Apply GSAP animations when transitioning to the Progress view (e.g., stagger bounce entrance for stats cards and badge cards).

## Acceptance criteria

- [ ] "Progres" tab is accessible from the main nav header and switches views properly.
- [ ] Stats, Badges, and History Log render correctly for the active child profile.
- [ ] Badges show correct locked/unlocked styling and progress indicators.
- [ ] References details popup/tooltip is interactive and displays accurate validation texts.
- [ ] Animations are smooth and layouts look premium on both desktop and mobile viewports.

## Blocked by

- `.scratch/daily-mission-tracker/issues/03-streak-badge-calculation-engine.md`
