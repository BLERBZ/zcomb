<!-- Badges -->
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built by Claude](https://img.shields.io/badge/Built%20by-Claude-blueviolet)](https://claude.ai)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Agents](https://img.shields.io/badge/agents-5--12-orange)]()

```
 ________  ________  ________  _____ ______   ________
|\_____  \|\   ____\|\   __  \|\   _ \  _   \|\   __  \
 \|___/  /\ \  \___|\ \  \|\  \ \  \\\__\ \  \ \  \|\ /_
     /  / /\ \  \    \ \  \\\  \ \  \\|__| \  \ \   __  \
    /  /_/__\ \  \____\ \  \\\  \ \  \    \ \  \ \  \|\  \
   |\________\ \_______\ \_______\ \__\    \ \__\ \_______\
    \|_______|\|_______|\|_______|\|__|     \|__|\|_______|

   Z C O M B I N A T O R
   Autonomous Agent Network Orchestrator for Claude Code
```

> We taught AI to manage AI, and it went surprisingly well.

**Built by Claude, for humans who dream big.**

Yes, you read that right -- this entire project was designed, architected, and implemented by an autonomous AI agent network. The very thing ZCombinator creates is what built ZCombinator. We are fully aware of the irony, and we lean into it.

---

## What is ZCombinator?

ZCombinator (ZComb) is an open source autonomous agent network orchestrator built for [Claude Code](https://docs.anthropic.com/en/docs/claude-code). Give it an objective -- any objective -- and it spawns a team of specialized AI agents that research, plan, build, test, and ship your project in parallel. All of it visible on a live monitoring dashboard.

Think of it as a startup accelerator, except every employee is an AI agent, the office is your terminal, and the standup meeting is a real-time Kanban board at `localhost:3141`.

---

## Quick Start

Three steps. That's it.

```bash
# 1. Clone and set up
git clone https://github.com/BLERBZ/zcomb.git

# 2. cd zcomb
bash setup.sh
//or ./setup.sh

# 3. Launch ZCombinator (starts dashboard + opens browser automatically)
bash zcomb.sh "Your objective here"
```

Your monitoring dashboard opens at `http://localhost:3141`. Paste the printed command into Claude Code, and watch the agents go to work.

---

## Features

- **Autonomous Agent Orchestration** -- Spawns 5-12 specialized agents (Architect, Backend Implementer, Test Engineer, Security Auditor, and more) that coordinate and execute tasks in parallel.

- **Live Monitoring Dashboard** -- A clean, dark-mode-first React dashboard with agent status cards, a Kanban task board, a scrolling activity feed, and real-time metrics. Refreshes every 3 seconds. Looks great. You will leave it open just to watch.

- **Prompt-Driven Everything** -- No config files, no YAML, no 47-step setup wizard. You write an objective in plain English, and ZComb figures out the rest: research, planning, decomposition, execution, QA, and validation.

- **File-Based State** -- All coordination happens through simple JSON files in `monitor/state/`. No databases, no message brokers, no Redis. Agents read and write atomically. It is beautifully simple.

- **Self-Reflection Protocol** -- Every 20 actions, the system pauses to check for blocked agents, dependency deadlocks, and stale tasks. It course-corrects automatically.

- **Monte Carlo Risk Simulation** -- Before execution begins, ZComb runs a risk analysis and writes results to `state/risk-analysis.json`. Because even AI agents benefit from a little existential dread.

- **Six-Phase Execution Model** -- Monitoring Infrastructure -> Research & Scoping -> Team Design & Spawning -> Planning & Decomposition -> Implementation & Execution -> Iteration & QA -> Validation & Closure. Every phase updates the dashboard in real time.

---

## How It Works

```
You write an objective
        |
        v
  ZCombinator prompt
  (ZCombinator-Flow.md)
        |
        v
  Claude Code CLI + ralph-loop skill
        |
        v
  Lead Architect agent boots up
        |
        v
  Phase 0: Spins up monitoring dashboard (localhost:3141)
        |
        v
  Phases 1-3: Research, design team, plan tasks
        |
        v
  Phases 4-5: Spawn agents -> parallel execution -> QA loops
        |
        v
  Phase 6: Validation, all tasks done, FULLY COMPLETE
        |
        v
  You have a finished project + full execution history
```

The entire flow is driven by a single prompt template in `ZCombinator-Flow.md`. The Lead Architect reads your objective, builds the monitoring infrastructure first, then spawns specialized agents that coordinate through shared state files. Every action is logged. Every task is tracked. Every agent reports its status.

---

## Architecture

```
zcomb/
  |
  |-- ZCombinator-Flow.md    # The brain: prompt template that drives everything
  |-- setup.sh               # One-time setup
  |-- zcomb.sh               # Launch script
  |-- CLAUDE.md              # Project context for Claude Code
  |
  |-- monitor/
       |-- server.js          # Express backend: serves UI + REST API
       |-- src/
       |    |-- App.tsx        # React dashboard entry
       |    |-- components/
       |    |    |-- AgentCards.tsx    # Live agent status cards
       |    |    |-- KanbanBoard.tsx  # Task board (inbox -> done)
       |    |    |-- ActivityFeed.tsx  # Scrolling action log
       |    |    |-- MetricsPanel.tsx  # Completion %, throughput, errors
       |    |    |-- GanttChart.tsx    # Phase timeline
       |    |-- hooks/
       |         |-- usePolling.ts    # Polls /api/state every 3s
       |
       |-- state/              # The shared nervous system
            |-- agents.json    # Agent registry + statuses
            |-- tasks.json     # Task list with states & assignments
            |-- activity.jsonl # Append-only execution log
            |-- metrics.json   # Aggregated performance metrics
```

### The Dashboard

The monitoring dashboard at `http://localhost:3141` gives you a real-time view of everything:

| Section | What It Shows |
|---------|--------------|
| **Top Bar** | Project name, overall progress %, elapsed time |
| **Left Panel** | Agent cards -- name, role, status badge, current task, metrics sparkline |
| **Center** | Kanban board with columns: Inbox, Assigned, In Progress, Review, Done, Failed |
| **Right Panel** | Activity feed, filterable by agent |
| **Bottom** | Metrics panel -- completion %, tasks/hour, error rate, phase progress bars |

Dark mode by default. Light mode toggle available for the brave.

---

## Prerequisites

| Requirement | Why |
|---|---|
| **Node.js** (v18+) | Runs the monitoring dashboard (Express + Vite + React) |
| **Claude Code CLI** | The runtime that powers every agent |
| **ralph-loop skill** | Keeps the Lead Architect running until the objective is fully complete |

---

## State File Contracts

Agents communicate through four state files in `monitor/state/`:

**agents.json** -- Registry of all spawned agents, their roles, statuses, and metrics.

**tasks.json** -- Every task in the system with status (`inbox`, `assigned`, `in_progress`, `review`, `done`, `failed`), assignee, priority, dependencies, and phase.

**activity.jsonl** -- Append-only log. One JSON object per line. Every meaningful action by every agent gets recorded here. This is your full execution history.

**metrics.json** -- Aggregated numbers: completion percentage, error rate, throughput, phase progress.

All writes are atomic (temp file + rename) to prevent partial reads. The Express API reads these files and serves them to the React frontend. No direct file access from the browser.

---

## FAQ

**Q: Wait, this was built by AI agents?**
A: Yes. ZCombinator was built by a ZCombinator-style agent network. It is self-referential by nature and proud of it.

**Q: How many agents does it spawn?**
A: Between 5 and 12, proportional to objective complexity. It won't spawn 12 agents to write a haiku.

**Q: Can I use this for production projects?**
A: ZComb is designed for ambitious objectives. Give it a real project and watch what happens. Check the dashboard, review the output, iterate. The agents do the heavy lifting; you make the judgment calls.

**Q: What if an agent gets stuck?**
A: The self-reflection protocol checks for blocked agents every 20 actions and can reassign or terminate them. Dependency deadlocks are detected automatically.

---

## Contributing

We welcome contributions from humans and AI alike. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE) -- Copyright (c) 2026 ZCombinator Contributors.

---

<p align="center">
<i>Built by Claude, for humans who dream big.</i><br>
<i>If an AI agent network can build its own orchestrator, imagine what it can build for you.</i>
</p>
