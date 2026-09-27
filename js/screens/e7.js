// E7 · My supporter profile. Streak, badges, the votes shares produced,
// nominations and raffle entries: the voter-side identity Phase 2 inherits.
import { t, sub, alt, isAr, L, esc, raw } from '../i18n.js';
import { icon, appBar, avatar, streakCard, secHead, linkAttrs, chev, bottomNav, scrollHint, first } from '../ui.js';
import { state, cookById, rankOf } from '../store.js';
import { VOTER_NAV } from './e1.js';

function badgeTile(ic, key, color = 'var(--c-teal-text)', fill = 'none') {
  return `<div class="badge-tile"><span class="badge-ic">${icon(ic, { size: 20, sw: fill === 'none' ? 2 : 1.2, color, fill })}</span><span class="t115 w8" style="line-height:1.2">${t(key)}</span>${isAr() ? '' : `<span class="t11 muted">${alt(key)}</span>`}</div>`;
}

export default {
  render() {
    const v = state.voter;
    const noms = state.nominations;
    const inTop10 = noms.filter((n) => n.cookId && rankOf(n.cookId) <= 10).length;
    const follows = Object.keys(v.follows).filter((id) => v.follows[id]).map(cookById).filter(Boolean);
    const name = v.name ? esc(v.name) : t('e7.sampleName');
    return `<section class="scr">
      ${appBar({ back: { to: 'E1' } })}
      <div class="body"><div class="pad">
        <div class="row" style="gap:12px">${avatar('nadiaH', 62)}<div class="grow"><h1 class="display" style="font-size:25px">${name}</h1>
          <div class="t115 w7 muted" style="margin-top:3px">${t('e7.since')}</div>${sub('e7.since')}</div></div>
        ${v.streak > 0 ? streakCard(v.streak) : ''}
        ${secHead('e7.badges')}
        <div class="row" style="gap:9px;align-items:stretch">${badgeTile('star', 'e7.bFirst')}${badgeTile('heart', 'e7.bTop', 'var(--c-teal-text)', 'var(--c-teal-text)')}${badgeTile('flame', 'e7.b5', 'var(--c-teal-text)', 'var(--c-teal-text)')}${badgeTile('gift', 'e7.bScout', 'var(--c-gold)')}</div>
        <div class="card">
          <div class="row" style="gap:10px"><span class="soft-dot">${icon('share', { size: 17, color: 'var(--c-teal-text)' })}</span><div class="grow"><div class="t135 w8">${t('e7.shares')}</div>${sub('e7.shares')}</div></div>
          <div class="rule" style="margin:10px 0 2px"></div>
          ${[['amira', 8], ['mona', 6]].map(([id, n]) => `<div class="row" style="gap:10px;min-height:44px">${avatar(cookById(id), 30)}<span class="grow t125 w7">${L(cookById(id), 'name')}</span><span class="t125 w8 teal-ink">${t('e7.plus', { n })}</span></div>`).join('')}
        </div>
        <a class="card-gold" ${linkAttrs('C3', { link: `You nominated ${noms.length} cooks` })}><div class="row" style="gap:10px">
          <span class="gift-dot">${icon('gift', { size: 17, color: 'var(--c-gold)' })}</span>
          <div class="grow"><div class="t135 w8 navy">${t('e7.nominated', { n: noms.length })}</div>${sub('e7.nominated', { n: noms.length })}</div>
          <span class="t115 w8 muted">${t('e7.inTop10', { n: inTop10 })}</span>${chev('R', { size: 16 })}</div></a>
        <div class="card"><div class="row" style="gap:10px"><span class="gift-dot">${icon('gift', { size: 17, color: 'var(--c-gold)' })}</span>
          <div class="grow"><div class="t13 w8">${t('e7.raffle', { n: 3 })}</div>${sub('e7.raffle', { n: 3 })}</div><span class="t11 w8 muted">${t('e7.draw')}</span></div></div>
        <div class="sec-head"><div class="cap">${t('e7.follow')}</div><span class="spacer"></span><span class="t115 w8 teal-ink">${follows.length}</span></div>
        ${follows.length
          ? `<div class="row" style="gap:9px;flex-wrap:wrap">${follows.map((c) => `<div class="center" style="width:66px">${avatar(c, 52)}<div class="t10 w7 muted ellip" style="margin-top:5px">${esc(first(isAr() ? c.name_ar : c.name))}</div></div>`).join('')}</div>`
          : `<div class="t12 muted">${t('e7.noFollows')}</div>`}
        <a class="row card" style="gap:10px;min-height:52px;padding:0 12px;color:inherit" ${linkAttrs('H4', { link: 'Your season so far' })}>${icon('trophy', { size: 19, sw: 1.9, color: 'var(--c-gold)' })}
          <div class="grow"><div class="t125 w8">${t('e7.season')}</div><div class="t11 muted" style="margin-top:1px">${t('e7.seasonSub')}</div></div>${chev('R', { size: 17 })}</a>
        ${scrollHint()}
      </div></div>
      ${bottomNav(VOTER_NAV, 'E7').replace('<a ', '<a data-primary ')}
    </section>`;
  },
};
