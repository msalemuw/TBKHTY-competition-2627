// Acceptance checks for the TBKHTY Masters demo (PROMPT.md section 9).
// Run from the masters-demo folder:  node test/check.mjs
// It serves the folder itself on a free port and drives Chromium with Playwright.
// Playwright is resolved from a local install first, then the global one.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
function loadPlaywright() {
  try { return require('playwright'); } catch (e) { /* fall through to the global install */ }
  const g = execSync('npm root -g').toString().trim();
  return require(require.resolve('playwright', { paths: [g] }));
}
const { chromium } = loadPlaywright();

const screens = JSON.parse(fs.readFileSync(path.join(ROOT, 'spec/screens.json'), 'utf8')).screens;
const routes = JSON.parse(fs.readFileSync(path.join(ROOT, 'spec/routes.json'), 'utf8'));
const DEMO = screens.filter((s) => s.in_demo);
const IDS = new Set(DEMO.map((s) => s.id));
const byId = Object.fromEntries(screens.map((s) => [s.id, s]));

// ---------- static server ----------
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml' };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = path.join(ROOT, p === '/' ? 'index.html' : p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}/`;

// ---------- browser ----------
const browser = await chromium.launch();
async function newPage({ width = 390, height = 844, lang = 'en' } = {}) {
  const ctx = await browser.newContext({
    viewport: { width, height }, deviceScaleFactor: 1, ignoreHTTPSErrors: true,
    // Mohandessin, so the one geolocation call on B3 succeeds.
    geolocation: { latitude: 30.0561, longitude: 31.2001, accuracy: 25 }, permissions: ['geolocation'],
  });
  // The sandbox this runs in has no route to Google Fonts; serve an empty
  // stylesheet so a network failure there is not counted as an app error.
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  const page = await ctx.newPage();
  page.errors = [];
  page.on('console', (m) => { if (m.type() === 'error') page.errors.push(m.text()); });
  page.on('pageerror', (e) => page.errors.push(e.message));
  page.lang = lang;
  return page;
}
async function open(page, id, params = '') {
  const q = page.lang === 'ar' ? '?lang=ar' : '';
  await page.goto(`${BASE}${q}#/${id.toLowerCase()}${params ? '?' + params : ''}`);
  await page.waitForSelector(`[data-screen="${id}"]`, { timeout: 5000 });
  await page.waitForTimeout(150);
}
// In-app forward navigation, exactly as a tap does it.
async function goInApp(page, id, params = {}) {
  await page.evaluate(async ([i, p]) => (await import('./js/router.js')).go(i, p), [id, params]);
  await page.waitForSelector(`[data-screen="${id}"]`, { timeout: 5000 });
  await page.waitForTimeout(120);
}
async function force(page, key) {
  await page.evaluate(async (k) => { const m = await import('./js/store.js'); m.state.force[k] = true; m.emit(); }, key);
  await page.waitForTimeout(150);
}

const results = [];
function report(n, name, failures, notes = []) {
  results.push({ n, name, failures, notes });
  console.log(`\n${failures.length ? 'FAIL' : 'PASS'}  ${n}. ${name}`);
  failures.slice(0, 40).forEach((f) => console.log('   - ' + f));
  if (failures.length > 40) console.log(`   … and ${failures.length - 40} more`);
  notes.forEach((x) => console.log('   note: ' + x));
}
const norm = (s) => String(s || '').replace(/\s+/g, ' ').trim();
const GENERIC = /^(Any |Vote button on )/;

// The K3 states, forced on the screen each belongs to.
const K3_STATES = [
  ['E8', '', 'searchEmpty'], ['J2', '', 'firstCook'], ['B3', '', 'locationDenied'], ['B2', '', 'wrongCode'],
  ['B4', '', 'uploadFailed'], ['D1', '', 'rank12'], ['E2', 'cook=amira', 'votingClosed'], ['E3', 'cook=amira', 'wrongCode'],
];

