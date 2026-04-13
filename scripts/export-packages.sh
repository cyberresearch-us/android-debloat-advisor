#!/usr/bin/env bash
# Usage: ./export-packages.sh
# Requires adb. Copies package list to clipboard when xclip, xsel, or pbcopy exists.

set -euo pipefail

if ! command -v adb >/dev/null 2>&1; then
  echo "adb not found. Install Android platform-tools and add to PATH." >&2
  exit 1
fi

OUT="$(adb shell pm list packages -f)"

if command -v xclip >/dev/null 2>&1; then
  printf '%s\n' "$OUT" | xclip -selection clipboard
  echo "Copied to clipboard (xclip)."
elif command -v xsel >/dev/null 2>&1; then
  printf '%s\n' "$OUT" | xsel --clipboard --input
  echo "Copied to clipboard (xsel)."
elif command -v pbcopy >/dev/null 2>&1; then
  printf '%s\n' "$OUT" | pbcopy
  echo "Copied to clipboard (pbcopy)."
else
  echo "$OUT"
  echo "---"
  echo "No clipboard tool found; printed above. Install xclip or xsel, or copy manually."
fi
