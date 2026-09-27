// B3a · Area picker. Governorate chips, then the areas inside it, search across
// the whole controlled list, and an escape hatch for anything missing.
import { t, ta, alt, LO, isAr, esc } from '../i18n.js';
import { icon, appBar, btn } from '../ui.js';
import { state, AREAS, GOVERNORATES, areaById, govById } from '../store.js';

let ui = null;
let query = '';

export default {
  render() {
    const s = state.signup;
    if (!ui) {
      const a = areaById(s.area || state.geo.area || 'Mohandessin');
      ui = { area: a.id, gov: a.gov };
    }
    const q = query.trim().toLowerCase();
    const list = q
      ? AREAS.filter((a) => a.en.toLowerCase().includes(q) || a.ar.includes(query.trim()))
      : AREAS.filter((a) => a.gov === ui.gov);
    const gov = govById(ui.gov);
    const area = areaById(ui.area);
    const selGov = govById(area.gov);
    const confirmV = { gov: { en: selGov.en, ar: selGov.ar }, area: { en: area.en, ar: area.ar } };
    const loc = state.geo.status === 'ok'
      ? `<div class="loc-ok" style="min-height:46px;margin-bottom:10px"><span class="tick">${icon('check', { size: 15, sw: 3, color: 'var(--c-navy)' })}</span><div class="grow t125 w8">${t('e3.locOk')}</div></div>` : '';
    return `<section class="scr">
      ${appBar({ back: { to: 'B3d' }, title: t('b3a.title') })}
      <div class="picker-top">${loc}
        <div class="search-box" style="background:var(--c-white)">${icon('search', { size: 17, color: 'var(--c-muted)' })}
          <input id="area-q" type="search" value="${esc(query)}" placeholder="${ta('b3a.search')}" aria-label="${ta('b3a.searchShort')}" autocomplete="off">${isAr() ? '' : `<span class="t11 muted nowrap" style="padding-inline-end:10px">${alt('b3a.searchShort')}</span>`}</div>
        <div class="row" style="gap:7px;margin-top:11px"><span class="t105 w8 muted" style="letter-spacing:.06em">${t('b3a.gov')}</span><span class="spacer"></span>${isAr() ? '' : `<span class="t11 w6 muted">${alt('b3a.gov')}</span>`}</div>
        <div class="chips" style="margin-top:7px">${GOVERNORATES.map((g) => `<button type="button" class="chip" data-gov="${g.id}" aria-pressed="${!q && g.id === ui.gov}"><span class="c1">${LO(g)}</span>${isAr() ? '' : `<span class="c2" lang="ar">${esc(g.ar)}</span>`}</button>`).join('')}</div>
      </div>
      <div class="body"><div class="pad" style="gap:8px">
        ${q ? '' : `<div class="row"><span class="t105 w8 muted" style="letter-spacing:.06em">${t('b3a.areasIn', { gov: { en: gov.en.toUpperCase(), ar: gov.ar } })}</span><span class="spacer"></span>${isAr() ? '' : `<span class="t11 w6 muted">${alt('b3a.areasIn', { gov: { en: gov.en, ar: gov.ar } })}</span>`}</div>`}
        <div class="stack" style="gap:8px" role="radiogroup" aria-label="${ta('b3a.title')}">
          ${list.length ? list.map((a) => `<button type="button" class="area-opt" role="radio" data-area="${esc(a.id)}" aria-checked="${a.id === ui.area}">${icon('pin', { size: 16, sw: 1.9, color: a.id === ui.area ? 'var(--c-teal-text)' : 'var(--c-muted)' })}
            <span class="grow"><span class="t13 w8 navy" style="display:block">${LO(a)}</span>${isAr() ? '' : `<span class="t11 muted" style="display:block;margin-top:1px" lang="ar">${esc(a.ar)}</span>`}</span>
            <span class="radio-dot">${a.id === ui.area ? icon('check', { size: 13, sw: 3, color: 'var(--c-navy)' }) : ''}</span></button>`).join('') : `<div class="t12 muted" style="padding:12px 0">${t('b3a.none')}</div>`}
        </div>
      </div></div>
      <div class="bar" style="background:var(--c-white)">
        <button type="button" class="link-quiet teal-ink" style="font-weight:800" data-toast="b3a.notListedToast">${t('b3a.notListed')}</button>
        ${btn({ key: area.wholeGov ? 'b3a.confirmGov' : 'b3a.confirm', vars: confirmV, to: 'B3d', primary: true, back: true, cls: 'btn-52' })}
      </div>
    </section>`;
  },
  mount(root, p, api) {
    root.querySelectorAll('[data-gov]').forEach((b) => b.addEventListener('click', () => {
      query = '';
      ui.gov = b.dataset.gov;
      const list = AREAS.filter((a) => a.gov === ui.gov);
      if (list.length === 1) ui.area = list[0].id;
      api.rerender({ top: true });
    }));
    // With 27 governorates the chip row scrolls; keep the chosen one in view.
    const on = root.querySelector('[data-gov][aria-pressed="true"]');
    if (on) on.scrollIntoView({ block: 'nearest', inline: 'center' });
    root.querySelectorAll('[data-area]').forEach((b) => b.addEventListener('click', () => { ui.area = b.dataset.area; ui.gov = areaById(ui.area).gov; api.rerender(); }));
    const input = root.querySelector('#area-q');
    let tm = null;
    input.addEventListener('input', () => { clearTimeout(tm); tm = setTimeout(() => { query = input.value; api.rerender({ top: true }); }, 120); });
    api.guard((a) => {
      if (a.dataset.to === 'B3d') {
        state.signup.area = ui.area;
        state.signup.gov = ui.gov;
        ui = null;
        query = '';
      }
      return undefined;
    });
  },
};
