// Boot, render loop, event delegation and the dev drawer.
import { state, subscribe, emit, resetState, castVote, isOffline } from './store.js';
import { start, go, back, current, canGoBack, setQuery, query } from './router.js';
import { raw } from './i18n.js';
import { histBack } from './ui.js';
import screens from './data/screens.js';

const app = document.getElementById('app');
const IN_DEMO = new Set(screens.filter((s) => s.in_demo).map((s) => s.id));
// The Arabic reference boards are the same screens in Arabic.
const ALIAS = { AR1: ['A1', 'ar'], AR2: ['B3', 'ar'], AR3: ['E1', 'ar'] };

const cache = new Map();
function load(id) {
  if (!cache.has(id)) cache.set(id, import(`./screens/${id.toLowerCase()}.js`));
  return cache.get(id);
}

let mod = null;
let route = null;
let guards = [];
let painting = false;
let queued = false;
let freshNext = false;

const api = {
  go, back,
  guard(fn) { guards.push(fn); },
  rerender(o) { if (o && o.top) freshNext = true; schedule(); },
  toast,
};

function setLang(l, { silent = false } = {}) {
  state.lang = l === 'ar' ? 'ar' : 'en';
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  setQuery('lang', state.lang === 'ar' ? 'ar' : null);
  if (!silent) emit();
}

async function show(r) {
  let { id, params } = r;
  if (params.lang) {
    setLang(params.lang, { silent: true });
    delete params.lang;
  }
  if (ALIAS[id]) {
    setLang(ALIAS[id][1], { silent: true });
    go(ALIAS[id][0], params, { replace: true });
    return;
  }
  if (!IN_DEMO.has(id)) {
    go('A0', {}, { replace: true });
    return;
  }
  const m = await load(id);
  mod = m.default;
  route = { id, params };
  paint(true);
}

function schedule() {
  if (queued) return;
  queued = true;
  queueMicrotask(() => {
    queued = false;
    if (mod) paint(freshNext);
    freshNext = false;
  });
}

function paint(fresh) {
  if (painting) { schedule(); return; }
  painting = true;
  try {
    const oldBody = app.querySelector('.body');
    const keep = !fresh && oldBody ? oldBody.scrollTop : 0;
    const focusedId = !fresh && document.activeElement && document.activeElement.id;
    guards = [];
    app.innerHTML = mod.render(route.params, api);
    const root = app.firstElementChild;
    if (root) root.dataset.screen = route.id;
    app.querySelectorAll('[data-hist-slot]').forEach((slot) => {
      if (canGoBack()) slot.outerHTML = histBack(slot.dataset.histSlot === 'dark');
      else slot.remove();
    });
    if (mod.mount) mod.mount(root, route.params, api);
    const body = app.querySelector('.body');
    if (body && keep) body.scrollTop = keep;
    if (focusedId) {
      const f = document.getElementById(focusedId);
      if (f && f.focus) {
        f.focus({ preventScroll: true });
        if (f.setSelectionRange && /^(text|search|tel)$/.test(f.type)) {
          const n = f.value.length;
          try { f.setSelectionRange(n, n); } catch (err) { /* some inputs do not support it */ }
        }
      }
    }
    wireScrollHints();
    document.title = `TBKHTY Masters · ${route.id}`;
    devRefresh();
    prefetch(root);
  } finally {
    painting = false;
  }
}

function wireScrollHints() {
  app.querySelectorAll('.body').forEach((body) => {
    const hint = body.querySelector('[data-scroll-hint]');
    if (!hint) return;
    const upd = () => { hint.hidden = body.scrollHeight - body.clientHeight - body.scrollTop < 24; };
    body.addEventListener('scroll', upd, { passive: true });
    upd();
  });
}

// Fetch the modules this screen links to while the person reads it.
function prefetch(root) {
  const ids = new Set([...root.querySelectorAll('[data-to]')].map((a) => a.dataset.to));
  const run = () => ids.forEach((id) => {
    if (IN_DEMO.has(id)) load(id).catch(() => cache.delete(id));
  });
  if ('requestIdleCallback' in window) requestIdleCallback(run, { timeout: 2500 });
  else setTimeout(run, 800);
}

let toastTimer = null;
function toast(key) {
  let el = app.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    app.appendChild(el);
  }
  el.textContent = raw(key);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.remove(), 2400);
}

