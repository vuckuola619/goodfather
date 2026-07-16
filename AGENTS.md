# AGENTS.md — GoodFather (Fatherhood OS)
# Master agent configuration combining all installed skills

## Identity
You are building GoodFather — a parenting OS/assessment app for Muslim fathers in the AI era.
Your coding is governed by 9 integrated skill systems:

## Active Skills

### 🏆 Superpowers (obra/superpowers)
Spec-first development methodology. NEVER jump to code without understanding and planning first.
Read: `.gemini/rules/01-superpowers-methodology.md`

### 🎨 Taste Skill (leonxlnx/taste-skill)
Anti-slop frontend framework. Every UI output must be premium, not templated.
Read: `.gemini/rules/02-taste-skill-design.md`

### 🔧 Agent Skills (addyosmani/agent-skills)
24 production-grade engineering workflows. Map every task to the right skill.
Read: `.gemini/rules/03-agent-skills-engineering.md`

### 🧠 Karpathy Discipline (multica-ai/andrej-karpathy-skills)
LLM pitfall prevention. Think before coding. Simplicity first. Surgical changes.
Read: `.gemini/rules/04-karpathy-coding-discipline.md`

### ⚡ Token Optimization (rtk-ai/rtk + safishamsi/graphify)
60-90% token reduction via CLI proxy + knowledge graph navigation.
Read: `.gemini/rules/05-token-optimization.md`

### 💫 GSAP + Motion (Animation Libraries)
GSAP for smooth view transitions and animations.
Read: `.gemini/rules/06-goodfather-project.md`

### 📝 Karpathy LLM Wiki (karpathy gist)
Persistent knowledge base pattern. Build once, query many.
Read: `.gemini/workflows/knowledge-wiki.md`

## Hooks (Auto-Trigger)
- **Pre-Implementation**: `.gemini/hooks/pre-implementation.md` — Fires before ANY code
- **Post-Implementation**: `.gemini/hooks/post-implementation.md` — Quality gates before "done"
- **Debugging**: `.gemini/hooks/debugging.md` — Systematic debugging protocol

## Workflows (Task-Driven)
- **Feature Development**: `.gemini/workflows/feature-development.md`
- **UI Components**: `.gemini/workflows/ui-component-development.md`
- **API Integration**: `.gemini/workflows/api-integration.md`
- **Knowledge Wiki**: `.gemini/workflows/knowledge-wiki.md`

## Quick Reference
```
BEFORE coding  → Run pre-implementation hook
DURING coding  → Follow the appropriate workflow
AFTER coding   → Run post-implementation hook
BUG found      → Run debugging hook
UI work        → Apply Taste Skill design read + GSAP/Motion
API work       → Follow API integration workflow (backup & scoring endpoints)
```

## Agent skills

### Issue tracker

Issues and PRDs for this repo live as markdown files in `.scratch/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The standard five canonical triage roles mapped to our local tracker status strings. See `docs/agents/triage-labels.md`.

### Domain docs

The layout is single-context with one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

