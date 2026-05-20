/* DAINER FINANCE — shared JS
   Theme toggle · scroll reveals · counters · nav active link
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
        e.target.querySelectorAll('.bar-fill').forEach(b => b.classList.add('animate'));
        const donut = e.target.querySelector('.donut');
        if (donut) donut.classList.add('animate');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => io.observe(el));
}

// Mark active nav link based on current path
function setupActiveNav(){
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (href !== '/' && path.endsWith(href.replace(/^\.\//, '/')))) {
      a.classList.add('active');
    }
  });
}

// Common init — pages can override or extend
document.addEventListener('DOMContentLoaded', () => {
  setupReveal();
  setupActiveNav();
  setTimeout(() => {
    document.querySelectorAll('.pf-card, .above-fold').forEach(el => {
      el.classList.add('visible');
      el.querySelectorAll('.count').forEach(c => {
        if (!c.dataset.counted){ c.dataset.counted='1'; animateCount(c); }
      });
    });
  }, 400);
});
