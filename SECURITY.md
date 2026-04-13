# Security

## Scope

This project is **static HTML/CSS/JSON** served from GitHub Pages (or any static host). There is **no server-side code** in the default deployment.

## Reporting

If you find a security issue (XSS in the UI, malicious rule suggestions in a fork, etc.), please open a **private** GitHub security advisory for this repository or contact the maintainers.

## Threat model

- **User-supplied input** is pasted package lists and displayed using DOM APIs that set `textContent` (not `innerHTML`) for package names and paths.
- **Rules** are loaded from same-origin `data/rules.json`. Hosting a malicious copy of `rules.json` on an attacker-controlled site is a supply-chain concern for anyone who mirrors the project; prefer the official repo or verify hashes.
- **Exported commands** run on the user’s PC with **their** ADB session. The site does not execute those commands.

## CI checks

Pull requests run:

- **Rules sync**: `data/rules.json` must match `docs/data/rules.json`.
- **Trivy** filesystem scan (misconfig / secrets patterns in repo).
- **Gitleaks** (accidental secret commits).

These tools reduce accidental leaks; they are not a full application penetration test.
