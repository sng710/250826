(() => {
  'use strict';

  if (!document.body.classList.contains('person-page')) return;

  const main = document.querySelector('.person-main');
  if (main && !main.id) main.id = 'mainContent';

  const storyLayout = document.querySelector('.story-layout');
  const article = storyLayout?.querySelector('.story-section');
  const storyCopy = article?.querySelector('.story-copy');
  if (!storyLayout || !article || !storyCopy || storyCopy.dataset.structured === 'true') return;

  const normalize = (value) => String(value || '')
    .replace(/[״“”]/g, '"')
    .replace(/[׳‘’]/g, "'")
    .replace(/[()\[\]{}.,/:;!?+\-־\u2013\u2014]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const paragraphs = [...storyCopy.querySelectorAll('p')]
    .map((p) => ({ html: p.innerHTML.trim(), text: (p.textContent || '').trim() }))
    .filter((p) => p.text);
  if (!paragraphs.length) return;

  const portraitImg = document.querySelector('.person-portrait img');
  const portraitSrc = portraitImg ? new URL(portraitImg.getAttribute('src'), document.baseURI).href : '';
  const seenImageSources = new Set();
  const galleryFigures = [];
  [...storyCopy.querySelectorAll('.face-gallery figure'), ...storyLayout.querySelectorAll('.person-aside .face-gallery figure')]
    .forEach((figure) => {
      const img = figure.querySelector('img');
      if (!img) return;
      let src = '';
      try { src = new URL(img.getAttribute('src'), document.baseURI).href; }
      catch { src = img.getAttribute('src') || ''; }
      if (!src || src === portraitSrc || seenImageSources.has(src)) return;
      seenImageSources.add(src);
      galleryFigures.push(figure.cloneNode(true));
    });

  const linksCards = [...storyLayout.querySelectorAll('.person-aside .links-card')].map((card) => card.cloneNode(true));

  const videos = [...document.querySelectorAll('.memorial-video-section, .omer-video-section')];
  const seenVideos = new Set();
  videos.forEach((section) => {
    const iframe = section.querySelector('iframe');
    const key = iframe?.getAttribute('src') || section.textContent.trim();
    if (seenVideos.has(key)) {
      section.remove();
      return;
    }
    seenVideos.add(key);
    storyLayout.parentNode.insertBefore(section, storyLayout);
  });

  const mode = document.body.dataset.memorialPeriod === 'oct7' ? 'oct7' : 'previous';
  const norms = paragraphs.map((paragraph) => normalize(paragraph.text));

  const includesAny = (value, signals) => signals.some((signal) => value.includes(signal));
  const mapped = (values) => values.map(normalize);

  const oct7DateSignals = mapped([
    '7 באוקטובר 2023', '7.10.2023', '07.10.2023', 'השבעה באוקטובר 2023',
    'כ"ב בתשרי תשפ"ד', 'כ״ב בתשרי תשפ״ד'
  ]);
  const oct7ContextSignals = mapped([
    'עם תחילת המתקפה', 'עם פרוץ המתקפה', 'עם תחילת מתקפת', 'בבוקר שבת', 'בשבת בבוקר',
    'באותו בוקר', 'באותו יום', 'בשעות הבוקר', 'עם הישמע האזעקות', 'לשמע האזעקות', 'כאשר החלה המתקפה',
    'כאשר החלו האזעקות', 'חדירת מחבלים', 'מחבלים חדרו', 'מחבלים פרצו', 'פרצו המחבלים', 'הממ"ד', 'הממד',
    'כיתת הכוננות', 'נשקייה', 'יצא להילחם', 'יצאה להילחם', 'יצא להגן', 'יצאה להגן',
    'נחטף', 'נחטפה', 'נחטפו', 'נלקח בשבי', 'נלקחה בשבי'
  ]);
  const leadSignals = mapped(['ערב לפני', 'יום לפני', 'בלילה שלפני', 'לקראת לילה', 'בערב החג', 'בערב שישי']);
  const postEventSignals = mapped([
    'לאחר נפילתו', 'לאחר נפילתה', 'לאחר מותו', 'לאחר מותה', 'לאחר הירצחו', 'לאחר הירצחה',
    'הובא למנוחת עולמים', 'הובאה למנוחת עולמים', 'הובא למנוחות', 'הובאה למנוחות',
    'הותיר אחריו', 'הותירה אחריה', 'ספד', 'ספדה', 'לזכרו', 'לזכרה', 'זכרו', 'זכרה',
    'נזכר', 'נזכרת', 'ייזכר', 'תיזכר', 'זוכרים', 'זוכרות', 'נשאר בזיכרון', 'נשארה בזיכרון',
    'הוקמה', 'הוקם', 'הוענק', 'הוענקה', 'מונצח', 'מונצחת', 'מורשתו', 'מורשתה'
  ]);
  const previousEventSignals = mapped([
    'נפל ביום', 'נפלה ביום', 'נפל בקרב', 'נפלה בקרב', 'נהרג', 'נהרגה', 'נרצח', 'נרצחה',
    'בתאונה', 'בקרב', 'במלחמה', 'בפעולה', 'בעת מילוי תפקידו', 'בעת מילוי תפקידה'
  ]);

  let attackStart = -1;
  let eventAnchor = -1;

  if (mode === 'oct7') {
    eventAnchor = norms.findIndex((value) => includesAny(value, oct7DateSignals));
    if (eventAnchor >= 0) {
      const windowStart = Math.max(0, eventAnchor - 7);
      for (let i = windowStart; i <= eventAnchor; i += 1) {
        if (includesAny(norms[i], oct7ContextSignals) || includesAny(norms[i], oct7DateSignals)) {
          attackStart = i;
          break;
        }
      }
    }
    if (attackStart < 0) {
      const fallbackStart = Math.max(0, Math.floor(paragraphs.length * 0.25));
      for (let i = fallbackStart; i < paragraphs.length; i += 1) {
        if (includesAny(norms[i], oct7ContextSignals)) {
          attackStart = i;
          break;
        }
      }
    }
    if (attackStart > 0 && includesAny(norms[attackStart - 1], leadSignals)) attackStart -= 1;
    const nearAttackSignals = mapped(['מחבלים', 'ממ"ד', 'הממד', 'אזעקות', 'שעות הבוקר', 'נובה', 'חדירה']);
    while (attackStart > 0 && includesAny(norms[attackStart - 1], nearAttackSignals)) attackStart -= 1;
  } else {
    const fallbackStart = Math.max(0, Math.floor(paragraphs.length * 0.45));
    for (let i = fallbackStart; i < paragraphs.length; i += 1) {
      if (includesAny(norms[i], previousEventSignals)) {
        attackStart = i;
        eventAnchor = i;
        break;
      }
    }
  }

  let generalStart = -1;
  if (attackStart >= 0) {
    const searchFrom = Math.max(attackStart + 1, eventAnchor >= 0 ? eventAnchor + 1 : attackStart + 1);
    for (let i = searchFrom; i < paragraphs.length; i += 1) {
      if (includesAny(norms[i], postEventSignals)) {
        generalStart = i;
        break;
      }
    }
  }

  const sections = [];
  const earlySummaryIndex = Number.parseInt(document.body.dataset.storyAttackSummaryIndex || '', 10);
  const earlySummary = Number.isInteger(earlySummaryIndex) && earlySummaryIndex >= 0 && earlySummaryIndex < Math.max(attackStart, 0)
    ? paragraphs[earlySummaryIndex]
    : null;
  const personalParagraphs = attackStart > 0
    ? paragraphs.slice(0, attackStart).filter((_, index) => index !== earlySummaryIndex)
    : [];
  if (personalParagraphs.length) {
    sections.push({ key: 'personal', title: 'חיים אישיים ודרך חיים', paragraphs: personalParagraphs });
  }
  if (attackStart >= 0) {
    sections.push({
      key: 'attack',
      title: mode === 'oct7' ? 'שבת ה7.10.2023' : 'יום הנפילה והנסיבות',
      paragraphs: earlySummary ? [earlySummary, ...paragraphs.slice(attackStart, generalStart >= 0 ? generalStart : paragraphs.length)] : paragraphs.slice(attackStart, generalStart >= 0 ? generalStart : paragraphs.length)
    });
  }
  if (generalStart >= 0) {
    sections.push({ key: 'general', title: 'זיכרון, מורשת והנצחה', paragraphs: paragraphs.slice(generalStart) });
  }
  if (!sections.length) sections.push({ key: 'personal', title: 'סיפור חיים', paragraphs });

  const nonEmptySections = sections.filter((section) => section.paragraphs.length);

  const allocateImages = (count, sectionList) => {
    const allocations = new Map(sectionList.map((section) => [section.key, 0]));
    if (!count || !sectionList.length) return allocations;

    let remaining = count;
    if (count >= sectionList.length) {
      sectionList.forEach((section) => allocations.set(section.key, 1));
      remaining -= sectionList.length;
    }

    const totalWeight = sectionList.reduce((sum, section) => sum + Math.max(section.paragraphs.length, 1), 0);
    const fractions = [];
    sectionList.forEach((section) => {
      const raw = remaining * Math.max(section.paragraphs.length, 1) / totalWeight;
      const add = Math.floor(raw);
      allocations.set(section.key, (allocations.get(section.key) || 0) + add);
      fractions.push({ key: section.key, fraction: raw - add, length: section.paragraphs.length });
    });
    let used = [...allocations.values()].reduce((sum, value) => sum + value, 0);
    fractions.sort((a, b) => b.fraction - a.fraction || b.length - a.length);
    let cursor = 0;
    while (used < count && fractions.length) {
      const item = fractions[cursor % fractions.length];
      const section = sectionList.find((entry) => entry.key === item.key);
      const current = allocations.get(item.key) || 0;
      if (current < Math.max(section.paragraphs.length, 1)) {
        allocations.set(item.key, current + 1);
        used += 1;
      }
      cursor += 1;
      if (cursor > count * sectionList.length * 2) break;
    }
    return allocations;
  };

  const distribution = allocateImages(galleryFigures.length, nonEmptySections);

  const splitEvenly = (items, groups) => {
    if (!groups || groups <= 0) return [items];
    const limitedGroups = Math.min(groups, items.length || 1);
    const result = [];
    let start = 0;
    for (let i = 0; i < limitedGroups; i += 1) {
      const remainingItems = items.length - start;
      const remainingGroups = limitedGroups - i;
      const size = Math.ceil(remainingItems / remainingGroups);
      result.push(items.slice(start, start + size));
      start += size;
    }
    return result.filter((chunk) => chunk.length);
  };

  const createParagraph = (html) => {
    const p = document.createElement('p');
    p.innerHTML = html;
    return p;
  };

  const buildTextContainer = (chunk) => {
    const textWrap = document.createElement('div');
    textWrap.className = 'story-block-text';
    chunk.forEach((paragraph) => textWrap.appendChild(createParagraph(paragraph.html)));
    return textWrap;
  };

  let sideCounter = 0;
  const figureQueue = [...galleryFigures];
  const structured = document.createElement('div');
  structured.className = 'structured-story-copy';

  nonEmptySections.forEach((section, sectionIndex) => {
    const sectionEl = document.createElement('section');
    sectionEl.className = `story-structured-section story-structured-${section.key}`;
    const headingId = `storySection${sectionIndex + 1}`;
    sectionEl.setAttribute('aria-labelledby', headingId);

    const heading = document.createElement('h3');
    heading.id = headingId;
    heading.textContent = section.title;
    sectionEl.appendChild(heading);

    const mediaCount = Math.min(distribution.get(section.key) || 0, figureQueue.length, section.paragraphs.length);
    if (!mediaCount) {
      sectionEl.appendChild(buildTextContainer(section.paragraphs));
    } else {
      const chunks = splitEvenly(section.paragraphs, mediaCount);
      chunks.forEach((chunk) => {
        const block = document.createElement('div');
        block.className = `story-media-block ${sideCounter % 2 === 0 ? 'media-right' : 'media-left'}`;
        sideCounter += 1;

        const media = document.createElement('div');
        media.className = 'story-block-media';
        const gallery = document.createElement('div');
        gallery.className = 'face-gallery enhanced-inline-gallery';
        gallery.setAttribute('aria-label', 'תמונה נלווית לסיפור החיים');
        const figure = figureQueue.shift();
        if (figure) gallery.appendChild(figure);
        media.appendChild(gallery);

        block.appendChild(buildTextContainer(chunk));
        block.appendChild(media);
        sectionEl.appendChild(block);
      });
    }
    structured.appendChild(sectionEl);
  });

  if (figureQueue.length) {
    const extraSection = document.createElement('section');
    extraSection.className = 'story-structured-section story-structured-gallery';
    extraSection.setAttribute('aria-labelledby', 'storyExtraGallery');
    extraSection.innerHTML = '<h3 id="storyExtraGallery">תמונות נוספות</h3>';
    const gallery = document.createElement('div');
    gallery.className = 'story-extra-gallery';
    figureQueue.forEach((figure) => gallery.appendChild(figure));
    extraSection.appendChild(gallery);
    structured.appendChild(extraSection);
  }

  linksCards.forEach((card, idx) => {
    const sectionEl = document.createElement('section');
    sectionEl.className = 'story-structured-section story-structured-links';
    const titleEl = card.querySelector('h2, h3');
    const headingId = `storyLinks${idx + 1}`;
    sectionEl.setAttribute('aria-labelledby', headingId);
    const heading = document.createElement('h3');
    heading.id = headingId;
    heading.textContent = titleEl?.textContent?.trim() || 'קישורים';
    sectionEl.appendChild(heading);
    const content = card.querySelector('.memorial-links');
    if (content) sectionEl.appendChild(content.cloneNode(true));
    structured.appendChild(sectionEl);
  });

  storyCopy.innerHTML = '';
  storyCopy.dataset.structured = 'true';
  storyCopy.appendChild(structured);
  storyLayout.classList.add('unified-story-layout');
  article.classList.add('unified-story-section');
  storyLayout.querySelector('.person-aside')?.remove();
})();
