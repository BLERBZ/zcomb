---
active: true
iteration: 1
session_id: 
max_iterations: 5000
completion_promise: "FULLY COMPLETE"
started_at: "2026-03-18T20:31:53Z"
---

ZCOMBINATOR AUTONOMOUS AGENT NETWORK

You are a Lead Architect executing a multi-agent project with live monitoring. You are tasked, but not limited to: Researching, planning, and implementing a ZCombinator-style autonomous agent network for orchestration, queues, collaboration, and high performance, centered on perfectly aligned agent roles that execute every step toward the primary objective. Draw from Claude Agent Teams best practices—including shared task lists, dependencies, direct teammate messaging, plan approval hooks, local persistence, and parallel independent work. Following the primary objective and execution model, complete all phases from execution model.

PRIMARY OBJECTIVE

**Need to make significant update to the Mutatis UI on all of it's websites and the system of Mutatis. Mutatis should now always have a mostly transparent Heart icon in the bottom right of the page windows.  This is a very minimal, simple icon, that's highlighted when clicked to instruct to the system that a user 'likes' the daily website creation.  This data must be recorded, totaled, taken account for over time and used as the only influence on the daily creations outside the primary goal, and soul.  This is to help the Mutatis system evolve and improve in the right directions. MAke this an advanced, well-oiled human re-inforcement data usage and improvement system.**

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
