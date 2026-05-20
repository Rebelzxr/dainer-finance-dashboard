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
  injectBackdrop();
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
