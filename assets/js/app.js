const people=Array.isArray(window.MEMORIAL_PEOPLE)?window.MEMORIAL_PEOPLE:[];
const grid=document.getElementById('memorialGrid'),search=document.getElementById('searchInput'),count=document.getElementById('statusText'),empty=document.getElementById('emptySearch');
const box=document.getElementById('lightbox'),closeBtn=document.getElementById('lightboxClose'),boxImg=document.getElementById('lightboxImg'),boxTitle=document.getElementById('lightboxTitle'),boxPlace=document.getElementById('lightboxPlace'),boxRole=document.getElementById('lightboxRole'),boxFacts=document.getElementById('lightboxFacts'),boxService=document.getElementById('lightboxService'),pageLink=document.getElementById('personPageLink'),copyBtn=document.getElementById('copyPersonLink');
let lastFocus=null,active=null;
function e(s){return String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function norm(s){return String(s||'').replace(/[״“”]/g,'"').replace(/[׳‘’]/g,"'").replace(/ז\s*["'׳״]{0,2}\s*ל/g,'').replace(/[()\[\]{}.,/:;!?+\-־\u2013\u2014]+/g,' ').replace(/\s+/g,' ').trim().toLowerCase()}
function displayName(p){return String(p.name||'').replace(/\s+ז[״"']?ל\s*$/,'').trim()}
function firstName(p){
  const explicit=String(p.firstNameHebrew||'').trim();
  if(explicit)return explicit;
  const parts=displayName(p).split(/\s+/).filter(Boolean);
  return parts.at(-1)||displayName(p);
}
function pic(p,cls=''){const pos=/^\d{1,3}%\s+\d{1,3}%$/.test(String(p.portrait?.position||''))?p.portrait.position:'50% 38%';const fit=p.portrait?.fit==='contain'?'contain':'cover';return p.image?`<img class="${cls}" src="${e(p.image)}" alt="${e(displayName(p))}" loading="lazy" decoding="async" style="--fit:${fit};--pos:${e(pos)}">`:`<span class="portrait-placeholder">${e(displayName(p))}</span>`}
function matches(p,q){const t=norm(q);if(!t)return true;return t.split(' ').every(x=>norm(p.name).includes(x)||norm((p.name||'').split(' ').reverse().join(' ')).includes(x)||norm(p.place).includes(x))}
function render(){const q=search?.value||'';const list=people.filter(p=>matches(p,q)).sort((a,b)=>Number(!!a.isPreviousYears)-Number(!!b.isPreviousYears));grid.innerHTML='';let divider=false;for(const p of list){if(p.isPreviousYears&&!divider){const d=document.createElement('div');d.className='period-divider';d.id='previousYearsDivider';d.innerHTML='<span>נופלות ונופלים משנים קודמות</span>';grid.append(d);divider=true}const b=document.createElement('button');b.type='button';b.className='memory-card';b.dataset.id=p.id;b.innerHTML=`<span class="portrait-ring">${pic(p)}</span><span class="card-name">${e(p.name)}</span><span class="card-place">${e(p.place||'')}</span>`;b.addEventListener('click',()=>openPreview(p,true));grid.append(b)}if(count)count.textContent='';empty.hidden=!!list.length}
function service(p){const r=p.serviceRecord||{};const a=[];if(r.rank)a.push(e(r.rank));if(r.unit)a.push(e(r.unit));return a.length?`<div class="service-line">${a.map(x=>`<span>${x}</span>`).join('<span class="dot" aria-hidden="true">•</span>')}</div>`:''}
function setHash(p){history.replaceState(null,'',`${location.pathname}${location.search}#${encodeURIComponent(p.id)}`)}
function clearHash(){history.replaceState(null,'',`${location.pathname}${location.search}`)}
function openPreview(p,hash=true){
  active=p;
  lastFocus=document.activeElement;
  if(hash)setHash(p);

  boxTitle.textContent=p.name||'';
  boxPlace.textContent=p.place||'';
  boxRole.textContent=p.role||'';
  boxRole.hidden=!String(p.role||'').trim();
  boxService.innerHTML=service(p);
  boxFacts.innerHTML=(p.generalDetails||[]).map(x=>`<li>${e(x)}</li>`).join('');
  boxImg.innerHTML=pic(p);

  const first=firstName(p);
  pageLink.href=p.page;
  pageLink.textContent=`לדף של ${first}`;
  pageLink.setAttribute('aria-label',`לדף של ${first}`);
  pageLink.hidden=false;
  pageLink.removeAttribute('hidden');

  copyBtn.textContent='העתקת קישור';
  box.inert=false;
  box.removeAttribute('inert');
  box.setAttribute('aria-hidden','false');
  box.classList.add('is-open');
  document.body.style.overflow='hidden';
  setTimeout(()=>closeBtn.focus({preventScroll:true}),0);
}
function closePreview(ev,hash=true){ev?.preventDefault();if(!box.classList.contains('is-open'))return;box.classList.remove('is-open');box.setAttribute('aria-hidden','true');box.inert=true;box.setAttribute('inert','');document.body.style.overflow='';if(hash)clearHash();(lastFocus&&document.contains(lastFocus)?lastFocus:search)?.focus?.({preventScroll:true});active=null}
closeBtn.addEventListener('pointerdown',ev=>{ev.preventDefault();ev.stopPropagation()});closeBtn.addEventListener('click',ev=>closePreview(ev));box.addEventListener('click',ev=>{if(ev.target===box||ev.target.closest?.('[data-close="1"]'))closePreview(ev)});
document.addEventListener('keydown',ev=>{if(!box.classList.contains('is-open'))return;if(ev.key==='Escape'){closePreview(ev);return}if(ev.key==='Tab'){const fs=[...box.querySelectorAll('button,a[href]')].filter(x=>!x.disabled);if(!fs.length)return;const f=fs[0],l=fs.at(-1);if(ev.shiftKey&&document.activeElement===f){ev.preventDefault();l.focus()}else if(!ev.shiftKey&&document.activeElement===l){ev.preventDefault();f.focus()}}});
copyBtn.addEventListener('click',async()=>{
  if(!active)return;
  const u=new URL(active.page,location.href).href;
  try{
    await navigator.clipboard.writeText(u);
    copyBtn.textContent='הקישור הועתק';
  }catch{
    copyBtn.textContent='לא ניתן להעתיק';
  }
});

const RETURN_SCROLL_KEY='memorial:return-scroll';

pageLink.addEventListener('click',()=>{
  try{sessionStorage.setItem(RETURN_SCROLL_KEY,String(window.scrollY));}catch{}
  // Keep the homepage history entry clean before leaving for the personal page.
  clearHash();
  closePreview(null,false);
});

function restoreReturnScroll(){
  let raw=null;
  try{
    raw=sessionStorage.getItem(RETURN_SCROLL_KEY);
    sessionStorage.removeItem(RETURN_SCROLL_KEY);
  }catch{}
  const y=Number(raw);
  if(Number.isFinite(y)&&y>=0){
    requestAnimationFrame(()=>window.scrollTo({top:y,left:0,behavior:'auto'}));
  }
}

function resetPreviewState(){
  box.classList.remove('is-open');
  box.setAttribute('aria-hidden','true');
  box.inert=true;
  box.setAttribute('inert','');
  document.body.style.overflow='';
  active=null;
}

search.addEventListener('input',render);

function fromHash(){
  const id=decodeURIComponent(location.hash.slice(1)||'');
  const p=people.find(x=>x.id===id);
  if(p)openPreview(p,false);
}

window.addEventListener('hashchange',fromHash);

// Browser Back may restore the page from the back-forward cache.
// Re-render and reset the modal so the homepage always returns in the same state.
window.addEventListener('pageshow',event=>{
  if(event.persisted){
    resetPreviewState();
    render();
    restoreReturnScroll();
  }
});

render();
setTimeout(()=>{
  if(location.hash)fromHash();
  else restoreReturnScroll();
},80);
