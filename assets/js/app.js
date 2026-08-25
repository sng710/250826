const DATA_URL = 'assets/data/people.json?v=112';

const searchInput = document.getElementById('searchInput');
const statusText = document.getElementById('statusText');
const emptySearch = document.getElementById('emptySearch');
const desktopAllGrid = document.getElementById('desktopAllGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxPlace = document.getElementById('lightboxPlace');
const lightboxText = document.getElementById('lightboxText');
const lightboxGallery = document.getElementById('lightboxGallery');
const lightboxClose = document.getElementById('lightboxClose');
const copyPersonLink = document.getElementById('copyPersonLink');
const reducedMotionQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };

let people = [];
let activeLightboxPersonKey = '';
let lastFocusedBeforeLightbox = null;
let cardObserver = null;

function esc(s) {
  return String(s || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
}

function normalizeHebText(value) {
  return String(value || '')
    .replace(/[״“”]/g, '"')
    .replace(/[׳‘’]/g, "'")
    .replace(/ז\s*["'׳״]{0,2}\s*ל/g, '')
    .replace(/[()\[\]{}.,/\:;!?+\-־–—]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function makeSearchTokens(value) {
  return normalizeHebText(value).split(' ').filter(Boolean);
}

function reverseNameOrder(name) {
  const tokens = makeSearchTokens(name);
  return tokens.slice().reverse().join(' ');
}

function personKey(person) {
  return String(person && (person.id || person.name) || '');
}

function personImageMarkup(person) {
  const src = person && person.image ? person.image : '';
  if (!src) {
    const displayName = String(person && person.serviceRecord && person.serviceRecord.displayName || person && person.name || '')
      .replace(/ז[״\"']?ל/g, '')
      .trim();
    return `<span class="memorial-placeholder" role="img" aria-label="אין תמונה זמינה עבור ${esc(displayName)}"><span aria-hidden="true">${esc(displayName)}</span></span>`;
  }

  const portrait = person && person.portrait && typeof person.portrait === 'object'
    ? person.portrait
    : {};
  const fit = portrait.fit === 'contain' ? 'contain' : 'cover';
  const position = /^\d{1,3}%\s+\d{1,3}%$/.test(String(portrait.position || ''))
    ? portrait.position
    : '50% 38%';
  const style = [
    `--portrait-fit:${fit}`,
    `--portrait-position:${position}`,
    '-webkit-filter:grayscale(1) saturate(0) contrast(1.14) brightness(.94) !important',
    'filter:grayscale(1) saturate(0) contrast(1.14) brightness(.94) !important'
  ].join(';');

  return `<img class="memorial-portrait portrait-fit-${fit}" src="${esc(src)}" alt="${esc(person.name || '')}" loading="lazy" decoding="async" style="${style}">`;
}


function uniqueStrings(values) {
  const seen = new Set();
  return (Array.isArray(values) ? values : []).map(value => String(value || '').trim()).filter(value => {
    if (!value || seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

function galleryPhotos(person) {
  const images = uniqueStrings([person && person.image, ...(Array.isArray(person && person.photos) ? person.photos : [])]);
  return images.filter(src => !/^https?:\/\//i.test(src));
}

function imageMarkupForSource(person, src) {
  return personImageMarkup({ ...person, image: src, portrait: src === person.image ? person.portrait : { fit: 'cover', position: '50% 50%' } });
}

function renderLightboxGallery(person) {
  if (!lightboxGallery) return;
  const photos = galleryPhotos(person);
  lightboxGallery.innerHTML = '';

  if (photos.length < 2) {
    lightboxGallery.hidden = true;
    lightboxGallery.setAttribute('aria-hidden', 'true');
    return;
  }

  photos.forEach((src, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lightbox-gallery-thumb';
    button.setAttribute('aria-label', `תמונה ${index + 1} מתוך ${photos.length} — ${person.name || ''}`);
    button.dataset.imageSrc = src;
    button.innerHTML = `<img src="${esc(src)}" alt="" loading="lazy" decoding="async">`;
    button.addEventListener('click', () => {
      if (!lightboxImg) return;
      lightboxGallery.querySelectorAll('.lightbox-gallery-thumb').forEach(item => item.classList.toggle('is-active', item === button));
      lightboxImg.classList.add('is-crossfading');
      window.setTimeout(() => {
        if (!lightboxImg || activeLightboxPersonKey !== personKey(person)) return;
        lightboxImg.innerHTML = imageMarkupForSource(person, src);
        requestAnimationFrame(() => lightboxImg.classList.remove('is-crossfading'));
      }, reducedMotionQuery.matches ? 0 : 140);
    });
    if (index === 0) button.classList.add('is-active');
    lightboxGallery.appendChild(button);
  });

  lightboxGallery.hidden = false;
  lightboxGallery.setAttribute('aria-hidden', 'false');
}

function captureGridRects() {
  const positions = new Map();
  if (!desktopAllGrid || reducedMotionQuery.matches) return positions;
  desktopAllGrid.querySelectorAll('.memory-slot[data-person-key]').forEach(card => {
    positions.set(card.dataset.personKey, card.getBoundingClientRect());
  });
  return positions;
}

function ensureCardObserver() {
  if (cardObserver || !('IntersectionObserver' in window) || reducedMotionQuery.matches) return cardObserver;
  cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      cardObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
  return cardObserver;
}

function observeMemoryCards() {
  if (!desktopAllGrid) return;
  const cards = desktopAllGrid.querySelectorAll('.memory-slot');
  if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('is-visible'));
    return;
  }
  document.documentElement.classList.add('motion-ready');
  const observer = ensureCardObserver();
  cards.forEach(card => {
    if (!card.classList.contains('is-visible')) observer.observe(card);
  });
}

function animateGridFrom(previousRects) {
  if (!desktopAllGrid || !previousRects.size || reducedMotionQuery.matches || typeof Element.prototype.animate !== 'function') return;
  requestAnimationFrame(() => {
    desktopAllGrid.querySelectorAll('.memory-slot[data-person-key]').forEach(card => {
      const oldRect = previousRects.get(card.dataset.personKey);
      if (!oldRect) return;
      const newRect = card.getBoundingClientRect();
      const dx = oldRect.left - newRect.left;
      const dy = oldRect.top - newRect.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      card.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
        { duration: 420, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
      );
    });
  });
}

function matches(person, query) {
  const tokens = makeSearchTokens(query);
  if (!tokens.length) return true;

  // Search only by name or community. This prevents a person's card from
  // appearing merely because another person's name is mentioned in their story.
  const nameForward = normalizeHebText(person.name);
  const nameReverse = normalizeHebText(reverseNameOrder(person.name));
  const community = normalizeHebText(person.place || person.community);

  return tokens.every(token =>
    nameForward.includes(token) ||
    nameReverse.includes(token) ||
    community.includes(token)
  );
}

function filteredPeople() {
  const q = searchInput ? searchInput.value.trim() : '';
  const seen = new Set();
  return people.filter(person => {
    const key = personKey(person);
    if (!key || seen.has(key)) return false;
    if (!matches(person, q)) return false;
    seen.add(key);
    return true;
  });
}

function orderedHomepagePeople(items) {
  return items
    .map((person, index) => ({ person, index }))
    .sort((a, b) => Number(Boolean(a.person.isPreviousYears)) - Number(Boolean(b.person.isPreviousYears)) || a.index - b.index)
    .map(item => item.person);
}

function formatGeneralDetail(line) {
  const clean = String(line || '').trim();
  if (!clean) return '';
  const colonIndex = clean.indexOf(':');
  if (colonIndex > 0 && colonIndex < 34) {
    return `<li><strong>${esc(clean.slice(0, colonIndex + 1))}</strong> ${esc(clean.slice(colonIndex + 1).trim())}</li>`;
  }
  return `<li>${esc(clean)}</li>`;
}

function isSafeGeneralDetail(line) {
  const clean = String(line || '').replace(/\s+/g, ' ').trim();
  if (!clean) return false;

  // Do not display uncertain placeholders, birthplace/upbringing, education,
  // military service, occupations, roles, careers or descriptive summaries.
  if (/[\/\\]/.test(clean)) return false;
  if (/(נולד|נולדה|נולדו|גדל|גדלה|גדלו|התחנך|התחנכה|התחנכו|למד|למדה|למדו|עבד|עבדה|עבדו|עסק|עסקה|עסקו|שירת|שירתה|שירתו|תפקיד|מקצוע|עיסוק|קריירה|בוגר|בוגרת|מדריך|מדריכה|מנהל|מנהלת|מייסד|מייסדת|יזם|יזמית|עלה לישראל|עלתה לישראל)/.test(clean)) return false;
  if (/^(משפחה:|הותיר|הותירה|חלקה:|גוש:|שורה:|אזור:|לאחר נפיל|מראשוני|ממקימי|שהה|שהתה|חבר כיתת|חברת כיתת)/.test(clean)) return false;
  if (/מונצח|מונצחת/.test(clean)) return false;

  const isPlace = /^(מקום אירוע:|מקום מנוחה:)/.test(clean);
  const isDeath = /^(נפל|נפלה|נרצח|נרצחה|נהרג|נהרגה|נפטר|נפטרה|נחטף|נחטפה|נפגע|נפגעה|תאריך פטירה:)/.test(clean);
  const isAge = /^(בן|בת)\s+.+?(בנופלו|בנופלה|במותו|במותה|בהירצחו|בהירצחה|בעת מותו|בעת מותה)$/.test(clean);
  const isFamily = /^(בנם של|בתם של|בנה של|בתה של|בעלה של|אשתו של|רעייתו של|רעייתה של|בן זוגה של|בת זוגו של|בן זוגה|בת זוגו|אלמנתו של|אלמנתה של|נשוי ל|נשואה ל|אב ל|אם ל|אביהם של|אימם של|אמן של|אביו של|אימו של|אמה של|אח ל|אחות ל|אחיהם של|אחותם של|אח בכור ל|אחות בכורה ל|סב ל|סבתא ל|נכד ל|נכדה ל)/.test(clean);
  const isParentLine = /^בן\s+(?!זוג|קיבוץ|מושב|היישוב|העיר|המשק|הזקונים|בכור|יחיד|\d)/.test(clean)
    || /^בת\s+(?!זוג|קיבוץ|מושב|היישוב|העיר|המשק|הזקונים|בכורה|יחידה|\d)/.test(clean);

  return isPlace || isDeath || isAge || isFamily || isParentLine;
}

function safeHttpUrl(value) {
  const url = String(value || '').trim();
  return /^https?:\/\//i.test(url) ? url : '';
}

function buildServiceRecordMarkup(person) {
  const record = person && person.serviceRecord;
  if (!record || typeof record !== 'object') return '';

  const rank = String(record.rank || '').trim();
  const unit = String(record.unit || '').trim();
  const displayName = String(record.displayName || '').trim();
  const parents = String(record.parents || '').trim();
  const fallenLabel = String(record.fallenLabel || '').trim();
  const hebrewDate = String(record.hebrewDate || '').trim();
  const date = String(record.date || '').trim();
  const age = String(record.age || '').trim();
  const sourceUrl = safeHttpUrl(person && person.sourceUrl);

  if (![rank, unit, displayName, parents, fallenLabel, hebrewDate, date, age].some(Boolean)) return '';

  const displayNameMarkup = displayName
    ? (sourceUrl
        ? `<a class="lightbox-service-name-link" href="${esc(sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(displayName)}</a>`
        : esc(displayName))
    : '';

  return `
    <section class="lightbox-service-record" aria-label="פרטי שירות והנצחה">
      <div class="lightbox-service-heading">
        ${rank ? `<strong class="lightbox-service-rank">${esc(rank)}</strong>` : ''}
        ${unit ? `<span class="lightbox-service-unit">${esc(unit)}</span>` : ''}
      </div>
      ${displayName ? `<h3 class="lightbox-service-name">${displayNameMarkup}</h3>` : ''}
      ${parents ? `<p class="lightbox-service-parents">${esc(parents)}</p>` : ''}
      <div class="lightbox-service-date">
        ${fallenLabel ? `<span>${esc(fallenLabel)}</span>` : ''}
        ${hebrewDate ? `<strong>${esc(hebrewDate)}</strong>` : ''}
        ${date ? `<span dir="ltr">${esc(date)}</span>` : ''}
      </div>
      ${age ? `<p class="lightbox-service-age">${esc(age)}</p>` : ''}
    </section>
  `;
}

function buildFullStoryMarkup(person) {
  const paragraphs = Array.isArray(person.fullStory)
    ? person.fullStory.map(value => String(value || '').trim()).filter(Boolean)
    : [];
  const links = Array.isArray(person.featuredLinks)
    ? person.featuredLinks.filter(item => item && safeHttpUrl(item.url))
    : [];
  const media = Array.isArray(person.featuredMedia)
    ? person.featuredMedia.filter(item => item && item.src)
    : [];

  if (!paragraphs.length && !links.length && !media.length) return '';

  const storyMarkup = paragraphs.length ? `
    <div class="lightbox-story-copy">
      ${paragraphs.map(paragraph => `<p>${esc(paragraph).replace(/\n/g, '<br>')}</p>`).join('')}
    </div>
  ` : '';

  const linksMarkup = links.length ? `
    <div class="lightbox-memorial-links" aria-label="קישורים להנצחה">
      ${links.map(item => `
        <a class="lightbox-memorial-link" href="${esc(safeHttpUrl(item.url))}" target="_blank" rel="noopener noreferrer">
          <span>${esc(item.title || 'קישור להנצחה')}</span>
          <span aria-hidden="true">↗</span>
        </a>
      `).join('')}
    </div>
  ` : '';

  const mediaMarkup = media.length ? `
    <div class="lightbox-memorial-media" aria-label="ברקודים וקישורים להנצחה">
      ${media.map(item => {
        const imageMarkup = `
          <img src="${esc(item.src)}" alt="${esc(item.alt || '')}" loading="lazy" decoding="async">
          <span>${esc(item.caption || '')}</span>
        `;
        const url = safeHttpUrl(item.url);
        return url
          ? `<a class="lightbox-memorial-media-item" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${imageMarkup}</a>`
          : `<figure class="lightbox-memorial-media-item">${imageMarkup}</figure>`;
      }).join('')}
    </div>
  ` : '';

  const storyTitle = String(person.storyTitle || 'סיפור חייו של זיו פפה שפירא').trim();

  return `
    <section class="lightbox-section lightbox-full-biography">
      <h3 class="lightbox-section-title">${esc(storyTitle)}</h3>
      ${storyMarkup}
      ${linksMarkup}
      ${mediaMarkup}
    </section>
  `;
}

function buildFactsMarkup(person) {
  const details = Array.isArray(person.generalDetails)
    ? person.generalDetails.filter(isSafeGeneralDetail).map(formatGeneralDetail).filter(Boolean)
    : [];

  const factsMarkup = details.length ? `
    <section class="lightbox-section lightbox-personal-details">
      <h3 class="lightbox-section-title">פרטים אישיים</h3>
      <ul class="lightbox-facts">${details.join('')}</ul>
    </section>
  ` : '';

  return `${buildServiceRecordMarkup(person)}${factsMarkup}${buildFullStoryMarkup(person)}`;
}

function renderGrid() {
  if (!desktopAllGrid) return;
  const previousRects = captureGridRects();
  const items = orderedHomepagePeople(filteredPeople());
  desktopAllGrid.innerHTML = '';

  let previousYearsHeadingAdded = false;

  items.forEach(person => {
    if (person.isPreviousYears && !previousYearsHeadingAdded) {
      const divider = document.createElement('div');
      divider.className = 'memory-period-divider';
      divider.id = 'previousYearsDivider';
      divider.setAttribute('role', 'separator');
      divider.innerHTML = '<span>נופלות ונופלים משנים קודמות</span>';
      desktopAllGrid.appendChild(divider);
      previousYearsHeadingAdded = true;
    }

    const btn = document.createElement('button');
    const key = personKey(person);
    btn.type = 'button';
    btn.className = 'memory-slot';
    btn.dataset.personKey = key;
    if (previousRects.has(key)) btn.classList.add('is-visible');
    btn.innerHTML = `
      <span class="photo-holder">${personImageMarkup(person)}</span>
      <span class="slot-name">${esc(person.name || '')}</span>
    `;
    btn.addEventListener('click', () => openLightbox(person, true));
    desktopAllGrid.appendChild(btn);
  });

  if (statusText) {
    statusText.textContent = `${items.length} נופלות ונופלים`;
  }
  if (emptySearch) {
    emptySearch.classList.toggle('show', items.length === 0);
  }

  observeMemoryCards();
  animateGridFrom(previousRects);
}

function setPersonHash(person) {
  const key = encodeURIComponent(personKey(person));
  if (!key) return;
  const target = `${window.location.pathname}${window.location.search}#${key}`;
  window.history.replaceState(null, '', target);
}

function clearPersonHash() {
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}

function personFromHash() {
  const raw = window.location.hash ? window.location.hash.slice(1) : '';
  if (!raw) return null;
  let decoded = raw;
  try { decoded = decodeURIComponent(raw); } catch (err) {}
  decoded = decoded.trim();
  return people.find(person => personKey(person) === decoded) || null;
}

function openLightbox(person, updateHash = true) {
  if (!person || !lightbox) return;
  lastFocusedBeforeLightbox = document.activeElement;
  activeLightboxPersonKey = personKey(person);
  if (updateHash) setPersonHash(person);

  lightboxTitle.textContent = person.name || '';
  lightboxPlace.textContent = '';
  lightboxImg.innerHTML = personImageMarkup(person);
  lightboxText.innerHTML = buildFactsMarkup(person);
  renderLightboxGallery(person);
  const card = lightbox.querySelector('.lightbox-card');
  if (card) {
    card.classList.remove('content-reveal');
    requestAnimationFrame(() => card.classList.add('content-reveal'));
  }
  if (copyPersonLink) {
    copyPersonLink.style.display = 'none';
  }

  // Remove inert before revealing/focusing the dialog.
  lightbox.inert = false;
  lightbox.removeAttribute('inert');
  lightbox.setAttribute('aria-hidden', 'false');
  lightbox.classList.add('is-open');
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => {
    if (lightboxClose && lightbox.classList.contains('is-open')) {
      lightboxClose.focus({preventScroll:true});
    }
  }, 0);
}

function closeLightbox(event, clearHash = true) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!lightbox || !lightbox.classList.contains('is-open')) return;
  activeLightboxPersonKey = '';

  // Focus must leave the dialog before aria-hidden/inert are applied.
  // This prevents Chrome's “Blocked aria-hidden” accessibility warning.
  const restoreTarget = lastFocusedBeforeLightbox && document.contains(lastFocusedBeforeLightbox)
    ? lastFocusedBeforeLightbox
    : searchInput;
  if (restoreTarget && typeof restoreTarget.focus === 'function') {
    restoreTarget.focus({preventScroll:true});
  } else if (document.activeElement && lightbox.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  lightbox.classList.remove('is-open');
  lightbox.inert = true;
  lightbox.setAttribute('inert', '');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImg.innerHTML = '';
  lightboxText.innerHTML = '';
  lightboxTitle.textContent = '';
  lightboxPlace.textContent = '';
  if (lightboxGallery) {
    lightboxGallery.innerHTML = '';
    lightboxGallery.hidden = true;
    lightboxGallery.setAttribute('aria-hidden', 'true');
  }
  const card = lightbox.querySelector('.lightbox-card');
  if (card) card.classList.remove('content-reveal');
  if (clearHash) clearPersonHash();
}

function openPersonFromUrl() {
  const person = personFromHash();
  if (person) {
    openLightbox(person, false);
  } else if (lightbox && lightbox.classList.contains('is-open')) {
    closeLightbox(null, false);
  }
}

async function loadPeopleData() {
  // The embedded copy keeps the memorial usable when index.html is opened
  // directly from a local folder. Online hosting may still use the JSON file.
  if (Array.isArray(window.MEMORIAL_PEOPLE) && window.MEMORIAL_PEOPLE.length) {
    return window.MEMORIAL_PEOPLE;
  }

  const response = await fetch(DATA_URL, { cache: 'no-cache' });
  if (!response.ok) throw new Error('people.json failed to load');
  return response.json();
}

async function initApp() {
  try {
    people = await loadPeopleData();
  } catch (err) {
    console.error(err);
    if (statusText) statusText.textContent = 'שגיאה בטעינת נתוני הזיכרון';
    if (emptySearch) {
      emptySearch.textContent = 'לא ניתן לטעון את נתוני הזיכרון.';
      emptySearch.classList.add('show');
    }
    return;
  }

  renderGrid();

  if (searchInput) {
    searchInput.addEventListener('input', renderGrid);
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox, true);
  }
  if (lightbox) {
    lightbox.addEventListener('pointerdown', event => {
      const target = event.target;
      if (target && target.closest && target.closest('.lightbox-close')) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);
    lightbox.addEventListener('click', event => {
      const target = event.target;
      if (target === lightbox || (target && target.closest && target.closest('[data-close="1"], #lightboxClose, .lightbox-close'))) {
        closeLightbox(event);
      }
    }, true);
  }

  document.addEventListener('keydown', event => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') closeLightbox(event);
  });

  if (reducedMotionQuery && typeof reducedMotionQuery.addEventListener === 'function') {
    reducedMotionQuery.addEventListener('change', event => {
      document.documentElement.classList.toggle('motion-ready', !event.matches && 'IntersectionObserver' in window);
      if (event.matches && cardObserver) {
        cardObserver.disconnect();
        cardObserver = null;
        document.querySelectorAll('.memory-slot').forEach(card => card.classList.add('is-visible'));
      }
      if (!event.matches) observeMemoryCards();
    });
  }

  window.addEventListener('hashchange', openPersonFromUrl);
  window.setTimeout(openPersonFromUrl, 120);
}

initApp();
