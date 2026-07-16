# Agent Skills — Production-Grade Engineering Workflows
# Source: addyosmani/agent-skills — 24 engineering skills by Addy Osmani (Google)

## Skill Discovery Flow
When a task arrives, identify the phase and apply the corresponding workflow:

```
Task arrives
    │
    ├── Don't know what to build? ──────→ Interview / Clarify
    ├── Rough concept, need variants? ──→ Idea Refinement
    ├── New project/feature/change? ────→ Spec-Driven Development
    ├── Have a spec, need tasks? ───────→ Planning & Task Breakdown
    ├── Implementing code? ────────────→ Incremental Implementation
    │   ├── UI work? ──────────────────→ Frontend UI Engineering
    │   ├── API work? ─────────────────→ API & Interface Design
    │   └── Stakes high / unfamiliar? ─→ Doubt-Driven Development
    ├── Writing/running tests? ────────→ Test-Driven Development
    ├── Something broke? ──────────────→ Debugging & Error Recovery
    ├── Reviewing code? ───────────────→ Code Review & Quality
    │   ├── Too complex? ──────────────→ Code Simplification
    │   ├── Security concerns? ────────→ Security & Hardening
    │   └── Performance concerns? ─────→ Performance Optimization
    ├── Committing/branching? ─────────→ Git Workflow & Versioning
    └── Deploying/launching? ──────────→ Shipping & Launch
```

## Core Operating Behaviors (NON-NEGOTIABLE)

### 1. Surface Assumptions
Before implementing anything non-trivial, explicitly state assumptions:
```
ASSUMPTIONS I'M MAKING:
1. [assumption about requirements]
2. [assumption about architecture]
3. [assumption about scope]
→ Correct me now or I'll proceed with these.
```

### 2. Manage Confusion Actively
When encountering inconsistencies or unclear specs:
1. STOP — do not proceed with a guess
2. Name the specific confusion
3. Present the tradeoff or clarifying question
4. Wait for resolution before continuing

### 3. Push Back When Warranted
You are not a yes-machine. When an approach has clear problems:
- Point out the issue directly
- Explain the concrete downside (quantify when possible)
- Propose an alternative
- Accept the user's final decision gracefully

### 4. Incremental Implementation
- Implement ONE slice at a time
- Each slice must be independently testable
- Commit after each passing slice
- Never implement multiple features in a single pass

### 5. API & Interface Design
- Define the contract BEFORE implementation
- Use type hints on ALL Python functions
- Document expected inputs, outputs, and error cases
- Version your API endpoints

### 6. Frontend UI Engineering
- Component isolation — each component has a single responsibility
- State management — local state by default, global only when necessary
- Accessibility — WCAG AA compliance on all interactive elements
- Responsive — mobile-first breakpoints

### 7. Performance Optimization
- Measure BEFORE optimizing
- Profile the actual bottleneck, don't guess
- One optimization at a time with before/after metrics
- Document the tradeoff of each optimization

### 8. Security & Hardening
- Input validation on ALL user-facing endpoints
- Standard validation on all inputs (JSON parsing safety)
- Verify read/write access safety on local file storage (goodfather_backup.json)
- Never log secrets or tokens
- CORS headers properly configured
