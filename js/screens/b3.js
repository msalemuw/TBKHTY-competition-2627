// B3 · About you and your area. Name, an optional photo, and the pin. The one
// real geolocation call happens here; on denial it falls through to the area list.
import { t, ta, sub, alt, LO, isAr } from '../i18n.js';
import { icon, appBar, btn, title, field, steps, linkAttrs } from '../ui.js';
import { MAP_A } from '../art-data.js';
import { state, requestLocationOnce, areaById, govById } from '../store.js';

export const MAX_BYTES = 10 * 1024 * 1024;
let ui = { err: null };

// K3 · Photo failed. The rest of the form is kept exactly as typed.
export function uploadFailed(sizeBytes) {
  const mb = (sizeBytes / 1024 / 1024).toFixed(1);
  return `<div class="card" data-k3="upload-failed" style="padding:12px">
    <div class="upload-fail">${icon('camera', { size: 26, sw: 1.8, color: 'var(--c-coral-text)' })}<span class="t125 w8 coral-ink">${t('k3.uploadStopped')}</span><span class="t11 muted">${t('k3.tooBig', { mb })}</span></div>
    <div class="row" style="gap:9px;margin-top:11px">${btn({ key: 'k3.tryAgain', cls: 'btn-sm grow', attrs: 'data-pick' })}${btn({ key: 'k3.another', variant: 'soft', cls: 'btn-sm grow', attrs: 'data-pick' })}</div></div>`;
}

export function mapBox({ accuracy = 30, h = 116, chip = null } = {}) {
  const c = chip ?? `${icon('gps', { size: 12, sw: 2.2, color: 'var(--c-teal-text)' })}${t('b3.accuracy', { m: accuracy })}`;
  return `<div class="map" style="height:${h}px"><svg viewBox="0 0 326 132" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${MAP_A}</svg>
    <span class="map-chip">${c}</span></div>`;
}

function pinBlock() {
  const g = state.geo;
  const s = state.signup;
  if (g.status === 'denied' || state.force.locationDenied) {
    return `<div class="card" data-k3="location-denied" style="padding:6px 12px 12px"><div class="state" style="padding:12px 4px 4px">
      <div class="state-icon" style="background:var(--c-white);border:1.5px solid var(--c-line)">${icon('gps', { size: 28, sw: 1.8, color: 'var(--c-coral-text)' })}</div>
      <div class="display state-title">${t('k3.locDenied')}</div>${sub('k3.locDenied', null, { cls: 'c' })}
      <div class="t12 muted lh">${t('k3.locBody')}</div>
      <div style="width:100%;margin-top:4px">${btn({ key: 'k3.pickArea', to: 'B3d', link: 'Pick my area from the list', cls: 'btn-sm' })}</div></div></div>`;
  }
  if (g.status !== 'ok') {
    return `<div class="pin-card">${mapBox({ chip: t('b3.locating') })}</div>`;
  }
  const area = areaById(s.area || g.area);
  const gov = area ? govById(area.gov) : null;
  return `<div class="pin-card">${mapBox({ accuracy: g.accuracy || 30 })}
    <div class="row" style="gap:10px;padding:9px 12px"><span class="tick" style="width:24px;height:24px">${icon('check', { size: 14, sw: 3, color: 'var(--c-navy)' })}</span>
      <div class="grow"><div class="t125 w8">${t('b3.dropped')}</div><div class="t105 w7 teal-ink" style="margin-top:1px">${area ? `${LO(area)}${isAr() ? '، ' : ', '}${LO(gov)}` : ''}</div></div>
      <a class="pill-sm" ${linkAttrs('B3b', { link: 'Move pin' })}>${t('b3.move')}</a></div></div>`;
}

export default {
  render() {
    const s = state.signup;
    const photo = s.photo
      ? `<span class="photo-btn has"><img src="${s.photo}" alt=""></span>`
      : `<span class="photo-btn">${icon('camera', { size: 27, sw: 1.7, color: 'var(--c-teal-text)' })}</span>`;
    const err = ui.err ? `<div class="err-text" role="alert">${icon('info', { size: 15, color: 'var(--c-coral-text)' })}<span>${t(ui.err)}</span></div>` : '';
    return `<section class="scr">
      ${appBar({ back: { to: 'B2' } })}
      <div class="body"><div class="pad">
        ${steps(2)}
        <div class="sec-head"><div class="cap">${t('step', { n: 2 })}</div><span class="spacer"></span><span class="note">${alt('step', { n: 2 })}</span></div>
        ${title('b3.title', { size: 28, subSize: 12.5 })}
        ${field({ id: 'b-name', key: 'b3.name', value: s.name, attrs: 'autocomplete="name"' })}
        <div class="row" style="gap:13px">
          <button type="button" class="photo-wrap" data-pick aria-label="${ta('b3.addPhoto')}">${photo}<span class="photo-plus">${icon('plus', { size: 15, sw: 3, color: 'var(--c-navy)' })}</span></button>
          <div class="grow"><div class="row" style="gap:7px"><span class="t125 w8">${t('b3.photo')}</span><span class="opt">${t('optional')}</span></div>
            <div class="t11 muted lh" style="margin-top:4px">${t('b3.photoWhy')}</div>${sub('b3.photoWhy')}</div>
          <input type="file" accept="image/*" hidden data-file>
        </div>
        ${s.photoFailSize ? uploadFailed(s.photoFailSize) : ''}
        <div>
          <div class="row" style="gap:7px"><span class="t12 w7">${t('b3.where')}</span><span class="req">${t('required')}</span><span class="spacer"></span>${isAr() ? '' : `<span class="t11 w6 muted">${alt('b3.where')}</span>`}</div>
          <div class="row" style="gap:8px;margin-top:7px">${icon('pin', { size: 15, color: 'var(--c-teal-text)' })}<span class="t115 w7 muted">${t('b3.drop')}</span></div>
          <div style="margin-top:6px">${pinBlock()}</div>
          <div class="row" style="align-items:flex-start;gap:7px;margin-top:9px">${icon('info', { size: 14, color: 'var(--c-muted)' })}<div class="grow t11 muted lh">${t('b3.pinWhy')}${sub('b3.pinWhy')}</div></div>
        </div>
        ${err}
      </div></div>
      <div class="bar">${btn({ key: 'cont', to: 'B3d', link: 'Continue', variant: 'navy', primary: true })}</div>
    </section>`;
  },
  mount(root, p, api) {
    const s = state.signup;
    requestLocationOnce();
    const name = root.querySelector('#b-name');
    name.addEventListener('input', () => { s.name = name.value; });
    wirePhoto(root, api, (url, size) => {
      if (size > MAX_BYTES) { s.photoFailSize = size; } else { s.photo = url; s.photoFailSize = 0; }
    });
    api.guard((a) => {
      if (a.dataset.to !== 'B3d' || a.closest('[data-k3]')) return undefined;
      ui.err = s.name.trim() ? null : 'b3.needName';
      if (ui.err) { api.rerender(); return false; }
      return undefined;
    });
  },
};

// A real file input with a local preview. Nothing is uploaded; files over
// 10 MB show the K3 upload-failed state instead.
export function wirePhoto(root, api, onFile) {
  const input = root.querySelector('[data-file]');
  root.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => input.click()));
  input.addEventListener('change', () => {
    const f = input.files && input.files[0];
    if (!f) return;
    const force = state.force.uploadFailed;
    onFile(f.size > MAX_BYTES || force ? null : URL.createObjectURL(f), force ? Math.max(f.size, MAX_BYTES + 1) : f.size);
    api.rerender();
  });
}
