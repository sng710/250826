(() => {
  'use strict';

  if (!document.body.classList.contains('person-page')) return;

  const main = document.querySelector('.person-main');
  if (main && !main.id) main.id = 'mainContent';

  if (!document.querySelector('.skip-link-person')) {
    const skip = document.createElement('a');
    skip.className = 'skip-link skip-link-person';
    skip.href = '#mainContent';
    skip.textContent = 'דילוג לתוכן הראשי';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  const intro = document.querySelector('.person-intro');
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

  const galleryFigures = [
    ...storyCopy.querySelectorAll('.face-gallery figure'),
    ...storyLayout.querySelectorAll('.person-aside .face-gallery figure')
  ].map((figure) => figure.cloneNode(true));

  const linksCards = [...storyLayout.querySelectorAll('.person-aside .links-card')].map((card) => card.cloneNode(true));

  const videos = [...document.querySelectorAll('.memorial-video-section, .omer-video-section')];
  if (main && intro && videos.length) {
    const anchor = storyLayout;
    videos.forEach((section) => main.insertBefore(section, anchor));
  }

  const attackSignals = [
    '7 באוקטובר', '7.10.2023', '07.10.2023', 'כ"ב בתשרי', 'כ״ב בתשרי', 'השבת השחורה',
    'בבוקר שבת', 'באותו בוקר', 'בשעות הבוקר', 'כאשר החלה המתקפה', 'כאשר החלה המלחמה',
    'עם קבלת הדיווחים', 'חדירת מחבלים', 'פרצו המחבלים', 'יצא לכיוון הנשקייה', 'יצא להילחם',
    'נפל בקרב', 'נרצח', 'נהרג', 'נפצע', 'נורתה', 'נורה', 'המחבלים', 'הממ"ד', 'הממד'
  ].map(normalize);

  const attackLeadSignals = ['ערב לפני', 'יום לפני', 'לקראת לילה', 'בליל', 'בערב החג', 'בערב שישי'].map(normalize);

  const generalSignals = [
    'הותיר אחריו', 'הותירה אחריה', 'הובא למנוחות', 'הובאה למנוחות', 'הובא למנוחת עולמים',
    'הועלה לדרגת', 'ספד', 'ספדה', 'כתבה', 'כתב', 'נזכר', 'נזכרת', 'ייזכר', 'תיזכר',
    'לזכרו', 'לזכרה', 'הוקמה', 'הוקם', 'הונחה אבן הפינה', 'הוענק', 'נקרא על שמו', 'נקראה על שמה',
    'בני משפחתו הקימו', 'בני משפחתה הקימו', 'מורשתו', 'מורשתה', 'מלגות', 'פרס', 'מיזם', 'אירוע', 'סרטון'
  ].map(normalize);

  const isAttack = (text) => {
    const n = normalize(text);
    return attackSignals.some((signal) => n.includes(signal));
  };

  const isGeneral = (text) => {
    const n = normalize(text);
    return generalSignals.some((signal) => n.includes(signal));
  };

  let attackStart = paragraphs.findIndex((paragraph) => isAttack(paragraph.text));
  if (attackStart > 0) {
    const prev = normalize(paragraphs[attackStart - 1].text);
    if (attackLeadSignals.some((signal) => prev.includes(signal))) attackStart -= 1;
  }

  let generalStart = -1;
  if (attackStart >= 0) {
    for (let i = attackStart + 1; i < paragraphs.length; i += 1) {
      if (isGeneral(paragraphs[i].text)) {
        generalStart = i;
        break;
      }
    }
  } else {
    generalStart = paragraphs.findIndex((paragraph) => isGeneral(paragraph.text));
  }

  const sections = [];
  const hasOct7 = paragraphs.some((paragraph) => {
    const n = normalize(paragraph.text);
    return n.includes(normalize('7 באוקטובר')) || n.includes(normalize('7.10.2023')) || n.includes(normalize('כ"ב בתשרי')) || n.includes(normalize('כ״ב בתשרי'));
  });

  if (attackStart > 0) {
    sections.push({ key: 'personal', title: 'חיים אישיים ודרך חיים', paragraphs: paragraphs.slice(0, attackStart) });
  } else if (attackStart === -1 && generalStart > 0) {
    sections.push({ key: 'personal', title: 'חיים אישיים ודרך חיים', paragraphs: paragraphs.slice(0, generalStart) });
  }

  if (attackStart >= 0) {
    const attackEnd = generalStart >= 0 ? generalStart : paragraphs.length;
    sections.push({ key: 'attack', title: hasOct7 ? '7 באוקטובר 2023' : 'יום הנפילה והנסיבות', paragraphs: paragraphs.slice(attackStart, attackEnd) });
  }

  if (generalStart >= 0) {
    sections.push({ key: 'general', title: 'זיכרון, מורשת והנצחה', paragraphs: paragraphs.slice(generalStart) });
  }

  if (!sections.length) sections.push({ key: 'personal', title: 'סיפור חיים', paragraphs });

  const nonEmptySections = sections.filter((section) => section.paragraphs.length);
  const distribution = new Map();
  const totalImages = galleryFigures.length;
  if (nonEmptySections.length && totalImages) {
    const base = Math.floor(totalImages / nonEmptySections.length);
    let extra = totalImages % nonEmptySections.length;
    nonEmptySections.forEach((section) => {
      const ideal = base + (extra > 0 ? 1 : 0);
      if (extra > 0) extra -= 1;
      distribution.set(section.key, Math.min(Math.max(ideal, 0), Math.max(section.paragraphs.length, 1)));
    });
  }

  let assignedTotal = [...distribution.values()].reduce((sum, value) => sum + value, 0);
  let remainingImages = totalImages - assignedTotal;
  if (remainingImages > 0 && nonEmptySections.length) {
    for (const section of [...nonEmptySections].sort((a, b) => b.paragraphs.length - a.paragraphs.length)) {
      if (remainingImages <= 0) break;
      const current = distribution.get(section.key) || 0;
      const cap = Math.max(section.paragraphs.length, 1);
      if (current < cap) {
        distribution.set(section.key, current + 1);
        remainingImages -= 1;
      }
    }
  }

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

    const mediaCount = Math.min(distribution.get(section.key) || 0, figureQueue.length);
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
