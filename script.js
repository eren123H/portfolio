// Progressive enhancement: content and navigation remain usable without JavaScript.
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 760px)');
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  navigation.hidden = mobile.matches && !open;
  toggle.querySelector('span').textContent = open ? '−' : '＋';
}
toggle.hidden = false;
setMenu(false);
mobile.addEventListener('change', () => setMenu(false));
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
if ('IntersectionObserver' in window) {
  const links = [...navigation.querySelectorAll('a[href^="#"]')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
  }, { rootMargin: '-15% 0px -65% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// Keep the first paint lightweight: load motion after the page, on desktop only.
const heroVideo = document.querySelector('.hero-video');
const heroPoster = document.querySelector('.hero-poster');
heroPoster.addEventListener('error', () => { heroPoster.hidden = true; });
if (heroPoster.complete && !heroPoster.naturalWidth) heroPoster.hidden = true;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const connection = navigator.connection;
let videoFailed = false;
let pageReady = false;
function syncHeroVideo() {
  const shouldPlay = pageReady && !mobile.matches && !reducedMotion.matches &&
    !connection?.saveData && !document.hidden && !videoFailed;
  if (!shouldPlay) {
    heroVideo.pause();
    heroVideo.classList.remove('is-playing');
    // Do not download video for static-only views, including preference changes.
    if ((mobile.matches || reducedMotion.matches || connection?.saveData) && heroVideo.hasAttribute('src')) {
      heroVideo.removeAttribute('src');
      heroVideo.load();
    }
    return;
  }
  if (!heroVideo.hasAttribute('src')) {
    heroVideo.muted = true;
    heroVideo.src = heroVideo.dataset.src;
  }
  heroVideo.play().catch(() => {
    // Autoplay restrictions retain the poster, with no broken UI.
    heroVideo.classList.remove('is-playing');
  });
}
heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'));
heroVideo.addEventListener('error', () => {
  videoFailed = true;
  heroVideo.classList.remove('is-playing');
  heroVideo.removeAttribute('src');
  heroVideo.load();
});
mobile.addEventListener('change', syncHeroVideo);
reducedMotion.addEventListener('change', syncHeroVideo);
connection?.addEventListener('change', syncHeroVideo);
document.addEventListener('visibilitychange', syncHeroVideo);
function startHeroVideo() {
  pageReady = true;
  syncHeroVideo();
}
window.addEventListener('load', () => {
  if ('requestIdleCallback' in window) window.requestIdleCallback(startHeroVideo, { timeout: 1500 });
  else window.setTimeout(startHeroVideo, 0);
}, { once: true });
