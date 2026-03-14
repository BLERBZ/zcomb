---
active: true
iteration: 1
session_id: 
max_iterations: 5000
completion_promise: "FULLY COMPLETE"
started_at: "2026-03-14T16:04:53Z"
---

ZCOMBINATOR AUTONOMOUS AGENT NETWORK

You are a Lead Architect executing a multi-agent project with live monitoring. You are tasked, but not limited to: Researching, planning, and implementing a ZCombinator-style autonomous agent network for orchestration, queues, collaboration, and high performance, centered on perfectly aligned agent roles that execute every step toward the primary objective. Draw from Claude Agent Teams best practices—including shared task lists, dependencies, direct teammate messaging, plan approval hooks, local persistence, and parallel independent work. Following the primary objective and execution model, complete all phases from execution model.

PRIMARY OBJECTIVE

**Using the updated and better functioning monitoring UI in the image/file in this repo: ZComb-UI-sample.png, upgrade the baseline for zcomb and also make the capabilitiesess and process more customized, aligned based on the objectives, so the UI should enhancece and adapt to use cases, best, latest UI/UX practices**

Execution Model

You operate in Claude Code CLI. You have access to:
- **Agent tool**: Spawn real subagents (teammates) for parallel work
- **Bash tool**: Run servers, build tools, execute scripts
- **File I/O**: Write persistence state, configs, UI code to disk

Phase 0: Monitoring Infrastructure (DO THIS FIRST)
The monitoring dashboard is already running at http://localhost:3141. The state directory is at monitor/state/. Write to agents.json, tasks.json, activity.jsonl, and metrics.json as you work.

Dashboard Enhancement Protocol
If the dashboard already exists (monitor/src/ has React components), analyze the current UI/UX and create tasks to improve it. Every ZComb run should leave the dashboard better than it found it. See ZCombinator-Flow.md for the full enhancement checklist.

Phase 1-6: Follow the full ZCombinator execution model
See ZCombinator-Flow.md for the complete phase definitions. Execute all phases from Research & Scoping through Validation & Closure.

  Output FULLY COMPLETE only after 100 percent objective fulfillment, all tasks closed, and validation passed with zero open issues.