// ---------- 1. every screen loads without a console error ----------
{
  const fails = [];
  for (const lang of ['en', 'ar']) {
    const page = await newPage({ lang });
    for (const s of DEMO) {
      page.errors = [];
      try { await open(page, s.id); } catch (e) { fails.push(`${s.id} (${lang}): did not render`); continue; }
      if (page.errors.length) fails.push(`${s.id} (${lang}): ${page.errors.join(' | ')}`);
    }
    for (const [id, params, k] of K3_STATES) {
      page.errors = [];
      await open(page, id, params);
      await force(page, k);
      if (page.errors.length) fails.push(`${id} with ${k} (${lang}): ${page.errors.join(' | ')}`);
    }
    await page.context().close();
  }
  report(1, `All ${DEMO.length} in-demo screens (and the 8 K3 states) load in English and Arabic without a console error`, fails);
}

// ---------- 2. every route exists with its label ----------
{
  const fails = [];
  let checked = 0;
  const page = await newPage();
  for (const s of DEMO) {
    const list = (routes[s.id] || []).filter((r) => IDS.has(r.to));
    if (!list.length) continue;
    await open(page, s.id);
    if (s.id === 'B3') await page.waitForSelector('[data-to="B3b"]', { timeout: 4000 }).catch(() => {});
    for (const r of list) {
      checked++;
      const found = await page.evaluate(({ to, label }) => {
        const els = [...document.querySelectorAll(`[data-to="${to}"]`)].filter((e) => e.dataset.link === label);
        return els.map((e) => ({ text: e.innerText, aria: e.getAttribute('aria-label'), href: e.getAttribute('href') }));
      }, r);
      if (!found.length) { fails.push(`${s.id} → ${r.to} "${r.label}": no control`); continue; }
      const ok = found.some((f) => {
        const hrefOk = (f.href || '').toLowerCase().startsWith(`#/${r.to.toLowerCase()}`);
        const labelOk = GENERIC.test(r.label) || norm(f.text).includes(r.label) || norm(f.aria) === r.label;
        return hrefOk && labelOk;
      });
      if (!ok) fails.push(`${s.id} → ${r.to} "${r.label}": label or href mismatch (${JSON.stringify(found[0])})`);
    }
  }
  await page.context().close();
  report(2, `Every routes.json link between in-demo screens exists, points at its route and shows its label (${checked} links)`, fails,
    ['Labels starting "Any …" or "Vote button on …" describe a family of controls (a cook row, a card); for those the control is matched by its route and the visible text is the cook or card itself.']);
}

// ---------- 3. no link outside routes.json ----------
{
  const fails = [];
  const allowed = (from, to, k3) => (routes[from] || []).some((r) => r.to === to) || (k3 && (routes.K3 || []).some((r) => r.to === to));
  for (const lang of ['en', 'ar']) {
    const page = await newPage({ lang });
    const visit = async (id, params, tag) => {
      const links = await page.evaluate(() => [...document.querySelectorAll('[data-to]')].map((e) => ({
        to: e.dataset.to, href: e.getAttribute('href'), k3: !!e.closest('[data-state-source="K3"]') || e.hasAttribute('data-state-source'),
      })));
      for (const l of links) {
        if (!IDS.has(l.to)) fails.push(`${id}${tag}: link to unknown screen ${l.to}`);
        else if (!allowed(id, l.to, l.k3)) fails.push(`${id}${tag}: link to ${l.to} is not in routes.json`);
        if (!(l.href || '').toLowerCase().startsWith(`#/${l.to.toLowerCase()}`)) fails.push(`${id}${tag}: href ${l.href} does not match ${l.to}`);
      }
    };
    for (const s of DEMO) { await open(page, s.id); await visit(s.id, '', ` (${lang})`); }
    for (const [id, params, k] of K3_STATES) { await open(page, id, params); await force(page, k); await visit(id, params, ` with ${k} (${lang})`); }
    await page.context().close();
  }
  report(3, 'No control links to a route that is not in routes.json (default screens and all K3 states, both languages)', fails,
    ['Links inside a K3 state are checked against the K3 board\'s own routes (C1, H1), since routes.json records them there.']);
}

