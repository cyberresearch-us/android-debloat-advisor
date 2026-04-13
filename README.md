# Android Package Advisor

Remove bloatware from Android phones — safely, with suggestions you review before anything runs.

![Android Package Advisor screenshot](docs/screenshot.png)

---

## Use it now

**[Open Android Package Advisor](https://cyberresearch-us.github.io/android-debloat-advisor/)**

No install, no account. Works in any browser.

---

## How it works

You need a computer, a USB cable, and 10 minutes.

| Step | What you do |
|------|-------------|
| **1. Prepare the phone** | Turn on Developer Options and USB debugging in Settings. |
| **2. Install ADB on your computer** | Download [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (small ZIP, no Android Studio needed). |
| **3. Export the package list** | Connect the phone via USB and run one command to copy all installed packages to your clipboard. |
| **4. Paste into the advisor** | Open the [tool](https://cyberresearch-us.github.io/android-debloat-advisor/), paste, click **Analyze**. |
| **5. Review suggestions** | Every package gets a label: **Remove**, **Keep**, or **Review**. Adjust the checkboxes to match what you want. |
| **6. Copy and run** | Click **Copy to clipboard**, paste the commands back into your terminal. Done. |

**Never done this before?** The tool page itself has step-by-step setup instructions — just expand the dropdowns.

**Want an AI to do it for you?** Paste our **[ready-made prompt](https://cyberresearch-us.github.io/android-debloat-advisor/ai-prompt.html)** into Cursor, Windsurf, Claude Code, or any AI tool with terminal access. It handles every step. You just review and approve.

---

## Is this safe?

The commands use `pm uninstall -k --user 0`, which **disables** the app for your user profile. The actual APK stays on the phone's system image. If something breaks, restore it immediately:

```
adb shell cmd package install-existing com.example.package
```

The advisor marks critical packages (dialer, home screen, Play Services, etc.) as **Keep** and blocks the checkbox so you cannot accidentally remove them.

---

## Parental controls

Removing apps is a good start, but it does **not** block the internet or prevent new installs. Pair this tool with **Google Family Link** for app approval, web filtering, and screen time.

See [Family Link — get started](https://families.google.com/familylink/) and the [setup instructions](https://support.google.com/families/answer/7101025).

---

## Tested devices

| Device | Model | Android | Status |
|--------|-------|---------|--------|
| Samsung Galaxy S10+ | SM-G975U1 | 12 | **Verified** — full package list tested |
| Samsung Galaxy S23 / S24 / S25 | — | 14 – 15 (One UI 6/7) | Research-based rules |
| Google Pixel 8 / 9 | — | 14 – 16 | Research-based rules |
| OnePlus 12 / 13 | — | 14 – 15 (OxygenOS 14/15) | Research-based rules |

**Verified** means someone ran the tool against a real device and confirmed the results.
**Research-based** means rules were added from community debloat guides but have not yet been tested on a physical device.

**Have a phone we haven't tested?** [Submit a device report](https://github.com/cyberresearch-us/android-debloat-advisor/issues/new?template=device-report.yml) — it takes 2 minutes and helps everyone.

---
---

## For developers

Everything below is for people who want to fork, self-host, or contribute.

---

### Host your own copy (optional)

The tool is plain HTML/CSS/JS under `docs/` — no build step, no backend.

1. [Fork this repo](https://github.com/cyberresearch-us/android-debloat-advisor/fork) or [create a new one](https://github.com/new) and push:
   ```bash
   git clone https://github.com/cyberresearch-us/android-debloat-advisor.git
   cd android-debloat-advisor
   git remote set-url origin https://github.com/<you>/<your-repo>.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Source**: branch **main**, folder **`/docs`** → **Save**.
3. Your site is live at `https://<you>.github.io/<your-repo>/` in about 60 seconds.

### Contributing rules

Rules live in `data/rules.json`. After editing, sync the copy used by GitHub Pages:

```powershell
.\scripts\sync-rules.ps1
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on adding packages, prefixes, and categories.

### Security and CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every push and PR:

| Check | Tool |
|-------|------|
| Rules files in sync | `cmp` |
| Filesystem scan | [Trivy v0.35](https://github.com/aquasecurity/trivy-action) |
| Secret detection | [Gitleaks v2](https://github.com/gitleaks/gitleaks-action) |

See [SECURITY.md](SECURITY.md) for the threat model and local scan instructions.

### Project layout

```
android-debloat-advisor/
├── docs/                        ← GitHub Pages root
│   ├── index.html               Interactive advisor (setup guide + tool)
│   ├── ai-prompt.html           Copy-paste prompt for AI tools
│   └── data/rules.json          Suggestion rules (keep in sync)
├── data/rules.json              Edit rules here
├── scripts/
│   ├── export-packages.ps1      Windows clipboard export
│   ├── export-packages.sh       macOS / Linux clipboard export
│   ├── sync-rules.ps1           Sync rules → docs/data/
│   └── test-rules.mjs           Offline rule test against a package dump
├── .github/workflows/ci.yml     Rules sync + Trivy + Gitleaks
├── CONTRIBUTING.md
├── SECURITY.md
└── LICENSE                      MIT
```

---

## License

MIT — [LICENSE](LICENSE)
