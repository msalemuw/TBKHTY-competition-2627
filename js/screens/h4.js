// H4 · Voter wrap-up. Season stats, the raffle result, follow your favourites,
// and the teaser for the next club edition.
import { t, sub, alt, L, isAr } from '../i18n.js';
import { icon, appBar, btn, avatar, followBtn, secHead, linkAttrs, chev, scrollHint } from '../ui.js';
import { state, cookById, rankOf } from '../store.js';

export default {
  render() {
    const v = state.voter;
    // The board's sample season (4 cooks, 6 days) plus whatever this session added.
    const backed = Math.max(4, Object.keys(v.backed).length);
    const days = Math.max(6, v.streak);
    const cast = 6 + v.votesCast;
    const noms = state.nominations;
    const top10 = noms.filter((n) => n.cookId && rankOf(n.cookId) <= 10).length;
    const box = (n, key) => `<div class="stat-tile center" style="flex:1 1 0;padding:11px 6px"><div class="display" style="font-size:26px;line-height:1">${n}</div><div class="upper-num" style="margin-top:6px">${t(key)}</div></div>`;
    return `<section class="scr">
      ${appBar({ back: { to: 'E1' } })}
      <div class="body"><div class="pad">
        <div><h1 class="display" style="font-size:29px">${t('h4.title', { c: backed, d: days })}</h1>${sub('h4.title', { c: backed, d: days })}</div>
        <div class="row" style="gap:9px;align-items:stretch">${box(cast, 'h4.cast')}${box(backed, 'h4.backed')}${box(14, 'h4.fromShares')}</div>
        <a class="card-gold" ${linkAttrs('C3', { link: `You nominated ${noms.length} cooks` })}><div class="row" style="gap:10px">
          <span class="gift-dot">${icon('gift', { size: 17, color: 'var(--c-gold)' })}</span>
          <div class="grow"><div class="t135 w8 navy">${t('e7.nominated', { n: noms.length })}</div>${sub('e7.nominated', { n: noms.length })}</div>
          <span class="t115 w8 muted">${t('e7.inTop10', { n: top10 })}</span>${chev('R', { size: 16 })}</div></a>
        <div class="card"><div class="row" style="gap:10px"><span class="gift-dot">${icon('gift', { size: 17, color: 'var(--c-gold)' })}</span>
          <div class="grow"><div class="t13 w8">${t('h4.raffle')}</div><div class="t11 muted" style="margin-top:2px">${t('h4.roll')}</div>${sub('h4.roll')}</div></div></div>
        <div class="card">${secHead('h4.fav')}<div class="t11 muted" style="margin-top:5px">${t('h4.know')}${sub('h4.know')}</div>
          ${['amira', 'mona', 'salma'].map((id) => { const c = cookById(id); return `<div class="row" style="gap:10px;min-height:52px">${avatar(c, 38)}<div class="grow"><div class="t13 w8">${L(c, 'name')}</div><div class="t105 muted">${L(c, 'dish')}</div></div>${followBtn(c, { width: 108, h: 44 })}</div>`; }).join('')}</div>
        <div class="card" style="padding:13px"><div class="row" style="gap:11px"><div class="date-tile" style="padding:7px 11px"><div class="display white" style="font-size:21px;line-height:1.1" lang="en">12</div><div class="t10 w8" style="color:var(--c-teal)">${t('h4.oct')}</div></div>
          <div class="grow"><div class="t135 w8">${t('h4.s2')}</div>${sub('h4.s2')}</div></div></div>
        ${scrollHint()}
      </div></div>
      <div class="bar">${v.notifySeason2
        ? `<div class="loc-ok" style="min-height:52px"><span class="tick">${icon('check', { size: 15, sw: 3, color: 'var(--c-navy)' })}</span><div class="grow t13 w8">${t('h4.notified')}</div><button type="button" class="pill-sm" data-notify aria-pressed="true">${icon('bell', { size: 15, color: 'var(--c-teal-text)' })}</button></div>`
        : btn({ key: 'h4.notify', ic: icon('bell', { size: 17 }), primary: true, cls: 'btn-52', attrs: 'data-notify' })}</div>
    </section>`;
  },
  mount(root, p, api) {
    root.querySelectorAll('[data-notify]').forEach((b) => b.addEventListener('click', () => { state.voter.notifySeason2 = !state.voter.notifySeason2; api.rerender(); }));
  },
};
