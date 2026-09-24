/* ===== Сборка страницы ===== */
const $ = id => document.getElementById(id);
const circle = '<svg class="circle" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden="true"><path d="M104 8 C 170 6, 196 40, 194 80 C 192 128, 150 154, 96 152 C 40 150, 6 124, 8 78 C 10 36, 48 10, 112 12 C 130 13, 142 18, 150 24"/></svg>';

/* ===== Язык: ?lang=en в ссылке → выбор посетителя → русский по умолчанию ===== */
let lang = 'ru';
try {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (fromUrl === 'en' || fromUrl === 'ru') { lang = fromUrl; localStorage.setItem('lang', lang); }
  else if (localStorage.getItem('lang') === 'en') lang = 'en';
} catch (e) {}

// Профессия на текущем языке: фото и положение — из roles.js, тексты — из нужного файла
const role = i => lang === 'en' && ROLES_EN[i] ? { ...ROLES[i], ...ROLES_EN[i] } : ROLES[i];

// Запоминаем русские тексты из index.html
const ruTitle = document.title;
document.querySelectorAll('[data-i18n]').forEach(el => el.dataset.ru = el.innerHTML);
document.querySelectorAll('[data-i18n-alt]').forEach(el => el.dataset.ruAlt = el.alt);
document.querySelectorAll('[data-i18n-aria]').forEach(el => el.dataset.ruAria = el.getAttribute('aria-label'));

function contacts(el){
  const items = [];
  if (CONFIG.telegram) items.push(['https://t.me/'+CONFIG.telegram, 'Telegram: @'+CONFIG.telegram]);
  if (CONFIG.phone) { const p = CONFIG.phone.replace(/\D/g,''); items.push(['tel:+'+p, '+'+p[0]+' '+p.slice(1,4)+' '+p.slice(4,7)+'-'+p.slice(7,9)+'-'+p.slice(9,11)]); }
  if (CONFIG.email) items.push(['mailto:'+CONFIG.email, CONFIG.email]);
  if (CONFIG.github) items.push([CONFIG.github, 'GitHub']);
  el.innerHTML = items.map(([h,t]) => '<a href="'+h+'"'+(h.startsWith('http')?' target="_blank" rel="noopener"':'')+'>'+t+'</a>').join('');
}
contacts($('contacts')); contacts($('contacts2'));

const edgeNums = ['1', '1A', '2', '2A', '3', '3A', '4', '4A', '5', '5A'];
function renderStrip(){
  $('strip').innerHTML = ROLES.map((_, i) => { const r = role(i); return (
    '<button class="frame" role="tab" id="f-'+r.id+'" aria-selected="'+(i===current)+'" data-i="'+i+'">' +
    '<span class="img ph-'+r.id+'" style="--sz:'+r.sz+';--pos:'+r.pos+'"></span>' +
    '<span class="cap">'+r.label+'<small>'+r.sub+'</small></span>' + circle + '</button>'); }
  ).join('') + ROLES.map((r,i)=>'<span class="edge" style="left:calc('+(i*20)+'% + 16px)">▸ '+edgeNums[i*2]+'   '+UI[lang].edge+'   '+edgeNums[i*2+1]+'</span>').join('');
}

let current = 0, currentBranch = 0;
function openRole(i, scroll, branch){
  const r = role(i);
  current = i;
  document.querySelectorAll('.frame').forEach((f,k)=>f.setAttribute('aria-selected', k===i));
  const sheet = $('sheet');
  sheet.classList.remove('developing'); void sheet.offsetWidth; sheet.classList.add('developing');
  const big = $('big'); big.className = 'big ph-'+r.id; big.style.setProperty('--sz', r.sz); big.style.setProperty('--pos', r.pos);
  big.setAttribute('aria-label', UI[lang].photoFor+' «'+r.label+'»');
  $('meta').textContent = r.meta; $('title').textContent = r.title; $('lead').textContent = r.lead;
  $('branches').innerHTML = r.branches.map((b,k)=>'<button class="branch" role="tab" aria-selected="false" data-k="'+k+'">'+b.name+'</button>').join('');
  openBranch(Math.min(branch || 0, r.branches.length - 1));
  if (scroll) sheet.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
}
function openBranch(k){
  currentBranch = k;
  document.querySelectorAll('.branch').forEach((b,j)=>b.setAttribute('aria-selected', j===k));
  $('panel').innerHTML = role(current).branches[k].html();
}

function applyLang(){
  const en = lang === 'en';
  document.documentElement.lang = lang;
  document.title = en ? I18N_EN.pageTitle : ruTitle;
  document.querySelectorAll('[data-i18n]').forEach(el => el.innerHTML = en && I18N_EN[el.dataset.i18n] ? I18N_EN[el.dataset.i18n] : el.dataset.ru);
  document.querySelectorAll('[data-i18n-alt]').forEach(el => el.alt = en && I18N_EN[el.dataset.i18nAlt] ? I18N_EN[el.dataset.i18nAlt] : el.dataset.ruAlt);
  document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', en && I18N_EN[el.dataset.i18nAria] ? I18N_EN[el.dataset.i18nAria] : el.dataset.ruAria));
  const b = $('langBtn'); b.textContent = UI[lang].langBtn; b.lang = en ? 'ru' : 'en'; b.setAttribute('aria-label', UI[lang].langBtnLabel);
  renderStrip();
  openRole(current, false, currentBranch);
}

$('langBtn').addEventListener('click', () => {
  lang = lang === 'en' ? 'ru' : 'en';
  try { localStorage.setItem('lang', lang); } catch (e) {}
  applyLang();
});

$('strip').addEventListener('click', e => { const f = e.target.closest('.frame'); if (f) openRole(+f.dataset.i, true); });
$('branches').addEventListener('click', e => { const b = e.target.closest('.branch'); if (b) openBranch(+b.dataset.k); });
[$('strip'), $('branches')].forEach(list => list.addEventListener('keydown', e => {
  if (!['ArrowRight','ArrowLeft'].includes(e.key)) return;
  const tabs = [...list.querySelectorAll('[role=tab]')]; const i = tabs.indexOf(document.activeElement);
  if (i < 0) return; const n = tabs[(i + (e.key==='ArrowRight'?1:-1) + tabs.length) % tabs.length];
  n.focus(); n.click(); e.preventDefault();
}));

applyLang();

/* ===== Смена темы ===== */
$('themeBtn').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch(e){}
});
try { const t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch(e){}