# Let an AI do it for you

If you use an AI coding tool with terminal access — **Cursor**, **Windsurf**, **Claude Code**, **GitHub Copilot in VS Code**, or similar — you can paste the prompt below and let the AI handle the entire process. You just review and approve.

## Requirements

- Your phone connected via USB with **USB debugging** enabled (see [device setup](device-setup.html) if you need help).
- **ADB** installed on your computer (the AI can help you install it too).
- An AI coding tool that can run terminal commands.

## The prompt

Copy everything inside the block below and paste it into your AI assistant:

---

```
I have an Android phone connected to this computer via USB with USB debugging enabled.
ADB (Android Debug Bridge) should be installed. If not, help me install it.

Please do the following:

1. Run "adb devices" to confirm the phone is connected and authorized.
   If it shows "unauthorized", tell me to check the phone screen and tap Allow.

2. Run "adb shell pm list packages -f" to export every installed package.

3. Classify each package into one of these categories:
   - REMOVE: Bloatware, social media, pre-installed apps I likely don't use
     (Facebook, Microsoft stubs, Samsung Game tools, AR/VR, Bixby,
     Galaxy Store, ANT+, carrier bloat).
   - KEEP: Critical system packages that will break the phone if removed
     (launcher, dialer, in-call UI, IMS, Play Services, Google Services
     Framework, WebView, permission controller, Settings, SystemUI,
     telephony providers, package installer).
   - REVIEW: Everything else — present these so I can decide.

4. Show me the results organized by category in a table.
   For each package show: package name, what it is, and your suggestion.

5. Ask me to confirm which packages to remove. Wait for my response.
   Do NOT run any uninstall commands until I approve.

6. For packages I approve, generate and run the commands using:
   - System/preloaded apps: adb shell pm uninstall -k --user 0 <package>
   - User-installed apps (under /data/app): adb shell pm uninstall --user 0 <package>

7. After running, tell me how to test (make a call, open camera, check
   notifications) and remind me that I can restore any package with:
   adb shell cmd package install-existing <package>

Important rules:
- NEVER remove a package without my explicit approval.
- NEVER remove com.google.android.webview — it is NOT a browser, many apps need it.
- NEVER remove the launcher unless I have installed an alternative and set it as default.
- If you are unsure about a package, classify it as REVIEW, not REMOVE.
- This phone is for a child. Remove anything that enables web browsing,
  social media, gaming, streaming video/music, or app stores other than
  Play Store. Keep email, maps, calendar, camera, phone, and messages.
  (Delete or edit this line if the phone is not for a child.)
```

---

## What to expect

The AI will:

1. Check the connection.
2. Pull the full package list (typically 300–500 lines).
3. Present a categorized table for you to review.
4. Wait for your go-ahead before touching anything.
5. Run only the commands you approved.
6. Tell you how to verify and how to undo.

The whole process takes about 5–10 minutes. You stay in control the entire time.

## Customizing the prompt

- **Not for a child?** Delete the last line about child restrictions.
- **Want to keep certain apps?** Add a line like: `Keep these apps: Zoom, Duolingo, Google Photos`.
- **Specific device?** Add: `The phone is a Samsung Galaxy S10+ (SM-G975U1) running Android 12.`
