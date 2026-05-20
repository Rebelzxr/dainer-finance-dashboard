# DAINER Finance Dashboard

A builder's open notebook on markets, picks, and capital. Free, no paywall.

**Live site:** `https://dainer.github.io/dainer-finance-dashboard/` (deploy via GitHub Pages)
**Source:** this repo
**Newsletter:** weekly, free, [Buttondown signup](https://buttondown.email/dainer)

---

## What this is

Three research reports + a weekly newsletter + a compound calculator, all in one static site. Built in public. Not financial advice.

| Page | What it is |
|------|------------|
| [`index.html`](index.html) | Dashboard — overview, latest issue, news cards |
| [`picks/swing-3-5yr.html`](picks/swing-3-5yr.html) | US 3-5yr swing — 10 positions (8 singles + 2 ETFs) |
| [`picks/swing-msia.html`](picks/swing-msia.html) | Malaysia 3-5yr swing — 11 picks across 5 themes |
| [`picks/dividends.html`](picks/dividends.html) | Dividend income — 3 sleeves, 21 picks, tax-aware |
| [`picks/leopold-13f.html`](picks/leopold-13f.html) | Leopold Aschenbrenner 13F tracker — tactical 1-2Q |
| [`calculator.html`](calculator.html) | Compound interest calculator (client-side only) |
| [`newsletter/index.html`](newsletter/index.html) | Newsletter archive + subscribe |

---

## Architecture

```
dainer-finance-dashboard/
├── index.html                  # Dashboard
├── calculator.html             # Compound calculator (client-side, private)
├── picks/                      # All research reports
│   ├── swing-3-5yr.html        # US 3-5yr (10 picks)
│   ├── swing-msia.html         # Malaysia 3-5yr (11 picks)
│   ├── dividends.html          # Dividend income (21 picks)
│   └── leopold-13f.html        # Leopold tracker (tactical)
├── newsletter/
│   ├── index.html              # Archive list
│   ├── feed.xml                # RSS
│   └── YYYY-MM-DD.html         # Individual issues
├── data/                       # JSON data feeds
│   ├── news.json               # 5-6 news cards for dashboard
│   ├── picks.json              # All picks aggregated
│   └── portfolio.json          # Current allocation (% only)
├── assets/
│   ├── style.css               # Shared DAINER OS stylesheet
│   ├── main.js                 # Shared JS (theme toggle, reveals)
│   └── nav.html                # Shared nav fragment (reference)
├── scripts/                    # Codex automation
│   ├── refresh-news.py         # Weekly news scan (TODO — Codex builds)
│   ├── refresh-prices.py       # Price refresh (TODO — Codex builds)
│   ├── draft-issue.py          # Newsletter draft generator (TODO — Codex builds)
│   └── weekly.sh               # Saturday cron orchestrator (TODO — Codex builds)
├── _drafts/                    # Auto-generated issue drafts (gitignored from publish)
└── README.md                   # This file
```

---

## Design principles

1. **% only, no $ amounts** on any public page. Calculator is the exception — user enters their own values, nothing transmitted, nothing logged.
2. **Single-file pages** where practical. Shared CSS / JS lives in `assets/`. Each report is largely self-contained.
3. **STATUS tags on every claim** — `VERIFIED` / `UNVERIFIED` / `BROKEN`. Tag in footer of every report.
4. **No paywall, no ads, no analytics that track user inputs**. RSS feed for non-email readers.
5. **Aesthetic locked:** Fraunces serif (display) + Instrument Sans (body) + JetBrains Mono (data). Warm gold accent (`#D4A84B`) on charcoal (`#0A0908`). Light/dark theme toggle persisted in localStorage.

---

## How to publish to GitHub Pages

```bash
cd /Users/dainer/Desktop/DAINER\ OS/dainer-finance

# Init git repo
git init
git add .
git commit -m "Initial commit: DAINER Finance dashboard v0.1"

# Create repo on GitHub (use gh CLI)
gh repo create dainer-finance-dashboard --public --description "A builder's weekly read on markets, picks, and capital."

# Push
git remote add origin https://github.com/dainer/dainer-finance-dashboard.git
git branch -M main
git push -u origin main

# Enable GitHub Pages (Settings → Pages → Source: main branch / root)
# Wait 2-5 min for first build
# Site lives at https://dainer.github.io/dainer-finance-dashboard/
```

After deployment, update the URLs in:
- `newsletter/feed.xml` (`<link>` and `<atom:link>` tags)
- `assets/main.js` (if any absolute paths exist)
- Buttondown subscribe form action URL (`buttondown.email/api/emails/embed-subscribe/<username>`) — set to your Buttondown username

---

## Email collection setup

Free path: [Buttondown](https://buttondown.email) — 100 subscribers free, no credit card.

1. Sign up at buttondown.email
2. Choose username (recommend `dainer-finance` for separation from Alpha Machine)
3. Forms auto-embed at `https://buttondown.email/api/emails/embed-subscribe/<username>`
4. Replace `/dainer` in form `action` attributes across the site (search-replace)
5. Done — emails land in Buttondown dashboard, you write/send issues from there OR push HTML manually

Alternative: ConvertKit free tier (1000 subs), Mailerlite free (1000 subs), or Beehiiv (Alpha Machine already uses).

---

## Codex automation

Each Sunday morning, Codex runs `scripts/weekly.sh` which:

1. **Refreshes prices** via Stooq / Yahoo (free) for all 30 positions in `data/picks.json`
2. **Scans curated finance domains** (Reuters, Bloomberg, FT, SEC EDGAR, Bursa MY) for stories matching theme keywords
3. **Ranks** news by relevance score, picks top 6 → writes to `data/news.json`
4. **Drafts next issue** in `_drafts/YYYY-MM-DD.html` from a Markdown template with placeholders filled
5. **Reports** to Dainer via Telegram with the draft path + 30-line summary

Dainer reviews `_drafts/`, edits, then runs `scripts/publish.sh` which:
- Moves `_drafts/YYYY-MM-DD.html` → `newsletter/YYYY-MM-DD.html`
- Updates `newsletter/index.html` archive list
- Regenerates `newsletter/feed.xml`
- Commits + pushes to GitHub
- Optionally emails subscribers via Buttondown API

See [`scripts/CODEX_BRIEF.md`](scripts/CODEX_BRIEF.md) for the full Codex implementation brief.

---

## Status

**v0.1 · launched 2026-05-20**

- ✓ Dashboard + 4 research reports + calculator + newsletter
- ✓ Shared CSS + theme toggle + scroll reveals
- ✓ Issue #001 published
- ⏳ Codex automation (next handoff)
- ⏳ GitHub push + Pages deploy (next handoff)
- ⏳ Buttondown account setup (Dainer's task — needs his email + signup)

---

## License

MIT for code · CC-BY for written content. Take what's useful. Credit appreciated, not required.

Not financial advice. Open notebook only. Verify every number against cited sources before any allocation decision.
