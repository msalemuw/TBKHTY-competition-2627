// B6 · You're in. Competitor number, confetti, and the share card as the
// primary action while she is still excited. The dashboard is the quiet option.
import { t, sub, alt, isAr } from '../i18n.js';
import { icon, langToggle, logo, confetti, btn, linkAttrs } from '../ui.js';
import { state, cookById } from '../store.js';

export default {
  render() {
    const me = cookById(state.myCookId) || cookById('amira');
    const idx = state.cooks.indexOf(me) + 1;
    const inArea = state.cooks.filter((c) => c.area === me.area).length;
    const areaV = { en: me.area, ar: me.area_ar };
    return `<section class="scr dark">${confetti(21, 18, 390, 420)}
      <div class="body" style="position:relative"><div class="stack" style="min-height:100%;padding:14px">
        <div class="row" style="height:44px;gap:6px"><span data-hist-slot="dark"></span>${logo(true, 'logo logo-sm')}<div class="spacer"></div>${langToggle(true)}</div>
        <div class="spacer" style="min-height:12px"></div>
        <div class="stack center" style="align-items:center">
          <div class="big-tick" style="width:96px;height:96px">${icon('check', { size: 50, sw: 3.4, color: 'var(--c-navy)' })}</div>
          <h1 class="display white" style="font-size:44px;margin-top:18px">${t('b6.in')}</h1>
          ${isAr() ? '' : `<div class="t17 w7" style="margin-top:6px;color:var(--c-teal)">${alt('b6.in')}</div>`}
          <div class="t15 w7" style="margin-top:12px;color:rgba(255,255,255,.9)">${t('b6.two')}</div>${sub('b6.two', null, { cls: 'c' })}
        </div>
        <div class="stack" style="gap:8px;margin-top:14px">
          <div class="card-glass row" style="gap:9px;padding:10px 12px">${icon('trophy', { size: 17, color: 'var(--c-gold)' })}<span class="grow t125 w8 white">${t('edition')}</span><span class="t11 w7" style="color:rgba(255,255,255,.65)">${t('b6.competitor', { n: idx })}</span></div>
          <div class="card-glass row" style="gap:9px;padding:10px 12px">${icon('pin', { size: 17, color: 'var(--c-teal)' })}<span class="grow t125 w8 white">${t('b3d.areaRank', { area: areaV })}</span><span class="t11 w7" style="color:rgba(255,255,255,.65)">${t('b6.cooksN', { n: inArea })}</span></div>
        </div>
        <div class="spacer" style="min-height:14px"></div>
        <div class="card-glass row" style="gap:10px;margin-bottom:12px">${icon('flame', { size: 20, color: 'var(--c-coral)', fill: 'var(--c-coral)', sw: 1.2 })}<div class="grow"><div class="t125 w8 white">${t('b6.firstHour')}</div>${sub('b6.firstHour')}</div></div>
        <div class="stack" style="gap:9px">
          ${btn({ key: 'b6.first', to: 'D2', params: { cook: me.id }, link: 'Get your first votes', ic: icon('share', { size: 18, sw: 2.1 }), primary: true, cls: 'btn-56' })}
          <a class="btn-ghost-dark" ${linkAttrs('D1', { link: 'Go to my dashboard' })}>${t('b6.dash')}</a>
        </div>
      </div></div>
    </section>`;
  },
};