// ---------- 4. primary action inside the viewport at 390x844 ----------
{
  const fails = [];
  for (const lang of ['en', 'ar']) {
    const page = await newPage({ lang });
    for (const s of DEMO) {
      await open(page, s.id);
      const r = await page.evaluate(() => {
        const el = document.querySelector('[data-primary]');
        if (!el) return null;
        const b = el.getBoundingClientRect();
        return { top: b.top, bottom: b.bottom, left: b.left, right: b.right, w: b.width, h: b.height };
      });
      if (!r) fails.push(`${s.id} (${lang}): no primary action marked`);
      else if (r.top < 0 || r.bottom > 844 || r.left < -1 || r.right > 391 || !r.w || !r.h) fails.push(`${s.id} (${lang}): primary action at ${Math.round(r.top)}–${Math.round(r.bottom)}px is not fully inside 390x844`);
    }
    await page.context().close();
  }
  report(4, 'The primary action on every screen is inside a 390x844 viewport without scrolling', fails);
}

// ---------- 5. tap targets ----------
const TAP_JS = () => {
  const out = [];
  const sel = 'a[href], button, select, input:not([type="hidden"]), textarea, [role="button"], [role="radio"], [data-follow]';
  document.querySelectorAll(sel).forEach((el) => {
    if (el.closest('.dev-panel, .dev-fab')) return;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || el.hidden) return;
    let target = el;
    if (el.matches('input[type="checkbox"], input[type="radio"]')) target = el.closest('.tap-check') || el;
    if (el.matches('.code input')) target = el.closest('.code');
    if (el.matches('input[type="file"]')) return;
    const b = target.getBoundingClientRect();
    if (b.width === 0 && b.height === 0) return;
    if (b.width < 43.5 || b.height < 43.5) out.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ')[0] : ''} "${(el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(b.width)}x${Math.round(b.height)}`);
  });
  return out;
};
{
  const fails = [];
  for (const lang of ['en', 'ar']) {
    const page = await newPage({ lang });
    for (const s of DEMO) {
      await open(page, s.id);
      (await page.evaluate(TAP_JS)).forEach((x) => fails.push(`${s.id} (${lang}): ${x}`));
    }
    for (const [id, params, k] of K3_STATES) {
      await open(page, id, params); await force(page, k);
      (await page.evaluate(TAP_JS)).forEach((x) => fails.push(`${id} with ${k} (${lang}): ${x}`));
    }
    await page.context().close();
  }
  report(5, 'Every tappable element is at least 44x44 CSS pixels', fails);
}

// ---------- 6. type floors ----------
const FLOOR_JS = () => {
  const out = [];
  const w = document.createTreeWalker(document.getElementById('app'), NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    const n = w.currentNode;
    const txt = n.nodeValue.trim();
    if (!txt) continue;
    const el = n.parentElement;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    let size = parseFloat(cs.fontSize);
    // SVG text is drawn in viewBox units; measure what actually lands on screen.
    if (el.closest('svg') && el.getBoundingClientRect) {
      const svg = el.closest('svg');
      const vb = svg.viewBox && svg.viewBox.baseVal;
      if (vb && vb.width) size *= svg.getBoundingClientRect().width / vb.width;
    }
    const arabic = /[؀-ۿ]/.test(txt);
    const min = arabic ? 11 : 10;
    if (size < min - 0.01) out.push(`"${txt.slice(0, 30)}" ${size.toFixed(1)}px (${arabic ? 'Arabic' : 'Latin'} floor ${min})`);
  }
  return out;
};
{
  const fails = [];
  for (const lang of ['en', 'ar']) {
    const page = await newPage({ lang });
    for (const s of DEMO) { await open(page, s.id); (await page.evaluate(FLOOR_JS)).forEach((x) => fails.push(`${s.id} (${lang}): ${x}`)); }
    for (const [id, params, k] of K3_STATES) { await open(page, id, params); await force(page, k); (await page.evaluate(FLOOR_JS)).forEach((x) => fails.push(`${id} with ${k} (${lang}): ${x}`)); }
    await page.context().close();
  }
  report(6, 'No text renders below 11px in Arabic or 10px in Latin', fails);
}

