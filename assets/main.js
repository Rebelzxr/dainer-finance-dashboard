/* DAINER FINANCE — Mars Rover Log shared JS
   Theme toggle · scroll reveals · counters · SOL counter · runtime · cursor coord
*/

// Theme toggle
function toggleTheme(){
  const cur = document.documentElement.getAttribute('data-theme');
  const next = cur === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try{ localStorage.setItem('dainer-finance-theme', next); }catch(_){}
}
(function loadTheme(){
  try{
    const saved = localStorage.getItem('dainer-finance-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
  }catch(_){}
})();

const I18N = {
  zh: {
    Dashboard:'总览',
    'US Picks':'美国精选',
    Malaysia:'马来西亚',
    Dividends:'股息',
    Traders:'投资人',
    Calculator:'计算器',
    Newsletter:'周报',
    'Conservative · 6%':'保守 · 6%',
    'Balanced · 8%':'平衡 · 8%',
    'Aggressive · 12%':'进取 · 12%',
    Currency:'货币',
    'Starting amount':'起始金额',
    'Monthly contribution':'每月投入',
    'Annual return':'年回报',
    'Time horizon':'投资年期',
    'Final portfolio value':'最终组合价值',
    'You contributed':'本金投入',
    'Compound gain':'复利收益',
    '% of value from compounding':'复利贡献占比',
    'Cash contributed':'投入本金',
    'Portfolio value':'组合价值',
    'taxSectionLabel':'02 · 股息税 + 实时汇率',
    'taxSectionTitle':'国家税务<em>损耗</em>',
    'taxSectionSub':'给马来西亚投资者比较美国、马来西亚、新加坡、香港、英国、澳洲、加拿大和中国股息收入。默认税率有来源支持，也可以按券商实际预扣税手动覆盖。',
    'sourceMarket':'来源市场',
    'officialDefault':'官方默认',
    'portfolioValue':'组合金额',
    'grossDividendYield':'股息率 %',
    'projectionYears':'预测年数',
    'overrideRate':'覆盖预扣税 %',
    'optional':'可选',
    'outputCurrency':'输出货币',
    'fxRate':'汇率',
    'taxDisclaimer':'不使用付费 API。汇率会尝试免费无密钥接口；如果被拦截，汇率栏可以手动填。税率是默认参考，不是个人税务建议。以券商结单为准。',
    'netIncome':'税后收入',
    'sourceWithholding':'来源地预扣税',
    'malaysiaTax':'马来西亚股息税',
    'netYield':'税后收益率',
    'annualDrag':'年度税务损耗',
    'noTaxReinvested':'无税再投资',
    'afterTaxReinvested':'税后再投资',
    'compoundDrag':'复利损耗',
    'market':'市场',
    'withholdingRate':'预扣税率'
  }
};

function currentLanguage(){
  try{
    return localStorage.getItem('dainer-finance-lang') || 'en';
  }catch(_){
    return 'en';
  }
}

function setLanguage(lang){
  const next = lang === 'zh' ? 'zh' : 'en';
  document.documentElement.lang = next === 'zh' ? 'zh-Hans' : 'en';
  try{ localStorage.setItem('dainer-finance-lang', next); }catch(_){}
  applyLanguage(next);
  document.dispatchEvent(new CustomEvent('dainer:languagechange', { detail:{ lang:next } }));
}

function toggleLanguage(){
  setLanguage(currentLanguage() === 'zh' ? 'en' : 'zh');
}

function translateHtmlElement(el, lang){
  if (!el.dataset.i18nEn) el.dataset.i18nEn = el.innerHTML;
  const key = el.getAttribute('data-i18n');
  if (lang === 'zh' && I18N.zh[key]) el.innerHTML = I18N.zh[key];
  else el.innerHTML = el.dataset.i18nEn;
}

function translateExactText(el, lang){
  if (!el || el.childNodes.length !== 1 || el.childNodes[0].nodeType !== Node.TEXT_NODE) return;
  if (!el.dataset.i18nOriginalText) el.dataset.i18nOriginalText = el.textContent.trim();
  const original = el.dataset.i18nOriginalText;
  el.textContent = lang === 'zh' && I18N.zh[original] ? I18N.zh[original] : original;
}

function applyLanguage(lang){
  document.querySelectorAll('[data-i18n]').forEach(el => translateHtmlElement(el, lang));
  document.querySelectorAll('.mission a, .preset-buttons button, .calc-result-label, .calc-stat-label, .chart-legend span, .calc-input label').forEach(el => translateExactText(el, lang));
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = lang === 'zh' ? 'EN' : '中文';
}

function setupLanguageToggle(){
  if (document.getElementById('lang-toggle')) return;
  const navRight = document.querySelector('.mission > .mission-cells:last-child');
  if (!navRight) return;
  const btn = document.createElement('button');
  btn.id = 'lang-toggle';
  btn.className = 'theme-btn lang-btn';
  btn.type = 'button';
  btn.onclick = toggleLanguage;
  navRight.appendChild(btn);
  setLanguage(currentLanguage());
}

// Number count-up
function animateCount(el){
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const dur = 1200;
  const start = performance.now();
  const tick = t => {
    const p = Math.min(1, (t - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const v = target * eased;
    el.textContent = v.toFixed(decimals) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Scroll reveal observer
function setupReveal(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        e.target.classList.add('visible');
        e.target.querySelectorAll('.count').forEach(c => {
          if (!c.dataset.counted){
            c.dataset.counted = '1';
            animateCount(c);
          }
        });
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
}

// Mission strip — SOL counter (ticks every minute, gives "mission day passing" feel)
let sol = 1247;
function tickSol(){
  sol++;
  document.querySelectorAll('[data-sol]').forEach(el => el.textContent = sol);
}
setInterval(tickSol, 60000);

// Runtime — counts up from page load with base offset
const startTime = Date.now() - (2*3600 + 47*60 + 11)*1000;
function tickRuntime(){
  const ms = Date.now() - startTime;
  const h = Math.floor(ms/3600000);
  const m = Math.floor((ms%3600000)/60000);
  const s = Math.floor((ms%60000)/1000);
  const str = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  document.querySelectorAll('[data-runtime]').forEach(el => el.textContent = str);
}
setInterval(tickRuntime, 1000);

// Cursor coordinate marker — auto-injects if not present (dark mode only via CSS)
function setupCursorMark(){
  if (document.getElementById('cursor-mark')) return;
  const mark = document.createElement('div');
  mark.id = 'cursor-mark';
  mark.className = 'cursor-mark';
  const coord = document.createElement('div');
  coord.id = 'cursor-coord';
  coord.className = 'cursor-coord';
  coord.textContent = '47.123°N · 03.218°W';
  document.body.appendChild(mark);
  document.body.appendChild(coord);
  document.addEventListener('mousemove', (e) => {
    mark.style.left = e.clientX + 'px';
    mark.style.top = e.clientY + 'px';
    coord.style.left = e.clientX + 'px';
    coord.style.top = e.clientY + 'px';
    const lat = (47.123 + (e.clientY / window.innerHeight - 0.5) * 0.02).toFixed(3);
    const lng = (3.218 + (e.clientX / window.innerWidth - 0.5) * 0.04).toFixed(3);
    coord.textContent = `${lat}°N · ${lng}°W`;
  });
}

// Detect relative path to assets/ — '' from root, '../' from picks/ + newsletter/
function assetPath(name){
  const p = window.location.pathname;
  const inSubdir = /\/(picks|newsletter|mockup)\//.test(p);
  return (inSubdir ? '../' : '') + 'assets/' + name;
}

function ensureFavicon(){
  if (document.querySelector('link[rel~="icon"]')) return;
  const icon = document.createElement('link');
  icon.rel = 'icon';
  icon.type = 'image/svg+xml';
  icon.href = assetPath('favicon.svg');
  document.head.appendChild(icon);
}

// Inject Mars-horizon backdrop layers + sandstorm video if missing (so every page has them)
function injectBackdrop(){
  if (document.querySelector('.horizon')) return;
  // 6 ambient layers (gradient sky, ridges, haze, grain, grid)
  const layers = ['horizon','ridge far','ridge','haze','grain','bg-grid'];
  layers.forEach(cls => {
    const el = document.createElement('div');
    el.className = cls;
    document.body.insertBefore(el, document.body.firstChild);
  });
  // Static Mars photo sits behind the video and remains visible for reduced motion.
  if (!document.querySelector('.mars-hero-bg')){
    const bg = document.createElement('div');
    bg.className = 'mars-hero-bg';
    bg.setAttribute('aria-hidden','true');
    document.body.insertBefore(bg, document.body.firstChild);
  }
  // Mars sandstorm VIDEO on every page (auto-injected) with photo as poster fallback
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && !document.querySelector('.mars-hero-video')){
    const v = document.createElement('video');
    v.className = 'mars-hero-video';
    v.src = assetPath('mars-sandstorm.webm');
    v.poster = assetPath('mars-horizon.jpg');
    v.autoplay = true;
    v.loop = true;
    v.muted = true;
    v.setAttribute('autoplay','');
    v.setAttribute('loop','');
    v.setAttribute('muted','');
    v.setAttribute('playsinline','');
    v.setAttribute('aria-hidden','true');
    document.body.insertBefore(v, document.body.firstChild);
    v.play().catch(e => console.warn('Mars sandstorm autoplay blocked:', e));
  }
}

// Mark active nav link based on current path
function setupActiveNav(){
  const path = window.location.pathname;
  document.querySelectorAll('.mission-cells a, .nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (!href || href === '#') return;
    if (path.endsWith(href.replace(/^\.+\//, '/')) || path.endsWith(href)) {
      a.classList.add('active');
    }
  });
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  ensureFavicon();
  injectBackdrop();
  setupLanguageToggle();
  setupCursorMark();
  setupReveal();
  setupActiveNav();
  tickRuntime();
  // Immediate counters for above-fold cards
  setTimeout(() => {
    document.querySelectorAll('.above-fold').forEach(el => {
      el.classList.add('visible');
      el.querySelectorAll('.count').forEach(c => {
        if (!c.dataset.counted){ c.dataset.counted='1'; animateCount(c); }
      });
    });
  }, 300);
});
