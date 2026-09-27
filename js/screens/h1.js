// H1 · Results reveal. Third, second, then the winner, each opened up into
// judges, tasting and online so the blend is visible rather than asserted.
import { t, sub, alt, L, isAr } from '../i18n.js';
import { icon, langToggle, logo, confetti, dish, avatar, sponsorSlot, linkAttrs } from '../ui.js';
import { cookById } from '../store.js';
import content from '../data/content.js';

function bar(s, h) {
  const seg = (w, cls, v) => `<div class="seg ${cls}" style="width:${w}%;font-size:${h > 16 ? 11 : 10}px">${v}</div>`;
  return `<div class="score-bar" style="height:${h}px;border-radius:6px">${seg(s.judges_of_40, 'judges', s.judges_of_40)}${seg(s.tasting_of_30, 'tasting', s.tasting_of_30)}${seg(s.online_of_30, 'online', s.online_of_30)}</div>`;
}
const total = (s) => (s.judges_of_40 + s.tasting_of_30 + s.online_of_30).toFixed(1);

function place(s, n) {
  const c = cookById(s.cook);
  const win = n === 1;
  return `<div class="${win ? 'win-card' : 'res-card'}" aria-label="${t('h1.place', { n })}">
    ${win ? `<div class="win-crown">${icon('crown', { size: 26, color: 'var(--c-gold)', fill: 'var(--c-gold)', sw: 1.2 })}</div>` : ''}
    <div class="row" style="gap:11px"><div class="display" style="width:${win ? 34 : 26}px;font-size:${win ? 30 : 21}px;color:${win ? 'var(--c-gold)' : 'rgba(255,255,255,.5)'}" lang="en">${n}</div>
      ${dish(c, { w: win ? 58 : 44, h: win ? 58 : 44, radius: 999 })}${avatar(c, win ? 46 : 34)}
      <div class="grow"><div class="${win ? 't16' : 't135'} w8 white">${L(c, 'name')}</div><div class="t105" style="color:rgba(255,255,255,.6);margin-top:1px">${L(c, 'dish')}</div></div>
      <div class="none" style="text-align:end"><div class="display white" style="font-size:${win ? 30 : 22}px;line-height:1" lang="en">${total(s)}</div><div class="t10 w8" style="letter-spacing:.06em;color:rgba(255,255,255,.55)">${t('h1.score')}</div></div></div>
    <div style="margin-top:10px">${bar(s, win ? 20 : 16)}</div>
    ${win ? `<div class="row" style="gap:8px;margin-top:10px">${icon('gift', { size: 16, color: 'var(--c-gold)' })}<span class="t115 w8 white grow">${t('h1.grand')}</span>${sponsorSlot(true, 'sponsor', 76)}</div>` : ''}
  </div>`;
}

export default {
  render() {
    const [first, second, third] = content.final_scores;
    const legend = (color, key) => `<span class="row" style="gap:6px"><span class="sw" style="background:${color}"></span><span class="t105 w7" style="color:rgba(255,255,255,.7)">${t(key)}</span></span>`;
    return `<section class="scr dark">${confetti(41, 16, 390, 300)}
      <div class="body" style="position:relative"><div class="stack" style="min-height:100%;padding:14px;gap:11px">
        <div class="row" style="height:44px;gap:6px"><span data-hist-slot="dark"></span>${logo(true, 'logo logo-sm')}<div class="spacer"></div>${langToggle(true)}</div>
        <div class="center"><h1 class="display white" style="font-size:34px">${t('h1.title')}</h1>${isAr() ? '' : `<div class="t135 w7" style="margin-top:5px;color:var(--c-teal)">${alt('h1.title')}</div>`}
          <div class="t115 w7" style="color:rgba(255,255,255,.6);margin-top:6px">${t('h1.meta')}</div></div>
        ${place(third, 3)}${place(second, 2)}<div style="height:6px"></div>${place(first, 1)}
        <div class="spacer"></div>
        <div class="row" style="gap:14px;justify-content:center;flex-wrap:wrap">${legend('var(--c-blue)', 'h1.judges')}${legend('var(--c-coral)', 'h1.tasting')}${legend('var(--c-teal-dark)', 'h1.online')}</div>
      </div></div>
      <div class="bar"><a class="btn btn-teal btn-52" ${linkAttrs('H2', { link: "See the winner's page" })} data-primary><span class="l1" style="font-size:15px;font-weight:800">${t('h1.winner')}</span></a></div>
    </section>`;
  },
};
