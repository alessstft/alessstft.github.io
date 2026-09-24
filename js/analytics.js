/* ============================================================
   Статистика посещений → Google Таблица.
   Вставьте сюда ссылку веб-приложения из Apps Script (заканчивается на /exec).
   Пока строка пустая — ничего не отправляется.

   Чтобы не считать свои заходы: один раз откройте сайт с ?me в конце адреса,
   например https://alessstft.github.io/?me — этот браузер перестанет учитываться.
   Вернуть учёт: ?notme
   ============================================================ */
const ANALYTICS_URL = 'https://script.google.com/macros/s/AKfycbyZQ5by4yH897sc6_wJl8vwlyZiwPCYd45mumXLhP12O6ZoB7bznzr8PRO-XJOJKfxu-g/exec';

(function () {
  if (!ANALYTICS_URL) return;

  const params = new URLSearchParams(location.search);
  try {
    if (params.has('me')) localStorage.setItem('noTrack', '1');
    if (params.has('notme')) localStorage.removeItem('noTrack');
    if (localStorage.getItem('noTrack')) return;
  } catch (e) {}

  // Анонимный номер посетителя: помогает отличить новый заход от повторного
  let visitor = '—', visit = 1;
  try {
    visitor = localStorage.getItem('vid');
    if (!visitor) {
      visitor = Math.random().toString(36).slice(2, 8);
      localStorage.setItem('vid', visitor);
    }
    visit = (Number(localStorage.getItem('vcount')) || 0) + 1;
    localStorage.setItem('vcount', visit);
  } catch (e) {}

  const ua = navigator.userAgent;
  const os = /Windows/.test(ua) ? 'Windows' : /Android/.test(ua) ? 'Android'
           : /iPhone|iPad/.test(ua) ? 'iOS' : /Mac OS/.test(ua) ? 'macOS'
           : /Linux/.test(ua) ? 'Linux' : 'Другая';
  const browser = /YaBrowser/.test(ua) ? 'Яндекс Браузер' : /Edg\//.test(ua) ? 'Edge'
                : /OPR\//.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox'
                : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Другой';

  let referrer = 'Прямой заход';
  try { if (document.referrer) referrer = new URL(document.referrer).hostname; } catch (e) {}

  const base = {
    visitor, visit, referrer, os, browser,
    device: /Mobi|Android|iPhone/.test(ua) ? 'Телефон' : 'Компьютер',
    screen: screen.width + '×' + screen.height,
    lang: navigator.language,
    tz: Intl.DateTimeFormat().resolvedOptions().timeZone
  };

  function send(event, detail) {
    fetch(ANALYTICS_URL, {
      method: 'POST', mode: 'no-cors', keepalive: true,
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ ...base, event, detail: detail || '' })
    }).catch(() => {});
  }

  send('Заход на сайт');

  // Что смотрели и куда нажимали
  document.addEventListener('click', e => {
    const frame = e.target.closest('.frame');
    if (frame) return send('Открыли профессию', frame.querySelector('.cap').firstChild.textContent);
    const branch = e.target.closest('.branch');
    if (branch) return send('Открыли вкладку', document.getElementById('title').textContent + ' → ' + branch.textContent);
    const link = e.target.closest('.contacts a, .gh');
    if (link) return send('Нажали на ссылку', link.textContent);
  });
})();
