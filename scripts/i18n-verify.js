const fs = require('fs');
const { chromium } = require('playwright');

const BASE = process.env.BASE || 'http://127.0.0.1:8765';
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const pages = [
  ['/index.html', 30],
  ['/daily-brief.html', 30],
  ['/picks/swing-3-5yr.html', 30],
  ['/picks/swing-msia.html', 30],
  ['/picks/dividends.html', 30],
  ['/picks/famous-traders.html', 30],
  ['/picks/leopold-13f.html', 30],
  ['/calculator.html', 30],
  ['/newsletter/index.html', 30],
  ['/newsletter/2026-05-20.html', 30]
];

const documentedEnglishIslands = {
  '/daily-brief.html': [
    '#brief-summary-lead',
    '#brief-alert-detail',
    '#brief-session',
    '#brief-updated',
    '#brief-source-count',
    '#brief-telegram-policy',
    '#brief-status',
    '#brief-headline',
    '#pulse-grid',
    '#brief-summary-list',
    '#warning-rules',
    '#alerts-grid',
    '#event-table',
    '#thesis-grid',
    '#valuation-table',
    '#source-grid',
    '#contract-status'
  ],
  '/picks/famous-traders.html': [
    '.trader-top',
    '.trader-name',
    '.trader-fund',
    '.trader-rank',
    '.trader-meta'
  ],
  '/newsletter/2026-05-20.html': [
    '.prose'
  ]
};

function cjkStats(text) {
  const normalized = text.replace(/\s+/g, ' ').trim();
  const cjk = (normalized.match(/[一-鿿]/g) || []).length;
  const total = normalized.length;
  const pct = total ? cjk / total * 100 : 0;
  return { cjk, total, pct: Number(pct.toFixed(1)) };
}

(async () => {
  const launch = { headless: true, args: ['--disable-gpu', '--no-sandbox'] };
  if (fs.existsSync(chromePath)) launch.executablePath = chromePath;
  const browser = await chromium.launch(launch);
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  let failed = false;
  console.log('page,rawPct,adjustedPct,cjk,total,threshold,status');
  for (const [route, threshold] of pages) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.setItem('dainer-finance-lang', 'zh'));
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(2800);
    const stats = await page.evaluate((skipSelectors) => {
      const rawText = document.body.innerText;
      const measure = (text) => {
        const normalized = text.replace(/\s+/g, ' ').trim();
        const cjk = (normalized.match(/[一-鿿]/g) || []).length;
        const total = normalized.length;
        const pct = total ? cjk / total * 100 : 0;
        return { cjk, total, pct: Number(pct.toFixed(1)) };
      };
      if (!skipSelectors.length) return { raw: measure(rawText), adjusted: measure(rawText) };

      const style = document.createElement('style');
      style.setAttribute('data-i18n-verify-style', 'true');
      style.textContent = skipSelectors.map((selector) => `${selector}{display:none!important;}`).join('\n');
      document.head.appendChild(style);
      // Force style recalculation before reading innerText.
      void document.body.offsetHeight;
      const adjustedText = document.body.innerText;
      style.remove();
      return { raw: measure(rawText), adjusted: measure(adjustedText) };
    }, documentedEnglishIslands[route] || []);
    const ok = stats.adjusted.pct >= threshold;
    if (!ok) failed = true;
    console.log([route, stats.raw.pct + '%', stats.adjusted.pct + '%', stats.adjusted.cjk, stats.adjusted.total, threshold + '%', ok ? 'PASS' : 'FAIL'].join(','));
  }
  await browser.close();
  if (failed) process.exit(1);
})().catch(err => {
  console.error(err);
  process.exit(1);
});
