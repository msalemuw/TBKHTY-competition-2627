// Shared components, built from the K1 (posts and profiles) and K2
// (foundations) boards. Every function returns an HTML string.
import { ICONS, TRIS } from './icons-data.js';
import { DISH_ART, AVATAR_ART, BADGE_ART } from './art-data.js';
import { t, ta, alt, raw, esc, sub, L, LO, isAr, otherLang, has } from './i18n.js';
import { state, rankOf, votingOpen, edition, AREAS, GOVERNORATES } from './store.js';
import { href } from './router.js';

// ---------- Icons ----------
export function icon(name, { size = 20, color = 'currentColor', sw = 2, fill = 'none', cls = '' } = {}) {
  const body = ICONS[name] || '';
  return `<svg class="ic ${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" style="fill:${fill};stroke:${color};stroke-width:${sw};stroke-linecap:round;stroke-linejoin:round;flex:none">${body}</svg>`;
}
export const chev = (dir = 'R', o = {}) => icon(dir === 'L' ? 'chevL' : dir === 'D' ? 'chevD' : 'chevR', { size: 18, sw: 2.2, color: 'var(--c-muted)', cls: dir === 'D' ? '' : 'flip', ...o });
export function tri(up) {
  return `<svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true" style="fill:currentColor;flex:none">${up ? TRIS.triUp : TRIS.triDown}</svg>`;
}
export function move(n) {
  if (!n) return '<span class="mv flat">–</span>';
  return `<span class="mv ${n > 0 ? 'up' : 'down'}">${tri(n > 0)}${Math.abs(n)}</span>`;
}

// ---------- Links ----------
// Every navigating control is an <a> with data-to (the screen id) and
// data-link (its label in routes.json), so the acceptance script can find it.
export function linkAttrs(to, { params = null, link = '', back = false, replace = false } = {}) {
  let a = `href="${href(to, params)}" data-to="${to}"`;
  if (params) a += ` data-params="${esc(new URLSearchParams(params).toString())}"`;
  if (link) a += ` data-link="${esc(link)}"`;
  if (back) a += ' data-back';
  if (replace) a += ' data-replace';
  return a;
}

// ---------- Language toggle ----------
export function langToggle(dark = false) {
  const on = state.lang;
  return `<div class="lang${dark ? ' on-dark' : ''}" role="group" aria-label="${ta('lang.group')}">`
    + `<button type="button" lang="en" data-lang="en" aria-pressed="${on === 'en'}" aria-label="English"><span>EN</span></button>`
    + `<button type="button" lang="ar" data-lang="ar" aria-pressed="${on === 'ar'}" aria-label="العربية"><span>ع</span></button></div>`;
}

// ---------- App bars ----------
export function backBtn(to, { params = null, dark = false, float = false, link = 'Back' } = {}) {
  const cls = float ? 'icon-btn float' : `icon-btn back${dark ? ' on-dark' : ''}`;
  return `<a class="${cls}" ${linkAttrs(to, { params, link, back: true })} aria-label="${ta('back')}">${icon('chevL', { size: 22, sw: 1.7, cls: 'flip' })}</a>`;
}
// History-only back for screens the design gives no back control. Rendered
// only when there is somewhere to go back to (rule 7: nobody is stranded).
export function histBack(dark = false) {
  return `<button type="button" class="icon-btn back${dark ? ' on-dark' : ''}" data-hist-back aria-label="${ta('back')}">${icon('chevL', { size: 22, sw: 1.7, cls: 'flip' })}</button>`;
}
export function appBar({ back = null, title = '', right = '', lang = true, hist = false } = {}) {
  const b = back ? backBtn(back.to, back) : hist ? '<span data-hist-slot></span>' : '';
  return `<header class="hdr">${b}${title ? `<div class="hdr-title">${title}</div>` : '<div class="spacer"></div>'}${right}${lang ? langToggle(false) : ''}</header>`;
}
export function logo(dark = true, cls = 'logo') {
  const src = dark ? 'assets/logo-white-on-dark.png' : 'assets/logo-navy-on-light.png';
  return `<img class="${cls}" src="${src}" alt="${ta('logo')}" width="71" height="28">`;
}

