#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────
#  ZCombinator Setup
#  Checks prerequisites and installs dashboard dependencies
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

CHECK="${GREEN}✔${RESET}"
CROSS="${RED}✘${RESET}"
WARN="${YELLOW}⚠${RESET}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo ""
echo -e "${CYAN}${BOLD}  ╔═══════════════════════════════════╗${RESET}"
echo -e "${CYAN}${BOLD}  ║      ZCombinator Setup Wizard     ║${RESET}"
echo -e "${CYAN}${BOLD}  ╚═══════════════════════════════════╝${RESET}"
echo ""

PASS=0
FAIL=0

# ── 1. Node.js ───────────────────────────────────────────
echo -e "  ${BOLD}Checking prerequisites...${RESET}"
echo ""

if command -v node &>/dev/null; then
    NODE_VER="$(node --version)"
    echo -e "  ${CHECK}  Node.js found  ${DIM}(${NODE_VER})${RESET}"
    PASS=$((PASS + 1))
else
    echo -e "  ${CROSS}  Node.js not found"
    echo -e "     ${DIM}Install it: https://nodejs.org  or  brew install node${RESET}"
    FAIL=$((FAIL + 1))
fi

# ── 2. Claude Code CLI ──────────────────────────────────
if command -v claude &>/dev/null; then
    echo -e "  ${CHECK}  Claude Code CLI found  ${DIM}($(which claude))${RESET}"
    PASS=$((PASS + 1))
else
    echo -e "  ${CROSS}  Claude Code CLI not found"
    echo -e "     ${DIM}Install it: npm install -g @anthropic-ai/claude-code${RESET}"
    FAIL=$((FAIL + 1))
fi

# ── 3. ralph-loop Skill ─────────────────────────────────
if claude skill list 2>/dev/null | grep -qi "ralph-loop"; then
    echo -e "  ${CHECK}  ralph-loop skill installed"
    PASS=$((PASS + 1))
else
    echo -e "  ${WARN}  ralph-loop skill not detected"
    echo -e "     ${DIM}Install it: claude skill add ralph-loop${RESET}"
    # Not a hard fail — might just be a detection issue
fi

echo ""

# ── 4. Install Dashboard Dependencies ───────────────────
if [ "$FAIL" -gt 0 ]; then
    echo -e "  ${RED}${BOLD}Aborting:${RESET} Fix the ${FAIL} issue(s) above and re-run this script."
    echo ""
    exit 1
fi

echo -e "  ${BOLD}Installing dashboard dependencies...${RESET}"
echo ""

cd "${SCRIPT_DIR}/monitor"

if npm install 2>&1 | while IFS= read -r line; do
    echo -e "  ${DIM}  ${line}${RESET}"
done; then
    echo ""
    echo -e "  ${CHECK}  Dashboard dependencies installed"
else
    echo ""
    echo -e "  ${CROSS}  npm install failed — check the output above"
    exit 1
fi

echo ""

# ── Done ─────────────────────────────────────────────────
echo -e "${GREEN}${BOLD}  ┌─────────────────────────────────────┐${RESET}"
echo -e "${GREEN}${BOLD}  │         You're all set! 🚀          │${RESET}"
echo -e "${GREEN}${BOLD}  └─────────────────────────────────────┘${RESET}"
echo ""
echo -e "  ${BOLD}Next steps:${RESET}"
echo ""
echo -e "    1.  Pick an objective from ${CYAN}examples/objectives.md${RESET}"
echo -e "        or write your own."
echo ""
echo -e "    2.  Launch ZCombinator:"
echo -e "        ${CYAN}./zcomb.sh \"<your objective here>\"${RESET}"
echo ""
echo -e "    3.  Open the dashboard at ${CYAN}http://localhost:3141${RESET}"
echo -e "        and watch the swarm work."
echo ""
echo -e "  ${DIM}Full docs: ZCombinator-Flow.md${RESET}"
echo ""