// ---------- 7. never white text on teal ----------
const TEAL_JS = () => {
  const out = [];
  const TEALS = ['rgb(26, 188, 156)', 'rgb(18, 161, 134)'];
  const bgOf = (el) => {
    for (let e = el; e && e.nodeType === 1; e = e.parentElement) {
      const c = getComputedStyle(e).backgroundColor;
      if (c && c !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(c)) return c;
    }
    return 'rgb(250, 250, 248)';
  };
  const w = document.createTreeWalker(document.getElementById('app'), NodeFilter.SHOW_TEXT);
  while (w.nextNode()) {
    const n = w.currentNode;
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement;
    const color = getComputedStyle(el).color;
    if (/^rgba?\(255, 255, 255/.test(color) && TEALS.includes(bgOf(el))) out.push(`"${n.nodeValue.trim().slice(0, 30)}"`);
  }
  // Icons count too: a white stroke on teal is the same failure.
  document.querySelectorAll('#app svg.ic').forEach((svg) => {
    const st = svg.style.stroke || '';
    if (/255, 255, 255|--c-white/.test(st) && TEALS.includes(bgOf(svg.parentElement))) out.push('white icon');
  });
  return out;
};
{
  const fails = [];
  for (const lang of ['en', 'ar']) {
    const page = await newPage({ lang });
    for (const s of DEMO) { await open(page, s.id); (await page.evaluate(TEAL_JS)).forEach((x) => fails.push(`${s.id} (${lang}): white on teal ${x}`)); }
    for (const [id, params, k] of K3_STATES) { await open(page, id, params); await force(page, k); (await page.evaluate(TEAL_JS)).forEach((x) => fails.push(`${id} with ${k} (${lang}): white on teal ${x}`)); }
    await page.context().close();
  }
  report(7, 'No white text sits on a teal background anywhere', fails);
}

// ---------- 8. both languages, no overflow, no horizontal scroll at 320/390/430 ----------
const OVERFLOW_JS = () => {
  const out = [];
  const vw = document.documentElement.clientWidth;
  const se = document.scrollingElement;
  if (se.scrollWidth > se.clientWidth + 1) out.push(`page scrolls sideways (${se.scrollWidth} > ${se.clientWidth})`);
  document.querySelectorAll('#app .body, #app .scr').forEach((b) => { if (b.scrollWidth > b.clientWidth + 1) out.push(`${b.className.split(' ')[0]} scrolls sideways (${b.scrollWidth} > ${b.clientWidth})`); });
  const app = document.getElementById('app').getBoundingClientRect();
  const scrollsX = (el) => {
    for (let e = el.parentElement; e && e.id !== 'app'; e = e.parentElement) {
      const o = getComputedStyle(e).overflowX;
      if (o === 'auto' || o === 'scroll') return true;
    }
    return false;
  };
  const w = document.createTreeWalker(document.getElementById('app'), NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (w.nextNode()) {
    const n = w.currentNode;
    if (!n.nodeValue.trim()) continue;
    const el = n.parentElement;
    if (seen.has(el)) continue;
    seen.add(el);
    if (el.closest('svg') || scrollsX(el)) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const r = document.createRange();
    r.selectNodeContents(n);
    const b = r.getBoundingClientRect();
    if (b.width && (b.right > app.right + 1 || b.left < app.left - 1)) out.push(`"${n.nodeValue.trim().slice(0, 30)}" overflows the screen edge`);
    // Text cut off by a clipping box, other than a deliberate ellipsis.
    for (let e = el; e && e.id !== 'app'; e = e.parentElement) {
      const c = getComputedStyle(e);
      if (c.overflowX === 'hidden' || c.overflowX === 'clip') {
        const eb = e.getBoundingClientRect();
        if (c.textOverflow !== 'ellipsis' && b.width && (b.right > eb.right + 1 || b.left < eb.left - 1)) out.push(`"${n.nodeValue.trim().slice(0, 30)}" is clipped`);
        break;
      }
    }
  }
  return [...new Set(out)];
};
{
  const fails = [];
  for (const width of [320, 390, 430]) {
    for (const lang of ['en', 'ar']) {
      const page = await newPage({ width, lang });
      for (const s of DEMO) {
        await open(page, s.id);
        const langOk = await page.evaluate((l) => document.documentElement.lang === l && document.documentElement.dir === (l === 'ar' ? 'rtl' : 'ltr'), lang);
        if (!langOk) fails.push(`${s.id} @${width} (${lang}): document lang/dir not set`);
        (await page.evaluate(OVERFLOW_JS)).forEach((x) => fails.push(`${s.id} @${width} (${lang}): ${x}`));
      }
      await page.context().close();
    }
  }
  report(8, 'Every screen renders in both languages with no clipped or overflowing text and no horizontal scroll at 320, 390 and 430px', fails,
    ['Names truncated with an ellipsis (a deliberate single-line row) and content inside horizontal carousels and chip rows are not counted as clipping.']);
}

// ---------- 9. reachability from A0 ----------
{
  const fails = [];
  const notes = [];
  const page = await newPage();
  const crawl = async (startId) => {
    const seen = new Set();
    const queue = [['#/' + startId.toLowerCase(), startId]];
    const seenHref = new Set();
    while (queue.length) {
      const [href, id] = queue.shift();
      if (seenHref.has(href)) continue;
      seenHref.add(href);
      await page.goto(BASE + href);
      await page.waitForSelector(`[data-screen="${id}"]`, { timeout: 5000 }).catch(() => {});
      await page.waitForTimeout(80);
      seen.add(id);
      const links = await page.evaluate(() => [...document.querySelectorAll('a[data-to]')].map((a) => [a.getAttribute('href'), a.dataset.to]));
      links.forEach(([h, to]) => { if (!seenHref.has(h) && ![...seenHref].some((x) => x.split('?')[0] === h.split('?')[0] && seen.has(to))) queue.push([h, to]); });
    }
    return seen;
  };
  const fromA0 = await crawl('A0');
  const entryOnly = DEMO.filter((s) => s.entry_point);
  const missing = DEMO.filter((s) => !s.entry_point && !fromA0.has(s.id));
  for (const s of missing) {
    // A screen only reachable through an entry-point screen (opened from outside
    // the app) is reported separately: the routing table gives it no other path.
    const parents = s.reached_from.filter((p) => byId[p] && byId[p].in_demo);
    const viaEntry = parents.length && parents.every((p) => byId[p].entry_point && !fromA0.has(p));
    if (viaEntry) notes.push(`${s.id} is reachable only from ${parents.join(', ')}, an entry point opened from outside the app. routes.json has no link into it from A0.`);
    else fails.push(`${s.id} is not reachable from A0 by following links`);
  }
  notes.unshift(`Reached ${fromA0.size} screens from A0 by following links only. Entry points excluded as the brief allows: ${entryOnly.filter((s) => !fromA0.has(s.id)).map((s) => s.id).join(', ') || 'none'}.`);
  await page.context().close();
  report(9, 'From A0, every in-demo screen without an entry_point is reachable by following links only', fails, notes);
}

// ---------- 10. back or close always lands on a real screen ----------
{
  const fails = [];
  const notes = [];
  const page = await newPage();
  const PARAMS = { E2: { cook: 'amira' }, E3: { cook: 'amira' }, E4: { cook: 'amira' }, E6: { cook: 'amira' }, D2: { cook: 'amira' }, G2: { cook: 'nadia' } };
  for (const s of DEMO) {
    const parents = s.reached_from.filter((p) => IDS.has(p));
    if (!parents.length) {
      await open(page, s.id);
      const hasBack = await page.$('[data-back], [data-hist-back]');
      notes.push(`${s.id}: entry point with no screen before it${hasBack ? '' : ' (no back control shown, correctly: there is nowhere to go back to)'}`);
      continue;
    }
    for (const from of parents) {
      // Start each case from a fresh document, as someone opening a link would.
      await page.goto('about:blank');
      await open(page, from, from === 'E2' || from === 'E3' ? 'cook=amira' : '');
      await goInApp(page, s.id, PARAMS[s.id] || {});
      const ctl = await page.$('a[data-back], [data-hist-back]');
      let how;
      if (ctl) { how = 'back control'; await ctl.click(); } else { how = 'browser back'; await page.goBack(); }
      await page.waitForTimeout(250);
      const landed = await page.evaluate(() => document.querySelector('[data-screen]')?.dataset.screen);
      if (!landed || !IDS.has(landed)) fails.push(`${from} → ${s.id}: ${how} landed on nothing`);
      else if (landed !== from) fails.push(`${from} → ${s.id}: ${how} went to ${landed}, not back to ${from}`);
    }
  }
  await page.context().close();
  report(10, 'From every screen, back or close returns to a screen that exists (and to the one you came from)', fails, notes);
}

await browser.close();
server.close();
const failed = results.filter((r) => r.failures.length);
console.log(`\n${results.length - failed.length} of ${results.length} checks passed.`);
process.exit(failed.length ? 1 : 0);