// ---------- Buttons ----------
// Primary and secondary buttons carry the label in the current language and,
// demoted underneath, the other language (AR1 and AR2 keep the English here).
export function btn({ key, vars, to = null, params = null, link = '', variant = 'teal', ic = '', cls = '', primary = false, attrs = '', back = false, replace = false, second = true }) {
  const l1 = `<span class="l1">${ic}<span>${t(key, vars)}</span></span>`;
  const other = second ? alt(key, vars) : '';
  const l2 = other ? `<span class="l2">${other}</span>` : '';
  const c = `btn btn-${variant} ${cls}`;
  const p = primary ? ' data-primary' : '';
  if (to) return `<a class="${c}" ${linkAttrs(to, { params, link: link || raw(key, 'en', vars), back, replace })}${p} ${attrs}>${l1}${l2}</a>`;
  return `<button type="button" class="${c}"${p} ${attrs}>${l1}${l2}</button>`;
}

// ---------- Section heading: caps label plus the Arabic on the far side ----------
export function secHead(key, { right = '', vars } = {}) {
  const note = right || (isAr() ? '' : alt(key, vars) ? `<span class="note">${alt(key, vars)}</span>` : '');
  return `<div class="sec-head"><div class="cap">${t(key, vars)}</div><span class="spacer"></span>${note}</div>`;
}

// ---------- Avatars and art ----------
const AV_FALLBACK = { yasmin: 'monaA', nesma: 'rania', karim: 'karimS', reem: 'nadiaH' };
export function avatar(who, size = 36, { ring = false } = {}) {
  const cook = typeof who === 'string' ? null : who;
  const key = cook ? cook.id : who;
  let inner;
  if (cook && cook.photo) {
    inner = `<span class="av" style="width:${size}px;height:${size}px"><img src="${cook.photo}" alt=""></span>`;
  } else {
    const art = AVATAR_ART[key] || AVATAR_ART[AV_FALLBACK[key]];
    if (art) {
      inner = `<svg class="av" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true" style="background:${art.bg}">${art.svg}</svg>`;
    } else {
      const letter = esc(((cook && (isAr() ? cook.name_ar : cook.name)) || '?').trim().charAt(0));
      inner = `<span class="av" aria-hidden="true" style="width:${size}px;height:${size}px;background:var(--c-teal-bg);color:var(--c-teal-text);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:${Math.round(size * 0.42)}px">${letter}</span>`;
    }
  }
  return ring ? `<span class="av-ring">${inner}</span>` : inner;
}
export const badgeArt = (size = 78) => `<svg width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">${BADGE_ART}</svg>`;

// Stand-in plates for the six dishes that have no illustration on the boards.
const PLATE_FILL = { hawawshi: '#B9793F', konafa: '#E3A34B', sayadeya: '#C98A4B', shorba: '#E0B96A', mesaa: '#8E4A6E', custom: '#D9A144' };
function plate(kind) {
  const f = PLATE_FILL[kind] || PLATE_FILL.custom;
  return '<rect width="400" height="300" fill="#EAE0D0"/><rect width="400" height="300" fill="#E3D8C4" opacity=".55" style="clip-path:polygon(0 0,100% 0,100% 28%,0 46%);"/>'
    + '<ellipse cx="200" cy="158" rx="112" ry="112" fill="#000" opacity=".06"/><circle cx="200" cy="152" r="104" fill="#F6F1E6" stroke="#E0D6C2" stroke-width="3"/>'
    + `<circle cx="200" cy="152" r="80" fill="${f}"/><circle cx="200" cy="152" r="80" fill="#fff" opacity=".08"/>`;
}
export function dish(cookOrKind, { w = '100%', h = 160, radius = 0, cls = '' } = {}) {
  const cook = typeof cookOrKind === 'string' ? null : cookOrKind;
  const kind = cook ? cook.dish_kind : cookOrKind;
  const W = typeof w === 'number' ? `${w}px` : w;
  const style = `width:${W};height:${h}px;border-radius:${radius}px`;
  if (cook && cook.dishPhoto) return `<div class="art ${cls}" style="${style}"><img src="${cook.dishPhoto}" alt=""></div>`;
  const body = DISH_ART[kind] || plate(kind);
  return `<div class="art ${cls}" style="${style}"><svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${body}</svg></div>`;
}

