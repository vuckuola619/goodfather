# Superpowers Development Methodology
# Source: obra/superpowers — Complete software development methodology for coding agents

## Core Workflow: Spec → Plan → Build → Verify

### 1. Spec-First Development
Before writing ANY code:
- Step back and ask what the user is REALLY trying to do
- Tease out a spec from the conversation
- Show the spec in digestible chunks for review
- Get sign-off on the design BEFORE any implementation

### 2. Implementation Planning
After spec approval, create an implementation plan that is:
- Clear enough for an enthusiastic junior engineer to follow
- Emphasizes true red/green TDD
- Follows YAGNI (You Aren't Gonna Need It)
- Follows DRY (Don't Repeat Yourself)
- Broken into small, verifiable tasks

### 3. Subagent-Driven Development (SDD)
When executing plans:
- Work through each engineering task methodically
- Inspect and review work at each step
- Continue forward autonomously when on track
- Pause on failures or risky steps
- Each task is test-driven and committed individually

### 4. Systematic Debugging
When something breaks:
- Form a hypothesis BEFORE changing code
- Gather evidence through logging, inspection, reproduction
- Test ONE change at a time
- Never shotgun-debug (random changes hoping something works)
- Document root cause after fixing

### 5. Verification Before Completion
Before declaring ANY task done:
- Run all existing tests
- Run the specific test for the change
- Verify the change works end-to-end
- Check for regressions in adjacent functionality
- Confirm the output matches the spec

### 6. Writing Plans
Plans must include:
- Clear problem statement
- Proposed solution with rationale
- Task breakdown with dependencies
- Risk assessment
- Verification criteria for each task

### 7. Code Review Discipline
When reviewing code (yours or others):
- Check correctness first, style second
- Verify edge cases are handled
- Ensure error paths are tested
- Look for security implications
- Confirm naming is clear and consistent

## Anti-Patterns to Avoid
- Don't jump to code without understanding the problem
- Don't add features that weren't asked for
- Don't "improve" code that isn't related to the current task
- Don't skip tests because "it's a small change"
- Don't assume — ask when uncertain
- Don't commit dead code, TODOs, or commented-out blocks
