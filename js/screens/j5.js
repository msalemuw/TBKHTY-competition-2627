// J5 · Title awarded. Arrives as a notification: Hoda takes #1 Cook in Dokki
// while finishing second overall. Titles spread the winning around.
import { t, sub, alt, isAr } from '../i18n.js';
import { icon, langToggle, logo, confetti, btn, linkAttrs } from '../ui.js';

export default {
  render() {
    return `<section class="scr dark">${confetti(51, 16, 390, 420)}
      <div class="body" style="position:relative"><div class="stack" style="min-height:100%;padding:14px">
        <div class="row" style="height:44px;gap:6px"><span data-hist-slot="dark"></span>${logo(true, 'logo logo-sm')}<div class="spacer"></div>${langToggle(true)}</div>
        <div class="spacer" style="min-height:10px"></div>
        <div class="stack center" style="align-items:center">
          <div class="big-tick" style="background:var(--c-white)">${icon('trophy', { size: 52, sw: 1.8, color: 'var(--c-navy)' })}</div>
          <div class="t11 w8" style="margin-top:8px;letter-spacing:.14em;color:var(--c-teal)">${t('j5.cap')}</div>
          <h1 class="display white" style="font-size:34px;margin-top:10px">${t('j5.title')}</h1>
          ${isAr() ? '' : `<div class="t14 w7" style="margin-top:8px;color:var(--c-teal)">${alt('j5.title')}</div>`}
          <div class="t13 w7" style="margin-top:14px;color:rgba(255,255,255,.8)">${t('j5.from')}</div>
        </div>
        <div class="spacer" style="min-height:12px"></div>
        <div class="card-glass" style="margin-bottom:11px"><div class="t10 w8" style="letter-spacing:.08em;color:rgba(255,255,255,.55)">${t('j5.tracks')}</div>
          <div class="row" style="gap:9px;margin-top:9px">${icon('pin', { size: 15, color: 'var(--c-teal)' })}<span class="grow t125 w7 white">${t('j5.dokki')}</span><span class="t125 w8" style="color:var(--c-teal)">${t('j5.won')}</span></div>
          <div class="row" style="gap:9px;margin-top:8px">${icon('trophy', { size: 15, color: 'var(--c-gold)' })}<span class="grow t125 w7 white">${t('j5.club')}</span><span class="t125 w8" style="color:rgba(255,255,255,.7)">${t('j5.second')}</span></div></div>
        <div class="card-glass" style="margin-bottom:11px"><div class="row" style="gap:10px">${icon('bell', { size: 19, color: 'var(--c-teal)' })}<div class="grow"><div class="t125 w8 white">${t('j5.hold')}</div><div class="t11" style="color:rgba(255,255,255,.65);margin-top:2px">${t('j5.tell')}</div>${sub('j5.tell')}</div></div></div>
        <div class="stack" style="gap:9px">
          ${btn({ key: 'j5.share', to: 'D2', params: { cook: 'hoda' }, link: 'Share my title card', ic: icon('share', { size: 18, sw: 2.1 }), primary: true, cls: 'btn-56' })}
          <a class="btn-ghost-dark" ${linkAttrs('J3', { params: { cook: 'hoda' }, link: 'See it on my profile' })}>${t('j5.see')}</a>
        </div>
      </div></div>
    </section>`;
  },
};
