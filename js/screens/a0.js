// A0 · Welcome. The screen before everything, for someone arriving from a WhatsApp link:
// three plain steps, then three doors, then the two quiet ways out.
import { t, sub, alt, raw, esc, isAr } from '../i18n.js';
import { icon, langToggle, logo, confetti, linkAttrs, chev } from '../ui.js';

const en = (k) => raw(k, 'en');

function door({ key, winKey, to, color, bg, ic, icColor }) {
  return `<a class="door" style="border-color:${color}" ${linkAttrs(to, { link: en(key) })}>
    <span class="door-ic" style="background:${bg}">${icon(ic, { size: 24, sw: 1.9, color: icColor })}</span>
    <span class="grow">
      <span class="door-name"><span>${t(key)}</span>${isAr() ? '' : `<span class="door-alt">${alt(key)}</span>`}</span>
      <span class="door-win">${icon('gift', { size: 14, color: 'var(--c-gold)' })}<span>${t(winKey)}</span></span>
      ${isAr() ? '' : `<span class="door-win-ar">${alt(winKey)}</span>`}
    </span>${chev('R', { size: 20 })}</a>`;
}

function step(n, ic, key) {
  return `<div class="a0-step"><div class="a0-step-ic">${icon(ic, { size: 24, sw: 1.9 })}<span class="num">${n}</span></div>
    <div class="a0-step-t">${t(key)}</div>${isAr() ? '' : `<div class="a0-step-ar">${alt(key)}</div>`}</div>`;
}

export default {
  render() {
    const keys = ['a0.free', 'a0.noapp', 'a0.twomin'];
    const checks = keys.map((k) => `<span class="a0-check">${icon('check', { size: 13, sw: 3, color: 'var(--c-teal)' })}<span>${t(k)}</span></span>`).join('');
    const arChecks = isAr() ? '' : `<div class="a0-ar-sm"><bdi lang="ar" dir="rtl">${keys.map((k) => esc(raw(k, 'ar'))).join(' · ')}</bdi></div>`;
    return `<section class="scr">
      <div class="body">
        <header class="hdr-dark a0-hero">${confetti(3, 14, 390, 250)}
          <div class="hdr-row">${logo(true)}<div class="spacer"></div>${langToggle(true)}</div>
          <h1 class="display white a0-title">${t('a0.title')}</h1>
          ${isAr() ? '' : `<div class="a0-ar-title">${alt('a0.title')}</div>`}
          <div class="a0-lede">${t('a0.lede')}</div>
          ${isAr() ? '' : `<div class="a0-ar-sm">${alt('a0.lede')}</div>`}
          <div class="a0-checks">${checks}</div>${arChecks}
        </header>
        <div class="pad">
          <div class="a0-steps">${step(1, 'pot', 'a0.s1')}${step(2, 'heart', 'a0.s2')}${step(3, 'trophy', 'a0.s3')}</div>
          <div class="rule"></div>
          <div><h2 class="a0-which">${t('a0.which')}</h2>${sub('a0.which', null, { cls: 's a0-which-ar' })}</div>
          <div class="stack" style="gap:10px" data-primary>
            ${door({ key: 'a0.cook', winKey: 'a0.cookWin', to: 'B1', color: 'var(--c-teal)', bg: 'var(--c-teal-bg)', ic: 'utensils', icColor: 'var(--c-teal-text)' })}
            ${door({ key: 'a0.vote', winKey: 'a0.voteWin', to: 'E1', color: 'var(--c-coral)', bg: 'var(--c-coral-bg)', ic: 'heart', icColor: 'var(--c-coral-text)' })}
            ${door({ key: 'a0.know', winKey: 'a0.knowWin', to: 'C1', color: 'var(--c-gold)', bg: 'var(--c-gold-bg)', ic: 'gift', icColor: 'var(--c-gold)' })}
          </div>
        </div>
      </div>
      <div class="bar"><div class="row" style="gap:9px">
        <a class="btn-tile a0-tile" ${linkAttrs('A1', { link: 'See the rankings' })}><span>${t('a0.rank')}</span>${isAr() ? '' : `<span class="tile-ar">${alt('a0.rank')}</span>`}</a>
        <a class="btn-tile a0-tile" ${linkAttrs('A3', { link: 'How it works' })}><span>${t('a0.how')}</span>${isAr() ? '' : `<span class="tile-ar">${alt('a0.how')}</span>`}</a>
      </div></div>
    </section>`;
  },
};