// Confetti, drawn the way the boards draw it: small dots and dashes in the brand colours.
export function confetti(seed = 7, count = 16, w = 390, h = 400) {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const cols = ['var(--c-teal)', 'var(--c-coral)', 'var(--c-gold)', 'var(--c-white)', 'var(--c-mint)'];
  let out = '';
  for (let i = 0; i < count; i++) {
    const x = Math.round(rnd() * w);
    const y = Math.round(rnd() * h);
    const c = cols[i % cols.length];
    if (i % 3 === 0) out += `<circle cx="${x}" cy="${y}" r="3.4" style="fill:${c}" opacity=".9"/>`;
    else out += `<rect x="${x}" y="${y}" width="7" height="3.4" rx="1.6" style="fill:${c}" opacity=".92" transform="rotate(${Math.round(rnd() * 180)} ${x} ${y})"/>`;
  }
  return `<svg class="confetti" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${out}</svg>`;
}

// ---------- Badges ----------
export function badge(text, variant = 'navy', { ic = '', cls = '' } = {}) {
  return `<span class="badge b-${variant} ${cls}">${ic}${text}</span>`;
}
// Rule 6: a rank never appears without its board.
export function rankBadge(cook, { variant = 'navy', long = true } = {}) {
  const n = rankOf(cook.id);
  const crown = n === 1 ? icon('crown', { size: 12, color: 'var(--c-gold)', fill: 'var(--c-gold)', sw: 1.2 }) : '';
  const label = long ? t('rankIn', { n }) : t('rankDot', { n, club: { en: edition.club, ar: edition.club_ar } });
  return badge(label, variant, { ic: crown });
}
// The sponsor lockup slot stays as the bracketed English placeholder in both
// languages, as on AR1, so nobody mistakes it for real copy.
export function sponsorSlot(dark = false, key = 'sponsor', w = 88) {
  return `<span class="sponsor-slot${dark ? ' on-dark' : ''}" style="min-width:${w}px"><bdi lang="en" dir="ltr">${esc(raw(key, 'en'))}</bdi></span>`;
}

