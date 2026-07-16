# API Integration Workflow
# For GoodFather local/server synchronization and scoring endpoints

## Phase 1: CONTRACT
1. Define the endpoint: method, path, params, response shape (e.g. `/api/score` or `/api/backup`)
2. Document expected errors and status codes (400 for invalid requests, 500 for backup load/save failures)
3. Identify backup requirements (persistence in `goodfather_backup.json`)

## Phase 2: IMPLEMENT
1. Add route to `app.py` with proper decorator
2. Use type hints on ALL function parameters and return values
3. Validate all inputs (e.g., request JSON structure, keys, values)
4. Implement safe file I/O operations with error handling

## Phase 3: ERROR HANDLING
1. Handle filesystem failures (missing file, permission issues)
2. Handle malformed JSON input gracefully
3. Return consistent error response format:
   ```json
   {"success": false, "error": "Detailed error message here"}
   ```

## Phase 4: TEST
1. Add unit/integration tests in `test_goodfather.py`
2. Test happy path + error paths (e.g., mock empty files, invalid payload)
3. Run: `python -m pytest test_goodfather.py -v`

## Phase 5: FRONTEND INTEGRATION
1. Add fetch call in `app.js` with error handling
2. Show loading/saving feedback during backup synchronizations
3. Display clear error indicators or toast notifications on sync failure
4. Update client-side UI states reactively based on API responses
