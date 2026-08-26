(() => {
  'use strict';

  const normalize = (src) => {
    try { return new URL(src, document.baseURI).href.split('#')[0]; }
    catch { return String(src || ''); }
  };

  const mainImg = document.querySelector('.person-portrait img');
  const mainSrc = mainImg ? normalize(mainImg.currentSrc || mainImg.src) : '';

  document.querySelectorAll('.face-gallery figure').forEach((figure) => {
    const img = figure.querySelector('img');
    if (img && mainSrc && normalize(img.currentSrc || img.src) === mainSrc) figure.remove();
  });

  document.querySelectorAll('.face-gallery-card').forEach((card) => {
    if (!card.querySelector('.face-gallery img')) card.remove();
  });
  document.querySelectorAll('.person-aside').forEach((aside) => {
    if (!aside.querySelector('section, a, img, iframe')) aside.remove();
  });

  let images = [...document.querySelectorAll('.person-portrait img, .face-gallery img')];
  if (!images.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'image-viewer';
  overlay.hidden = true;
  overlay.setAttribute('aria-hidden', 'true');
  overlay.inert = true;
  overlay.innerHTML = `
    <div class="image-viewer-backdrop" data-close="true"></div>
    <div class="image-viewer-dialog" role="dialog" aria-modal="true" aria-label="תצוגת תמונה מלאה">
      <button class="image-viewer-close" type="button" aria-label="סגירת התמונה">×</button>
      <button class="image-viewer-nav image-viewer-prev" type="button" aria-label="לתמונה הקודמת">‹</button>
      <figure class="image-viewer-figure">
        <img class="image-viewer-image" alt="">
        <figcaption class="image-viewer-caption"></figcaption>
      </figure>
      <button class="image-viewer-nav image-viewer-next" type="button" aria-label="לתמונה הבאה">›</button>
    </div>`;
  document.body.appendChild(overlay);

  const viewerImg = overlay.querySelector('.image-viewer-image');
  const caption = overlay.querySelector('.image-viewer-caption');
  const closeBtn = overlay.querySelector('.image-viewer-close');
  const prevBtn = overlay.querySelector('.image-viewer-prev');
  const nextBtn = overlay.querySelector('.image-viewer-next');
  let current = 0;
  let lastFocus = null;

  const refresh = () => {
    images = [...document.querySelectorAll('.person-portrait img, .face-gallery img')].filter((img) => img.closest('figure, .person-portrait'));
  };

  const focusables = () => [...overlay.querySelectorAll('button:not([hidden])')].filter((el) => !el.disabled);

  const show = (idx) => {
    refresh();
    if (!images.length) return;
    current = (idx + images.length) % images.length;
    const img = images[current];
    viewerImg.src = img.currentSrc || img.src;
    viewerImg.alt = img.alt || 'תמונה';
    caption.textContent = img.alt || '';
    caption.hidden = !caption.textContent;
    const multi = images.length > 1;
    prevBtn.hidden = !multi;
    nextBtn.hidden = !multi;
  };

  const open = (img) => {
    refresh();
    const idx = images.indexOf(img);
    if (idx < 0) return;
    lastFocus = document.activeElement;
    show(idx);
    overlay.hidden = false;
    overlay.inert = false;
    overlay.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('image-viewer-open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => overlay.classList.add('is-open'));
    closeBtn.focus({ preventScroll: true });
  };

  const close = () => {
    if (overlay.hidden) return;
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    overlay.inert = true;
    document.documentElement.classList.remove('image-viewer-open');
    document.body.style.overflow = '';
    window.setTimeout(() => { overlay.hidden = true; }, 160);
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus({ preventScroll: true });
  };

  const makeClickable = (img) => {
    const target = img.closest('figure') || img;
    target.classList.add('image-zoom-target');
    target.setAttribute('role', 'button');
    target.setAttribute('tabindex', '0');
    target.setAttribute('aria-label', `${img.alt || 'תמונה'} - פתיחה בגודל מלא`);
    target.addEventListener('click', () => open(img));
    target.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(img);
      }
    });
  };

  images.forEach(makeClickable);

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', (event) => {
    if (event.target?.dataset?.close === 'true') close();
  });
  prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn.addEventListener('click', () => show(current + 1));

  document.addEventListener('keydown', (event) => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') {
      close();
      return;
    }
    if (event.key === 'ArrowLeft') show(current + 1);
    if (event.key === 'ArrowRight') show(current - 1);
    if (event.key === 'Tab') {
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
})();
