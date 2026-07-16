# Karpathy LLM Wiki Workflow
# Source: karpathy/442a6bf555914893e9891c11519de94f — Persistent knowledge base pattern

## Overview
Build and maintain a persistent, compounding knowledge wiki instead of re-reading files on every query.
The LLM incrementally builds interlinked markdown files that sit between you and raw sources.

## Architecture
```
project/
├── raw/              # Immutable source documents (articles, papers, screenshots)
├── wiki/             # LLM-generated & maintained markdown files
│   ├── index.md      # Content catalog with links + summaries
│   ├── log.md        # Chronological append-only record
│   ├── entities/     # Entity pages (devices, APIs, components)
│   ├── concepts/     # Concept pages (OAuth, MDM, RMM)
│   └── synthesis/    # Cross-cutting analysis pages
└── schema.md         # Conventions and workflow rules
```

## Operations

### Ingest
1. Drop new source into `raw/`
2. LLM reads source, extracts key info
3. Writes/updates summary page in wiki
4. Updates index.md
5. Updates relevant entity/concept pages
6. Appends entry to log.md

### Query
1. Read index.md to find relevant pages
2. Drill into specific wiki pages
3. Synthesize answer with citations
4. Good answers get filed back as new wiki pages

### Lint (Periodic Maintenance)
1. Find contradictions between pages
2. Flag stale claims superseded by newer sources
3. Identify orphan pages with no inbound links
4. Suggest new questions to investigate
5. Recommend new sources to look for

## Integration with GoodFather
Use this pattern for:
- Islamic Syariah parenting guide references
- Developmental milestones database
- Dashboard feature specs
- Bug/fix knowledge base
