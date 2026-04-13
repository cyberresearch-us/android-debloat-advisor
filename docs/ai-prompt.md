# Let an AI do it for you

If you use an AI coding tool with terminal access — **Cursor**, **Windsurf**, **Claude Code**, **GitHub Copilot in VS Code**, or similar — you can paste the prompt below and let the AI handle the entire process. You just review and approve at each gate.

## Requirements

- Your phone connected via USB with **USB debugging** enabled (see [device setup](device-setup.html) if you need help).
- **ADB** installed on your computer (the AI can help you install it too).
- An AI coding tool that can run terminal commands.

## The prompt

Copy everything inside the block below and paste it into your AI assistant:

---

````text
I have an Android phone connected to this computer via USB with USB debugging enabled.
ADB (Android Debug Bridge) should be installed. If not, help me install it.

This process has GATES. At each gate you MUST stop, show me what you
found or what you plan to do, and WAIT for me to say "continue" or
give you corrections before proceeding to the next step.

---

STEP 1 — Check connection
Run "adb devices" to confirm the phone is connected and authorized.
Show me the output (device model, serial, status).

  *** GATE 1 — Stop here. ***
  Tell me: Is the device connected? What model is it?
  If it shows "unauthorized", tell me to check the phone and tap Allow.
  Wait for me to say "continue".

---

STEP 2 — Export packages
Run "adb shell pm list packages -f" to get every installed package.
Count the total and tell me how many you found.

  *** GATE 2 — Stop here. ***
  Tell me: "Found [N] packages. Ready to classify them."
  Wait for me to say "continue".

---

STEP 3 — Classify packages
Classify each package into one of these categories:
  - REMOVE: Bloatware, social media, pre-installed apps the user likely
    does not want (Facebook, Microsoft stubs, Samsung Game tools, AR/VR,
    Bixby, Galaxy Store, ANT+, carrier bloat).
  - KEEP: Critical system packages that will break the phone if removed
    (launcher, dialer, in-call UI, IMS, Play Services, Google Services
    Framework, WebView, permission controller, Settings, SystemUI,
    telephony providers, package installer).
  - REVIEW: Everything else — present these so I can decide.

Show me the results organized by category in a table.
For each package show: package name, what it does, and your suggestion.

  *** GATE 3 — Stop here. ***
  Show me:
    - Summary counts (how many REMOVE, KEEP, REVIEW)
    - Full REMOVE list with explanations
    - Full KEEP list (so I can verify nothing important is being removed)
    - REVIEW list (I will tell you which to add to REMOVE or KEEP)
  Wait for me to review and tell you which packages to actually remove.
  Do NOT proceed until I give you an explicit list or say "approved".

---

STEP 4 — Show the exact commands (dry run)
For the packages I approved, show me every command you are about to run.
Use this format:
  - System/preloaded apps: adb shell pm uninstall -k --user 0 <package>
  - User-installed apps (under /data/app): adb shell pm uninstall --user 0 <package>

  *** GATE 4 — Stop here. ***
  Show me the full command list. Do NOT run anything yet.
  Tell me: "These are the [N] commands I will run. Say 'execute' to proceed."
  Wait for me to say "execute".

---

STEP 5 — Execute
Run ONLY the commands I approved in Gate 4. Show me the result of each
(Success or Failure). Summarize at the end.

  *** GATE 5 — Stop here. ***
  Show me a summary: how many succeeded, how many failed, any errors.
  Wait for me to acknowledge.

---

STEP 6 — Verify and undo instructions
Tell me how to test that the phone still works:
  - Make a phone call
  - Open the camera
  - Send a text message
  - Check that notifications work
  - Open Maps / email / any app I said to keep
Remind me that I can restore any package with:
  adb shell cmd package install-existing <package>

---

IMPORTANT RULES (follow these at ALL times):
- NEVER skip a gate. Always stop and wait for my response.
- NEVER run any uninstall command without my explicit approval.
- NEVER remove com.google.android.webview — it is NOT a browser; many apps need it.
- NEVER remove the launcher unless I have installed an alternative first.
- If you are unsure about any package, classify it as REVIEW, not REMOVE.
- This phone is for a child. Remove anything that enables web browsing,
  social media, gaming, streaming video/music, or app stores other than
  Play Store. Keep email, maps, calendar, camera, phone, and messages.
  (Delete or edit this line if the phone is not for a child.)
````

---

## What to expect

The AI stops at **5 gates**. Nothing destructive happens until you say so.

1. **Gate 1** — AI confirms the phone is connected. You verify.
2. **Gate 2** — AI reports how many packages it found. You say continue.
3. **Gate 3** — AI shows the full Remove / Keep / Review table. **You pick what actually gets removed.**
4. **Gate 4** — AI shows every command it will run, *without running them*. You say "execute".
5. **Gate 5** — AI shows results. You test the phone and confirm.

The whole process takes about 5–10 minutes. You stay in control the entire time.

## Customizing the prompt

- **Not for a child?** Delete the last line about child restrictions.
- **Want to keep certain apps?** Add a line like: `Keep these apps: Zoom, Duolingo, Google Photos`.
- **Specific device?** Add: `The phone is a Samsung Galaxy S10+ (SM-G975U1) running Android 12.`
