# Codex Brief — DAINER Finance Automation

> **Task:** Build the weekly automation pipeline for `dainer-finance-dashboard` and initialize the git repo + GitHub Pages deploy.
>
> **Owner:** Codex (5.5). Claude prepared this brief and the entire static site.
> **Triggering:** Run after Dainer pastes the `codex exec` command at the bottom.
> **Expected duration:** 30-45 min for full pipeline + git init + first deploy.

---

## Project root

`/Users/dainer/Desktop/DAINER OS/dainer-finance/`

This is the **new** finance dashboard. It replaces the old `trading/reports/` swing-fund pages. The old `trading/research/swing_phase*` markdown reports are still the source-of-truth research; the new HTML site is the publishing layer.

---

## What's already built (don't recreate)

- `index.html` — dashboard
- `picks/{swing-3-5yr,swing-msia,dividends,leopold-13f}.html` — 4 reports, all complete with data
- `calculator.html` — compound interest calculator (client-side only, no $ logged)
- `newsletter/index.html` — archive
- `newsletter/2026-05-20.html` — Issue #001 (the launch)
- `newsletter/feed.xml` — RSS feed (1 item, needs auto-prepending each issue)
- `assets/style.css` + `assets/main.js` — shared stylesheet + JS
- `data/news.json` + `data/picks.json` + `data/portfolio.json` — initial data
- `README.md` — site + deploy docs

All HTML loads fonts + shared CSS + main.js correctly. Site works locally — open `index.html` in browser to verify.

---

## What you need to build

Build **6 things**. Each is a discrete deliverable. Build in order.

### Build 1 — `scripts/refresh-prices.py`

**Purpose:** Pull latest close prices for the 30+ tickers in `data/picks.json` from Stooq.com (free, no API key) and write a flat `data/prices.json` for the dashboard to consume.

**Pseudo:**
```python
import json, csv, urllib.request
from datetime import datetime, timezone

# Load all unique tickers from data/picks.json
with open('data/picks.json') as f: picks = json.load(f)

tickers = set()
# US tickers from swing-3-5yr
for p in picks['reports']['swing-3-5yr']['picks']:
    tickers.add(p['tkr'])
# Leopold longs + puts (US)
tickers.update(picks['reports']['leopold-13f']['top_longs'])
tickers.update(picks['reports']['leopold-13f']['top_puts'])
# MY: skip (Stooq has MY tickers via .my suffix but unreliable; mark stale)
# Dividends US picks
for s in picks['reports']['dividends']['sleeves'].values():
    if isinstance(s, dict) and 'names' in s:
        tickers.update(s['names'])

prices = {}
for tkr in tickers:
    url = f'https://stooq.com/q/l/?s={tkr.lower()}.us&f=sd2t2ohlcv&h&e=csv'
    try:
        r = urllib.request.urlopen(url, timeout=10)
        rows = list(csv.DictReader(r.read().decode().splitlines()))
        if rows and rows[0].get('Close'):
            prices[tkr] = {
                'close': float(rows[0]['Close']),
                'date': rows[0]['Date'],
                'volume': int(rows[0].get('Volume', 0) or 0),
            }
    except Exception as e:
        prices[tkr] = {'error': str(e)}

with open('data/prices.json', 'w') as f:
    json.dump({
        'updated': datetime.now(timezone.utc).isoformat(),
        'prices': prices,
    }, f, indent=2)

print(f'Refreshed {len([v for v in prices.values() if "close" in v])}/{len(tickers)} tickers')
```

**Acceptance:** `data/prices.json` exists, contains close + date for >= 25 of 30 tickers. STATUS tag in run output.

### Build 2 — `scripts/refresh-news.py`

**Purpose:** Scan curated finance domains for stories matching theme keywords; write top 6 to `data/news.json`. Note: a simple v1 implementation uses RSS feeds from major financial outlets; v2 can use SerpAPI or similar.

