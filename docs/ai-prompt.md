# AI Prompt Builder

Use the **[interactive prompt builder](ai-prompt.html)** to create a custom prompt for your AI coding tool.

## How it works

1. Open the [prompt builder page](ai-prompt.html).
2. Check the boxes for what you need help with:
   - **USB debugging setup** — if you haven't enabled Developer Mode yet.
   - **Install ADB** — if ADB isn't installed on your computer.
   - **Debloat the phone** — the main process (checked by default).
3. The page builds a single prompt with numbered steps and safety gates.
4. Click **Copy**, paste into your AI tool (Cursor, Windsurf, Claude Code, etc.), and follow along.

The prompt is written for compatibility with smaller and local models — flat numbered steps, one action per step, explicit commands, and literal expected outputs.

## What the AI does vs. what you do

| AI does | You do |
|---------|--------|
| Runs ADB commands | Tap on the phone screen when prompted |
| Scans and sorts packages | Review the lists and approve removals |
| Shows commands before running | Say "execute" to proceed |
| Reports results | Test the phone and report issues |
| Helps restore broken packages | Confirm the fix worked |

Nothing destructive runs without your explicit approval.
