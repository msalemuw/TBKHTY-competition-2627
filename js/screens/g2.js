// G2 · Live vote confirmed: what the vote is worth, how many guests have voted,
// and when results are announced.
import { t, sub, alt, isAr, firstV } from '../i18n.js';
import { icon, langToggle, logo, confetti, linkAttrs, track } from '../ui.js';
import { cookById } from '../store.js';

export default {
  render(p) {
    const c = cookById(p.cook) || cookById('nadia');
    const name = firstV(c);
    return `<section class="scr dark">${confetti(31, 16, 390, 360)}
      <div class="body" style="position:relative"><div class="stack" style="min-height:100%;padding:14px">
        <div class="row" style="height:44px;gap:6px"><span data-hist-slot="dark"></span>${logo(true, 'logo logo-sm')}<div class="spacer"></div>${langToggle(true)}</div>
        <div class="spacer" style="min-height:12px"></div>
        <div class="stack center" style="align-items:center">
          <div class="big-tick">${icon('check', { size: 56, sw: 3.2, color: 'var(--c-navy)' })}</div>
          <h1 class="display white" style="font-size:36px;margin-top:16px">${t('g2.in')}</h1>
          ${isAr() ? '' : `<div class="t14 w7" style="margin-top:7px;color:var(--c-teal)">${alt('g2.in')}</div>`}
          <div class="t135 w7" style="margin-top:13px;color:rgba(255,255,255,.82)">${t('g2.counts', { name })}</div>${sub('g2.counts', { name }, { cls: 'c' })}
        </div>
        <div class="spacer" style="min-height:12px"></div>
        <div class="card-glass" style="margin-bottom:11px"><div class="row" style="align-items:baseline;gap:7px"><span class="display white" style="font-size:30px" lang="en">214</span><span class="t125 w7" style="color:rgba(255,255,255,.7)">${t('g2.guests')}</span></div>
          <div style="margin-top:10px" class="glass-track">${track(63)}</div>${sub('g2.guests')}</div>
        <div class="row coral-strip">${icon('clock', { size: 19, sw: 2.1, color: 'var(--c-white)' })}<span class="grow t13 w8 white">${t('g2.results')}</span>${isAr() ? '' : `<span class="t11" style="color:rgba(255,255,255,.85)">${alt('g2.results')}</span>`}</div>
        <a class="btn-ghost-dark" style="min-height:50px" ${linkAttrs('F1', { link: 'Back to the leaderboard' })} data-primary>${t('g2.back')}</a>
      </div></div>
    </section>`;
  },
};
