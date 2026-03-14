#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────
#  ZCombinator Launch Script
#  Starts the monitoring dashboard and prints the command
#  to kick off the autonomous agent swarm.
# ─────────────────────────────────────────────────────────

set -euo pipefail

# ── Colors ───────────────────────────────────────────────
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MONITOR_DIR="${SCRIPT_DIR}/monitor"

DEFAULT_OBJECTIVE="Build a full-stack todo app with a Node.js API, React frontend, SQLite persistence, user authentication, and comprehensive tests."

OBJECTIVE="${1:-$DEFAULT_OBJECTIVE}"

echo ""
echo -e "${CYAN}${BOLD}  ╔═══════════════════════════════════╗${RESET}"
echo -e "${CYAN}${BOLD}  ║        ZCombinator Launcher        ║${RESET}"
echo -e "${CYAN}${BOLD}  ╚═══════════════════════════════════╝${RESET}"
echo ""

# ── 1. Start the Dashboard ──────────────────────────────
echo -e "  ${BOLD}Starting monitoring dashboard...${RESET}"

# Kill any existing server on port 3141
if lsof -ti:3141 &>/dev/null; then
    echo -e "  ${DIM}Stopping existing process on port 3141...${RESET}"
    lsof -ti:3141 | xargs kill -9 2>/dev/null || true
    sleep 1
fi

# Build and start the server in the background
cd "${MONITOR_DIR}"
npm run start > /tmp/zcomb-dashboard.log 2>&1 &
DASHBOARD_PID=$!
cd "${SCRIPT_DIR}"

echo -e "  ${DIM}Dashboard PID: ${DASHBOARD_PID}${RESET}"

# ── 2. Wait for Dashboard ───────────────────────────────
echo -e "  Waiting for dashboard to be ready..."

MAX_WAIT=30
WAITED=0
while ! curl -s -o /dev/null -w '' http://localhost:3141 2>/dev/null; do
    sleep 1
    WAITED=$((WAITED + 1))
    if [ "$WAITED" -ge "$MAX_WAIT" ]; then
        echo -e "  ${RED}Dashboard failed to start after ${MAX_WAIT}s.${RESET}"
        echo -e "  ${DIM}Check logs: /tmp/zcomb-dashboard.log${RESET}"
        kill "$DASHBOARD_PID" 2>/dev/null || true
        exit 1
    fi
done

echo -e "  ${GREEN}✔${RESET}  Dashboard running at ${CYAN}http://localhost:3141${RESET}"
echo ""

# ── 3. Open Browser ─────────────────────────────────────
if command -v open &>/dev/null; then
    open "http://localhost:3141"
    echo -e "  ${GREEN}✔${RESET}  Opened dashboard in your browser"
elif command -v xdg-open &>/dev/null; then
    xdg-open "http://localhost:3141"
    echo -e "  ${GREEN}✔${RESET}  Opened dashboard in your browser"
else
    echo -e "  ${YELLOW}⚠${RESET}  Could not auto-open browser. Visit ${CYAN}http://localhost:3141${RESET} manually."
fi

echo ""

# ── 4. Build the ZCombinator Prompt ─────────────────────
read -r -d '' ZCOMB_PROMPT << 'PROMPT_TEMPLATE' || true
# ZCombinator Autonomous Agent Network

You are a Lead Architect executing a multi-agent project with live monitoring. You are tasked, but not limited to: Researching, planning, and implementing a ZCombinator-style autonomous agent network for orchestration, queues, collaboration, and high performance, centered on perfectly aligned agent roles that execute every step toward the primary objective. Draw from Claude Agent Teams best practices—including shared task lists, dependencies, direct teammate messaging, plan approval hooks, local persistence, and parallel independent work. Following the primary objective and execution model, complete all phases from execution model.

## PRIMARY OBJECTIVE

**__OBJECTIVE_PLACEHOLDER__**

## Execution Model

You operate in Claude Code CLI. You have access to:
- **Agent tool**: Spawn real subagents (teammates) for parallel work
- **Bash tool**: Run servers, build tools, execute scripts
- **File I/O**: Write persistence state, configs, UI code to disk

### Phase 0: Monitoring Infrastructure (DO THIS FIRST)
The monitoring dashboard is already running at http://localhost:3141. The state directory is at monitor/state/. Write to agents.json, tasks.json, activity.jsonl, and metrics.json as you work.

### Phase 1-6: Follow the full ZCombinator execution model
See ZCombinator-Flow.md for the complete phase definitions. Execute all phases from Research & Scoping through Validation & Closure.
PROMPT_TEMPLATE

# Substitute the objective into the prompt
ZCOMB_PROMPT="${ZCOMB_PROMPT//__OBJECTIVE_PLACEHOLDER__/${OBJECTIVE}}"

# ── 5. Print the Command ────────────────────────────────
echo -e "  ${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "  ${BOLD}Your objective:${RESET}"
echo -e "  ${CYAN}${OBJECTIVE}${RESET}"
echo -e "  ${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo -e "  ${GREEN}${BOLD}Run this command to start the swarm:${RESET}"
echo ""
echo -e "  ${CYAN}/ralph-loop:ralph-loop \"${ZCOMB_PROMPT}${RESET}"
echo ""
echo -e "  ${CYAN}Output FULLY COMPLETE only after 100 percent objective fulfillment, all tasks closed, and validation passed with zero open issues.\" --max-iterations 5000 --completion-promise \"FULLY COMPLETE\"${RESET}"
echo ""
echo -e "  ${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo -e "  ${DIM}Tip: Copy the command above into your Claude Code session.${RESET}"
echo -e "  ${DIM}Dashboard logs: /tmp/zcomb-dashboard.log${RESET}"
echo -e "  ${DIM}To stop the dashboard later: kill ${DASHBOARD_PID}${RESET}"
echo ""