// ---------- Vote and follow ----------
export function voteBtn(cook, { to = null, params = null, link = '', sm = false, primary = false } = {}) {
  const closed = !votingOpen();
  const voted = !!state.voter.votedToday[cook.id];
  const cls = `pill vote${sm ? ' sm' : ''}${closed ? ' closed' : voted ? ' voted' : ''}`;
  const heart = closed
    ? icon('heart', { size: 17, color: 'var(--c-disabled)' })
    : voted ? icon('heart', { size: 17, color: 'var(--c-teal-text)', fill: 'var(--c-teal-text)', sw: 1.2 }) : icon('heart', { size: 17 });
  const label = closed ? t('votingClosed') : voted ? t('voted') : t('vote');
  const inner = `${heart}<span>${label}</span>${closed ? '' : `<span class="dot">·</span><span>${cook.votes}</span>`}`;
  const p = primary ? ' data-primary' : '';
  if (to && !closed) return `<a class="${cls}" ${linkAttrs(to, { params, link })}${p}>${inner}</a>`;
  if (to && closed) return `<a class="${cls}" ${linkAttrs(to, { params, link })} aria-disabled="true"${p}>${inner}</a>`;
  return `<button type="button" class="${cls}"${p}${closed ? ' aria-disabled="true"' : ''}>${inner}</button>`;
}
export function followBtn(cook, { width = 118, h = 44 } = {}) {
  const on = !!state.voter.follows[cook.id];
  return `<button type="button" class="pill follow" style="width:${width}px;height:${h}px" data-follow="${cook.id}" aria-pressed="${on}">${on ? icon('check', { size: 16, sw: 2 }) : icon('plus', { size: 16, sw: 1.7 })}<span>${on ? t('following') : t('follow')}</span></button>`;
}
export function followRound(cook) {
  const on = !!state.voter.follows[cook.id];
  return `<button type="button" class="round" data-follow="${cook.id}" aria-pressed="${on}" aria-label="${ta('followName', { name: cook.name })}">${on ? icon('check', { size: 18, sw: 2, color: 'var(--c-teal-text)' }) : icon('plus', { size: 19, sw: 1.7 })}</button>`;
}
export function shareRound() {
  return `<button type="button" class="round" data-toast="toastDemo" aria-label="${ta('shareEntry')}">${icon('share', { size: 18, sw: 1.7 })}</button>`;
}

// ---------- Entry post (K1) ----------
export function post(cook, { voteTo = 'E2', voteLink = 'Any entry card', badgeHtml = null, cardLink = null, primary = false } = {}) {
  const b = badgeHtml ?? (cook.isNew ? badge(t('newEntry'), 'sand') : rankBadge(cook, { long: false }));
  const story = cook.story
    ? `<div class="post-story">${esc(isAr() ? cook.story.ar : cook.story.en)}</div>${!isAr() && cook.story.ar !== cook.story.en ? `<div class="sub" style="font-size:11.5px;font-weight:400"><bdi lang="ar" dir="rtl">${esc(cook.story.ar)}</bdi></div>` : ''}`
    : '';
  const dishSub = !isAr() && cook.dish_ar && cook.dish_ar !== cook.dish ? `<div class="sub" style="font-size:13px;color:var(--c-navy)"><bdi lang="ar" dir="rtl">${esc(cook.dish_ar)}</bdi></div>` : '';
  const nameAr = !isAr() && cook.name_ar && cook.name_ar !== cook.name ? `<bdi lang="ar" dir="rtl" style="font-size:11px">${esc(cook.name_ar)}</bdi>` : '';
  const area = L(cook, 'area');
  const head = `<div class="post-head">${avatar(cook, 40)}<div class="grow"><div class="post-name">${L(cook, 'name')}</div><div class="post-meta">${icon('pin', { size: 12, color: 'var(--c-muted)' })}<span>${area}</span>${nameAr}</div></div>${b}</div>`;
  const pic = cardLink ? `<a ${linkAttrs(cardLink.to, cardLink)} aria-label="${esc(cook.name)}">${dish(cook, { h: 160 })}</a>` : dish(cook, { h: 160 });
  return `<article class="post">${head}${pic}<div class="post-body"><div class="display post-dish">${L(cook, 'dish')}</div>${dishSub}${story}</div>`
    + `<div class="post-actions">${voteBtn(cook, { to: voteTo, params: { cook: cook.id }, link: voteLink, primary })}<div class="spacer"></div>${followRound(cook)}${shareRound()}</div></article>`;
}

