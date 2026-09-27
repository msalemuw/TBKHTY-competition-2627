// B3d · Your area and club. Step 3 of 5. The pin's reading at the top, then
// governorate, area and the optional club, and the rankings these answers
// put her in, live.
import { t, ta, sub, alt, LO, isAr, esc } from '../i18n.js';
import { icon, appBar, btn, title, steps, linkAttrs, govAreaFields, wireGovArea, selectField, chev } from '../ui.js';
import { state, areaById, compoundsIn } from '../store.js';
import content from '../data/content.js';

let ui = { err: null };

export default {
  render() {
    const s = state.signup;
    if (!s.area && state.geo.area) s.area = state.geo.area;
    const area = areaById(s.area);
    const geoOk = state.geo.status === 'ok' && !state.force.locationDenied;
    const inClub = s.club === 'shooting';
    const read = geoOk && area
      ? `<div><div class="loc-ok" style="min-height:56px"><span class="tick">${icon('check', { size: 15, sw: 3, color: 'var(--c-navy)' })}</span><div class="grow t125 w8">${t('e3.locOk')}</div></div>
          <div class="t11 muted lh" style="margin-top:7px">${t('b3d.read', { area: { en: area.en, ar: area.ar } })}${sub('b3d.read', { area: { en: area.en, ar: area.ar } })}</div></div>`
      : `<div class="t12 muted">${t('b3d.manual')}</div>`;
    const compounds = compoundsIn(s.gov || (area && area.gov) || 'giza');
    const clubOpts = content.club_dropdown.map((c) => ({ value: c.id, label: LO(c) }));
    const err = ui.err ? `<div class="err-text" role="alert">${icon('info', { size: 15, color: 'var(--c-coral-text)' })}<span>${t(ui.err)}</span></div>` : '';
    return `<section class="scr">
      ${appBar({ back: { to: 'B3' } })}
      <div class="body"><div class="pad">
        ${steps(3)}
        <div class="sec-head"><div class="cap">${t('step', { n: 3 })}</div><span class="spacer"></span><span class="note">${alt('step', { n: 3 })}</span></div>
        ${title('b3d.title', { size: 27, subSize: 12.5 })}
        ${read}
        ${govAreaFields('s', s.gov, s.area)}
        ${compounds.length ? selectField({ id: 's-compound', key: 'b3d.compound', value: s.compound, optional: true,
          options: [{ value: 'none', label: ta('b3d.noCompound') }, ...compounds.map((c) => ({ value: c.id, label: LO(c) }))] }) : ''}
        <a class="link-teal" style="margin-top:-4px;font-size:12px" ${linkAttrs('B3a', { link: 'Browse the full list or add a compound' })}>${t('b3d.browse')}${icon('chevR', { size: 14, sw: 2.3, cls: 'flip' })}</a>
        <div>${selectField({ id: 's-club', key: 'b3d.club', value: s.club, optional: true, options: clubOpts })}
          <div class="t11 muted lh" style="margin-top:5px">${t('b3d.clubNote')}${sub('b3d.clubNote')}</div></div>
        <div class="card-teal">
          <div class="row" style="gap:7px">${icon('check', { size: 15, sw: 2.6, color: 'var(--c-teal-text)' })}<span class="t125 w8">${t(inClub ? 'b3d.two' : 'b3d.one')}</span><span class="spacer"></span>${isAr() || !inClub ? '' : `<span class="t11 w6 muted nowrap">${alt('b3d.two')}</span>`}</div>
          ${area ? `<div class="row" style="gap:8px;margin-top:8px">${icon('pin', { size: 15, color: 'var(--c-teal-text)' })}<span class="grow t12 w7">${t('b3d.areaRank', { area: { en: area.en, ar: area.ar } })}</span><span class="t11 w7 muted">${t('b3d.fromArea')}</span></div>` : ''}
          ${inClub ? `<div class="row" style="gap:8px;margin-top:8px">${icon('trophy', { size: 15, color: 'var(--c-gold)' })}<span class="grow t12 w7">${t('edition')}</span><span class="t11 w7 muted">${t('b3d.fromClub')}</span></div>` : ''}
          <div class="t11 muted lh" style="margin-top:9px">${t('b3d.never')}${sub('b3d.never')}</div>
          <a class="link-teal" style="font-size:12px" ${linkAttrs('J1', { link: 'How the two rankings work' })}>${t('b3d.how')}${icon('chevR', { size: 13, sw: 2.4, cls: 'flip' })}</a>
        </div>
        ${err}
      </div></div>
      <div class="bar">${btn({ key: 'cont', to: 'B4', link: 'Continue', variant: 'navy', primary: true })}</div>
    </section>`;
  },
  mount(root, p, api) {
    const s = state.signup;
    wireGovArea(root, 's', ({ gov, area, changed }) => { if (changed === 'gov') s.compound = 'none'; s.gov = gov; s.area = area; ui.err = null; api.rerender(); });
    const cp = root.querySelector('#s-compound');
    if (cp) cp.addEventListener('change', () => { s.compound = cp.value; });
    root.querySelector('#s-club').addEventListener('change', (e) => { s.club = e.target.value; api.rerender(); });
    api.guard((a) => {
      if (a.dataset.to !== 'B4') return undefined;
      ui.err = s.area ? null : 'b3d.needArea';
      if (ui.err) { api.rerender(); return false; }
      return undefined;
    });
  },
};
