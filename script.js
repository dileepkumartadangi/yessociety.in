/* ---------- Mobile menu ---------- */
const navToggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  menu.classList.toggle('active', open);
  navToggle.setAttribute('aria-expanded', String(open));
  navToggle.querySelector('i').className = open ? 'fas fa-xmark' : 'fas fa-bars';
}
navToggle.addEventListener('click', () => setMenu(!menu.classList.contains('active')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

/* ---------- Highlight current section in nav ---------- */
const links = [...menu.querySelectorAll('a:not(.nav-cta)')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));

/* ---------- Count-up numbers (start when visible) ---------- */
function countUp(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function tick(now) {
    const p = reduce ? 1 : Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString('en-IN') + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const countObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) { countUp(e.target); obs.unobserve(e.target); }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.count').forEach(c => countObserver.observe(c));

/* ---------- Gallery ---------- */
const photos = [];
for (let i = 1; i <= 15; i++) photos.push(`Picture${i}.png`);
['one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve',
 'thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen','twenty',
 'twenty1','twentytwo','two3','two4','two5','two6','two7','two8','two9','three0']
  .forEach(n => photos.push(n + '.jpeg'));

const grid = document.getElementById('galleryGrid');
photos.forEach((file, i) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', `Open photo ${i + 1}`);
  const img = document.createElement('img');
  img.src = 'yessocietypictures/' + file;
  img.alt = `YESS community activity, photo ${i + 1}`;
  img.loading = 'lazy';
  img.addEventListener('error', () => btn.remove()); // hide missing files
  btn.appendChild(img);
  btn.addEventListener('click', () => openLightbox(i));
  grid.appendChild(btn);
});

/* ---------- Lightbox ---------- */
const lb = document.getElementById('lightbox');
const lbImg = lb.querySelector('img');
let current = 0;

function show(i) {
  current = (i + photos.length) % photos.length;
  lbImg.src = 'yessocietypictures/' + photos[current];
}
function openLightbox(i) { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; }
function closeLightbox() { lb.hidden = true; document.body.style.overflow = ''; }

lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
lb.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
lb.querySelector('.lb-next').addEventListener('click', () => show(current + 1));
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (lb.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') show(current - 1);
  if (e.key === 'ArrowRight') show(current + 1);
});

/* ---------- Contact form ----------
   The form posts to FormSubmit, so we let it submit normally and only
   show a "Sending..." state on the button. */
const form = document.getElementById('contactForm');
form.addEventListener('submit', () => {
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
});