// ---------- Event delegation ----------
document.addEventListener('click', (e) => {
  const langBtn = e.target.closest('[data-lang]');
  if (langBtn) {
    if (langBtn.dataset.lang !== state.lang) setLang(langBtn.dataset.lang);
    return;
  }
  if (e.target.closest('[data-hist-back]')) {
    e.preventDefault();
    back('A1');
    return;
  }
  const f = e.target.closest('[data-follow]');
  if (f) {
    const id = f.dataset.follow;
    state.voter.follows[id] = !state.voter.follows[id];
    emit();
    return;
  }
  const tb = e.target.closest('[data-toast]');
  if (tb && !tb.matches('a[data-to]')) {
    toast(tb.dataset.toast);
    return;
  }
  const a = e.target.closest('a[data-to]');
  if (!a || !app.contains(a)) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey) return;
  e.preventDefault();
  if (a.getAttribute('aria-disabled') === 'true') return;
  let to = a.dataset.to;
  let params = a.dataset.params ? Object.fromEntries(new URLSearchParams(a.dataset.params)) : {};
  let replace = 'replace' in a.dataset;
  for (const g of guards) {
    const r = g(a);
    if (r === false) return;
    if (r && typeof r === 'object') {
      to = r.to || to;
      params = r.params || params;
      replace = r.replace ?? replace;
      if (r.back) { back(to, params); return; }
    }
  }
  if ('back' in a.dataset) back(to, params);
  else go(to, params, { replace });
});

// A vote queued while offline is sent the moment the phone is back online.
function flushQueued() {
  if (!state.queuedVote || isOffline()) return;
  const cook = state.queuedVote;
  castVote(cook);
  const r = current();
  if (r.id === 'E3') go('E4', { cook }, { replace: true });
}
window.addEventListener('online', flushQueued);
subscribe(schedule);

// ---------- Dev drawer (?dev=1 only) ----------
const DEV = query('dev') === '1';
let devEls = null;
const FORCES = [
  ['searchEmpty', 'Search: no results', 'E8'],
  ['firstCook', 'First cook in an area', 'J2'],
  ['locationDenied', 'Location denied', 'B3'],
  ['wrongCode', 'Wrong code', 'B2'],
  ['uploadFailed', 'Upload failed', 'B4'],
  ['rank12', 'Ranked 12 of 14', 'D1'],
  ['votingClosed', 'Voting closed', 'E2'],
  ['offline', 'Offline, vote queued', 'E2'],
];
function devInit() {
  if (!DEV) return;
  const fab = document.createElement('button');
  fab.className = 'dev-fab';
  fab.type = 'button';
  fab.textContent = 'DEV';
  const panel = document.createElement('div');
  panel.className = 'dev-panel';
  panel.hidden = true;
  const opts = screens.filter((s) => s.in_demo).map((s) => `<option value="${s.id}">${s.id} · ${s.name}</option>`).join('');
  panel.innerHTML = `<div>On screen</div><div class="cur-id" data-dev-cur></div>
    <h4>Jump to</h4><select data-dev-jump style="width:100%"><option value="">Choose a screen…</option>${opts}</select>
    <h4>Language</h4><div class="grid"><button type="button" data-dev-lang="en">English</button><button type="button" data-dev-lang="ar">العربية</button></div>
    <h4>Force a K3 state</h4><div class="grid">${FORCES.map(([k, l]) => `<button type="button" data-dev-force="${k}" aria-pressed="false">${l}</button>`).join('')}</div>
    <h4>Session</h4><button type="button" data-dev-reset style="width:100%">Reset demo to seeded state</button>`;
  const badgeEl = document.createElement('div');
  badgeEl.className = 'dev-id-badge';
  document.body.append(fab, panel, badgeEl);
  fab.addEventListener('click', () => { panel.hidden = !panel.hidden; });
  panel.addEventListener('change', (e) => {
    if (e.target.matches('[data-dev-jump]') && e.target.value) {
      go(e.target.value, e.target.value === 'E2' ? { cook: 'amira' } : {});
      e.target.value = '';
    }
  });
  panel.addEventListener('click', (e) => {
    const l = e.target.closest('[data-dev-lang]');
    if (l) setLang(l.dataset.devLang);
    const f = e.target.closest('[data-dev-force]');
    if (f) {
      const k = f.dataset.devForce;
      state.force[k] = !state.force[k];
      if (k === 'locationDenied') state.geo = { status: 'idle', area: null, accuracy: null };
      if (k === 'offline' && !state.force.offline) flushQueued();
      const target = FORCES.find((x) => x[0] === k)[2];
      if (state.force[k] && current().id !== target) go(target, target === 'E2' ? { cook: 'amira' } : {});
      else emit();
    }
    if (e.target.closest('[data-dev-reset]')) {
      resetState();
      go('A0', {}, { replace: true });
    }
  });
  devEls = { panel, badgeEl };
}
function devRefresh() {
  if (!devEls) return;
  devEls.panel.querySelector('[data-dev-cur]').textContent = route.id;
  devEls.badgeEl.textContent = route.id;
  devEls.panel.querySelectorAll('[data-dev-force]').forEach((b) => b.setAttribute('aria-pressed', String(!!state.force[b.dataset.devForce])));
  devEls.panel.querySelectorAll('[data-dev-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.devLang === state.lang)));
}

// ---------- Boot ----------
setLang(query('lang') === 'ar' ? 'ar' : 'en', { silent: true });
devInit();
start(show);
