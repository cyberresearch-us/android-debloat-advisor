# Android Package Advisor

A static tool that reads your phone's installed-package list, suggests what is safe to remove vs. keep, and exports the exact shell commands — **no account, no server, no build step**.

---

## What it does

1. You paste `adb shell pm list packages -f` output into the site.
2. Rules in `data/rules.json` label every package: **Remove** / **Keep** / **Review**.
3. You tick checkboxes to adjust, then copy the `adb shell pm uninstall …` command block.
4. Run that block on your PC while the phone is connected — done.

> **Disclaimer:** Removing the wrong package can break calling, the home screen, or mobile data. Commands generated here use `pm uninstall -k --user 0` which is **reversible** — the APK stays on the system image. Restore any package with `adb shell cmd package install-existing <package>`.

---

## Deploy to GitHub Pages (zero ops)

1. [Create a new GitHub repository](https://github.com/new) (public or private).
2. Push this project:
   ```powershell
   cd android-debloat-advisor
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Build and deployment → Source**:  
   - **Deploy from branch**  
   - Branch: **main**  
   - Folder: **`/docs`**  
   - Click **Save**.
4. Wait ~60 seconds. Your site will be live at:  
   `https://<your-username>.github.io/<repo-name>/`

That is everything. No npm, no Docker, no server.

---

## Use the app

See the **[full device setup guide](docs/device-setup.html)** for step-by-step instructions including:

- Enabling Developer Options on Samsung / Android phones
- Installing ADB on Windows, macOS, or Linux
- Connecting the phone and authorising USB debugging
- Exporting the package list to clipboard
- Running the generated commands safely
- Troubleshooting common issues

---

## Contributing rules

Rules live in `data/rules.json`. After editing, sync to `docs/data/rules.json`:

```powershell
.\scripts\sync-rules.ps1
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidance on adding package names, prefixes, and categories.

---

## Security & CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every push and PR:

| Check | Tool |
|-------|------|
| Rules files in sync | shell `cmp` |
| Filesystem scan | [Trivy v0.35](https://github.com/aquasecurity/trivy-action) |
| Secret detection | [Gitleaks v2](https://github.com/gitleaks/gitleaks-action) |

See [SECURITY.md](SECURITY.md) for local scan instructions and the threat model.

---

## Parental controls

Uninstalling packages is **not** a substitute for parental controls. Read [docs/family-link.html](docs/family-link.html) for Family Link setup and checklist.

---

## Project layout

```
android-debloat-advisor/
├── .github/
│   ├── dependabot.yml          Monthly Actions version bumps
│   └── workflows/ci.yml        Rules sync + Trivy + Gitleaks
├── data/
│   └── rules.json              Edit rules here
├── docs/                       ← GitHub Pages root
│   ├── index.html              Interactive advisor
│   ├── device-setup.html       Full phone + ADB setup guide
│   ├── family-link.html        Parental controls notes
│   ├── family-link.md
│   └── data/
│       └── rules.json          Copy of rules (keep in sync)
├── scripts/
│   ├── export-packages.ps1     Windows: copy package list to clipboard
│   ├── export-packages.sh      macOS/Linux clipboard export
│   └── sync-rules.ps1          Copy data/rules.json → docs/data/rules.json
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE                     MIT
├── README.md
└── SECURITY.md
```

---

## License

MIT — [LICENSE](LICENSE)
