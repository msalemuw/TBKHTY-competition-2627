// Hash routing: #/a0, #/e2?cook=amira. The language and the dev flag live in
// the real query string (?lang=ar, ?dev=1) so a shared link opens in Arabic.
// History entries are tracked so Back returns to the screen you came from.

let entries = [];
let idx = 0;
let onChange = () => {};

export function href(id, params) {
  const q = params ? new URLSearchParams(params).toString() : '';
  return `#/${id.toLowerCase()}${q ? '?' + q : ''}`;
}

export function parse(hash = location.hash) {
  const m = hash.replace(/^#\/?/, '');
  const [path, query] = m.split('?');
  const params = Object.fromEntries(new URLSearchParams(query || ''));
  const id = (path || 'a0').replace(/\/.*/, '');
  return { id: normId(id), params };
}
// Screen ids are case sensitive in the spec (B3a, B3b, B3d).
export function normId(id) {
  const s = id.toUpperCase();
  return s.replace(/^(B3)([ABD])$/, (m, a, b) => a + b.toLowerCase());
}
const key = (r) => href(r.id, r.params);
const same = (a, b) => a && b && key(a) === key(b);

export const current = () => entries[idx] || parse();
export const canGoBack = () => idx > 0;
export const previous = () => (idx > 0 ? entries[idx - 1] : null);

export function start(cb) {
  onChange = cb;
  const r = parse();
  if (history.state && typeof history.state.i === 'number' && Array.isArray(history.state.trail)) {
    // A reload keeps the trail so Back still works.
    entries = history.state.trail.map(parse);
    idx = history.state.i;
    entries[idx] = r;
  } else {
    entries = [r];
    idx = 0;
  }
  save(true);
  window.addEventListener('popstate', (e) => {
    const r2 = parse();
    if (e.state && typeof e.state.i === 'number') {
      idx = e.state.i;
      entries[idx] = r2;
    } else {
      // Someone edited the hash by hand: treat it as a forward step.
      entries = entries.slice(0, idx + 1);
      entries.push(r2);
      idx = entries.length - 1;
      save(true);
    }
    onChange(r2);
  });
  onChange(r);
}

function save(replace) {
  const st = { i: idx, trail: entries.slice(0, idx + 1).map(key) };
  const url = location.pathname + location.search + key(entries[idx]);
  if (replace) history.replaceState(st, '', url);
  else history.pushState(st, '', url);
}

export function go(id, params = {}, { replace = false } = {}) {
  const r = { id: normId(id), params: params || {} };
  // Going to the screen we just came from is a step back, not a new step.
  if (!replace && same(entries[idx - 1], r)) {
    history.back();
    return;
  }
  if (replace) {
    entries[idx] = r;
  } else {
    entries = entries.slice(0, idx + 1);
    entries.push(r);
    idx++;
  }
  save(replace);
  onChange(r);
}

export function back(fallbackId, fallbackParams) {
  if (idx > 0) {
    history.back();
    return;
  }
  go(fallbackId || 'A0', fallbackParams || {}, { replace: true });
}

// Rewrites the query string (lang, dev) without touching the route.
export function setQuery(name, value) {
  const u = new URL(location.href);
  if (value == null) u.searchParams.delete(name);
  else u.searchParams.set(name, value);
  history.replaceState(history.state, '', u.pathname + u.search + u.hash);
}
export const query = (name) => new URL(location.href).searchParams.get(name);
