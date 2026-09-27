// E3 · Verify to vote. The sheet that turns a tap into a counted vote:
// number, code, name, location, consent. Any 4 digits pass; 0000 is the wrong code.
import { t, ta, sub, alt, L, LO, isAr, firstV } from '../i18n.js';
import { icon, btn, dish, linkAttrs, field, codeInput, wireCode, govAreaFields, wireGovArea } from '../ui.js';
import { state, cookById, castVote, isOffline, areaById, emit } from '../store.js';

// Sheet-local state: survives re-renders, cleared when a vote goes through.
let ui = { err: null, wrong: false, editLoc: false, consent: true, tries: 3 };

export default {
  render(p) {
    const cook = cookById(p.cook) || cookById('amira');
    const v = state.voter;
    const name = firstV(cook);
    const wrong = ui.wrong || state.force.wrongCode;
    const area = areaById(v.area);
    const offline = !!state.queuedVote;
    const loc = area && !ui.editLoc
      ? `<div class="loc-ok"><span class="tick">${icon('check', { size: 15, sw: 3, color: 'var(--c-navy)' })}</span>
          <div class="grow"><div class="t125 w8">${t('e3.locOk')}</div><div class="t11 w7 teal-ink">${LO(area)}</div></div>
          <button type="button" class="pill-sm" data-update-loc>${t('e3.update')}</button></div>`
      : govAreaFields('v', v.gov, v.area, { side: true });
    const codeBlock = `<div><div class="field-label">${t('e3.code')}<span class="note">${isAr() ? '' : alt('e3.code')}</span></div>
      <div style="margin-top:7px">${codeInput('v-code', v.code, wrong, 56)}</div>
      ${wrong
        ? `<div data-k3="wrong-code" style="margin-top:10px"><div class="err-text">${icon('info', { size: 15, color: 'var(--c-coral-text)' })}<div>${t('k3.wrongCode')}${sub('k3.wrongCode', null, { cls: 'coral-ink' })}</div></div>
            <div style="margin-top:10px">${btn({ key: 'k3.newCode', variant: 'outline', cls: 'btn-sm', attrs: 'data-new-code' })}</div>
            <div class="center t12 w7 teal-ink" style="margin-top:9px">${t('k3.waHelp')}</div></div>`
        : `<div class="t11 muted" style="margin-top:6px">${t('e3.codeHint')}</div>`}</div>`;
    const offlinePanel = offline
      ? `<div class="state" data-k3="offline" style="padding:6px 8px"><div class="state-icon" style="width:62px;height:62px;background:var(--c-chip-bg);border:1.5px solid var(--c-chip-line)">${icon('gps', { size: 26, sw: 1.8, color: 'var(--c-muted)' })}</div>
          <div class="t15 w8">${t('k3.offline')}</div><div class="t12 muted lh">${t('k3.offlineBody')}</div>${sub('k3.offlineBody', null, { cls: 'c' })}</div>`
      : '';
    const errLine = ui.err ? `<div class="err-text" role="alert">${icon('info', { size: 15, color: 'var(--c-coral-text)' })}<span>${t(ui.err)}</span></div>` : '';
    return `<section class="scr">
      <div class="sheet-wrap">
        <div class="sheet-bg">${dish(cook, { h: 150 })}<div style="padding:14px"><div class="display" style="font-size:25px">${L(cook, 'name')}</div><div class="t12 w7 muted" style="margin-top:4px">${L(cook, 'dish')}</div></div></div>
        <div class="sheet-backdrop"></div>
        <div class="sheet" role="dialog" aria-modal="true" aria-label="${ta('e3.confirmVote')}">
          <div class="row" style="padding:10px 16px 0"><span style="width:44px"></span><div class="grip"></div>
            <a class="icon-btn" style="margin:-10px -10px -10px 0" ${linkAttrs('E2', { params: { cook: cook.id }, link: '×', back: true })} aria-label="${ta('close')}"><span class="t22 w7 muted">×</span></a></div>
          <div class="body sheet-body"><div class="stack" style="gap:12px;padding:6px 16px 12px">
            ${offline ? offlinePanel : `
            <div class="has-vote"><span class="tick">${icon('check', { size: 17, sw: 3, color: 'var(--c-navy)' })}</span>
              <div class="grow"><div class="t135 w8">${t('e3.has', { name })}</div><div class="t11 w7 teal-ink" style="margin-top:2px">${t('e3.confirm')}</div>${sub('e3.confirm', null, { cls: 'teal-ink' })}</div></div>
            ${field({ id: 'v-wa', key: 'e3.wa', type: 'tel', value: v.phone, prefix: '+20', attrs: 'inputmode="tel" autocomplete="tel-national" placeholder="10 1234 5678"' })}
            ${codeBlock}
            <div>${field({ id: 'v-name', key: 'e3.name', value: v.name, attrs: 'autocomplete="given-name"' })}<div class="t11 muted" style="margin-top:6px">${t('e3.nameNote')}</div></div>
            <div><div class="row" style="gap:7px"><span class="t12 w7">${t('e3.loc')}</span><span class="req">${t('required')}</span><span class="spacer"></span>${isAr() ? '' : `<span class="t11 w6 muted">${alt('e3.loc')}</span>`}</div>
              <div style="margin-top:7px">${loc}</div>
              <div class="t11 muted" style="margin-top:6px;line-height:1.35">${t('e3.locNote')}${sub('e3.locNote')}</div></div>
            <div class="check-row"><span class="tap-check" style="margin:-10px"><input id="v-consent" type="checkbox"${ui.consent ? ' checked' : ''}></span><label for="v-consent" class="t11 muted lh">${t('e3.consent')}</label></div>`}
            ${errLine}
          </div></div>
          <div class="sheet-foot">
            ${btn({ key: 'e3.confirmVote', to: 'E4', params: { cook: cook.id }, link: 'Confirm my vote', primary: true, replace: true })}
            <a class="link-quiet" ${linkAttrs('E2', { params: { cook: cook.id }, link: 'Not now', back: true })}>${t('e3.notNow')}</a>
          </div>
        </div>
      </div>
    </section>`;
  },
  mount(root, p, api) {
    const cook = cookById(p.cook) || cookById('amira');
    const v = state.voter;
    const val = (id) => (root.querySelector('#' + id) || {}).value;
    const keep = () => {
      if (root.querySelector('#v-wa')) v.phone = val('v-wa');
      if (root.querySelector('#v-name')) v.name = val('v-name');
      const c = root.querySelector('#v-consent');
      if (c) ui.consent = c.checked;
    };
    root.querySelectorAll('input').forEach((i) => i.addEventListener('input', keep));
    wireCode(root, 'v-code', (code) => { v.code = code; ui.wrong = false; });
    wireGovArea(root, 'v', ({ gov, area }) => { keep(); v.gov = gov; v.area = area; if (area) ui.editLoc = false; api.rerender(); });
    const up = root.querySelector('[data-update-loc]');
    if (up) up.addEventListener('click', () => { keep(); ui.editLoc = true; api.rerender(); });
    const nc = root.querySelector('[data-new-code]');
    if (nc) nc.addEventListener('click', () => { v.code = ''; ui.wrong = false; state.force.wrongCode = false; emit(); });

    api.guard((a) => {
      if (a.dataset.to !== 'E4') return undefined;
      keep();
      ui.err = null;
      if (state.queuedVote) return false;
      if ((v.phone || '').replace(/\D/g, '').length < 8) ui.err = 'e3.needPhone';
      else if ((v.code || '').length !== 4) ui.err = 'e3.needCode';
      else if (!v.area) ui.err = 'e3.needArea';
      if (ui.err) { api.rerender(); return false; }
      if (v.code === '0000' || state.force.wrongCode) {
        ui.wrong = true;
        ui.tries = Math.max(0, ui.tries - 1);
        api.rerender();
        return false;
      }
      v.verified = true;
      if (isOffline()) {
        state.queuedVote = cook.id;
        api.rerender();
        return false;
      }
      castVote(cook.id);
      ui = { err: null, wrong: false, editLoc: false, consent: true, tries: 3 };
      return { replace: true };
    });
  },
};