**Pseudo (v1 — RSS-based):**
```python
import json, feedparser, re
from datetime import datetime, timezone, timedelta

FEEDS = [
    'https://www.reuters.com/business/finance/rss',
    'https://feeds.bloomberg.com/markets/news.rss',
    'https://www.ft.com/companies/banks?format=rss',
    'https://www.sec.gov/cgi-bin/browse-edgar?action=getcurrent&type=13F&output=atom',
    # add as needed
]

KEYWORDS = {
    'leopold-13f': ['Aschenbrenner', 'Situational Awareness', '13F'],
    'anthropic-ipo': ['Anthropic', 'Anthropic IPO', 'S-1 Anthropic'],
    'tsm': ['TSMC', 'Taiwan Semi'],
    'lly': ['Eli Lilly', 'orforglipron', 'tirzepatide', 'GLP-1'],
    'ceg': ['Constellation Energy', 'nuclear PPA', 'Three Mile Island'],
    'tenaga': ['Tenaga', 'Johor data center', 'TNB'],
    # add per relevant theme
}

cutoff = datetime.now(timezone.utc) - timedelta(days=14)
items = []
for feed_url in FEEDS:
    try:
        feed = feedparser.parse(feed_url)
        for entry in feed.entries[:20]:
            pub = entry.get('published_parsed')
            if not pub: continue
            pub_dt = datetime(*pub[:6], tzinfo=timezone.utc)
            if pub_dt < cutoff: continue
            title = entry.get('title', '')
            summary = entry.get('summary', '')[:200]
            # Score by keyword matches
            score = 0
            relevance = None
            for rel, keywords in KEYWORDS.items():
                for kw in keywords:
                    if re.search(rf'\b{re.escape(kw)}\b', title + ' ' + summary, re.I):
                        score += 5 if kw in title else 2
                        relevance = rel
                        break
            if score > 0:
                items.append({
                    'date': pub_dt.strftime('%Y-%m-%d'),
                    'source': feed.feed.get('title', 'Unknown'),
                    'title': title,
                    'preview': summary,
                    'url': entry.get('link', ''),
                    'category': relevance or 'general',
                    'relevance': relevance,
                    'score': score,
                })
    except Exception as e:
        print(f'Feed failed: {feed_url}: {e}')

# Sort by score desc, take top 6
items.sort(key=lambda x: x['score'], reverse=True)
top = items[:6]

with open('data/news.json', 'w') as f:
    json.dump({
        'updated': datetime.now(timezone.utc).strftime('%Y-%m-%d'),
        'next_refresh': (datetime.now(timezone.utc) + timedelta(days=7)).strftime('%Y-%m-%d'),
        'items': top,
    }, f, indent=2)

print(f'Wrote {len(top)} news items.')
```

**Acceptance:** `data/news.json` has 5-6 items, all from last 14 days, dashboard loads them correctly.

### Build 3 — `scripts/draft-issue.py`

**Purpose:** Generate a weekly newsletter draft at `_drafts/YYYY-MM-DD.html` using `newsletter/2026-05-20.html` as the template skeleton. Auto-fill: date in header, latest news headlines from `data/news.json`, current allocation from `data/picks.json`.

