// A3 · How the competition works: three steps for cooks, three for voters,
// the 40/30/30 split with judges sealed, and the prizes.
import { t, sub, alt, isAr } from '../i18n.js';
import { icon, appBar, btn, secHead, title, scrollHint, linkAttrs } from '../ui.js';

function stepCard(n, ic, key, subKey) {
  return `<div class="how-step"><div class="how-ic">${icon(ic, { size: 22, sw: 1.9, color: 'var(--c-teal-text)' })}<span class="num">${n}</span></div>
    <div class="t125 w8" style="line-height:1.15">${t(key)}</div>${isAr() ? '' : `<div class="t11 muted">${alt(key)}</div>`}
    <div class="t105 muted" style="line-height:1.35">${t(subKey)}</div></div>`;
}
function legend(color, key) {
  return `<div class="row" style="gap:7px"><span class="sw" style="background:${color}"></span><span class="t12 w7">${t(key)}</span><span class="spacer"></span>${isAr() ? '' : `<span class="t11 muted">${alt(key)}</span>`}</div>`;
}
function prize(ic, bg, color, key) {
  return `<div class="row" style="gap:10px;margin-top:10px"><span class="prize-ic" style="background:${bg}">${icon(ic, { size: 18, sw: 1.9, color })}</span>
    <div class="grow"><div class="t125 w8">${t(key)}</div>${sub(key, null, { cls: 's' })}</div></div>`;
}
export function scoreBar(h = 34) {
  return `<div class="score-bar" style="height:${h}px"><div class="seg judges" style="width:40%">40%</div><div class="seg tasting" style="width:30%">30%</div><div class="seg online" style="width:30%">30%</div></div>`;
}

export default {
  render() {
    return `<section class="scr">
      ${appBar({ back: { to: 'A1' }, title: t('a3.title') })}
      <div class="body"><div class="pad">
        ${title('a3.title', { size: 26, subSize: 14 })}
        <div class="row" style="gap:8px;margin-top:2px"><span class="badge b-navy">${t('a3.forCooks')}</span>${isAr() ? '' : `<span class="t115 muted w6">${alt('a3.forCooks')}</span>`}</div>
        <div class="row" style="gap:9px;align-items:stretch">${stepCard(1, 'pencil', 'a3.c1', 'a3.c1s')}${stepCard(2, 'share', 'a3.c2', 'a3.c2s')}${stepCard(3, 'pot', 'a3.c3', 'a3.c3s')}</div>
        <div class="row" style="gap:8px;margin-top:2px"><span class="badge b-teal">${t('a3.forVoters')}</span>${isAr() ? '' : `<span class="t115 muted w6">${alt('a3.forVoters')}</span>`}</div>
        <div class="row" style="gap:9px;align-items:stretch">${stepCard(1, 'heart', 'a3.v1', 'a3.v1s')}${stepCard(2, 'chat', 'a3.v2', 'a3.v2s')}${stepCard(3, 'utensils', 'a3.v3', 'a3.v3s')}</div>
        <div class="card">
          ${secHead('a3.decided')}
          <div style="margin-top:10px">${scoreBar()}</div>
          <div class="stack" style="gap:5px;margin-top:9px">${legend('var(--c-blue)', 'a3.judges')}${legend('var(--c-coral)', 'a3.tasting')}${legend('var(--c-teal-dark)', 'a3.online')}</div>
          <div class="row sealed">${icon('eye', { size: 15, sw: 1.7, color: 'var(--c-muted)' })}<div class="t11 muted lh">${t('a3.sealed')}${sub('a3.sealed')}</div></div>
        </div>
        <div class="card">
          ${secHead('a3.win')}
          ${prize('gift', 'var(--c-gold-bg)', 'var(--c-gold)', 'a3.grand')}
          ${prize('check', 'var(--c-teal-bg)', 'var(--c-teal-text)', 'a3.badge')}
          ${prize('trophy', 'var(--c-slate-bg)', 'var(--c-navy)', 'a3.final')}
        </div>
        ${scrollHint()}
      </div></div>
      <div class="bar">
        ${btn({ key: 'a3.signup', to: 'B1', link: 'Sign up as a cook to compete', ic: icon('utensils', { size: 18 }), primary: true, cls: 'btn-52' })}
        <a class="link-teal" style="justify-content:center;width:100%;font-size:13px" ${linkAttrs('E1', { link: 'Just here to vote? Start voting' })}>${icon('heart', { size: 16, sw: 2.1 })}${t('a3.justVote')}</a>
      </div>
    </section>`;
  },
};
