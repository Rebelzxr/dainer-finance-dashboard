# DAINER Finance Dashboard

A public portfolio automation showcase for markets, swing picks, dividend income, trader tracking, and compounding math. Free, static, and open source.

- **Live site:** https://rebelzxr.github.io/dainer-finance-dashboard/
- **Source:** https://github.com/Rebelzxr/dainer-finance-dashboard
- **Deploy:** GitHub Pages from `main` / repository root
- **Newsletter:** weekly, free, signup form embedded on the site via Formspree
- **Operator cadence:** local weekly LaunchAgent, Monday 08:30 Malaysia time

> Not financial advice. This is an open research notebook. Verify live numbers and source filings before making any allocation decision.

---

## Pages

| Page | What it is |
| --- | --- |
| [`index.html`](index.html) | Dashboard overview, latest issue, navigation cards, and news log |
| [`picks/swing-3-5yr.html`](picks/swing-3-5yr.html) | US 3-5 year swing report |
| [`picks/swing-msia.html`](picks/swing-msia.html) | Malaysia 3-5 year swing report |
| [`picks/dividends.html`](picks/dividends.html) | Dividend income report with country-aware tax notes |
| [`picks/famous-traders.html`](picks/famous-traders.html) | Famous traders and 13F tracker |
| [`picks/leopold-13f.html`](picks/leopold-13f.html) | Leopold Aschenbrenner 13F tracker |
| [`calculator.html`](calculator.html) | Client-side compound and dividend tax calculator |
| [`newsletter/index.html`](newsletter/index.html) | Newsletter archive and signup |
| [`newsletter/2026-05-20.html`](newsletter/2026-05-20.html) | Issue #001 |
| [`newsletter/feed.xml`](newsletter/feed.xml) | RSS feed |

Internal/unlisted artifacts:

| Page | What it is |
| --- | --- |
| [`daily-brief.html`](daily-brief.html) | Internal daily market brief artifact; no public nav link; `noindex` |
| [`telegram-news.html`](telegram-news.html) | Internal Telegram digest artifact; no public nav link; `noindex` |
| [`telegram-news.txt`](telegram-news.txt) | Plain text digest used by Telegram sender |

---

## Stack

- Static HTML pages, shared CSS, and vanilla JavaScript.
- JSON data files under `data/`.
- GitHub Pages hosting.
- Formspree for the current public signup form.
- Chinese language switch powered by `assets/main.js`.
- Verification scripts under `scripts/`.

---

## Repository Structure

```text
dainer-finance-dashboard/
├── index.html
├── calculator.html
├── daily-brief.html          # internal/unlisted
├── telegram-news.html        # internal/unlisted
├── telegram-news.txt         # internal sender artifact
├── picks/
│   ├── swing-3-5yr.html
│   ├── swing-msia.html
│   ├── dividends.html
│   ├── famous-traders.html
│   └── leopold-13f.html
├── newsletter/
│   ├── index.html
│   ├── 2026-05-20.html
│   └── feed.xml
├── data/
│   ├── famous-traders.json
│   ├── daily-brief.json
│   ├── news.json
│   ├── picks.json
│   ├── portfolio.json
│   └── tax-rates.json
├── assets/
│   ├── favicon.svg
│   ├── main.js
│   ├── style.css
│   ├── tax-tools.js
│   ├── nav.html
│   ├── mars-horizon.jpg
│   └── mars-sandstorm.webm
├── scripts/
│   ├── WEEKLY_OPERATOR_PROMPT.md
│   ├── i18n-keys.js
│   ├── i18n-verify.js
│   ├── weekly-operator.sh
│   └── tax-tools.test.js
├── launchd/
│   └── com.dainer.finance.weekly.plist
└── README.md
```

---

## Weekly Operator

The public website is showcase-first. Daily news and Telegram pages stay internal/unlisted because stale daily pages weaken the public proof-of-work.

The weekly operator is defined by:

```text
scripts/WEEKLY_OPERATOR_PROMPT.md
scripts/weekly-operator.sh
launchd/com.dainer.finance.weekly.plist
```

Installed LaunchAgent target:

```text
~/Library/LaunchAgents/com.dainer.finance.weekly.plist
```

Schedule:

```text
Monday 08:30 MYT
```

Operator contract:

- Research weekly market/portfolio changes.
- Update public reports only when there is a material thesis, valuation, filing, or investment-direction change.
- Keep `daily-brief.html` and `telegram-news.html` unlisted/internal.
- Verify JSON, i18n, and tax calculator tests.
- Commit and push to `origin main` only when changes are verified.
- Send Dainer a Telegram status with commit hash, source gaps, changed files, and one-line portfolio direction.

---

## Local Preview

```bash
cd "/Users/dainer/Desktop/DAINER OS/dainer-finance"
python3 -m http.server 8765
```

Open:

```text
http://127.0.0.1:8765/
```

---

## Verification

Run these before publishing structural changes:

```bash
node scripts/tax-tools.test.js
node scripts/i18n-keys.js
BASE=http://127.0.0.1:8765 node scripts/i18n-verify.js
```

Expected checks:

- Tax calculator logic passes.
- Every `data-i18n` key maps to a Chinese translation.
- Each production page reaches at least 30% adjusted CJK ratio in Chinese mode.
- GitHub Pages returns `200` at `https://rebelzxr.github.io/dainer-finance-dashboard/`.

---

## Publishing

GitHub Pages is already configured for this repo.

```bash
git status
git add .
git commit -m "docs: update repo metadata"
git push origin main
```

After pushing, GitHub Pages usually refreshes within a few minutes.

---

## License

MIT for code. CC-BY for written content.
