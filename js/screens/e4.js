// E4 · Vote confirmed. Rank movement, the streak starting, share as the
// primary action and the raffle questions as the optional one.
import { t, sub, alt, isAr, firstV } from '../i18n.js';
import { icon, langToggle, logo, confetti, btn, linkAttrs, move, ordinal } from '../ui.js';
import { state, cookById, rankOf } from '../store.js';

export default {
  render(p) {
    const cook = cookById(p.cook) || cookById(state.voter.lastVoted) || cookById('amira');
    const name = firstV(cook);
    const rank = rankOf(cook.id);
    const v = state.voter;
    const raffle = v.raffle
      ? `<div class="card-glass row" style="gap:10px;margin-bottom:12px">${icon('check', { size: 20, sw: 2.4, color: 'var(--c-teal)' })}<div class="grow t125 w8 white">${t('e4.raffleDone')}</div></div>`
      : `<div class="card-glass row" style="gap:10px;margin-bottom:12px">${icon('gift', { size: 20, color: 'var(--c-gold)' })}
          <div class="grow"><div class="t125 w8 white">${t('e4.raffle')}</div>${sub('e4.raffle')}</div>
          <a class="link-teal nowrap" style="color:var(--c-teal);font-size:13px;padding:0 6px" ${linkAttrs('E5', { link: 'Answer them' })}>${t('e4.answer')}</a></div>`;
    return `<section class="scr dark">${confetti(11, 16, 390, 400)}
      <div class="body" style="position:relative"><div class="stack" style="min-height:100%;padding:14px">
        <div class="row" style="height:44px;gap:6px"><span data-hist-slot="dark"></span>${logo(true, 'logo logo-sm')}<div class="spacer"></div>${langToggle(true)}</div>
        <div class="spacer" style="min-height:16px"></div>
        <div class="stack center" style="align-items:center">
          <div class="big-tick">${icon('check', { size: 56, sw: 3.2, color: 'var(--c-navy)' })}</div>
          <h1 class="display white" style="font-size:36px;margin-top:16px">${t('e4.youVoted', { name })}</h1>
          ${isAr() ? '' : `<div class="t14 w7" style="margin-top:7px;color:var(--c-teal)">${alt('e4.youVoted', { name })}</div>`}
          <div class="now-pill"><span class="t13 w8 white">${t('e4.nowRankAt', { ord: ordinal(rank) })}</span><span style="color:var(--c-mint)">${move(cook.move).replace('mv up', 'mv').replace('mv down', 'mv')}</span></div>
        </div>
        <div class="spacer" style="min-height:16px"></div>
        <div class="card-glass row" style="gap:10px;margin-bottom:10px">${icon('flame', { size: 21, color: 'var(--c-coral)', fill: 'var(--c-coral)', sw: 1.2 })}
          <div class="grow"><div class="t13 w8 white">${t('e4.streak1', { n: Math.max(1, v.streak) })}</div>${sub('e4.streak1')}</div>
          <span class="t11 w8" style="color:var(--c-teal)">${t('e4.badgeAt')}</span></div>
        ${raffle}
        <div class="stack" style="gap:9px">
          ${btn({ key: 'e4.share', to: 'D2', params: { cook: cook.id }, link: 'Share to help her win', ic: icon('share', { size: 18, sw: 2.1 }), primary: true, cls: 'btn-56' })}
          <a class="link-quiet" style="color:rgba(255,255,255,.75);font-size:13px" ${linkAttrs('E6', { params: { cook: cook.id }, link: 'Vote again tomorrow' })}>${t('e4.again')}</a>
        </div>
      </div></div>
    </section>`;
  },
};