// ---------- Bands, bars and bits ----------
export function closesBand() {
  if (!votingOpen()) return `<div class="closes shut">${icon('lock', { size: 16, color: 'var(--c-muted)' })}<span>${t('closedBand')}</span></div>`;
  const ar = !isAr() ? `<span style="opacity:.55">·</span><span class="ar" lang="ar" dir="rtl">${esc(raw('closes', 'ar'))}</span>` : '';
  return `<div class="closes">${icon('clock', { size: 17, color: 'var(--c-white)' })}<span>${t('closes')}</span>${ar}</div>`;
}
export function steps(n, of = 5) {
  let s = '';
  for (let i = 1; i <= of; i++) s += `<span class="${i <= n ? 'on' : ''}"></span>`;
  return `<div class="steps" aria-hidden="true">${s}</div>`;
}
export function track(pct, cls = '', h = 8) {
  return `<div class="track ${cls}" style="height:${h}px"><i style="width:${Math.max(0, Math.min(100, pct))}%"></i></div>`;
}
export function scrollHint() {
  return `<div class="scroll-hint" data-scroll-hint hidden>${icon('chevD', { size: 13, sw: 2.2, color: 'currentColor' })}<span>${t('scroll')}</span>${!isAr() ? `<bdi lang="ar" dir="rtl">${esc(raw('scroll', 'ar'))}</bdi>` : ''}</div>`;
}
// A bilingual heading: display face title with the Arabic line under it.
export function title(key, { size = 28, vars, color = 'var(--c-navy)', subColor = 'var(--c-muted)', subSize = 13, center = false, subWeight = 600 } = {}) {
  const s = sub(key, vars, { cls: center ? 'c' : '' });
  const subStyled = s ? s.replace('class="sub', `style="font-size:${subSize}px;color:${subColor};font-weight:${subWeight}" class="sub`) : '';
  return `<div${center ? ' class="center"' : ''}><div class="display" style="font-size:${size}px;color:${color}">${t(key, vars)}</div>${subStyled}</div>`;
}
// Paragraph with its Arabic underneath.
export function para(key, { vars, size = 12, cls = '' } = {}) {
  return `<div class="muted lh ${cls}" style="font-size:${size}px">${t(key, vars)}${sub(key, vars)}</div>`;
}
export function infoNote(key, { vars, ic = 'info', color = 'var(--c-muted)' } = {}) {
  return `<div class="row" style="align-items:flex-start;gap:7px">${icon(ic, { size: 14, color })}<div class="grow muted lh" style="font-size:11px">${t(key, vars)}${sub(key, vars)}</div></div>`;
}

// Bottom navigation. The current tab is not a link (a link to itself is not a route).
export function bottomNav(items, current) {
  return `<nav class="bnav" aria-label="${ta('navMain')}">${items.map((it) => {
    const inner = `${icon(it.icon, { size: 21, sw: 1.9, color: it.id === current ? 'var(--c-navy)' : 'var(--c-muted)' })}<span class="n1">${t(it.key)}</span>${!isAr() && has(it.key, 'ar') ? `<span class="n2">${alt(it.key)}</span>` : ''}`;
    if (it.id === current) return `<span class="cur" aria-current="page">${inner}</span>`;
    return `<a ${linkAttrs(it.id, { link: it.link })}>${inner}</a>`;
  }).join('')}</nav>`;
}

export function field({ id, key, type = 'text', value = '', prefix = '', note = true, attrs = '', err = false, textarea = false, rows = 2 }) {
  const n = note && !isAr() && alt(key) ? `<span class="note">${alt(key)}</span>` : '';
  const pre = prefix ? `<span class="prefix">${prefix}</span><span class="sep"></span>` : '';
  const ctl = textarea
    ? `<textarea id="${id}" rows="${rows}" ${attrs}>${esc(value)}</textarea>`
    : `<input id="${id}" type="${type}" value="${esc(value)}" ${attrs}>`;
  return `<div><label for="${id}" class="field-label">${t(key)}${n}</label><div class="input${err ? ' err' : ''}"${textarea ? ' style="align-items:flex-start"' : ''}>${pre}${ctl}</div></div>`;
}
export function selectField({ id, key, options, value, required = false, optional = false, noteKey = null }) {
  const n = !isAr() ? alt(noteKey || key) : '';
  const tag = required ? `<span class="req">${t('required')}</span>` : optional ? `<span class="opt">${t('optional')}</span>` : '';
  const opts = options.map((o) => `<option value="${esc(o.value)}"${o.value === value ? ' selected' : ''}>${o.label}</option>`).join('');
  return `<div><div class="field-label"><label for="${id}">${t(key)}</label>${tag}<span class="note">${n}</span></div><div class="select-wrap"><select id="${id}">${opts}</select><span class="chev">${icon('chevD', { size: 18, sw: 2.1, color: 'var(--c-muted)' })}</span></div></div>`;
}

