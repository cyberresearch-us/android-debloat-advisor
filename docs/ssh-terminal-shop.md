# SSH deployment (experimental / “terminal.shop style”)

[Terminal.shop](https://www.terminal.shop/about) is a storefront where you connect with **`ssh terminal.shop`** and complete a flow in the terminal—no traditional website checkout. Andy LeClair [described the experience](https://andyleclair.dev/posts/2025/05-18-terminal-shop-coffee-first-impressions.html) (payment can still hand off to a browser when needed).

## How that differs from this project

**Android Package Advisor** is a **static site**: HTML + JavaScript in `docs/`. GitHub Pages serves files over **HTTPS** only. There is **no SSH server** and no backend in the default design.

## Could you add SSH “for fun”?

Yes, but it is a **separate service**:

1. Run an **SSH server** you control (VPS, Fly.io, etc.).
2. On login, run a **TUI or shell menu** (e.g. Go with [Wish](https://github.com/charmbracelet/wish), [ssh-chat](https://github.com/shazow/ssh-chat), or a custom script).
3. That program could:
   - print a link to your GitHub Pages site;
   - accept pasted `pm list packages -f` and run **local** classification if you bundle the rules JSON and a small CLI;
   - or stream pre-rendered advice (read-only).

That is **not** deployable from “Pages only”; it needs a process listening on port 22 (or a proxy) and ongoing maintenance.

## Practical recommendation

- **Ship the static site** on GitHub Pages (zero ops).
- Treat **SSH** as a novelty or power-user layer only if you enjoy running infra.

If you build an SSH front-end, document it separately and keep secrets (SSH host keys, API keys) out of this repo—use `SECURITY.md` and CI secret scanning (e.g. Gitleaks) to catch mistakes.
