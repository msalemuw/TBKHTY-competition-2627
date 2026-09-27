// G1 · Table QR landing, opened from the QR code on a tasting table. One dish,
// one giant button, and the rule stated before the button: taste everything first.
import { t, sub, L, isAr, esc } from '../i18n.js';
import { icon, langToggle, btn, dish, avatar, rankBadge } from '../ui.js';
import { state, cookById } from '../store.js';

export default {
  render(p) {
    const c = cookById(p.cook) || cookById('nadia');
    return `<section class="scr">
      <div class="g-bar"><span class="live-dot"></span><span class="t12 w8 white grow">${t('g1.live')}</span><span class="badge b-glass">${t('g1.table')}</span>${langToggle(true)}</div>
      <div class="body">${dish(c, { h: 236 })}
        <div class="pad" style="gap:11px;padding-bottom:16px">
          <div class="row" style="gap:11px;margin-top:-52px;position:relative">${avatar(c, 62, { ring: true })}<div class="grow" style="padding-top:26px">${rankBadge(c, { variant: 'sand' })}</div></div>
          <div><h1 class="display" style="font-size:30px">${L(c, 'dish')}</h1>${isAr() ? '' : `<div class="sub" style="font-size:14px;color:var(--c-navy)"><bdi lang="ar" dir="rtl">${esc(c.dish_ar)}</bdi></div>`}
            <div class="t125 w7 muted" style="margin-top:6px">${t('g1.by', { name: { en: c.name, ar: c.name_ar } })}</div></div>
          <div class="card"><div class="row" style="align-items:flex-start;gap:10px">${icon('info', { size: 18 })}<div class="grow"><div class="t13 w8" style="line-height:1.35">${t('g1.first')}</div>${sub('g1.first')}</div></div></div>
        </div></div>
      <div class="bar">
        ${state.liveVoted ? `<div class="loc-ok"><span class="tick">${icon('check', { size: 15, sw: 3, color: 'var(--c-navy)' })}</span><div class="grow t13 w8">${t('g1.already')}</div></div>` : ''}
        ${btn({ key: 'g1.vote', to: 'G2', params: { cook: c.id }, link: 'Vote for this dish', ic: icon('heart', { size: 24, sw: 2.2 }), primary: true, cls: 'btn-xl', replace: true })}
        <div class="row" style="justify-content:center;gap:7px">${icon('info', { size: 14, sw: 1.7, color: 'var(--c-muted)' })}<span class="t115 w7 muted">${t('g1.counts')}</span></div>
      </div>
    </section>`;
  },
  mount(root, p, api) {
    api.guard((a) => { if (a.dataset.to === 'G2') state.liveVoted = true; return undefined; });
  },
};
