# PRD: Daily Mission Tracker & Progress Dashboard

## Problem Statement

Gen-Z Muslim fathers want to build consistent parenting habits that align with Islamic Syariat and child psychology. However, they lack a structured way to track their progress, view historical completions, write reflections, and see the specific research/hadith backing for their actions. The current 7-day quest is transient, resetting completely when finished, and does not persist history or award achievements.

## Solution

Build a dedicated, premium **"Progres" Dashboard** as a new tab in the SPA. Dads can track their daily habits, maintain an "Istiqamah Streak", unlock achievements (Badges) backed by research, and view a log of past completed missions containing their personal reflection notes and the corresponding Shahih/psychology references.

---

## User Stories

1. As a father, I want to see a dedicated "Progres" tab in the top navigation so I can view my parenting journey.
2. As a father, I want to see my current "Istiqamah Streak" (consecutive days of mission completion) so I feel motivated to stay consistent.
3. As a father, I want to click "Selesai" on a mission and see a premium glassmorphic modal to enter an optional reflection note and read the scientific and Islamic references.
4. As a father, I want my mission completion history to show the exact Hadith/Quranic source (including narrator and status) and the specific psychology research citation.
5. As a father, I want to unlock badges (e.g. Istiqamah, Amanah, Rahmah, Luqman Al-Hakim, Fitrah Digital) based on my activities and see progress indicators for locked badges.
6. As a father, I want all my completed mission logs, reflections, and streak statistics to be persisted in localStorage and backed up to the server via `/api/backup`.
7. As a father, I want to easily view a chronological log of all my past reflections and completed missions.

---

## Implementation Decisions

### 1. Data Schema Enhancements
Modify the user profile structure in client-side state and `goodfather_backup.json` to include:
- `completedMissionsHistory`: Array of objects:
  ```json
  {
    "id": "mission-id-or-day-number",
    "title": "Mission Title",
    "type": "quest" | "article" | "custom",
    "timestamp": "ISO-8601-String",
    "reflection": "User's reflection text",
    "reference": {
      "islamic": "Quran/Hadith text with source",
      "research": "Psychology/science citation"
    }
  }
  ```
- `streakStats`: Object containing:
  - `currentStreak`: Integer (consecutive days with at least one completed mission)
  - `lastCompletionDate`: "YYYY-MM-DD"
  - `longestStreak`: Integer
- `badges`: Array of objects representing unlocked and progress-tracked badges:
  - `istiqamah`: Streak-based
  - `amanah`: Connection-based (e.g., skin-to-skin, pelukan 20 detik, mendengar)
  - `rahmah`: Self-regulation/anger management (e.g., 5-second breath pause, apologizing)
  - `luqman`: Faith & adab (e.g., shalat berjamaah, doa)
  - `fitrah`: Digital safety (e.g., screen-free rules, autoplay off)

### 2. UI Layout & View
- Add a new navigation link `link-progress` pointing to `<div id="view-progress" class="page-view">`.
- Design a premium glassmorphic layout inside `view-progress`:
  - **Hero Stats Grid**: Current Streak, Longest Streak, Total Completed Missions.
  - **Lencana Ayah (Badges Grid)**: Showcase premium badges (unlocked highlighted with gold/green, locked greyed out with progress bar e.g. "2/3 Misi Selesai").
  - **Riwayat Misi (History Log)**: Chronological scrollable list of completed missions, showing the date, child name, reflection note, and clickable "Lihat Validasi" tooltips.
- Create a completion modal (`#modal-mission-complete`):
  - Glassmorphic card, triggered when clicking `btn-complete-mission` or completing an article mission.
  - Displays the mission title, description, and validation references (Islamic and Scientific).
  - Contains a textarea for "Catatan Refleksi Ayah (Opsional)".
  - A "Simpan & Selesaikan" button that saves the data, runs a GSAP animation, updates streaks, checks badges, and re-renders the dashboard.

### 3. Mission Reference Database
Update the daily mission definitions in `app.js` to include explicit references:
- **Hari 1 (Hadir Tanpa HP)**:
  - Islamic: "Siapa yang tidak menyayangi, tidak akan disayangi" (Sahih al-Bukhari 5997).
  - Research: Harvard Center on the Developing Child - "Serve and Return" interactions build brain architecture.
- **Hari 2 (Dengar Tanpa Koreksi)**:
  - Islamic: Rasulullah ﷺ mendengarkan cucu beliau dan anak-anak kecil dengan sabar tanpa langsung mengoreksi.
  - Research: UNICEF Positive Parenting - Active listening builds children's self-worth and trust.
- **Hari 3 (Pelukan Sadar 20 Detik)**:
  - Islamic: Rasulullah ﷺ mencium cucu-cucunya dan memeluk mereka dengan kasih sayang (HR. Bukhari & Muslim).
  - Research: American Academy of Pediatrics (AAP) - Deep physical connection triggers oxytocin, reducing cortisol (stress).
- **Hari 4 (Batas Aturan Gadget)**:
  - Islamic: Menjaga fitrah suci anak dan amanah pengasuhan (QS. At-Tahrim: 6).
  - Research: WHO screen-time guidelines for preschool and school-age children.
- **Hari 5 (Doa yang Didengar Anak)**:
  - Islamic: Doa Nabi Ibrahim untuk anak keturunannya agar mendirikan shalat (QS. Ibrahim: 40).
  - Research: Child Psychology studies on positive parent-affirmation reinforcing identity.
- **Hari 6 (Main Mengikuti Anak)**:
  - Islamic: Ali bin Abi Thalib: "Bermainlah bersama mereka pada 7 tahun pertama."
  - Research: Harvard Center on the Developing Child - Child-led play fosters cognitive adaptability.
- **Hari 7 (Refleksi di Jurnal Malam)**:
  - Islamic: Rasulullah ﷺ menganjurkan Muhasabah (introspeksi diri) (HR. Tirmidzi).
  - Research: CASEL SEL Framework - Parent self-awareness is key to emotional regulation.

---

## Testing Decisions

### Seams to Test
- **API Seam**: Extend unit tests in `test_goodfather.py` to post complete profiles containing `completedMissionsHistory` and verify that the backup endpoint successfully serializes, saves, and deserializes this history.
- **Business Logic Seam**: Extract progress/streak calculation logic to pure JS functions in `app.js` so they can be easily tested (e.g. testing streak calculations across day boundaries, checking badge unlock conditions).

### Prior Art
- Existing tests in `test_goodfather.py` cover `calculate_dimensions`, `determine_result_type`, and `/api/backup` payload checks. We will add a new test function `test_api_backup_with_history` and verify calculations.

---

## Out of Scope
- Direct push notifications to the phone.
- Multi-user authentication (login with email/password) – data remains local per browser profile.
