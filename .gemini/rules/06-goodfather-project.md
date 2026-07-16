# GoodFather — Project-Specific Rules
# Fatherhood OS for Muslim Fathers in the AI Era

## Tech Stack (Immutable)
- Backend: Python 3.12+ / Flask
- API: Local Flask API endpoints (`/api/score`, `/api/backup`, `/api/health`)
- Frontend: Vanilla HTML/CSS/JS — NO frameworks (React, Vue, etc. are BANNED)
- Design: Calming Slate Blue & Copper Glassmorphism
- Fonts: Outfit (Primary), Nunito (Body), Fredoka (Headings), Caveat (Hand-drawn)
- Animation: GSAP + ScrollTrigger (via CDN)
- Environment: Windows 11, VSCode + Antigravity

## Architecture Rules
- `app.py` — Flask server, assessment score processor, backup manager
- `index.html` — Single Page Application (SPA) dashboard layout
- `app.js` — Client-side SPA routing, assessment flow, offline state management, local profile list, and GSAP/Lucide initialization
- `content.js` — Core database/pillars, child phase guides, daily missions
- `style.css` — Core responsive style sheets, custom CSS variable tokens, organic hand-drawn doodle corners, light/dark mode mapping
- `goodfather_backup.json` — Local file backup repository (NEVER commit personal data, template placeholder is fine)

## Python Coding Standards
- Type hints on ALL functions (no exceptions)
- f-strings over .format() (always)
- All API and file I/O operations must include proper error handling
- Port: Default to 5000 (configurable via environment variable PORT)

## Frontend Coding Standards
- Vanilla JS only — no frontend frameworks
- CSS variables for ALL theming (`--color-navy`, `--color-gold`, `--bg-app`, etc.)
- Strict support for both light and dark themes (toggled via local storage theme key `goodfather_theme`)
- GSAP for smooth page switching animations and transition timelines
- Organic corner radius scales (`--radius-xl`, `--radius-lg`, etc. with hand-drawn aesthetic slant)
- Interactive elements need unique, descriptive IDs for usability and automated testing
- Mobile-first responsive layout (collapsible navigation bar and grids)

## Data Management
- Local user profile lists and progress saved directly to browser LocalStorage
- Optional Server Sync: User profiles backed up in JSON format to `goodfather_backup.json` via `/api/backup`

## Testing
- `test_goodfather.py` — Core assessment scoring logic, dimension calculations, and backup API endpoint tests
- Run: `python -m pytest test_goodfather.py -v` (or just `pytest`)
