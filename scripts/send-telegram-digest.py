#!/usr/bin/env python3
"""Send telegram-news.txt through the canonical DAINER OS Telegram helper."""

from __future__ import annotations

import argparse
import importlib.util
import sys
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIGEST_PATH = ROOT / "telegram-news.txt"
TELEGRAM_HELPER = Path("/Users/dainer/Desktop/DAINER OS/scripts/cron/_telegram.py")
MAX_CHARS = 3800


def load_telegram_helper():
    spec = importlib.util.spec_from_file_location("dainer_telegram_helper", TELEGRAM_HELPER)
    if not spec or not spec.loader:
        raise RuntimeError(f"Cannot load Telegram helper: {TELEGRAM_HELPER}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def chunks(text: str):
    for start in range(0, len(text), MAX_CHARS):
        yield text[start : start + MAX_CHARS]


def main() -> int:
    parser = argparse.ArgumentParser(description="Send DAINER Finance Telegram digest")
    parser.add_argument("--dry-run", action="store_true", help="Print message length only")
    args = parser.parse_args()

    if not DIGEST_PATH.exists():
        print(f"missing digest: {DIGEST_PATH}", file=sys.stderr)
        return 1

    text = DIGEST_PATH.read_text().strip()
    if not text:
        print(f"empty digest: {DIGEST_PATH}", file=sys.stderr)
        return 1

    parts = list(chunks(text))
    if args.dry_run:
        print(f"dry_run parts={len(parts)} chars={len(text)}")
        return 0

    telegram = load_telegram_helper()
    for index, part in enumerate(parts, start=1):
        prefix = f"DAINER FINANCE DIGEST {index}/{len(parts)}\n\n" if len(parts) > 1 else ""
        status = telegram.send(prefix + part)
        print(f"sent part={index} status={status}")
        if status != 200:
            return 1
        time.sleep(0.3)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
