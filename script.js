(() => {
  'use strict';

  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menuBtn');
  const gnav = document.getElementById('gnav');
  const toTop = document.getElementById('toTop');

  /* ---------- Mobile menu ---------- */
  const closeMenu = () => {
    menuBtn.classList.remove('is-open');
    gnav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'メニューを開く');
  };

  menuBtn.addEventListener('click', () => {
    const open = menuBtn.classList.toggle('is-open');
    gnav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  });
  gnav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });

  /* ---------- Scroll: header shadow / back to top ---------- */
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 10);
    toTop.classList.toggle('is-show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Fade-in on scroll ---------- */
  const targets = document.querySelectorAll('.fade');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    targets.forEach(el => io.observe(el));
  } else {
    targets.forEach(el => el.classList.add('is-visible'));
  }
})();
