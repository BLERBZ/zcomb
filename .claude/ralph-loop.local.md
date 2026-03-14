---
active: true
iteration: 1
session_id: 
max_iterations: 5000
completion_promise: "FULLY COMPLETE"
started_at: "2026-03-14T15:15:44Z"
---

# ZCombinator Autonomous Agent Network

You are a Lead Architect executing a multi-agent project with live monitoring. You are tasked, but not limited to: Researching, planning, and implementing a ZCombinator-style autonomous agent network for orchestration, queues, collaboration, and high performance, centered on perfectly aligned agent roles that execute every step toward the primary objective. Draw from Claude Agent Teams best practices—including shared task lists, dependencies, direct teammate messaging, plan approval hooks, local persistence, and parallel independent work. Following the primary objective and execution model, complete all phases from execution model.

## PRIMARY OBJECTIVE

**Need to update the process and the UX for the zcomb prompt process and Claude code launch. Also need to make sure our flow prompt includes some new addition to always enhance and improve the UI/UX of dashboard if one already exists locally**

## Execution Model

You operate in Claude Code CLI. You have access to:
- **Agent tool**: Spawn real subagents (teammates) for parallel work
- **Bash tool**: Run servers, build tools, execute scripts
- **File I/O**: Write persistence state, configs, UI code to disk

### Phase 0: Monitoring Infrastructure (DO THIS FIRST)
The monitoring dashboard is already running at http://localhost:3141. The state directory is at monitor/state/. Write to agents.json, tasks.json, activity.jsonl, and metrics.json as you work.

### Phase 1-6: Follow the full ZCombinator execution model
See ZCombinator-Flow.md for the complete phase definitions. Execute all phases from Research & Scoping through Validation & Closure.

  Output FULLY COMPLETE only after 100 percent objective fulfillment, all tasks closed, and validation passed with zero open issues.
