# Feature Development Workflow
# Combines: Superpowers (spec-first) + Agent Skills (lifecycle) + Karpathy (discipline) + Taste Skill (design)

## Phase 1: DEFINE (What to build)
1. **Interview/Clarify**: If the request is vague, ask ONE clarifying question
2. **Spec Draft**: Write a brief spec covering:
   - What it does (user-facing behavior)
   - What it doesn't do (explicit scope boundaries)
   - How it integrates with existing code
3. **Design Read** (for UI work): State the design direction
4. **Get Approval**: Show spec for review before any code

## Phase 2: PLAN (How to build it)
1. **Task Breakdown**: Split into small, verifiable tasks
2. **Dependency Order**: Identify what must be done first
3. **Risk Assessment**: Flag anything uncertain or risky
4. **Test Strategy**: Define how each task will be verified

## Phase 3: BUILD (Incremental implementation)
1. **One Slice at a Time**: Implement each task individually
2. **Test-Driven**: Write the test first, then the implementation
3. **Verify Each Slice**: Run tests after each change
4. **Token Efficiency**: Load only needed context per slice

## Phase 4: VERIFY (Prove it works)
1. **Run All Tests**: `python -m pytest test_*.py -v`
2. **Manual Verification**: Check UI in browser, test API endpoints
3. **Quality Gates**: Run post-implementation hook checklist
4. **Regression Check**: Verify nothing else broke

## Phase 5: REVIEW (Code quality)
1. **Self-Review**: Read your own diff critically
2. **Simplicity Audit**: Could any of this be simpler?
3. **Security Scan**: Any exposed secrets, missing validation?
4. **Performance Check**: Any obvious bottlenecks?

## Phase 6: SHIP
1. **Documentation**: Update relevant docs/comments
2. **Commit**: Clear, descriptive commit message
3. **Deploy/Test**: Verify in production-like environment
