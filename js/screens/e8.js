// E8 · Find a cook. One field covers name, dish and area, and each row says
// which of the three matched. Vote straight from the result.
import { t, ta, sub, alt, L, isAr, esc } from '../i18n.js';
import { icon, appBar, avatar, voteBtn, linkAttrs, bottomNav, secHead, btn, infoNote, clubV } from '../ui.js';
import { state, ranked, edition } from '../store.js';
import { VOTER_NAV } from './e1.js';

let q = '';
const TRY = ['e8.t1', 'e8.t2', 'e8.t3', 'e8.t4', 'e8.t5'];
const norm = (s) => String(s || '').toLowerCase().normalize('NFKD').replace(/[ً-ٰٟ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي');

// Returns [cook, matched-on] for every cook that matches, in rank order.
export function search(query) {
  const n = norm(query.trim());
  if (!n) return ranked().map((c) => [c, null]);
  const out = [];
  ranked().forEach((c) => {
    if (norm(c.name).includes(n) || norm(c.name_ar).includes(n)) out.push([c, 'name']);
    else if (norm(c.dish).includes(n) || norm(c.dish_ar).includes(n)) out.push([c, 'dish']);
    else if (norm(c.area).includes(n) || norm(c.area_ar).includes(n)) out.push([c, 'area']);
    else if (norm(edition.club).includes(n) || norm(edition.club_ar).includes(n)) out.push([c, null]);
  });
  return out;
}

function row([c, how], i) {
  const all = ranked();
  const rank = all.indexOf(c) + 1;
  const tag = how ? `<span class="match-tag">${t('e8.m' + how[0].toUpperCase() + how.slice(1))}</span>` : '';
  return `${i ? '<div class="rule"></div>' : ''}<div class="row" style="gap:10px;padding:10px 0">
    <a class="row grow" style="gap:10px;color:inherit" ${linkAttrs('E2', { params: { cook: c.id }, link: 'Any search result' })}>${avatar(c, 44)}
      <span class="grow"><span class="t135 w8 navy ellip" style="display:block">${L(c, 'name')}</span>
      <span class="t11 muted ellip" style="display:block;margin-top:2px">${L(c, 'dish')} · ${L(c, 'area')}</span>
      <span class="row" style="gap:6px;margin-top:3px"><span class="t105 w7 teal-ink">${t('rankDot', { n: rank, club: clubV() })}</span>${tag}</span></span></a>
    ${voteBtn(c, { to: 'E3', params: { cook: c.id }, link: 'Vote button on a result', sm: true })}</div>`;
}

export default {
  render() {
    const forced = state.force.searchEmpty;
    const query = forced && !q ? 'mervat' : q;
    const res = forced ? [] : search(query);
    const header = !query.trim()
      ? secHead('e8.all')
      : `<div class="sec-head"><div class="cap" style="text-transform:none;letter-spacing:.02em">${t('e8.match', { n: res.length, q: esc(query) })}</div><span class="spacer"></span>${isAr() ? '' : `<span class="note">${alt('e8.match', { n: res.length, q: query })}</span>`}</div>`;
    const results = res.length
      ? `${header}<div class="card" style="padding:1px 11px">${res.map(row).join('')}</div>`
      : `<div class="state" data-k3="search-empty"><div class="state-icon" style="background:var(--c-gold-bg);border:1.5px solid var(--c-gold-line)">${icon('search', { size: 28, sw: 1.8, color: 'var(--c-muted)' })}</div>
          <div class="display state-title">${t('k3.noCook', { q: esc(query) })}</div>${sub('k3.noCook', null, { cls: 'c' })}
          <div class="t12 muted lh">${t('k3.noCookBody')}</div>
          <div style="width:100%;margin-top:4px">${btn({ key: 'k3.nominate', to: 'C1', link: 'Nominate a cook', cls: 'btn-sm', attrs: 'data-state-source="K3"' })}</div></div>`;
    return `<section class="scr">
      ${appBar({ back: { to: 'A1' }, title: t('e8.title') })}
      <div class="search-wrap"><div class="search-box" data-primary>${icon('search', { size: 18, sw: 2.1, color: 'var(--c-muted)' })}
        <input id="q" type="search" value="${esc(query)}" placeholder="${ta('e8.ph')}" aria-label="${ta('e8.ph')}" autocomplete="off" enterkeyhint="search">
        ${query ? `<button type="button" class="clear-btn" data-clear aria-label="${ta('e8.clear')}">×</button>` : ''}</div></div>
      <div class="body"><div class="pad" style="gap:10px" data-results>
        ${results}
        <div class="cap" style="margin-top:2px">${t('e8.try')}</div>
        <div class="chips wrap" style="gap:7px">${TRY.map((k) => `<button type="button" class="chip" data-try="${ta(k)}"><span class="c1">${t(k)}</span></button>`).join('')}</div>
        ${infoNote('e8.covers')}
      </div></div>
      ${bottomNav(VOTER_NAV, 'E8')}
    </section>`;
  },
  mount(root, p, api) {
    const input = root.querySelector('#q');
    let timer = null;
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => { q = input.value; state.force.searchEmpty = false; api.rerender({ top: true }); }, 120);
    });
    const clear = root.querySelector('[data-clear]');
    if (clear) clear.addEventListener('click', () => { q = ''; state.force.searchEmpty = false; api.rerender({ top: true }); setTimeout(() => document.getElementById('q')?.focus(), 0); });
    root.querySelectorAll('[data-try]').forEach((b) => b.addEventListener('click', () => { q = b.dataset.try; state.force.searchEmpty = false; api.rerender({ top: true }); }));
  },
};
