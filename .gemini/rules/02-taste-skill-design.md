# Taste Skill — Anti-Slop Frontend Design Rules
# Source: leonxlnx/taste-skill — Premium frontend quality enforcement
# Adapted for: Vanilla HTML/CSS/JS (GoodFather Calming Slate Blue & Copper Glassmorphism)

## Design Read Protocol
Before ANY frontend work, infer the design direction:
- State: "Reading this as: <page kind> for <audience>, with a <vibe> language"
- For GoodFather: "Parenting dashboard for Muslim fathers, with a calming, organic / slate and copper glassmorphism language, leaning toward custom properties, hand-drawn corner radius scales, and GSAP view switching"

## Three Dials (GoodFather Defaults)
- DESIGN_VARIANCE: 6 (playful, reassuring, structured but custom feel)
- MOTION_INTENSITY: 5 (smooth page view transitions, quiet and supportive)
- VISUAL_DENSITY: 4 (clean, spacious parenting layout with clear milestones, not overloaded)

## Anti-Default Discipline
Do NOT default to:
- AI-purple gradients or random neon glows
- Centered hero over dark mesh backgrounds
- Three equal feature cards layout
- Generic glassmorphism on everything
- Inter + slate-900 as the only typography choice
- Infinite-loop micro-animations everywhere

## Typography Rules
- Headlines: Use display weight, tight tracking, generous size hierarchy
- Body: max-width 65ch for readability, relaxed line-height
- Font choice: Prefer Geist, Outfit, or Satoshi over Inter for primary
- NEVER use serif as default — only when explicitly requested
- BANNED as defaults: Fraunces, Instrument_Serif

## Color Calibration (GoodFather Soothing Slate & Copper)
- Max 1 accent color per component
- Saturation < 80% by default
- THE LILA RULE: No automatic purple/blue AI-glow aesthetics
- Use neutral bases (Zinc/Slate/Stone) with high-contrast singular accents
- COLOR CONSISTENCY LOCK: Once an accent is chosen, use it on the WHOLE page
- One palette per project — no warm/cool gray mixing

## Layout Discipline
- Navigation MUST render on a single line on desktop
- Navigation height cap: 80px max desktop, default 64-72px
- Section-Layout-Repetition Ban: Each layout family appears at most ONCE
- Mobile collapse must be explicit per section

## Interactive UI States (MANDATORY)
Always implement full state cycles:
- Loading: Skeletal loaders matching final layout shape
- Empty States: Beautifully composed with population hints
- Error States: Clear, inline for forms, contextual toasts for transient
- Tactile Feedback: On :active use scale(0.98) or translate(-1px)
- BUTTON CONTRAST CHECK: WCAG AA minimum (4.5:1 body, 3:1 large text)

## Cards & Shadows
- Use cards ONLY when elevation communicates real hierarchy
- For VISUAL_DENSITY > 7: generic card containers are banned — data breathes in plain layout
- Tint shadows to background hue — no pure-black drop shadows on light backgrounds
- SHAPE CONSISTENCY LOCK: Pick ONE corner-radius scale and stick to it

## Data & Form Patterns
- Label ABOVE input, always
- No placeholder-as-label, ever
- Helper text optional but present in markup
- Error text BELOW input
- Standard gap for input blocks

## Content Density
- Cut ruthlessly — dashboards live on first impression
- No data-dump sections — top 3-5 highlights + "View all" link
- Long lists need a different UI component, not a longer list

## Image & Visual Strategy
- Use generate_image tool for section-specific assets when available
- Real web images second (picsum.photos with descriptive seeds)
- NEVER hand-roll SVG icons — use a library
- Div-based fake screenshots are BANNED
