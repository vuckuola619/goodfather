# UI Component Development Workflow
# Combines: Taste Skill (anti-slop design) + Agent Skills (frontend engineering) + GSAP/Motion (animation)

## Phase 1: DESIGN READ
1. State: "Reading this as: enterprise MDM dashboard for IT admins, dark tech glassmorphism"
2. Set dials: VARIANCE=5, MOTION=6, DENSITY=7
3. Identify the component type (data table, metric card, nav, form, etc.)

## Phase 2: STRUCTURE
1. Write semantic HTML first (no styling)
2. Ensure all interactive elements have unique IDs
3. Add ARIA labels for accessibility
4. Structure for both light/dark theme support

## Phase 3: STYLE (Titanium MDM Design System)
1. Use CSS custom properties exclusively:
   ```css
   --titanium-bg-primary: #0a0e1a;
   --titanium-bg-secondary: #111827;
   --titanium-bg-glass: rgba(17, 24, 39, 0.8);
   --titanium-accent: #3b82f6;
   --titanium-text-primary: #f9fafb;
   --titanium-text-secondary: #9ca3af;
   --titanium-border: rgba(255, 255, 255, 0.1);
   --titanium-glass-blur: blur(20px);
   --titanium-radius: 12px;
   ```
2. Apply glassmorphism with backdrop-filter + layered borders
3. ONE corner-radius scale throughout
4. Shadows tinted to background hue

## Phase 4: ANIMATION (GSAP + Motion)
1. **GSAP** for:
   - Data table row transitions (staggered fade-in)
   - Scroll-triggered reveals
   - Number counter animations (device counts, metrics)
   - Complex timeline sequences
   ```js
   gsap.from('.device-row', {
     y: 20, opacity: 0, stagger: 0.05,
     duration: 0.4, ease: 'power2.out'
   });
   ```

2. **Motion** for:
   - Component mount/unmount transitions
   - Hover state animations
   - Toggle/switch interactions
   - Spring-based micro-interactions

3. **Rules**:
   - Respect `prefers-reduced-motion`
   - No animations > 500ms for UI feedback
   - Data transitions: 200-400ms
   - Page transitions: 300-600ms
   - Stagger delay: 30-80ms per item

## Phase 5: STATES
Implement ALL states:
- **Default**: Normal resting state
- **Loading**: Skeleton matching final layout shape
- **Empty**: Helpful message + action prompt
- **Error**: Inline error with retry option
- **Hover**: Subtle elevation/glow change
- **Active**: Scale(0.98) tactile feedback
- **Focus**: Visible focus ring (accessibility)
- **Disabled**: Reduced opacity + no pointer events

## Phase 6: RESPONSIVE
- Define explicit mobile collapse for every multi-column layout
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Touch targets: minimum 44x44px on mobile
- Test at 320px, 768px, 1024px, 1440px