// A ranked row: rank number, avatar, name, a detail line, votes and movement.
// In Arabic the row mirrors, so the rank sits on the right and movement on the left.
export function rankRow(cook, { rank, to = null, params = null, link = '', detail = '', crown = false, h = 54, me = false, av = 36 } = {}) {
  const inner = `<div class="rk">${rank}</div>${avatar(cook, av)}
    <div class="grow"><div class="row" style="gap:5px"><span class="nm ellip">${L(cook, 'name')}</span>${crown ? icon('crown', { size: 13, color: 'var(--c-gold)', fill: 'var(--c-gold)', sw: 1.2 }) : ''}</div>
    <div class="dish ellip">${detail || L(cook, 'dish')}</div></div>
    <div class="vt"><b>${cook.votes}</b><span class="upper-num">${t('votes')}</span></div>
    <div class="mvw">${move(cook.move)}</div>`;
  const style = `style="min-height:${h}px"`;
  if (to) return `<a class="lrow${me ? ' me' : ''}" ${style} ${linkAttrs(to, { params: params || { cook: cook.id }, link })}>${inner}</a>`;
  return `<div class="lrow${me ? ' me' : ''}" ${style}>${inner}</div>`;
}

// K3 · Voting closed. The vote button stays visible and disabled rather than
// disappearing, so someone arriving from an old link understands what happened.
export function closedPanel() {
  return `<div class="stack" style="gap:11px" data-k3="voting-closed">
    <div class="row closed-note">${icon('lock', { size: 16, color: 'var(--c-muted)' })}<span>${t('closedBand')}</span></div>
    <div class="btn btn-disabled" aria-disabled="true" style="min-height:52px"><span class="l1">${icon('heart', { size: 18, color: 'var(--c-disabled)' })}<span>${t('votingClosed')}</span></span></div>
    ${btn({ key: 'seeResults', to: 'H1', link: 'See the results', cls: 'btn-sm', primary: true, attrs: 'data-state-source="K3"' })}
  </div>`;
}

export function stackAvatars(ids, size = 22) {
  return `<span class="stack-av">${ids.map((id) => avatar(id, size)).join('')}</span>`;
}

// The club name, from content.json, in the current language, and its Arabic
// as a demoted secondary (English mode only).
export const clubName = () => L(edition, 'club');
export const clubAlt = (cls = 't115 muted') => (isAr() ? '' : `<span class="${cls}"><bdi lang="ar" dir="rtl">${esc(edition.club_ar)}</bdi></span>`);
export const clubV = () => ({ en: edition.club, ar: edition.club_ar });

// Four-digit code: one real input over four boxes, so paste and autofill work.
export function codeInput(id, value = '', err = false, h = 62) {
  const v = String(value || '');
  const boxes = [0, 1, 2, 3].map((i) => `<span class="box${v[i] ? ' filled' : ''}${!err && i === v.length ? ' cur-slot' : ''}" style="height:${h}px">${esc(v[i] || '')}</span>`).join('');
  return `<div class="code${err ? ' err' : ''}" data-code>${boxes}<input id="${id}" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="4" pattern="[0-9]*" value="${esc(v)}" aria-label="${ta('code.aria')}"></div>`;
}
export function wireCode(root, id, onChange) {
  const input = root.querySelector('#' + id);
  if (!input) return;
  const wrap = input.closest('[data-code]');
  const paint = () => {
    const v = input.value.replace(/\D/g, '').slice(0, 4);
    if (v !== input.value) input.value = v;
    [...wrap.querySelectorAll('.box')].forEach((b, i) => {
      b.textContent = v[i] || '';
      b.classList.toggle('filled', !!v[i]);
      b.classList.toggle('cur', document.activeElement === input && i === v.length);
    });
  };
  input.addEventListener('input', () => { wrap.classList.remove('err'); paint(); onChange(input.value); });
  input.addEventListener('focus', paint);
  input.addEventListener('blur', paint);
  paint();
}

