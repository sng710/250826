const ROTATION_INTERVAL_MS = 6500;
const POPUP_CLOSE_GUARD_MS = 650;
const GALLERY_SLIDE_MS = 3600;
const CARD_FADE_MS = 520;

let people = [];

async function loadPeopleData() {
  const response = await fetch('assets/data/previous-years.json?v=84', { cache: 'no-cache' });
  if (!response.ok) throw new Error('previous-years.json failed to load');
  return await response.json();
}

const searchInput = document.getElementById('searchInput');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxPlace = document.getElementById('lightboxPlace');
const lightboxText = document.getElementById('lightboxText');
const lightboxGallery = document.getElementById('lightboxGallery');
const lightboxClose = document.getElementById('lightboxClose');
const copyPersonLink = document.getElementById('copyPersonLink');

function esc(s) { return String(s || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])); }
function imgMarkup(person) {
  const src = person.image || (person.photos && person.photos[0]) || '';
  return src ? `<img class="js-auto-transparent-bg" src="${esc(src)}" alt="${esc(person.name)}" loading="lazy">` : '';
}


const AUTO_TRANSPARENT_BG_CACHE = new Map();
let autoTransparentBgObserver = null;
let autoTransparentBgApplyScheduled = false;

// v67 — disabled runtime background processing for faster loading.
// Portraits now use a unified light-blue holder background instead.
function makeImageBackgroundTransparent(img) { return; }
function applyAutoTransparentBackgrounds(root = document) { return; }
function scheduleAutoTransparentBackgrounds(root = document) { return; }
function startAutoTransparentBackgrounds() { return; }
function normalizeHebText(s) {
  return String(s || '')
    .replace(/[״“”]/g, '"')
    .replace(/[׳‘’]/g, "'")
    .replace(/ז\s*["'׳״]{0,2}\s*ל/g, '')
    .replace(/[^\u0590-\u05FFa-zA-Z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
function nameTokens(person) {
  return normalizeHebText(person.name).split(' ').filter(w => w && w.length > 1);
}
function lineLooksLikeName(line, person) {
  const nline = normalizeHebText(line);
  const toks = nameTokens(person);
  if (!nline || !toks.length) return false;
  const found = toks.filter(t => nline.includes(t)).length;
  return found >= Math.min(2, toks.length) && nline.split(' ').length <= toks.length + 4;
}
function stripLeadingName(text, person) {
  let t = String(text || '').replace(/\r/g, '').trim();
  if (!t) return '';
  let lines = t.split('\n').map(l => l.trim()).filter(Boolean);
  while (lines.length && lineLooksLikeName(lines[0], person)) lines.shift();
  t = lines.join('\n').trim();
  if (!t) return '';
  const firstBreak = t.search(/[\n.]/);
  const firstPart = firstBreak >= 0 ? t.slice(0, firstBreak + 1) : t;
  const comma = firstPart.indexOf(',');
  if (comma > 0 && comma < 55 && lineLooksLikeName(firstPart.slice(0, comma), person)) {
    t = t.slice(comma + 1).trim();
    t = t.charAt(0).toUpperCase ? t : t;
  }
  return t;
}
function matches(person, q) {
  const needle = normalizeHebText(q);
  if (!needle) return true;
  const haystack = normalizeHebText(`${person.name || ''} ${person.place || ''} ${person.role || ''} ${person.summary || ''}`);
  return haystack.includes(needle);
}
function filteredPeople() {
  const q = searchInput ? searchInput.value.trim() : '';
  const seen = new Set();
  return people.filter(person => {
    if (!matches(person, q)) return false;
    const key = person.id || person.name;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function cleanFactLine(line) {
  let clean = String(line || '')
    .replace(/[\u200e\u200f\u202a-\u202e]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Remove interface/copy artifacts from memorial source sites.
  const siteNoise = /^(להדלקת נר לזכרו|כתיבת הקדשה|הדלקת נר לזכרו|סיפור חייו|סיפור חייה|תווית נר זיכרון להדפסה|הדפסת עמוד הנצחה|להדפסה|שתפו|שיתוף|חזרה|קישור לעמוד)$/;
  if (siteNoise.test(clean)) return '';

  clean = clean
    .replace(/^קורות חיים(?:\s+ונפילה)?\s*$/,'')
    .replace(/^סיפור חיים\s*$/,'')
    .replace(/^על אודות האתר\s*$/,'')
    .replace(/^פרטים אישיים והנצחה\s*$/,'פרטים אישיים')
    .replace(/^מקום קבורה\s*[:：]/,'מקום מנוחה:')
    .replace(/^הובא למנוחת עולמים\s+/,'מקום מנוחה: ')
    .replace(/^הובאה למנוחת עולמים\s+/,'מקום מנוחה: ')
    .replace(/^רס["״]?ן\b/,'רס״ן')
    .replace(/^רב[-־ ]סמל\b/,'רב־סמל')
    .trim();

  return isRedundantMemorialLine(clean) ? '' : clean;
}

function isRedundantMemorialLine(line) {
  const clean = String(line || '').replace(/\s+/g, ' ').trim();
  if (!clean) return true;
  return /^חלל(?:ת)? פעול(?:ת|ות) איבה$/.test(clean)
    || /^מקום\s+(?:ה)?אירוע\s*[:：]/.test(clean)
    || /^ב[-\s]*0?7[\/.]10[\/.]2023$/.test(clean)
    || /^בכ?["'׳״]?ב\s+בתשרי\s+תשפ["'׳״]?ד\b.*0?7[\/.]10[\/.]2023.*$/.test(clean);
}
function cleanRedundantMemorialText(text) {
  return String(text || '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !isRedundantMemorialLine(line))
    .join('\n')
    .trim();
}
function formatFactLine(line) {
  const clean = cleanFactLine(line);
  const idx = clean.indexOf(':');
  if (idx > 0 && idx < 32) {
    return `<li><strong>${esc(clean.slice(0, idx + 1))}</strong> ${esc(clean.slice(idx + 1).trim())}</li>`;
  }
  return `<li>${esc(clean)}</li>`;
}
function splitDescription(person) {
  const raw = stripLeadingName(person.text || person.summary || '', person);
  if (!raw.trim()) return {facts: [], life: [], event: [], memory: [], allParagraphs: []};

  const normalizeHeadingLine = value => String(value || '')
    .replace(/[\u200e\u200f\u202a-\u202e]/g, '')
    .replace(/[״“”]/g, '"')
    .replace(/[׳‘’]/g, "'")
    .replace(/[:：.]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const personalHeading = /^(פרטים אישיים|פרטים אישיים והנצחה)$/;
  const lifeHeading = /^(סיפור חיים|סיפור חייו|סיפור חייה|קורות חיים|קורות חיים ונפילה|דרך, עשייה ואהבות|דרך עשייה ואהבות|שירות צבאי וחיים אחרי השחרור|שירות צבאי|חיים אחרי השחרור|ילדות ונעורים|לימודים ושירות צבאי|עשייה ואהבות|תחומי עניין, משפחה וחברים|תחומי עניין משפחה וחברים|שליחות, צדק ועשייה חברתית|שליחות צדק ועשייה חברתית)$/;
  const eventHeading = /^(נפילתו|נפילתה|חטיפתו ונפילתו|חטיפתה ונפילתה|שבעה באוקטובר והימים שאחריו|שבעה באוקטובר|7 באוקטובר|ה־7 באוקטובר|ה-7 באוקטובר)$/;
  const memoryHeading = /^(דמותו וזכרו|דמותה וזכרה|דמות וזיכרון|דברי זיכרון|זיכרון ומילים מהלב|זכרון ומילים מהלב|על מצבתו נכתב|על מצבתה נכתב|מילים שנחקקו|הנצחה|זיכרון|זכרון)$/;

  const isAnyHeading = line => {
    const heading = normalizeHeadingLine(line);
    return personalHeading.test(heading) || lifeHeading.test(heading) || eventHeading.test(heading) || memoryHeading.test(heading);
  };

  const isFactLine = line => /^(בן|בת)\s+\d|^בן\s+|^בת\s+|^אח\s+|^אחות\s+|^אב\s+|^אביו\s+|^אמה\s+|^אמו\s+|^אם\s+|^בעלה\s+|^אשתו\s+|^בן זוג|^בת זוג|^נולד|^נולדה|^תאריך|^נרצח|^נרצחה|^נפל|^נפלה|^נהרג|^נהרגה|^נחטף|^נחטפה|^הושב|^הושבה|^מקום מגורים|^התגורר|^התגוררה|^גדל|^גדלה|^שהה|^שהתה|^מקום מנוחה|^מקום קבורה|^תפקיד|^שירת|^סרן|^רס״ן|^רס"ן|^רב[-־ ]?סמל|^חיל\s+|^לוחם|^לוחמת|^קצין|^קצינה|^מטפל|^מטפלת|^חבר כיתת|^חברת כיתת|^סגן רבש|^סגנית רבש|^משפחה:|^קרבה משפחתית:|^שאירים|^הותיר|^הותירה|^הובא|^הובאה|^חלקה|^שורה|^קבר|^גוש|^אזור|^.+מונצח|^.+מונצחת/.test(line);

  const facts = [];
  const sections = { life: [], event: [], memory: [] };
  let section = 'facts';
  let explicitFactsBlock = false;
  let bodyStarted = false;

  const rawLines = raw.replace(/\r/g, '').split('\n');

  for (const rawLine of rawLines) {
    const rawTrim = String(rawLine || '').trim();
    if (!rawTrim) continue;

    const headingLine = normalizeHeadingLine(rawTrim);
    if (personalHeading.test(headingLine)) {
      section = 'facts';
      explicitFactsBlock = true;
      bodyStarted = false;
      continue;
    }
    if (lifeHeading.test(headingLine)) {
      section = 'life';
      explicitFactsBlock = false;
      bodyStarted = true;
      continue;
    }
    if (eventHeading.test(headingLine)) {
      section = 'event';
      explicitFactsBlock = false;
      bodyStarted = true;
      continue;
    }
    if (memoryHeading.test(headingLine)) {
      section = 'memory';
      explicitFactsBlock = false;
      bodyStarted = true;
      continue;
    }

    const line = cleanFactLine(rawTrim);
    if (!line) continue;

    if (section === 'facts') {
      // New approved structure:
      // "פרטים אישיים" is a real block. Keep every line in it until the next
      // approved heading, even lines like "נחטף..." / "נהרג..." / "מונצח...".
      if (explicitFactsBlock || (!bodyStarted && isFactLine(line))) {
        facts.push(line);
        continue;
      }

      // If old source text has no "פרטים אישיים" heading, move to story as soon
      // as the line no longer looks like a factual detail.
      section = 'life';
      explicitFactsBlock = false;
      bodyStarted = true;
    }

    sections[section] = sections[section] || [];
    sections[section].push(line);
  }

  const memory = [];
  const event = [];
  const life = [];
  const addUnique = (target, value) => {
    const clean = String(value || '').replace(/\s+/g, ' ').trim();
    if (!clean || isAnyHeading(clean)) return;
    const key = normalizeForCompare(clean);
    if (target.some(item => normalizeForCompare(item) === key)) return;
    target.push(clean);
  };

  const knownSectionParagraphs = [];
  for (const p of sections.life) { addUnique(life, p); knownSectionParagraphs.push(p); }
  for (const p of sections.event) { addUnique(event, p); knownSectionParagraphs.push(p); }
  for (const p of sections.memory) { addUnique(memory, p); knownSectionParagraphs.push(p); }

  // Fallback for older texts that have no approved section headings:
  // classify content, but keep the opening factual details first.
  if (!knownSectionParagraphs.length) {
    const bodyLines = rawLines
      .map(l => cleanFactLine(l.trim()))
      .filter(Boolean)
      .filter(line => !facts.includes(line) && !personalHeading.test(normalizeHeadingLine(line)));

    for (const p of bodyLines) {
      if (isAnyHeading(p)) continue;
      if (/כתבו|ספדו|ספדה|ספד|נזכור|יזכרו|חבריו|חברותיה|משפחת|אשתו|אמו|אביו|אחיו|אחותו|בתו|בנו|כתב:|כתבה:|אמר|אמרה|סיפר|סיפרה|על מצבת/.test(p)) addUnique(memory, p);
      else if (/7\s*באוקטובר|שבעה באוקטובר|שמחת תורה|כ״ב בתשרי|כ"ב בתשרי|נרצח|נרצחה|נפל|נפלה|נהרג|נהרגה|נחטף|נחטפה|שבי|ממ״ד|ממ"ד|מחבלים|כיתת הכוננות|קרב|הגן|הגנה|פונה|הובא למנוחות|הובאה למנוחות/.test(p)) addUnique(event, p);
      else addUnique(life, p);
    }
  }

  return {facts, life, event, memory, allParagraphs: life.concat(event, memory)};
}

function cleanPersonDisplayName(name) {
  return String(name || '')
    .replace(/\s+ז\s*["'׳״]{0,2}\s*ל\s*$/i, '')
    .replace(/\s+ז״ל\s*$/i, '')
    .trim();
}
function getPersonFirstName(person) {
  if (person && person.firstNameHebrew) return String(person.firstNameHebrew).trim();
  const clean = cleanPersonDisplayName(person && person.name ? person.name : '');
  if (!clean) return '';
  const parts = clean.split(/\s+/).filter(Boolean);
  // Fallback only: most people now have firstNameHebrew in people.json.
  return parts[0] || clean;
}
function splitIntoSentences(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?…]|[.!?…]״)\s+/)
    .map(s => s.trim())
    .filter(Boolean);
}
function makeConciseParagraph(text, maxSentences = 3, maxChars = 560) {
  const sentences = splitIntoSentences(text);
  const picked = [];
  let length = 0;
  for (const sentence of sentences) {
    if (!sentence) continue;
    if (picked.length >= maxSentences) break;
    if (length + sentence.length > maxChars && picked.length) break;
    picked.push(sentence);
    length += sentence.length;
  }
  const result = (picked.join(' ') || String(text || '').trim()).trim();
  return result.length > maxChars ? result.slice(0, maxChars).replace(/\s+\S*$/, '') + '…' : result;
}
function normalizeForCompare(text) {
  return normalizeHebText(String(text || '').slice(0, 220));
}
function pickMeaningfulParagraphs(list, maxItems = 2, used = new Set()) {
  const out = [];
  for (const item of (Array.isArray(list) ? list : [])) {
    const clean = String(item || '').replace(/\s+/g, ' ').trim();
    if (!clean || clean.length < 35) continue;
    const key = normalizeForCompare(clean);
    if (used.has(key)) continue;
    used.add(key);
    out.push(makeConciseParagraph(clean, 2, 430));
    if (out.length >= maxItems) break;
  }
  return out;
}
function buildShortAboutText(person, parts) {
  const primary = makeConciseParagraph(person.summary || '', 2, 460);
  if (primary) return [primary];

  const used = new Set();
  const fromLife = pickMeaningfulParagraphs(parts.life, 1, used);
  if (fromLife.length) return fromLife.map(p => makeConciseParagraph(p, 2, 460));

  const fromEvent = pickMeaningfulParagraphs(parts.event, 1, used);
  if (fromEvent.length) return fromEvent.map(p => makeConciseParagraph(p, 2, 460));

  const fromMemory = pickMeaningfulParagraphs(parts.memory, 1, used);
  return fromMemory.map(p => makeConciseParagraph(p, 2, 460));
}
function renderFullStoryDetails(parts) {
  const storyBlocks = [];
  const renderParas = paras => (Array.isArray(paras) ? paras : [])
    .filter(Boolean)
    .map(p => `<p class="lightbox-paragraph">${esc(p)}</p>`)
    .join('');

  if (parts.life && parts.life.length) {
    storyBlocks.push(`<section class="lightbox-subsection lightbox-subsection-life"><h4 class="lightbox-subtitle">סיפור חיים</h4>${renderParas(parts.life)}</section>`);
  }
  if (parts.event && parts.event.length) {
    storyBlocks.push(`<section class="lightbox-subsection lightbox-subsection-event"><h4 class="lightbox-subtitle">שבעה באוקטובר והימים שאחריו</h4>${renderParas(parts.event)}</section>`);
  }
  if (parts.memory && parts.memory.length) {
    storyBlocks.push(`<section class="lightbox-subsection lightbox-subsection-memory"><h4 class="lightbox-subtitle">זיכרון ומילים מהלב</h4>${renderParas(parts.memory)}</section>`);
  }

  // Fallback: if categorization missed the text, still show the full story instead of leaving only the short summary.
  if (!storyBlocks.length && parts.allParagraphs && parts.allParagraphs.length) {
    storyBlocks.push(`<section class="lightbox-subsection lightbox-subsection-fallback"><h4 class="lightbox-subtitle">הסיפור המלא</h4>${renderParas(parts.allParagraphs)}</section>`);
  }

  if (!storyBlocks.length) return '';
  return `<details class="lightbox-full-story" open><summary>לקריאת הסיפור המלא</summary><div class="lightbox-full-story-body">${storyBlocks.join('')}</div></details>`;
}

function renderDescription(person) {
  const parts = splitDescription(person);
  const blocks = [];
  if (parts.facts.length) {
    blocks.push(`<section class="lightbox-section lightbox-personal-details"><h3 class="lightbox-section-title">פרטים אישיים</h3><ul class="lightbox-facts">${parts.facts.map(formatFactLine).join('')}</ul></section>`);
  }

  const aboutTitle = `על ${esc(getPersonFirstName(person) || cleanPersonDisplayName(person.name) || 'האדם')}`;
  const aboutParagraphs = buildShortAboutText(person, parts);
  if (aboutParagraphs.length) {
    blocks.push(`<section class="lightbox-section lightbox-about-person"><h3 class="lightbox-section-title">${aboutTitle}</h3>${aboutParagraphs.map(p => `<p class="lightbox-paragraph lightbox-lead-paragraph">${esc(p)}</p>`).join('')}</section>`);
  }

  const fullStory = renderFullStoryDetails(parts);
  if (fullStory) blocks.push(fullStory);

  if (!blocks.length) return '<div class="no-text-note">טרם נוסף טקסט לתצוגה עבור אדם זה.</div>';
  return blocks.join('');
}

function buildStructuredText(person, rawText) {
  // Compatibility wrapper: older popup code expects this name.
  // Keep the structured section rendering in one place so popups never fail open.
  const clone = Object.assign({}, person || {});
  if (typeof rawText === 'string') clone.text = rawText;
  return renderDescription(clone);
}

function isSafeHttpUrl(url) {
  try {
    const parsed = new URL(String(url || '').trim(), window.location.href);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (err) {
    return false;
  }
}

function isBlockedLink(url) {
  const value = String(url || '').trim();
  if (!value) return true;
  try {
    const host = new URL(value, window.location.href).hostname.toLowerCase();
    return host === 'google.com' || host.endsWith('.google.com') || host === 'google.co.il' || host.endsWith('.google.co.il') || host === 'maps.google.com' || host === 'accounts.google.com' || host === 'policies.google.com' || host === 'support.google.com';
  } catch (err) {
    return true;
  }
}

function linkSourceName(url) {
  try {
    const host = new URL(url, window.location.href).hostname.toLowerCase().replace(/^www\./, '');
    if (host.includes('facebook.com')) return 'Facebook';
    if (host.includes('instagram.com')) return 'Instagram';
    if (host.includes('youtube.com') || host.includes('youtu.be')) return 'YouTube';
    if (host.includes('tiktok.com')) return 'TikTok';
    if (host.includes('ynet.co.il')) return 'Ynet';
    if (host.includes('mako.co.il')) return 'Mako';
    if (host.includes('kan.org.il') || host.includes('710360.kan.org.il')) return 'כאן 11';
    if (host.includes('izkor.gov.il')) return 'יזכור';
    if (host.includes('laad.btl.gov.il')) return 'לאד';
    if (host.includes('president.gov.il')) return 'בית הנשיא';
    if (host.includes('kibbutz.org.il')) return 'התנועה הקיבוצית';
    if (host.includes('davar1.co.il')) return 'דבר';
    if (host.includes('globes.co.il')) return 'גלובס';
    if (host.includes('israelhayom.co.il')) return 'ישראל היום';
    if (host.includes('maariv.co.il')) return 'מעריב';
    if (host.includes('haaretz.co.il')) return 'הארץ';
    if (host.includes('remember.bio')) return 'Remember.bio';
    if (host.includes('memoriz.plus')) return 'Memoriz';
    if (host.includes('noflim.org.il') || host.includes('noflim.davar1.co.il')) return 'נופלים';
    return host;
  } catch (err) {
    return 'קישור';
  }
}
function linkSourceHost(url) {
  try { return new URL(url, window.location.href).hostname.toLowerCase().replace(/^www\./, ''); }
  catch (err) { return ''; }
}
function decodeLinkText(value) {
  try { value = decodeURIComponent(String(value || '').replace(/\+/g, ' ')); } catch (err) { value = String(value || ''); }
  return value
    .replace(/[\-_]+/g, ' ')
    .replace(/\.(html?|aspx|php)$/i, '')
    .replace(/posts|videos|photos|photo|reel/g, ' ')
    .replace(/זל/g, 'ז״ל')
    .replace(/היד/g, 'הי״ד')
    .replace(/\s+/g, ' ')
    .trim();
}
function inferLinkTitleFromUrl(url) {
  try {
    const parsed = new URL(url, window.location.href);
    const blocked = new Set(['posts','videos','photos','photo','reel','p','watch','status','article','item','news','memory','memorial','fallen','fallen-information','names','victims','site','he','en','page','web','mobile','local_news','featured','activism','judaism','magazine','content','newstv','programs','media.aspx']);
    const parts = parsed.pathname.split('/').filter(Boolean);
    const candidates = parts.map(decodeLinkText).filter(part => {
      if (!part || part.length < 5) return false;
      if (blocked.has(part.toLowerCase())) return false;
      if (/^\d+$/.test(part)) return false;
      if (!/[א-ת]/.test(part) && part.length < 24) return false;
      if (/^[a-z0-9]{8,}$/i.test(part)) return false;
      return true;
    });
    candidates.sort((a,b) => ((b.split(' ').length >= 3) - (a.split(' ').length >= 3)) || b.length - a.length);
    const best = candidates[0] || '';
    return best.length > 118 ? best.slice(0,118) + '…' : best;
  } catch (err) {
    return '';
  }
}
function isGenericLinkTitle(title) {
  const value = String(title || '').trim();
  if (!value) return true;
  if (/^(Facebook|Instagram|YouTube|TikTok|Ynet|Mako|Remember\.bio|Memoriz|CBS News|gov\.il|[^\s]+\.[^\s]+)\s*[–-]/i.test(value)) return true;
  if (/^(כאן 11|יזכור|לאד|בית הנשיא|התנועה הקיבוצית|דבר|גלובס|ישראל היום|מעריב|הארץ|נופלים|צה״ל|יזכור חרבות ברזל)\s*[–-]/.test(value)) return true;
  return ['כתבה','סרטון','עמוד הנצחה','קישור'].includes(value);
}
function bestLinkTitle(link, cleanUrl, source) {
  const explicit = String((link && (link.title || link.label || link.name)) || '').trim();
  const inferred = inferLinkTitleFromUrl(cleanUrl);
  if (inferred && (isGenericLinkTitle(explicit) || inferred.length > explicit.length)) return inferred;
  if (explicit) return explicit;
  return source || 'קישור';
}
function renderPersonLinks(links) {
  if (!Array.isArray(links) || !links.length) return '';
  const seen = new Set();
  const prepared = [];
  for (const link of links) {
    const rawUrl = String((link && link.url) || '').trim();
    if (!rawUrl || !isSafeHttpUrl(rawUrl) || isBlockedLink(rawUrl)) continue;
    const cleanUrl = rawUrl.split('#:~:text=')[0];
    const key = cleanUrl.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const source = link.source || linkSourceName(cleanUrl);
    prepared.push({ url: cleanUrl, source, title: bestLinkTitle(link, cleanUrl, source) });
  }
  if (!prepared.length) return '';
  const items = prepared.map(item => {
    return `<li class="lightbox-link-item"><a href="${esc(item.url)}" target="_blank" rel="noopener noreferrer"><span><span class="lightbox-link-title">${esc(item.title)}</span><span class="lightbox-link-source">${esc(item.source)}</span></span><span class="lightbox-link-arrow" aria-hidden="true">↗</span></a></li>`;
  }).join('');
  return `<section class="lightbox-section lightbox-links"><h3 class="lightbox-section-title">קישורים וכתבות <span style="font-weight:400;color:rgba(255,255,255,.68);font-size:.82em;">(${prepared.length})</span></h3><ul class="lightbox-links-list">${items}</ul></section>`;
}
const personLinksCache = new Map();
async function loadPersonLinks(person) {
  const inlineLinks = Array.isArray(person.links) ? person.links : [];
  const file = person.linksFile || person.linksPath || (person.id ? `assets/people/${person.id}/links.json` : '');
  if (!file) return inlineLinks;
  if (personLinksCache.has(file)) return inlineLinks.concat(personLinksCache.get(file));
  try {
    const response = await fetch(file, { cache: 'no-cache' });
    if (!response.ok) throw new Error('links file not found');
    const data = await response.json();
    const fileLinks = Array.isArray(data) ? data : (Array.isArray(data.links) ? data.links : []);
    personLinksCache.set(file, fileLinks);
    return inlineLinks.concat(fileLinks);
  } catch (err) {
    personLinksCache.set(file, []);
    return inlineLinks;
  }
}

const personTextCache = new Map();
async function loadPersonText(person) {
  const inlineText = person && typeof person.text === 'string' ? person.text : '';
  const fallback = inlineText || (person && person.summary ? person.summary : '');
  const file = person && (person.textFile || person.textPath) ? (person.textFile || person.textPath) : '';
  if (!file) return fallback;
  if (personTextCache.has(file)) return personTextCache.get(file) || fallback;
  try {
    const response = await fetch(file, { cache: 'no-cache' });
    if (!response.ok) throw new Error('text file not found');
    const txt = await response.text();
    const cleanTxt = String(txt || '').trim();
    personTextCache.set(file, cleanTxt);
    return cleanTxt || fallback;
  } catch (err) {
    personTextCache.set(file, '');
    return fallback;
  }
}

function uniqueList(items) {
  const seen = new Set();
  return (Array.isArray(items) ? items : []).filter(Boolean).filter(item => {
    const key = String(item).trim();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
function explicitPersonPhotos(person) {
  return uniqueList(Array.isArray(person && person.photos) ? person.photos : []);
}
const personPhotosCache = new Map();
function personPhotosManifestPath(person) {
  if (!person || !person.id) return '';
  return `assets/people/${person.id}/photos/photos.json`;
}
function normalizePhotoPath(item, base) {
  if (!item) return '';
  const value = typeof item === 'string' ? item : (item.src || item.url || item.file || item.path || '');
  const clean = String(value || '').trim();
  if (!clean) return '';
  if (/^(https?:)?\/\//i.test(clean) || clean.startsWith('data:') || clean.startsWith('assets/')) return clean;
  return `${base}/${clean.replace(/^\.\//, '').replace(/^\//, '')}`;
}
async function loadPersonPhotos(person) {
  const explicit = explicitPersonPhotos(person);
  if (!person || !person.id) return explicit;
  if (personPhotosCache.has(person.id)) return uniqueList(explicit.concat(personPhotosCache.get(person.id)));
  const base = `assets/people/${person.id}/photos`;
  const manifest = personPhotosManifestPath(person);
  try {
    const response = await fetch(manifest, { cache: 'no-cache' });
    if (!response.ok) throw new Error('photos manifest not found');
    const data = await response.json();
    const raw = Array.isArray(data) ? data : (Array.isArray(data.photos) ? data.photos : []);
    const listed = uniqueList(raw.map(item => normalizePhotoPath(item, base)).filter(Boolean));
    personPhotosCache.set(person.id, listed);
    return uniqueList(explicit.concat(listed));
  } catch (err) {
    personPhotosCache.set(person.id, []);
    return explicit;
  }
}
function personPhotoImages(photos, person) {
  const list = uniqueList(photos);
  return list.map((src, i) => `<img src="${esc(src)}" alt="${esc(person.name)} — תמונה ${i+1}" loading="lazy" class="js-auto-transparent-bg ${i === 0 ? 'is-active' : ''}">`).join('');
}
function isMobileLightboxLayout() {
  return window.matchMedia && window.matchMedia('(max-width: 720px)').matches;
}
let lightboxPhotoTimer = null;
function stopLightboxPhotoRotation() {
  if (lightboxPhotoTimer) clearInterval(lightboxPhotoTimer);
  lightboxPhotoTimer = null;
}
function startLightboxPhotoRotation() {
  stopLightboxPhotoRotation();
  const galleries = Array.from(lightbox.querySelectorAll('.lightbox-gallery.is-slideshow'));
  if (!galleries.length || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  galleries.forEach(gallery => {
    const imgs = Array.from(gallery.querySelectorAll('img'));
    imgs.forEach((img, i) => img.classList.toggle('is-active', i === 0));
  });
  lightboxPhotoTimer = setInterval(() => {
    if (!lightbox.classList.contains('is-open')) return stopLightboxPhotoRotation();
    galleries.forEach(gallery => {
      const imgs = Array.from(gallery.querySelectorAll('img'));
      if (imgs.length < 2) return;
      let activeIndex = imgs.findIndex(img => img.classList.contains('is-active'));
      if (activeIndex < 0) activeIndex = 0;
      imgs[activeIndex].classList.remove('is-active');
      imgs[(activeIndex + 1) % imgs.length].classList.add('is-active');
    });
  }, GALLERY_SLIDE_MS);
}
function renderPersonPhotos(photos, person) {
  const list = uniqueList(photos);
  const imgs = personPhotoImages(list, person);
  if (!imgs) return '';
  const slideshowClass = list.length > 1 ? ' is-slideshow' : '';
  return `<section class="lightbox-section lightbox-photo-section"><h3 class="lightbox-section-title">גלריית תמונות</h3><div class="lightbox-gallery lightbox-inline-gallery${slideshowClass}">${imgs}</div></section>`;
}
function placeLightboxPhotos(person, photos) {
  const list = uniqueList(photos);
  const mobile = isMobileLightboxLayout();
  const imgs = personPhotoImages(list, person);
  if (lightboxGallery) {
    lightboxGallery.classList.toggle('is-slideshow', !!imgs && !mobile && list.length > 1);
    if (imgs && !mobile) {
      // Desktop/tablet: original placement under the main portrait, in the left column.
      lightboxGallery.innerHTML = imgs;
      lightboxGallery.hidden = false;
      applyAutoTransparentBackgrounds(lightboxGallery);
    } else {
      lightboxGallery.innerHTML = '';
      lightboxGallery.hidden = true;
      lightboxGallery.classList.remove('is-slideshow');
    }
  }
  // Mobile: gallery appears after the summary and before the links.
  return mobile ? renderPersonPhotos(list, person) : '';
}

function personDirectKey(person) {
  return (person && person.id) ? String(person.id) : '';
}
function personDirectUrl(person) {
  const key = personDirectKey(person);
  return key ? `${window.location.origin}${window.location.pathname}${window.location.search}#${encodeURIComponent(key)}` : window.location.href;
}
function currentPersonHashKey() {
  const rawHash = window.location.hash ? window.location.hash.slice(1) : '';
  if (!rawHash) return '';
  let decoded = rawHash;
  try { decoded = decodeURIComponent(rawHash); } catch (err) {}
  if (decoded.startsWith('person=')) decoded = decoded.slice('person='.length);
  return decoded.trim();
}
function findPersonByDirectKey(key) {
  const cleaned = String(key || '').trim();
  if (!cleaned) return null;
  return people.find(p => p.id === cleaned) || null;
}
function personFromCurrentUrl() {
  const params = new URLSearchParams(window.location.search);
  return findPersonByDirectKey(params.get('person') || params.get('id') || currentPersonHashKey());
}
function setPersonHash(person) {
  const key = personDirectKey(person);
  if (!key) return;
  const encoded = encodeURIComponent(key);
  if (window.location.hash.slice(1) === encoded) return;
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${encoded}`);
}
function clearPersonHash(personKey) {
  const current = currentPersonHashKey();
  if (!current || (personKey && current !== personKey)) return;
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
}
function setupCopyPersonLink(person) {
  if (!copyPersonLink) return;
  const url = personDirectUrl(person);
  copyPersonLink.textContent = 'העתקת קישור אישי';
  copyPersonLink.onclick = async (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      await navigator.clipboard.writeText(url);
      copyPersonLink.textContent = 'הקישור הועתק';
    } catch (err) {
      window.prompt('העתיקי את הקישור הישיר:', url);
      copyPersonLink.textContent = 'קישור אישי';
    }
    window.setTimeout(() => {
      if (copyPersonLink && lightbox.classList.contains('is-open') && activeLightboxPersonKey === personDirectKey(person)) {
        copyPersonLink.textContent = 'העתקת קישור אישי';
      }
    }, 2200);
  };
}
function openPersonFromUrl() {
  const person = personFromCurrentUrl();
  if (person) {
    openLightbox(person, {updateUrl:false});
  } else if (lightbox.classList.contains('is-open')) {
    closeLightbox(null, {clearUrl:false});
  }
}

let lastFocusedBeforeLightbox = null;
let activeLightboxPersonKey = '';
let suppressLightboxOpenUntil = 0;
let lightboxOpenToken = 0;
async function openLightbox(person, options = {}) {
  if (Date.now() < suppressLightboxOpenUntil) return;
  const openToken = ++lightboxOpenToken;
  stopLightboxPhotoRotation();
  lastFocusedBeforeLightbox = document.activeElement;
  activeLightboxPersonKey = person.id || person.name || '';
  if (options.updateUrl !== false) setPersonHash(person);
  setupCopyPersonLink(person);

  // Clear the previous popup content immediately. Text/photos are loaded from external files,
  // so without this reset the old person's story can flash for a moment on slower mobile connections.
  lightbox.classList.add('is-loading');
  lightboxImg.innerHTML = '';
  lightboxTitle.textContent = person.name || '';
  lightboxPlace.textContent = person.place || '';
  lightboxText.innerHTML = '<div class="lightbox-loading" role="status" aria-live="polite">טוען את הסיפור...</div>';
  if (lightboxGallery) {
    lightboxGallery.innerHTML = '';
    lightboxGallery.hidden = true;
    lightboxGallery.classList.remove('is-slideshow');
  }

  lightboxImg.innerHTML = imgMarkup(person);
  applyAutoTransparentBackgrounds(lightboxImg);
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => lightboxClose.focus({preventScroll:true}), 0);

  const rawText = person.text || person.summary || '';
  const [fullText, photos, links] = await Promise.all([loadPersonText(person), loadPersonPhotos(person), loadPersonLinks(person)]);
  if (openToken === lightboxOpenToken && activeLightboxPersonKey === (person.id || person.name || '') && lightbox.classList.contains('is-open')) {
    const structuredText = buildStructuredText(person, fullText || rawText);
    const galleryHtml = placeLightboxPhotos(person, photos);
    lightboxText.innerHTML = structuredText + galleryHtml + renderPersonLinks(links);
    applyAutoTransparentBackgrounds(lightboxText);
    lightbox.classList.remove('is-loading');
    startLightboxPhotoRotation();
  }
}
function closeLightbox(event, options = {}) {
  // Guard against mobile click-through: after closing, ignore card taps for a short moment.
  suppressLightboxOpenUntil = Date.now() + POPUP_CLOSE_GUARD_MS;
  lightboxOpenToken++;
  if (event) {
    event.preventDefault();
    event.stopPropagation();
    if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
  }
  if (!lightbox.classList.contains('is-open')) return;
  const closingPersonKey = activeLightboxPersonKey;
  activeLightboxPersonKey = '';
  if (options.clearUrl !== false) clearPersonHash(closingPersonKey);
  stopLightboxPhotoRotation();

  // Move focus out of the popup before aria-hidden=true, so assistive tech never sees a focused element being hidden.
  const restoreTarget = lastFocusedBeforeLightbox && document.contains(lastFocusedBeforeLightbox) ? lastFocusedBeforeLightbox : null;
  if (document.activeElement && lightbox.contains(document.activeElement)) {
    if (restoreTarget && typeof restoreTarget.focus === 'function') {
      restoreTarget.focus({preventScroll:true});
    } else if (typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }
  }

  lightbox.classList.remove('is-open', 'is-loading');
  lightbox.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  window.setTimeout(() => {
    if (!lightbox.classList.contains('is-open')) {
      lightboxText.innerHTML = '';
      lightboxImg.innerHTML = '';
      lightboxTitle.textContent = '';
      lightboxPlace.textContent = '';
      if (lightboxGallery) {
        lightboxGallery.innerHTML = '';
        lightboxGallery.hidden = true;
        lightboxGallery.classList.remove('is-slideshow');
      }
    }
  }, 180);
  if (lastFocusedBeforeLightbox && typeof lastFocusedBeforeLightbox.focus === 'function') {
    setTimeout(() => lastFocusedBeforeLightbox.focus({preventScroll:true}), 0);
  }
}
function isCloseTarget(target){
  return !!(target && target.closest && target.closest('[data-close="1"], #lightboxClose, .lightbox-close'));
}
function handleClosePointer(event){
  if (!lightbox.classList.contains('is-open')) return;
  if (isCloseTarget(event.target) || event.target === lightbox || event.target.classList?.contains('lightbox-backdrop')) {
    closeLightbox(event);
  }
}
function stopLightboxPointer(event){
  // Do not close on pointerdown. On mobile this can hide the overlay before the following click,
  // which may hit a person card underneath and open another popup. Close only on click/Escape.
  if (!lightbox.classList.contains('is-open')) return;
  event.stopPropagation();
}
lightboxClose.addEventListener('pointerdown', stopLightboxPointer, true);
lightboxClose.addEventListener('click', closeLightbox, true);
lightbox.addEventListener('pointerdown', stopLightboxPointer, true);
lightbox.addEventListener('click', handleClosePointer, true);
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('is-open')) return;
  if (e.key === 'Escape') closeLightbox(e);
  if ((e.key === 'Enter' || e.key === ' ') && document.activeElement === lightboxClose) closeLightbox(e);
});

const posterGrid = document.getElementById('posterGrid');
const statusText = document.getElementById('statusText');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const emptySearch = document.getElementById('emptySearch');
const desktopAllGrid = document.getElementById('desktopAllGrid');
const fullListPanel = document.getElementById('fullListPanel');
const fullListToggle = document.getElementById('fullListToggle');
let slotsCount = 8;
let startIndex = 0;
let active = filteredPeople();
let cards = [];
let timer = null;

function buildCards() {
  if (!posterGrid) {
    cards = [];
    return;
  }
  posterGrid.innerHTML = '';
  cards = [];
  for (let i=0; i<slotsCount; i++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'memory-slot';
    btn.innerHTML = '<span class="photo-holder"></span><span class="slot-name"></span>';
    posterGrid.appendChild(btn);
    cards.push(btn);
  }
}
function setCard(card, person) {
  if (!person) {
    card.style.visibility = 'hidden';
    card.onclick = null;
    return;
  }
  card.style.visibility = '';
  // Main page and full list always show the original portrait only.
  // Inner photos rotate only inside the popup gallery.
  card.innerHTML = `<span class="photo-holder">${imgMarkup(person)}</span><span class="slot-name">${esc(person.name)}</span>`;
  applyAutoTransparentBackgrounds(card);
  card.onclick = (event) => {
    if (event && Date.now() < suppressLightboxOpenUntil) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    openLightbox(person);
  };
}
let desktopAllGridKey = '';
function renderDesktopAllPeople() {
  if (!desktopAllGrid) return;
  const key = active.map(p => p.id || p.name || '').join('|');
  if (key === desktopAllGridKey) return;
  desktopAllGridKey = key;
  desktopAllGrid.innerHTML = '';
  active.forEach(person => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'memory-slot';
    btn.innerHTML = '<span class="photo-holder"></span><span class="slot-name"></span>';
    setCard(btn, person);
    desktopAllGrid.appendChild(btn);
  });
  applyAutoTransparentBackgrounds(desktopAllGrid);
}
function setupFullListToggle() {
  if (!fullListPanel || !fullListToggle) return;
  const update = () => {
    const collapsed = fullListPanel.classList.contains('is-collapsed');
    fullListToggle.setAttribute('aria-expanded', String(!collapsed));
    fullListToggle.textContent = collapsed ? 'הצגת הרשימה המלאה' : 'הסתרת הרשימה המלאה';
  };
  fullListToggle.addEventListener('click', () => {
    fullListPanel.classList.toggle('is-collapsed');
    update();
  });
  update();
}

function render() {
  active = filteredPeople();
  desktopAllGridKey = '';
  renderDesktopAllPeople();
  if (emptySearch) emptySearch.classList.toggle('show', !active.length);
  if (statusText) statusText.textContent = active.length ? `${active.length} נופלות ונופלים` : '0 תוצאות';
}
function move(direction, withFade=true) {
  if (!active.length) return;
  if (withFade) cards.forEach(c => c.classList.add('is-fading'));
  setTimeout(() => {
    const lastPageStart = Math.max(0, Math.floor((active.length - 1) / slotsCount) * slotsCount);
    startIndex += direction * slotsCount;
    if (startIndex > lastPageStart) startIndex = 0;
    if (startIndex < 0) startIndex = lastPageStart;
    render();
    cards.forEach(c => c.classList.remove('is-fading'));
  }, withFade ? CARD_FADE_MS : 0);
}
function startTimer() {
  clearInterval(timer);
}
function refresh() { startIndex = 0; render(); startTimer(); }
async function initApp() {
  try {
    people = await loadPeopleData();
  } catch (err) {
    console.error(err);
    if (statusText) statusText.textContent = 'שגיאה בטעינת נתוני הזיכרון';
    if (emptySearch) {
      emptySearch.textContent = 'לא ניתן לטעון את נתוני הזיכרון. יש לפתוח את האתר דרך שרת / GitHub Pages ולא ישירות מקובץ מקומי.';
      emptySearch.classList.add('show');
    }
    return;
  }

  buildCards();
  setupFullListToggle();
  startAutoTransparentBackgrounds();
  refresh();
  searchInput.addEventListener('input', refresh);
  if (prevBtn) prevBtn.addEventListener('click', () => { move(-1, true); startTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { move(1, true); startTimer(); });
  window.addEventListener('hashchange', openPersonFromUrl);
  setTimeout(openPersonFromUrl, 120);
}

initApp();
