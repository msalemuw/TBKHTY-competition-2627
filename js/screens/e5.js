// E5 · Quick profile. Area is already known from E3 and shown as confirmed
// context; one optional question, paid for with a raffle entry.
import { t, sub, alt, LO, isAr } from '../i18n.js';
import { icon, appBar, btn, title, govAreaFields, wireGovArea, scrollHint } from '../ui.js';
import { state, areaById } from '../store.js';

const FREQ = ['e5.r1', 'e5.r2', 'e5.r3', 'e5.r4'];

export default {
  render() {
    const v = state.voter;
    const area = areaById(v.area);
    return `<section class="scr">
      ${appBar({ back: { to: 'E4', params: v.lastVoted ? { cook: v.lastVoted } : null } })}
      <div class="body"><div class="pad" style="gap:12px">
        <div class="row" style="gap:9px"><span class="seg-dot on"></span><span class="seg-dot"></span><span class="spacer"></span><span class="t11 w8 muted">${t('e5.step')}</span></div>
        ${title('e5.title', { size: 28 })}
        ${area ? `<div class="card-teal row" style="gap:9px;padding:10px">${icon('gps', { size: 16, sw: 2.1, color: 'var(--c-teal-text)' })}<div class="grow"><div class="t12 w8">${t('e5.read', { area: { en: area.en, ar: area.ar } })}</div>${sub('e5.read', { area: { en: area.en, ar: area.ar } })}</div></div>` : ''}
        ${govAreaFields('q', v.gov, v.area)}
        <div class="t11 muted lh">${t('e5.why')}${sub('e5.why')}</div>
        <div class="rule"></div>
        <div><div class="t145 w8">${t('e5.optional')}</div><div class="t12 muted" style="margin-top:3px">${t('e5.q')}</div>${sub('e5.q', null, { cls: '' })}</div>
        <div class="stack" style="gap:9px" role="radiogroup" aria-label="${t('e5.q')}">
          ${FREQ.map((k) => `<button type="button" class="radio-card" role="radio" data-freq="${k}" aria-checked="${v.freq === k}"><span class="grow"><span class="t15 w8 navy" style="display:block">${t(k)}</span>${isAr() ? '' : `<span class="t115 muted" style="display:block;margin-top:1px">${alt(k)}</span>`}</span><span class="radio-dot">${v.freq === k ? icon('check', { size: 13, sw: 3, color: 'var(--c-navy)' }) : ''}</span></button>`).join('')}
        </div>
        ${scrollHint()}
      </div></div>
      <div class="bar">
        <div class="card row" style="gap:10px;padding:11px"><span class="gift-dot">${icon('gift', { size: 17, color: 'var(--c-gold)' })}</span><div class="grow"><div class="t125 w8">${t('e5.finish')}</div>${sub('e5.finish')}</div></div>
        ${btn({ key: 'e5.save', to: 'E7', link: 'Save and finish', primary: true })}
      </div>
    </section>`;
  },
  mount(root, p, api) {
    const v = state.voter;
    wireGovArea(root, 'q', ({ gov, area }) => { v.gov = gov; v.area = area; api.rerender(); });
    root.querySelectorAll('[data-freq]').forEach((b) => b.addEventListener('click', () => { v.freq = v.freq === b.dataset.freq ? null : b.dataset.freq; api.rerender(); }));
    api.guard((a) => { if (a.dataset.to === 'E7') { v.raffle = true; } return undefined; });
  },
};
