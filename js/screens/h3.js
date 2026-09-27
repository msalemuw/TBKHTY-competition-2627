// H3 · Thank you, competitors. Verified eCook badge, personal stats, and the
// nudge to finish the kitchen profile before orders open.
import { t, sub, alt, isAr, firstV } from '../i18n.js';
import { icon, appBar, badgeArt, linkAttrs, track, ordinal } from '../ui.js';
import { rankOf } from '../store.js';
import { dashCook } from './d1.js';

export default {
  render() {
    const c = dashCook();
    const stat = (v, key) => `<div class="stat-tile"><div class="display" style="font-size:28px;line-height:1">${v}</div><div class="upper-num" style="margin-top:6px">${t(key)}</div>${isAr() ? '' : `<div class="t11 muted">${alt(key)}</div>`}</div>`;
    return `<section class="scr">
      ${appBar({ back: { to: 'A1' } })}
      <div class="body"><div class="pad" style="gap:12px">
        <div class="row" style="justify-content:center;margin-top:8px">${badgeArt(78)}</div>
        <div class="center"><h1 class="display" style="font-size:30px">${t('h3.thanks', { name: firstV(c) })}</h1>${sub('h3.thanks', { name: firstV(c) }, { cls: 'c' })}
          <div class="t125 muted lh" style="margin-top:9px">${t('h3.now')}</div>${sub('h3.now', null, { cls: 'c' })}</div>
        <div class="stat-grid">${stat(c.votes, 'h3.total')}${stat(c.isNew ? 0 : 26, 'h3.supporters')}${stat(ordinal(rankOf(c.id)), 'h3.rank')}${stat(c.isNew ? 0 : 6, 'h3.top5')}</div>
        <div class="card" style="padding:13px"><div class="row" style="gap:10px"><div class="grow"><div class="t135 w8">${t('h3.complete')}</div>${sub('h3.complete')}</div><div class="display teal-ink" style="font-size:26px">43%</div></div>
          <div style="margin-top:10px">${track(43, '', 9)}</div>
          <a class="btn btn-teal" style="margin-top:12px;min-height:46px" ${linkAttrs('D3', { link: 'Finish the last 3 questions' })} data-primary><span class="l1" style="font-size:14px;font-weight:800">${t('h3.finish')}</span></a></div>
      </div></div>
      <div class="bar"><a class="btn-tile" style="flex:none;width:100%" ${linkAttrs('F2', { link: 'Share your final result' })}>${icon('share', { size: 17 })}${t('h3.share')}</a></div>
    </section>`;
  },
};
