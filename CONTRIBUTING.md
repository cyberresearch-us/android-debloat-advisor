# Contributing

## Rules (`data/rules.json` and `docs/data/rules.json`)

Keep **both** copies in sync. After editing `data/rules.json`, run:

```powershell
.\scripts\sync-rules.ps1
```

They must be identical so GitHub Pages and local tooling match.

When adding a rule:

1. Prefer **exact package names** from `adb shell pm list packages -f` on a real device.
2. Use **prefixes** sparingly (e.g. `com.facebook.`) — overly broad prefixes cause wrong suggestions.
3. Set `defaultAction` to `remove`, `keep`, or `review`.
4. Write a short `reason` a non-expert can understand.

## Testing the web UI

Opening `docs/index.html` via `file://` often **blocks** `fetch()` for `rules.json`. Use one of:

- **VS Code** “Live Server” (or any static server) with workspace root containing `docs/`
- **`npx serve docs`** then open the served `index.html`
- **GitHub Pages** after merge

## Pull requests

- One logical change per PR when possible.
- Mention device model and Android version if you validated package names on hardware.