**Pseudo:**
```python
import json, shutil, re
from datetime import datetime, timezone, timedelta
from pathlib import Path

today = datetime.now(timezone.utc)
sunday = today + timedelta(days=(6 - today.weekday()) % 7)  # next Sunday
date_str = sunday.strftime('%Y-%m-%d')

# Compute issue number — count existing newsletter files matching YYYY-MM-DD.html
newsletter_dir = Path('newsletter')
existing = sorted([f for f in newsletter_dir.glob('*.html') if re.match(r'\d{4}-\d{2}-\d{2}\.html', f.name)])
issue_num = len(existing) + 1

# Load news + picks
news = json.load(open('data/news.json'))
picks = json.load(open('data/picks.json'))

# Generate news section HTML
news_html = '\n'.join([
    f'<li><strong>{n["title"]}</strong> ({n["source"]}, {n["date"]}) — <a href="{n["url"]}">read</a></li>'
    for n in news['items'][:5]
])

# Read template (use latest issue as base)
template_path = existing[-1] if existing else Path('newsletter/2026-05-20.html')
template = template_path.read_text()

# Replace placeholders
draft = template
draft = re.sub(r'Issue #\d+', f'Issue #{issue_num:03d}', draft)
draft = re.sub(r'\d{4}-\d{2}-\d{2}', date_str, draft)
draft = re.sub(r'<title>.*?</title>', f'<title>Issue #{issue_num:03d} · {date_str} · DAINER Finance</title>', draft)

# Append a "WIP" banner at top of article for Dainer to spot
draft = draft.replace(
    '<article class="section"',
    '<!-- DRAFT — review and replace this banner before publishing -->'
    '<div style="background:var(--bear);color:var(--bg);padding:12px 32px;text-align:center;font-family:var(--mono);font-size:11px;letter-spacing:.16em;text-transform:uppercase;">DRAFT — DO NOT PUBLISH</div>'
    '<article class="section"',
    1
)

# Write to drafts
drafts_dir = Path('_drafts')
drafts_dir.mkdir(exist_ok=True)
draft_path = drafts_dir / f'{date_str}.html'
draft_path.write_text(draft)

print(f'Draft written to {draft_path}')
print(f'Issue #{issue_num:03d} · {date_str}')
print(f'5 news items pre-filled. Edit content + remove DRAFT banner before publishing.')
```

**Acceptance:** `_drafts/YYYY-MM-DD.html` exists with DRAFT banner; opens in browser; news items prefilled.

### Build 4 — `scripts/publish-issue.sh`

**Purpose:** Move a draft from `_drafts/` to `newsletter/`, update archive list, regenerate RSS, commit + push.

```bash
#!/usr/bin/env bash
set -euo pipefail

DRAFT=${1:-}
if [ -z "$DRAFT" ]; then
  echo "usage: ./publish-issue.sh _drafts/YYYY-MM-DD.html"
  exit 1
fi

if [ ! -f "$DRAFT" ]; then
  echo "Draft not found: $DRAFT"
  exit 1
fi

BASE=$(basename "$DRAFT")
DATE=${BASE%.html}

# Sanity check: DRAFT banner removed?
if grep -q "DRAFT — DO NOT PUBLISH" "$DRAFT"; then
  echo "ERROR: DRAFT banner still in file. Remove before publishing."
  exit 2
fi

# Move
cp "$DRAFT" "newsletter/${BASE}"
echo "Moved to newsletter/${BASE}"

# Update archive index — prepend new row to issue-list
python3 scripts/update-archive.py "$DATE"

# Regenerate RSS
python3 scripts/regen-rss.py

# Commit + push
git add newsletter/ data/
git commit -m "Publish issue ${DATE}"
git push

echo "Published. Live at https://rebelzxr.github.io/dainer-finance-dashboard/newsletter/${BASE}"
```

Plus `scripts/update-archive.py` and `scripts/regen-rss.py` — small helpers that:
- `update-archive.py`: parse `newsletter/<date>.html` to extract title; prepend an `<a class="issue-row">` to `<div class="issue-list">` in `newsletter/index.html`
- `regen-rss.py`: scan all `newsletter/*.html` files, build `feed.xml` with all issues

**Acceptance:** Running `./publish-issue.sh _drafts/2026-05-27.html` results in the issue being live + git pushed + archive updated.

### Build 5a — `scripts/refresh-13f.py`

**Purpose:** Pull latest 13F filings for the 24 fund CIKs in `data/famous-traders.json` + Pelosi's CapitolTrades disclosures. Update each trader's `top_positions`, `latest_filing_period`, `latest_filing_date`, `notable_recent_change`. Preserve manual-curated `tagline` and `thesis_summary` fields.

