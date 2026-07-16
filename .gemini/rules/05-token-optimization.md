# Token Optimization Rules
# Sources: rtk-ai/rtk (CLI proxy, 60-90% token reduction) + safishamsi/graphify (knowledge graph, 71.5x fewer tokens)

## RTK — CLI Token Reduction
RTK is a CLI proxy that reduces LLM token consumption by 60-90% on common dev commands.
Single Rust binary, zero dependencies.

### When to Apply RTK Principles
- Command output that is repetitive or verbose (test results, build logs, linting)
- File listings with excessive metadata
- Git log/diff output that includes unchanged context
- Any command output > 500 lines

### Token Reduction Strategies (RTK-inspired)
1. **Truncate repetitive output**: When command output has repeating patterns, summarize
2. **Strip metadata noise**: Remove timestamps, PIDs, memory addresses from output unless debugging
3. **Collapse passing tests**: Show only failures, summarize passes as count
4. **Compact file trees**: Summarize deep directories with counts instead of listing every file
5. **Diff compression**: Show only changed lines with minimal context (3 lines default)

### Integration
- Install: Download from https://github.com/rtk-ai/rtk/releases
- Usage: Prefix commands with `rtk` to auto-compress output
- Config: `.rtk.toml` in project root for custom rules

## Graphify — Knowledge Graph Token Saver
Graphify reads files, builds a knowledge graph, giving structure for 71.5x fewer tokens per query.
Fully multimodal: code, PDFs, markdown, screenshots, diagrams.

### When to Apply Graphify Principles
- Querying across multiple related files
- Understanding codebase architecture
- Finding connections between components
- Building persistent context across sessions

### Knowledge Graph Strategies (Graphify-inspired)
1. **Build once, query many**: Create persistent knowledge graphs instead of re-reading files
2. **SHA256 caching**: Only re-process changed files on re-runs
3. **Community detection**: Group related concepts for targeted context loading
4. **Graph navigation**: Use node relationships instead of full-text search
5. **Wiki generation**: Create Wikipedia-style articles for agent navigation

### Integration
- Install: `pip install graphifyy && graphify install`
- Usage in project: `graphify .` to index current directory
- Query: `graphify query "what connects X to Y?"`
- Update: `graphify . --update` for incremental processing

### Output Structure
```
graphify-out/
├── graph.html       # Interactive graph visualization
├── obsidian/        # Open as Obsidian vault
├── wiki/            # Wikipedia-style articles for navigation
├── GRAPH_REPORT.md  # God nodes, surprising connections
├── graph.json       # Persistent graph for future queries
└── cache/           # SHA256 cache for incremental updates
```

## General Token Optimization Rules
1. **Prefer structured output over prose**: Tables, lists, and key-value pairs over paragraphs
2. **Use references, not repetition**: Link to files/functions instead of re-stating their content
3. **Compress context loading**: Load only relevant sections of files, not entire files
4. **Cache intermediate results**: Store analysis results for reuse across sessions
5. **Batch operations**: Group related queries/operations instead of one-at-a-time
6. **Progressive detail**: Start with summary, drill into details only when needed
