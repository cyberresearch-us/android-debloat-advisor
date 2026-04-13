# Android Package Advisor

Static tool: paste **`adb shell pm list packages -f`** output, see **suggestions**, tick what to remove, **copy** shell commands.

**Disclaimer:** Not legal/medical/parental-control advice. Wrong removals can break the device. Restore with `adb shell cmd package install-existing <package>` when the APK still exists on the system image.

## Deploy (GitHub Pages)

1. Push this repo to GitHub.
2. **Settings → Pages →** Source: **Deploy from branch**, branch **main**, folder **`/docs`**.
3. Done — no build step. Site: `https://<user>.github.io/<repo>/`.

Opening `docs/index.html` as a local `file://` URL often blocks loading `rules.json`; use Pages or any static server (e.g. `npx --yes serve docs`).

## Use the app

1. Get a package list from your machine with ADB (see [optional device notes](docs/device-setup.md) or repo `scripts/`).
2. Open the site → paste → **Analyze** → adjust checkboxes → **Copy** commands → run on your PC.

Parental controls: see [docs/family-link.md](docs/family-link.md) / [docs/family-link.html](docs/family-link.html).

## Project layout

| Path | Purpose |
|------|--------|
| `docs/index.html` | UI |
| `docs/data/rules.json` | Suggestions (must stay in sync with `data/rules.json`) |
| `data/rules.json` | Edit here, then `.\scripts\sync-rules.ps1` |
| `.github/workflows/ci.yml` | Rules sync + Trivy + Gitleaks |

## Security & CI

See [SECURITY.md](SECURITY.md). Pull requests run filesystem scanning and secret detection.

## Wild idea: SSH like terminal.shop

See [docs/ssh-terminal-shop.md](docs/ssh-terminal-shop.md) — fun but **not** the same as static Pages hosting.

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT — [LICENSE](LICENSE).