// Governorate and area, both required, from the controlled list only.
export function govAreaFields(prefix, gov, area, { side = false } = {}) {
  const g = gov || (AREAS.find((a) => a.id === area) || {}).gov || 'giza';
  const areas = AREAS.filter((a) => a.gov === g);
  const govSel = selectField({ id: prefix + '-gov', key: 'e5.gov', value: g, required: true, options: GOVERNORATES.map((x) => ({ value: x.id, label: LO(x) })) });
  const areaSel = selectField({ id: prefix + '-area', key: 'e5.area', value: area || '', required: true,
    options: [{ value: '', label: '—' }, ...areas.map((x) => ({ value: x.id, label: LO(x) }))] });
  return side ? `<div class="row" style="gap:9px;align-items:flex-start;flex-wrap:wrap"><div class="grow" style="flex:1 1 130px">${govSel}</div><div class="grow" style="flex:1 1 130px">${areaSel}</div></div>` : govSel + areaSel;
}
export function wireGovArea(root, prefix, onChange) {
  const g = root.querySelector('#' + prefix + '-gov');
  const a = root.querySelector('#' + prefix + '-area');
  // A governorate with a single area in the list selects it straight away.
  const only = (gov) => { const list = AREAS.filter((x) => x.gov === gov); return list.length === 1 ? list[0].id : null; };
  if (g) g.addEventListener('change', () => onChange({ gov: g.value, area: only(g.value), changed: 'gov' }));
  if (a) a.addEventListener('change', () => onChange({ gov: g ? g.value : null, area: a.value || null, changed: 'area' }));
}

// Seven-day streak card (K2 engagement pattern).
export function streakCard(n, badgeKey = 'e6.badge7') {
  const dots = [1, 2, 3, 4, 5, 6, 7].map((d) => (d <= n
    ? `<span class="sdot on">${icon('check', { size: 14, sw: 2.4, color: 'var(--c-navy)' })}</span>`
    : `<span class="sdot"><span lang="en">${d}</span></span>`)).join('');
  return `<div class="card" style="padding:13px"><div class="row" style="gap:9px">${icon('flame', { size: 20, color: 'var(--c-coral)', fill: 'var(--c-coral)', sw: 1.2 })}
    <div class="grow"><div class="t14 w8">${t('e6.streak', { n })}</div>${sub('e6.streak', { n })}</div><span class="t11 w7 muted">${t(badgeKey)}</span></div>
    <div class="row" style="gap:6px;margin-top:11px;justify-content:space-between">${dots}</div></div>`;
}

// Title pills (K1): gold for club and city, navy for an area champion, teal for category and dish.
export function titlePill(kind, key, vars) {
  const v = { club: ['gold', 'crown', 'var(--c-navy)', 'var(--c-navy)'], area: ['navy', 'trophy', 'var(--c-white)', 'none'], cat: ['teal', 'star', 'var(--c-navy)', 'var(--c-navy)'] }[kind];
  return `<span class="badge b-${v[0]}" style="min-height:26px">${icon(v[1], { size: 12.5, color: v[2], fill: v[3], sw: v[3] === 'none' ? 2 : 1.2 })}${t(key, vars)}</span>`;
}

export const first = (s) => String(s || '').split(' ')[0];

export function num(n) { return Number(n).toLocaleString('en-US'); }
export function ordinal(n) {
  if (isAr()) return String(n);
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
export { otherLang };
