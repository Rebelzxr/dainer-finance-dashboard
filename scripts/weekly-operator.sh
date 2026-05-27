#!/bin/zsh
set -euo pipefail

ROOT="${DAINER_FINANCE_ROOT:-/Users/dainer/Desktop/DAINER OS/dainer-finance}"
OS_ROOT="/Users/dainer/Desktop/DAINER OS"
CODEX_BIN="${CODEX_BIN:-/Users/dainer/.npm-global/bin/codex}"
PROMPT_FILE="$ROOT/scripts/WEEKLY_OPERATOR_PROMPT.md"
LOG_DIR="$ROOT/logs"
STAMP="$(date '+%Y-%m-%d-%H%M%S')"
LOG_FILE="$LOG_DIR/weekly-operator-$STAMP.log"
TELEGRAM_HELPER="$OS_ROOT/scripts/cron/_telegram.py"

mkdir -p "$LOG_DIR"

send_status() {
  local message="$1"
  if [[ -f "$TELEGRAM_HELPER" ]]; then
    python3 "$TELEGRAM_HELPER" "$message" >/dev/null 2>&1 || true
  fi
}

if [[ ! -x "$CODEX_BIN" ]]; then
  send_status "DAINER Finance weekly operator failed: Codex CLI not executable at $CODEX_BIN"
  exit 1
fi

if [[ ! -f "$PROMPT_FILE" ]]; then
  send_status "DAINER Finance weekly operator failed: missing prompt file $PROMPT_FILE"
  exit 1
fi

cd "$ROOT"

{
  echo "DAINER Finance weekly operator"
  echo "started_at=$(date '+%Y-%m-%dT%H:%M:%S%z')"
  echo "root=$ROOT"
  echo "prompt=$PROMPT_FILE"
  echo
} >> "$LOG_FILE"

set +e
"$CODEX_BIN" exec --full-auto --cd "$ROOT" --add-dir "$OS_ROOT/finance-data" - < "$PROMPT_FILE" >> "$LOG_FILE" 2>&1
STATUS=$?
set -e

if [[ "$STATUS" -eq 0 ]]; then
  send_status "DAINER Finance weekly operator completed. Log: $LOG_FILE"
else
  send_status "DAINER Finance weekly operator failed with status $STATUS. Log: $LOG_FILE"
fi

exit "$STATUS"

