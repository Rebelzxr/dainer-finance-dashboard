# DAINER Finance Dashboard

A public finance notebook for markets, swing picks, dividend income, trader tracking, and compounding math. Free, static, and open source.

- **Live site:** https://rebelzxr.github.io/dainer-finance-dashboard/
- **Source:** https://github.com/Rebelzxr/dainer-finance-dashboard
- **Deploy:** GitHub Pages from `main` / repository root
- **Newsletter:** weekly, free, signup form embedded on the site via Formspree

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
│   ├── i18n-keys.js
│   ├── i18n-verify.js
│   └── tax-tools.test.js
└── README.md
```

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
