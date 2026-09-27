// D4 · Tasting day. Table number, arrival time, what to bring, the rule that
// the dish must match the entry photo, and the map inside the club.
import { t, sub, alt, raw, esc, L, isAr } from '../i18n.js';
import { icon, appBar, secHead, bottomNav } from '../ui.js';
import { MAP_B } from '../art-data.js';
import { state } from '../store.js';
import { COOK_NAV, dashCook } from './d1.js';

export default {
  render() {
    const c = dashCook();
    const bring = state.tasting.bring;
    const dishV = { en: c.dish, ar: c.dish_ar };
    const items = ['d4.b1', 'd4.b2', 'd4.b3', 'd4.b4'];
    const map = MAP_B.replace('{{A}}', esc(raw('d4.garden'))).replace('{{B}}', esc(raw('d4.mainGate')));
    return `<section class="scr">
      ${appBar({ back: { to: 'D1' }, title: t('nav.tasting') })}
      <div class="body"><div class="pad">
        <div class="card" style="padding:13px" data-primary>
          <div class="row" style="gap:11px"><div class="date-tile"><div class="t10 w8" style="color:var(--c-teal);letter-spacing:.08em">${t('d4.fri')}</div><div class="display white" style="font-size:24px;line-height:1.1" lang="en">2</div><div class="t10 w7" style="color:rgba(255,255,255,.7)">${t('d4.oct')}</div></div>
            <div class="grow"><div class="t14 w8">${t('d4.live')}</div><div class="t115 muted" style="margin-top:2px">${t('d4.venue')}</div>${sub('d4.venue')}</div></div>
          <div class="row" style="gap:8px;margin-top:12px">
            <div class="grow ticket" style="background:var(--c-teal-bg)"><div class="t10 w8 teal-ink" style="letter-spacing:.06em">${t('d4.table')}</div><div class="display" style="font-size:26px;line-height:1.2" lang="en">07</div></div>
            <div class="grow ticket" style="background:var(--c-coral-bg)"><div class="t10 w8 coral-ink" style="letter-spacing:.06em">${t('d4.arrive')}</div><div class="display" style="font-size:26px;line-height:1.2" lang="en">4:30</div></div></div></div>
        <div class="card">${secHead('d4.bring')}
          ${items.map((k, i) => `<button type="button" class="bring-row" data-bring="${i}" aria-pressed="${!!bring[i]}"><span class="bring-box">${bring[i] ? icon('check', { size: 14, sw: 3, color: 'var(--c-navy)' }) : ''}</span>
            <span class="grow"><span class="t13 w7 navy" style="display:block;line-height:1.3">${t(k, { dish: dishV })}</span>${sub(k, { dish: dishV }, { cls: '' }).replace('<span class="sub', '<span style="font-weight:400" class="sub')}</span></button>`).join('')}</div>
        <div class="card-coral" style="padding:12px"><div class="row" style="align-items:flex-start;gap:10px">${icon('info', { size: 18, color: 'var(--c-coral-text)' })}<div class="grow"><div class="t125 w8" style="line-height:1.3">${t('d4.match')}</div>${sub('d4.match', null, { cls: 'coral-ink' })}</div></div></div>
        <div><svg viewBox="0 0 326 140" style="width:100%;height:auto;border-radius:12px" role="img" aria-label="${esc(raw('d4.gate'))}">${map}</svg>
          <div class="row" style="gap:7px;margin-top:8px">${icon('pin', { size: 15, sw: 1.7, color: 'var(--c-muted)' })}<span class="t115 w7 muted">${t('d4.gate')}</span></div></div>
      </div></div>
      ${bottomNav(COOK_NAV, 'D4')}
    </section>`;
  },
  mount(root, p, api) {
    root.querySelectorAll('[data-bring]').forEach((b) => b.addEventListener('click', () => { const i = +b.dataset.bring; state.tasting.bring[i] = !state.tasting.bring[i]; api.rerender(); }));
  },
};
