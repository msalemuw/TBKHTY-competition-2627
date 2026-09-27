// B3b · Drop your pin. GPS centres the map, she drags to her building, and the
// pin only counts when she confirms. The coordinate is never stored or shown.
import { t, ta, sub, LO, isAr } from '../i18n.js';
import { icon, appBar, btn, title, linkAttrs } from '../ui.js';
import { MAP_A } from '../art-data.js';
import { state, areaById, govById } from '../store.js';

let view = { x: 0, y: 0, z: 1 };

export default {
  render() {
    const s = state.signup;
    const area = areaById(s.area || state.geo.area || 'Mohandessin');
    const gov = govById(area.gov);
    const acc = state.geo.accuracy || 30;
    return `<section class="scr">
      ${appBar({ back: { to: 'B3' }, title: t('b3b.title') })}
      <div class="drag-map" data-map>
        <div class="drag-layer" style="transform:translate(${view.x}px,${view.y}px) scale(${view.z})"><svg viewBox="0 0 326 132" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${MAP_A}</svg></div>
        <div class="map-top"><span class="map-chip" style="position:static;min-height:30px;font-size:11.5px">${icon('gps', { size: 14, sw: 2.2, color: 'var(--c-teal-text)' })}${t('b3.accuracy', { m: acc })}</span></div>
        <div class="map-ctrls"><button type="button" class="map-btn" data-zoom aria-label="${ta('b3b.zoom')}">${icon('plus', { size: 18, sw: 2.4 })}</button>
          <button type="button" class="map-btn" data-recentre aria-label="${ta('b3b.recentre')}">${icon('gps', { size: 18, sw: 2.2, color: 'var(--c-teal-text)' })}</button></div>
      </div>
      <div class="body"><div class="pad">
        ${title('b3b.drag', { size: 26, subSize: 12.5 })}
        <div class="card" style="padding:11px"><div class="row" style="gap:10px">${icon('pin', { size: 18, color: 'var(--c-coral-text)' })}
          <div class="grow"><div class="t125 w8">${LO(area)}${isAr() ? '، ' : ', '}${LO(gov)}</div><div class="t105 muted" style="margin-top:1px">${t('b3b.gps', { gov: { en: gov.en, ar: gov.ar } })}</div></div></div></div>
        <div class="card" style="padding:11px"><div class="row" style="align-items:flex-start;gap:9px">${icon('info', { size: 16, color: 'var(--c-muted)' })}
          <div class="grow t11 muted lh">${t('b3b.never')}${sub('b3b.never')}</div></div></div>
      </div></div>
      <div class="bar">
        ${btn({ key: 'b3b.confirm', to: 'B3', link: 'Confirm this pin', primary: true, back: true, attrs: 'data-confirm-pin' })}
        <a class="link-quiet" ${linkAttrs('B3', { link: 'Cancel', back: true })}>${t('b3b.cancel')}</a>
      </div>
    </section>`;
  },
  mount(root, p, api) {
    const map = root.querySelector('[data-map]');
    const layer = root.querySelector('.drag-layer');
    let start = null;
    const apply = () => { layer.style.transform = `translate(${view.x}px,${view.y}px) scale(${view.z})`; };
    map.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      start = { x: e.clientX - view.x, y: e.clientY - view.y };
      map.setPointerCapture(e.pointerId);
    });
    map.addEventListener('pointermove', (e) => {
      if (!start) return;
      view.x = Math.max(-120, Math.min(120, e.clientX - start.x));
      view.y = Math.max(-100, Math.min(100, e.clientY - start.y));
      apply();
    });
    map.addEventListener('pointerup', () => { start = null; });
    root.querySelector('[data-zoom]').addEventListener('click', () => { view.z = view.z >= 2 ? 1 : view.z + 0.5; apply(); });
    root.querySelector('[data-recentre]').addEventListener('click', () => { view = { x: 0, y: 0, z: view.z }; apply(); });
    api.guard((a) => { if ('confirmPin' in a.dataset) state.signup.pinConfirmed = true; return undefined; });
  },
};