**Pseudo:**
```python
import json, urllib.request, xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

data = json.load(open('data/famous-traders.json'))
EDGAR_SEARCH = 'https://efts.sec.gov/LATEST/search-index?q=&forms=13F-HR&dateRange=custom&startdt={start}&enddt={end}&ciks={cik}'

for trader in data['traders']:
    cik = trader.get('cik', '').replace('0', '', 0)  # SEC accepts leading zeros stripped
    if not cik or trader.get('category') in ('political', 'private'):
        continue
    try:
        # Find latest 13F-HR filing
        url = f'https://data.sec.gov/submissions/CIK{cik.zfill(10)}.json'
        req = urllib.request.Request(url, headers={'User-Agent': 'DAINER Finance dainer@apexclinicgrowth.com'})
        sub = json.load(urllib.request.urlopen(req))
        recent = sub['filings']['recent']
        for i, form in enumerate(recent['form']):
            if form == '13F-HR':
                accession = recent['accessionNumber'][i].replace('-', '')
                period = recent['reportDate'][i]
                filing_url = f'https://www.sec.gov/Archives/edgar/data/{cik}/{accession}/'
                # Fetch info table XML (varies by filing, typically informationtable.xml)
                # ... parse <infoTable> rows, extract <nameOfIssuer> + <value> + <shrsOrPrnAmt>
                # Group by ticker (need cusip→ticker mapping — use openfigi.com free API OR cusip-to-ticker.json local file)
                # Sort top 5 by value, compute % of portfolio
                # Compare vs prior quarter for change tags
                trader['latest_filing_period'] = period
                trader['latest_filing_date'] = recent['filingDate'][i]
                trader['url_filing'] = filing_url
                # trader['top_positions'] = [...]  # populated from parsed data
                break
    except Exception as e:
        trader['status'] = f'UNVERIFIED — {e}'

# Pelosi via CapitolTrades
pelosi = next(t for t in data['traders'] if t['id'] == 'pelosi')
try:
    url = 'https://www.capitoltrades.com/politicians/N000147'  # Pelosi's slug
    # ... parse latest 10 transactions
    pelosi['top_positions'] = [...]  # ticker + amount_range + date
except Exception as e:
    pelosi['status'] = f'UNVERIFIED — {e}'

data['updated'] = datetime.now(timezone.utc).strftime('%Y-%m-%d')
json.dump(data, open('data/famous-traders.json', 'w'), indent=2)
print(f"Updated {len(data['traders'])} traders.")
```

**Notes for implementation:**
- SEC requires User-Agent header with contact email
- CUSIP-to-ticker is the tricky bit — use openfigi.com free API or a local lookup table. Caching helps.
- Some filers (e.g. Ackman concentrated) only hold 10-15 names; "top 5" can be most of the book.
- For Cathie Wood / ARK: pull from ark-funds.com/wp-content/uploads/funds-etf-csv/ARK_INNOVATION_ETF_ARKK_HOLDINGS.csv (daily refresh).
- For Pelosi: capitoltrades.com has an undocumented JSON API; or scrape the HTML rows.

**Acceptance:** `data/famous-traders.json` updated for 22-24 of 26 traders; Pelosi has fresh PTR rows; ARKK uses today's holdings. STATUS tag updated.

### Build 5 — `scripts/weekly.sh`

The Saturday cron orchestrator. Runs:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

echo "[$(date)] DAINER Finance weekly refresh starting..."

# 1. Refresh prices
python3 scripts/refresh-prices.py 2>&1 | tee logs/prices-$(date +%Y-%m-%d).log

# 2. Refresh news
python3 scripts/refresh-news.py 2>&1 | tee logs/news-$(date +%Y-%m-%d).log

# 3. Draft next issue
python3 scripts/draft-issue.py 2>&1 | tee logs/draft-$(date +%Y-%m-%d).log

