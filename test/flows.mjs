// Behaviour checks for PROMPT.md section 6: the things that must work when tapped.
// Run from the masters-demo folder:  node test/flows.mjs
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch (e) { pw = require(require.resolve('playwright', { paths: [execSync('npm root -g').toString().trim()] })); }

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.json': 'application/json' };
const server = http.createServer((req, res) => {
  const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const file = path.join(ROOT, p === '/' ? 'index.html' : p);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}/`;
const browser = await pw.chromium.launch();

async function page({ geo = true } = {}) {
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    ...(geo ? { geolocation: { latitude: 30.0561, longitude: 31.2001 }, permissions: ['geolocation'] } : {}),
  });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.fulfill({ status: 200, contentType: 'text/css', body: '' }));
  const p = await ctx.newPage();
  p.errors = [];
  p.on('pageerror', (e) => p.errors.push(e.message));
  return p;
}
const on = (p, id) => p.waitForSelector(`[data-screen="${id}"]`, { timeout: 5000 });
const tap = async (p, sel) => { await p.click(sel); await p.waitForTimeout(150); };
const store = (p, fn) => p.evaluate(async (src) => { const m = await import('./js/store.js'); return new Function('m', src)(m); }, fn);

const results = [];
async function check(name, fn) {
  try { await fn(); results.push([name, null]); console.log('PASS  ' + name); } catch (e) { results.push([name, e.message]); console.log('FAIL  ' + name + '\n   - ' + e.message); }
}
const assert = (c, m) => { if (!c) throw new Error(m); };

await check('Voting: verify sheet, 0000 is the wrong code, then the count, rank order and voted state update', async () => {
  const p = await page();
  await p.goto(BASE + '#/e2?cook=amira'); await on(p, 'E2');
  await tap(p, '[data-to="E3"]'); await on(p, 'E3');
  await p.fill('#v-wa', '10 5544 2211');
  await p.fill('#v-code', '0000');
  await p.fill('#v-name', 'Test Voter');
  await p.selectOption('#v-area', 'Mohandessin'); await p.waitForTimeout(150);
  await tap(p, '[data-to="E4"]');
  assert(await p.$('[data-k3="wrong-code"]'), 'wrong-code state not shown for 0000');
  assert((await store(p, 'return m.cookById("amira").votes')) === 388, 'vote counted despite wrong code');
  await p.fill('#v-code', '7261');
  await tap(p, '[data-to="E4"]'); await on(p, 'E4');
  assert((await store(p, 'return m.cookById("amira").votes')) === 389, 'vote not counted');
  assert(await store(p, 'return m.state.voter.votedToday.amira === true'), 'not marked voted');
  // Rank order live: push Hoda below Amira with 12 more votes for Amira.
  await store(p, 'for (let i = 0; i < 12; i++) m.castVote("amira"); return m.rankOf("amira")');
  assert((await store(p, 'return m.rankOf("amira")')) === 2, 'rank order did not update');
  // Back from E4 goes to the entry, and a second vote the same day shows the already-voted state.
  await p.goBack(); await on(p, 'E2');
  assert((await p.innerText('.pill.vote.voted, .btn')).length > 0, 'no vote control');
  await tap(p, '[data-to="E3"]'); await on(p, 'E6');
  assert(!p.errors.length, p.errors.join(' | '));
});

await check('Search filters by name, dish and area, with the no-results state', async () => {
  const p = await page();
  await p.goto(BASE + '#/e8'); await on(p, 'E8');
  await p.fill('#q', 'molokhia'); await p.waitForTimeout(400);
  let names = await p.$$eval('[data-link="Any search result"]', (a) => a.map((x) => x.innerText));
  assert(names.length === 1 && names[0].includes('Amira'), 'dish search: ' + names.join(','));
  await p.fill('#q', 'Zamalek'); await p.waitForTimeout(400);
  names = await p.$$eval('[data-link="Any search result"]', (a) => a.length);
  assert(names === 3, 'area search found ' + names);
  await p.fill('#q', 'hoda'); await p.waitForTimeout(400);
  assert((await p.$$('[data-link="Any search result"]')).length === 1, 'name search');
  await p.fill('#q', 'mervat'); await p.waitForTimeout(400);
  assert(await p.$('[data-k3="search-empty"]'), 'no-results state missing');
});

await check('Signup B1 to B6 creates a 15th cook who appears in the feed, search and leaderboard', async () => {
  const p = await page();
  await p.goto(BASE + '#/b1'); await on(p, 'B1');
  await tap(p, '[data-link="Enter now"]'); await on(p, 'B2');
  await p.fill('#b-wa', '10 2345 6789'); await p.fill('#b-code', '4913');
  await tap(p, '[data-to="B3"]'); await on(p, 'B3');
  await p.fill('#b-name', 'Laila Testcook');
  await p.waitForSelector('[data-to="B3b"]', { timeout: 5000 }); // pin confirmed from the geolocation call
  assert((await store(p, 'return m.state.signup.area')) === 'Mohandessin', 'nearest area not preselected');
  await tap(p, '.bar [data-to="B3d"]'); await on(p, 'B3d');
  await tap(p, '[data-to="B4"]'); await on(p, 'B4');
  await p.fill('#b-dish', 'Roz Me3ammar'); await p.fill('#b-story', 'Baked in clay like my aunt does.');
  await tap(p, '[data-to="B5"]'); await on(p, 'B5');
  await tap(p, '[data-to="B6"]'); await on(p, 'B6');
  assert((await store(p, 'return m.state.cooks.length')) === 15, 'no 15th cook');
  await p.evaluate(async () => (await import('./js/router.js')).go('E1')); await on(p, 'E1');
  assert((await p.innerText('.feed')).includes('Laila Testcook'), 'not in feed');
  await p.evaluate(async () => (await import('./js/router.js')).go('F1')); await on(p, 'F1');
  assert((await p.innerText('.body')).includes('Laila Testcook'), 'not on leaderboard');
  await p.evaluate(async () => (await import('./js/router.js')).go('E8')); await on(p, 'E8');
  await p.fill('#q', 'laila'); await p.waitForTimeout(400);
  assert((await p.$$('[data-link="Any search result"]')).length === 1, 'not in search');
  assert(!p.errors.length, p.errors.join(' | '));
});

await check('All 27 governorates are offered, and one without listed areas can still enter', async () => {
  const p = await page({ geo: false });
  await p.goto(BASE + '#/b3d'); await on(p, 'B3d');
  const govs = await p.$$eval('#s-gov option', (o) => o.map((x) => x.value));
  assert(govs.length === 27, 'governorates offered: ' + govs.length);
  await p.selectOption('#s-gov', 'luxor'); await p.waitForTimeout(200);
  assert((await store(p, 'return m.state.signup.area')) === 'gov-luxor', 'Luxor not selected as the area');
  await tap(p, '[data-to="B4"]'); await on(p, 'B4');
});

await check('Cairo, Giza and Alexandria have full area lists, and compounds follow the governorate', async () => {
  const p = await page({ geo: false });
  await p.goto(BASE + '#/b3d'); await on(p, 'B3d');
  await p.selectOption('#s-gov', 'cairo'); await p.waitForTimeout(200);
  const cairo = await p.$$eval('#s-area option', (o) => o.map((x) => x.value));
  assert(cairo.includes('Zamalek') && cairo.includes('Heliopolis') && cairo.length > 30, 'Cairo areas: ' + cairo.length);
  const cc = await p.$$eval('#s-compound option', (o) => o.map((x) => x.value));
  assert(cc.includes('Mivida'), 'Mivida missing for Cairo');
  await p.selectOption('#s-gov', 'giza'); await p.waitForTimeout(200);
  const gc = await p.$$eval('#s-compound option', (o) => o.map((x) => x.value));
  assert(gc.includes('New Giza') && !gc.includes('Mivida'), 'Giza compounds wrong');
  await p.selectOption('#s-area', 'Imbaba'); await p.selectOption('#s-compound', 'New Giza');
  assert((await store(p, 'return m.state.signup.compound')) === 'New Giza', 'compound not saved');
  await p.selectOption('#s-gov', 'alexandria'); await p.waitForTimeout(200);
  const alex = await p.$$eval('#s-area option', (o) => o.length);
  assert(alex > 40, 'Alexandria areas: ' + alex);
});

await check('Location denied shows the K3 state and falls through to the manual area picker', async () => {
  const p = await page({ geo: false });
  await p.goto(BASE + '#/b3'); await on(p, 'B3');
  await p.waitForSelector('[data-k3="location-denied"]', { timeout: 12000 });
  await tap(p, '[data-k3="location-denied"] [data-to="B3d"]'); await on(p, 'B3d');
  assert(await p.$('#s-area'), 'no manual picker');
  const stored = await store(p, 'return JSON.stringify(m.state.geo)');
  assert(!/\d{2}\.\d{3}/.test(stored), 'a coordinate was stored');
});

await check('Photo input previews locally; a file over 10MB shows the upload-failed state', async () => {
  const p = await page();
  await p.goto(BASE + '#/b4'); await on(p, 'B4');
  const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  await p.setInputFiles('[data-file]', { name: 'dish.png', mimeType: 'image/png', buffer: png }); await p.waitForTimeout(200);
  assert((await store(p, 'return m.state.signup.dishPhoto || ""')).startsWith('blob:'), 'no local preview');
  await p.setInputFiles('[data-file]', { name: 'huge.jpg', mimeType: 'image/jpeg', buffer: Buffer.alloc(11 * 1024 * 1024) }); await p.waitForTimeout(300);
  assert(await p.$('[data-k3="upload-failed"]'), 'upload-failed state missing');
});

await check('Nomination is recorded and the C3 ladder advances', async () => {
  const p = await page();
  await p.goto(BASE + '#/c1'); await on(p, 'C1');
  await p.fill('#n-name', 'Salma Ezzat'); await p.fill('#n-wa', '10 8877 4321'); await p.fill('#n-by', 'Test');
  await tap(p, '[data-to="C2"]'); await on(p, 'C2');
  await p.evaluate(async () => (await import('./js/router.js')).go('C3')); await on(p, 'C3');
  const t = await p.innerText('.body');
  assert(t.includes('You found 4 cooks'), 'count did not move');
  assert(t.includes('3 of 4'), 'ladder did not advance to the top-3 rung');
});

await check('Offline: the vote is queued, then sent when the phone is back online', async () => {
  const p = await page();
  await p.goto(BASE + '#/e3?cook=salma'); await on(p, 'E3');
  await store(p, 'm.state.force.offline = true; m.emit(); return 1');
  await p.fill('#v-wa', '10 5544 2211'); await p.fill('#v-code', '1111');
  await p.selectOption('#v-area', 'Dokki'); await p.waitForTimeout(150);
  await tap(p, '[data-to="E4"]');
  assert(await p.$('[data-k3="offline"]'), 'offline state missing');
  assert((await store(p, 'return m.cookById("salma").votes')) === 412, 'counted while offline');
  await store(p, 'm.state.force.offline = false; window.dispatchEvent(new Event("online")); return 1');
  await on(p, 'E4');
  assert((await store(p, 'return m.cookById("salma").votes')) === 413, 'queued vote not sent');
});

await check('Language toggle sets dir, swaps strings, persists across screens and in the URL', async () => {
  const p = await page();
  await p.goto(BASE + '#/a1'); await on(p, 'A1');
  await tap(p, '[data-lang="ar"]');
  assert((await p.evaluate(() => document.documentElement.dir)) === 'rtl', 'dir not rtl');
  assert(p.url().includes('lang=ar'), 'lang not in URL');
  assert((await p.innerText('h1')).includes('طبختي'), 'strings not swapped');
  await tap(p, '[data-to="E8"]'); await on(p, 'E8');
  assert((await p.evaluate(() => document.documentElement.lang)) === 'ar', 'language lost on navigation');
  await p.reload(); await on(p, 'E8');
  assert((await p.evaluate(() => document.documentElement.dir)) === 'rtl', 'language lost on reload');
});

await check('Dev drawer is absent without ?dev=1 and present with it', async () => {
  const p = await page();
  await p.goto(BASE + '#/a0'); await on(p, 'A0');
  assert(!(await p.$('.dev-fab')), 'drawer visible without ?dev=1');
  await p.goto(BASE + '?dev=1#/a0'); await on(p, 'A0');
  assert(await p.$('.dev-fab'), 'drawer missing with ?dev=1');
  await p.click('.dev-fab');
  await p.click('[data-dev-force="rank12"]'); await on(p, 'D1');
  assert(await p.$('[data-k3="rank-low"]'), 'forced #12 state missing');
  assert((await p.innerText('[data-dev-cur]')) === 'D1', 'current id not shown');
});

await browser.close();
server.close();
const bad = results.filter((r) => r[1]);
console.log(`\n${results.length - bad.length} of ${results.length} flows passed.`);
process.exit(bad.length ? 1 : 0);
