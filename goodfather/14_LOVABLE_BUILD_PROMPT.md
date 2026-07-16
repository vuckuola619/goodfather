# 14 — Lovable Build Prompt

Copy-paste prompt ini ke Lovable/Cursor sebagai initial build prompt.

---

Build a premium, fun, mobile-first website called **GoodFather**.

GoodFather is a “Fatherhood OS” for modern Muslim fathers in the AI era. It helps fathers become present, emotionally safe, spiritually grounded, and practical educators for their children.

## Product Goal

Create an MVP web app with:

1. Landing page
2. Father Map Assessment
3. Personalized result page
4. 7-Day Ayah Hadir Quest
5. Content library
6. Crisis guide
7. Journal page
8. Reference library
9. Safety disclaimer

## Brand Tone

Warm, brotherly, grounded, Islamic but not preachy, psychologically aware but not clinical, fun but not childish.

Avoid AI slop. Avoid generic stock-photo look. Avoid overused mosque/green-gold clichés. Use subtle Islamic geometry, compass/map metaphor, cozy father-child mood, stars, journal, home, and daily quest cards.

## Visual Style

Palette:

- Deep Navy `#0E1B2A`
- Warm Cream `#FFF4E3`
- Olive Green `#5D6B3F`
- Soft Gold `#D8A84E`
- Accent Sky Blue `#74B9FF`
- Accent Coral `#FF8A65`
- Accent Mint `#8FDCC2`
- Accent Lavender `#B9A7FF`

Use rounded cards, soft shadows, playful badges, quest path, gentle micro-animations. Mobile-first.

## Landing Page Copy

Hero headline:

“Belajar jadi ayah yang hadir, bukan cuma ayah yang bekerja.”

Subheadline:

“GoodFather membantu ayah memahami fase tumbuh anak, membangun adab, menjaga fitrah, dan menyiapkan mereka menghadapi dunia modern tanpa kehilangan arah akhirat.”

CTA:

- “Mulai Peta Ayah”
- “Lihat Panduan Ayah”

## Pages

### `/`

Sections:

- hero
- pain points
- how it works
- feature cards
- pillar cards
- product preview
- references
- disclaimer

### `/assessment`

Build a multi-step assessment with these sections:

- child profile
- current child challenges
- screen/AI exposure
- father-child relationship
- faith/adab routine
- father condition

Use one question per screen with progress indicator.

### `/assessment/result`

Show a Father Map card:

- child phase
- father priority
- top concerns
- weekly focus
- recommended guides
- 7-day quest

Do not call it diagnosis.

### `/guides`

Content cards by age:

- 0–2
- 3–5
- 6–9
- 10–12
- 13–17

### `/crisis`

Crisis mode cards:

- Tantrum
- Ayah terlanjur marah
- Gadget kebablasan
- Anak susah shalat
- Anak bohong
- Sibling rivalry
- Anak lihat konten buruk

### `/journal`

Daily reflection:

- Hari ini gue hadir kapan?
- Kapan gue hampir marah?
- Apa yang anak gue butuhkan?
- Apa satu hal yang mau gue ulangi besok?
- Doa untuk anak hari ini

### `/references`

Grouped reference library:

- psychology
- syariah
- character education
- AI/digital safety

## Components

- `Hero`
- `FatherMapCard`
- `AssessmentStepper`
- `DailyMissionCard`
- `QuestPath`
- `CrisisButton`
- `JournalEntry`
- `ReferenceCard`
- `Badge`
- `GuideCard`

## Fun UX Details

- Floating crisis button: “Lagi Panik?”
- Badge unlock after mission: “Ayah Hadir Level 1”
- Timer: “Ayah Offline Mode”
- Microcopy: “Ayah manusia. Reset dengan bismillah.”
- Empty state: “Belum ada journal. Mulai dari satu kalimat aja.”

## Safety Disclaimer

Always show:

“GoodFather adalah platform edukasi dan refleksi. Ini bukan pengganti dokter anak, psikolog anak, konselor keluarga, atau ustadz. Assessment bukan diagnosis. Jika ada kekhawatiran perkembangan, kekerasan, trauma, atau kondisi membahayakan, cari bantuan profesional.”

## Data Model

Use local state for MVP. Prepare future schema:

- users
- children_profiles
- assessment_answers
- father_maps
- daily_missions
- journal_entries
- bookmarks
- articles
- references

## Output Quality

Make it production-grade, elegant, fun, and emotionally resonant. No placeholder lorem ipsum. Use meaningful Indonesian copy. Make responsive layouts and accessible contrast.

---

