# Debugging Hook
# Fires when encountering errors — enforces systematic debugging (Superpowers)

## Systematic Debugging Protocol

### Step 1: Observe (DON'T TOUCH CODE YET)
- Read the FULL error message and stack trace
- Identify the exact file, line, and function where it fails
- Check if this is a known error pattern

### Step 2: Hypothesize
- Form ONE specific hypothesis about the root cause
- State it explicitly: "I believe this fails because..."
- Consider: Is this a data issue? Logic issue? Environment issue?

### Step 3: Gather Evidence
- Add targeted logging/inspection (not shotgun logging)
- Reproduce the error consistently
- Check recent changes that might have caused it
- Verify environment (dependencies, config, .env)

### Step 4: Fix (ONE change at a time)
- Make the SMALLEST change that could fix the issue
- Test immediately after the change
- If it doesn't work, REVERT and try the next hypothesis
- Never stack multiple fixes without testing between them

### Step 5: Verify
- Original error is resolved
- No new errors introduced
- All existing tests still pass
- Document root cause for future reference

## Anti-Patterns (NEVER DO)
- Shotgun debugging: random changes hoping something works
- Silent swallowing: catching exceptions without logging
- Cargo cult: copying "fixes" from StackOverflow without understanding
- Scope creep: refactoring while debugging
