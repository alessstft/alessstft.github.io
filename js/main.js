/* ===== Сборка страницы ===== */
const $ = id => document.getElementById(id);
const circle = '<svg class="circle" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden="true"><path d="M104 8 C 170 6, 196 40, 194 80 C 192 128, 150 154, 96 152 C 40 150, 6 124, 8 78 C 10 36, 48 10, 112 12 C 130 13, 142 18, 150 24"/></svg>';

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
$('strip').innerHTML = ROLES.map((r,i) =>
  '<button class="frame" role="tab" id="f-'+r.id+'" aria-selected="false" data-i="'+i+'">' +
  '<span class="img ph-'+r.id+'" style="--sz:'+r.sz+';--pos:'+r.pos+'"></span>' +
  '<span class="cap">'+r.label+'<small>'+r.sub+'</small></span>' + circle + '</button>'
).join('') + ROLES.map((r,i)=>'<span class="edge" style="left:calc('+(i*20)+'% + 16px)">▸ '+edgeNums[i*2]+'   АЛЕСЯ 400   '+edgeNums[i*2+1]+'</span>').join('');

let current = -1;
function openRole(i, scroll){
  const r = ROLES[i];
  document.querySelectorAll('.frame').forEach((f,k)=>f.setAttribute('aria-selected', k===i));
  const sheet = $('sheet');
  sheet.classList.remove('developing'); void sheet.offsetWidth; sheet.classList.add('developing');
  const big = $('big'); big.className = 'big ph-'+r.id; big.style.setProperty('--sz', r.sz); big.style.setProperty('--pos', r.pos);
  big.setAttribute('aria-label', 'Фрагмент фотографии для раздела «'+r.label+'»');
  $('meta').textContent = r.meta; $('title').textContent = r.title; $('lead').textContent = r.lead;
  $('branches').innerHTML = r.branches.map((b,k)=>'<button class="branch" role="tab" aria-selected="'+(k===0)+'" data-k="'+k+'">'+b.name+'</button>').join('');
  current = i; openBranch(0);
  if (scroll) sheet.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
}
function openBranch(k){
  document.querySelectorAll('.branch').forEach((b,j)=>b.setAttribute('aria-selected', j===k));
  $('panel').innerHTML = ROLES[current].branches[k].html();
}

$('strip').addEventListener('click', e => { const f = e.target.closest('.frame'); if (f) openRole(+f.dataset.i, true); });
$('branches').addEventListener('click', e => { const b = e.target.closest('.branch'); if (b) openBranch(+b.dataset.k); });
[$('strip'), $('branches')].forEach(list => list.addEventListener('keydown', e => {
  if (!['ArrowRight','ArrowLeft'].includes(e.key)) return;
  const tabs = [...list.querySelectorAll('[role=tab]')]; const i = tabs.indexOf(document.activeElement);
  if (i < 0) return; const n = tabs[(i + (e.key==='ArrowRight'?1:-1) + tabs.length) % tabs.length];
  n.focus(); n.click(); e.preventDefault();
}));

openRole(0, false);

/* ===== Смена темы ===== */
$('themeBtn').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch(e){}
});
try { const t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch(e){}