# 4. Notify Dainer via Telegram (using existing bot)
DRAFT_FILE=$(ls -t _drafts/*.html | head -1)
TELEGRAM_TOKEN=$(grep TELEGRAM_BOT_TOKEN /Users/dainer/Desktop/DAINER\ OS/.env.master | cut -d= -f2)
CHAT_ID=1073413319
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage" \
  -d "chat_id=${CHAT_ID}" \
  -d "text=📰 DAINER Finance weekly draft ready: ${DRAFT_FILE}. Review then run: scripts/publish-issue.sh ${DRAFT_FILE}"

echo "[$(date)] Done. Draft at: ${DRAFT_FILE}"
```

**Acceptance:** `bash scripts/weekly.sh` runs end-to-end without error; Telegram message arrives; draft file exists.

### Build 6 — Git init + GitHub Pages deploy

After all scripts work:

```bash
cd /Users/dainer/Desktop/DAINER\ OS/dainer-finance

# Init
git init
git add .
git commit -m "feat: DAINER Finance dashboard v0.1 — 4 reports + calculator + newsletter + automation"

# Create remote (use gh CLI; Dainer's gh is authenticated for his alphaquant.ai@gmail.com account)
gh repo create dainer-finance-dashboard --public \
  --description "A builder's weekly read on markets, picks, and capital." \
  --homepage "https://rebelzxr.github.io/dainer-finance-dashboard/"

git remote add origin "https://github.com/Rebelzxr/dainer-finance-dashboard.git"
git branch -M main
git push -u origin main

# Enable Pages
gh api -X POST "/repos/Rebelzxr/dainer-finance-dashboard/pages" \
  -f source.branch=main \
  -f source.path=/

# Verify
echo "Site will be live in 2-5 min at:"
echo "https://rebelzxr.github.io/dainer-finance-dashboard/"
```

**Acceptance:**
- Repo created and visible on GitHub
- All files pushed
- Pages enabled
- Site loads at the expected URL (allow 2-5 min for first build)
- All internal links work (test 5 random page transitions)

---

## Schedule the Saturday refresh

After Build 5 works manually, schedule via launchd (preferred over cron on macOS):

```bash
# Save to ~/Library/LaunchAgents/com.dainer.finance.weekly.plist
# Triggers every Saturday at 14:00 local time
```

Use the plist template Codex already uses for APEX scheduled tasks — patterns are at `~/Desktop/DAINER OS/APEX Agency/scripts/launchd/` if you need a reference.

---

## Things to NOT do

1. **Don't rebuild any HTML page.** Claude already built all the pages. You're only writing automation scripts + git init.
2. **Don't add $ amounts to any public page.** Calculator is the only place numbers go in (user input, client-side only).
3. **Don't auto-publish issues.** Always go to `_drafts/`, require manual review + `publish-issue.sh` invocation.
4. **Don't push secrets.** No `.env`, no API keys, no Telegram tokens. Use `.gitignore`.
5. **Don't change the aesthetic.** Fraunces serif + Instrument Sans + JetBrains Mono + warm gold + charcoal are locked.

---

## STATUS tag requirement

Every script + every commit must end with one of:
- `STATUS: VERIFIED (evidence: <raw command output>)`
- `STATUS: UNVERIFIED (cannot test because <reason>)`
- `STATUS: BROKEN (failure: <gap>. Next step: <command>)`

Per Global Rule #1.

---

## Files allowlist (Codex only touches these)

```
dainer-finance/scripts/refresh-prices.py
dainer-finance/scripts/refresh-news.py
dainer-finance/scripts/refresh-13f.py          # NEW — Build 5a
dainer-finance/scripts/draft-issue.py
dainer-finance/scripts/publish-issue.sh
dainer-finance/scripts/update-archive.py
dainer-finance/scripts/regen-rss.py
dainer-finance/scripts/weekly.sh
dainer-finance/.gitignore
dainer-finance/logs/                          # new dir for run logs
~/Library/LaunchAgents/com.dainer.finance.weekly.plist   # cron
```

**Do not modify:**
- Any `.html` file (Claude's content)
- `assets/style.css` or `assets/main.js` (locked)
- Existing markdown research files at `trading/research/*`

---

## Paste-ready Codex command

```bash
codex exec --skip-git-repo-check 'Read brief at "/Users/dainer/Desktop/DAINER OS/dainer-finance/scripts/CODEX_BRIEF.md" and execute all 6 builds in order. STATUS tag required after each build. After Build 6 (git init + Pages deploy), send Dainer a Telegram message at chat_id 1073413319 with the live URL. Cost cap: $5 total. Allowlist files listed in the brief.'
```

Expected output: one running session, 30-45 min, 6 commits or 1 big commit, final Telegram message with the live URL.

---

*Brief authored 2026-05-20 by Claude · for Codex 5.5 execution.*
