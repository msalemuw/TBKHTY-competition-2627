// D3 · Kitchen readiness. Seven questions, one card at a time; delivery radius
// is the live card, anchored on the area she gave at signup.
import { t, sub, alt, raw, LO, isAr } from '../i18n.js';
import { icon, appBar, track, bottomNav } from '../ui.js';
import { RADIUS_ART } from '../art-data.js';
import { state, areaById, AREAS } from '../store.js';
import { COOK_NAV, dashCook } from './d1.js';

const RADII = [['area', 'd3.r1', 0], ['5km', 'd3.r2', 5], ['10km', 'd3.r3', 10], ['cairo', 'd3.r4', 60]];
const LATER = ['d3.q4', 'd3.q5', 'd3.q6', 'd3.q7'];
function km([a, b], [c, d]) {
  const r = (x) => (x * Math.PI) / 180;
  const h = Math.sin(r(c - a) / 2) ** 2 + Math.cos(r(a)) * Math.cos(r(c)) * Math.sin(r(d - b) / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export default {
  render() {
    const k = state.kitchen;
    k.later = k.later || {};
    const cook = dashCook();
    const area = areaById(cook.area) || areaById('Mohandessin');
    const answered = 2 + (k.radius ? 1 : 0) + Object.values(k.later).filter(Boolean).length;
    const pct = Math.round((answered / 7) * 100);
    const r = RADII.find((x) => x[0] === k.radius);
    const near = r && r[2] ? AREAS.filter((a) => a.id !== area.id && a.centre && !a.wholeGov && km(a.centre, area.centre) <= r[2])
      .sort((a, b) => km(a.centre, area.centre) - km(b.centre, area.centre)) : [];
    const covered = near.slice(0, 5).map((a) => LO(a)).concat(near.length > 5 ? ['…'] : []);
    const reach = !r ? '' : r[2] === 0 ? t('d3.reachOnly', { area: { en: area.en, ar: area.ar } })
      : t('d3.reach', { range: { en: raw(r[1], 'en'), ar: raw(r[1], 'ar') }, area: { en: area.en, ar: area.ar }, list: covered.join(', ') || '—' });
    const done = (q, a, u) => `<div class="card" style="padding:11px"><div class="row" style="align-items:flex-start;gap:10px"><span class="tick" style="width:22px;height:22px">${icon('check', { size: 14, sw: 3, color: 'var(--c-navy)' })}</span>
      <div class="grow"><div class="row" style="gap:6px"><span class="t125 w8 grow">${t(q)}</span>${isAr() ? '' : `<span class="t11 w6 muted">${alt(q)}</span>`}</div>
      <div class="t11 muted" style="margin-top:3px">${t(a)}</div><span class="unlock">${icon('star', { size: 11, sw: 2.2, color: 'var(--c-teal-text)' })}${t(u)}</span></div></div></div>`;
    return `<section class="scr">
      ${appBar({ back: { to: 'D1' }, title: t('nav.kitchen') })}
      <div class="body"><div class="pad" style="gap:9px">
        <div class="card"><div class="row" style="gap:10px"><div class="grow"><div class="t14 w8">${t('d3.ready', { p: pct })}</div>${sub('d3.ready', { p: pct })}</div><div class="display teal-ink" style="font-size:28px">${pct}%</div></div>
          <div style="margin-top:10px">${track(pct, '', 9)}</div><div class="t105 muted" style="margin-top:7px">${t('d3.answered', { n: answered })}</div></div>
        ${done('d3.q1', 'd3.a1', 'd3.u1')}
        ${done('d3.q2', 'd3.a2', 'd3.u2')}
        <div class="card" style="border-color:var(--c-teal);box-shadow:0 0 0 3px rgba(26,188,156,.13)">
          <div class="row" style="align-items:flex-start;gap:11px"><div class="grow"><div class="t14 w8" style="line-height:1.25">${t('d3.q3')}</div>${sub('d3.q3')}
            <span class="from-chip">${icon('pin', { size: 13, color: 'var(--c-muted)' })}<span class="t11 w7">${t('d3.from', { area: { en: area.en, ar: area.ar } })}</span></span></div>
            <svg width="58" height="58" viewBox="0 0 60 60" aria-hidden="true">${RADIUS_ART}</svg></div>
          <div class="chips wrap" style="margin-top:11px;gap:7px" data-primary>${RADII.map(([id, key]) => `<button type="button" class="chip" data-radius="${id}" aria-pressed="${k.radius === id}"><span class="c1">${t(key)}</span>${isAr() ? '' : `<span class="c2">${alt(key)}</span>`}</button>`).join('')}</div>
          <div class="t105 muted lh" style="margin-top:9px">${reach}</div></div>
        ${LATER.map((q) => `<button type="button" class="later-q" data-later="${q}" aria-pressed="${!!k.later[q]}"><span class="radio-dot">${k.later[q] ? icon('check', { size: 13, sw: 3, color: 'var(--c-navy)' }) : ''}</span><span class="grow t125 w7">${t(q)}</span>${isAr() ? '' : `<span class="t11 w6 muted">${alt(q)}</span>`}</button>`).join('')}
      </div></div>
      ${bottomNav(COOK_NAV, 'D3')}
    </section>`;
  },
  mount(root, p, api) {
    const k = state.kitchen;
    root.querySelectorAll('[data-radius]').forEach((b) => b.addEventListener('click', () => { k.radius = b.dataset.radius; api.rerender(); }));
    root.querySelectorAll('[data-later]').forEach((b) => b.addEventListener('click', () => { k.later[b.dataset.later] = !k.later[b.dataset.later]; api.rerender(); }));
  },
};
