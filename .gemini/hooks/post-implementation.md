# Post-Implementation Hook
# Fires AFTER code is written — enforces quality gates before declaring "done"

## Quality Gates (ALL must pass)

### 1. Verification (Superpowers)
- [ ] All existing tests still pass
- [ ] New tests written for new functionality
- [ ] End-to-end verification completed
- [ ] No regressions in adjacent functionality

### 2. UI Quality Audit (Taste Skill)
- [ ] BUTTON CONTRAST CHECK: WCAG AA minimum (4.5:1)
- [ ] All interactive states implemented (loading, empty, error, success)
- [ ] SHAPE CONSISTENCY: One corner-radius scale used throughout
- [ ] COLOR CONSISTENCY: Accent color consistent across page
- [ ] No placeholder-as-label patterns
- [ ] Mobile responsive behavior verified

### 3. Code Quality (Karpathy)
- [ ] Type hints on ALL Python functions
- [ ] f-strings used (not .format())
- [ ] Error handling includes retry logic for API calls
- [ ] No dead code, TODOs, or commented-out blocks shipped
- [ ] No features beyond what was asked

### 4. Security (Agent Skills)
- [ ] No secrets logged or exposed
- [ ] Input validation on user-facing endpoints
- [ ] Local data backup/sync working correctly
- [ ] Flask server responds correctly to local APIs

### 5. Token Efficiency Review (RTK/Graphify)
- [ ] Output is structured and concise
- [ ] No redundant context loading
- [ ] Results cached where appropriate
