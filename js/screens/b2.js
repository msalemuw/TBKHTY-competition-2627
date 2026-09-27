// B2 · Verify your number. WhatsApp number, 4-digit code and a consent line in
// plain words. Step 1 of 5. Any 4 digits pass; 0000 shows the wrong-code state.
import { t, sub, alt, isAr } from '../i18n.js';
import { icon, appBar, btn, title, field, codeInput, wireCode, steps } from '../ui.js';
import { state, emit } from '../store.js';

let ui = { sent: false, wrong: false, err: null, secs: 24 };
let timer = null;

export default {
  render() {
    const s = state.signup;
    const wrong = ui.wrong || state.force.wrongCode;
    const verified = s.verified && !wrong;
    const codeArea = verified
      ? `<div class="loc-ok"><span class="tick">${icon('check', { size: 15, sw: 3, color: 'var(--c-navy)' })}</span><div class="grow t125 w8">${t('b2.verified')}</div></div>`
      : `<div class="row" style="gap:10px"><div class="grow rule"></div><span class="t11 w7 muted">${t('b2.enter4')}</span><div class="grow rule"></div></div>
        ${codeInput('b-code', s.code, wrong)}
        ${wrong
          ? `<div data-k3="wrong-code"><div class="err-text">${icon('info', { size: 15, color: 'var(--c-coral-text)' })}<div>${t('k3.wrongCode')}${sub('k3.wrongCode', null, { cls: 'coral-ink' })}</div></div>
              <div style="margin-top:10px">${btn({ key: 'k3.newCode', variant: 'outline', cls: 'btn-sm', attrs: 'data-new-code' })}</div>
              <div class="center t12 w7 teal-ink" style="margin-top:9px">${t('k3.waHelp')}</div></div>`
          : `<div class="row" style="justify-content:space-between;gap:8px;flex-wrap:wrap"><span class="t115 w6 muted">${ui.sent ? t('b2.resend', { s: String(ui.secs).padStart(2, '0') }) : t('b2.sent')}</span>${ui.sent && !isAr() ? `<span class="t11 w6 muted">${alt('b2.resend', { s: String(ui.secs).padStart(2, '0') })}</span>` : ''}</div>`}`;
    const err = ui.err ? `<div class="err-text" role="alert">${icon('info', { size: 15, color: 'var(--c-coral-text)' })}<span>${t(ui.err)}</span></div>` : '';
    return `<section class="scr">
      ${appBar({ back: { to: 'B1' } })}
      <div class="body"><div class="pad" style="gap:13px">
        ${steps(1)}
        <div class="sec-head"><div class="cap">${t('step', { n: 1 })}</div><span class="spacer"></span><span class="note">${alt('step', { n: 1 })}</span></div>
        ${title('b2.title', { size: 30, subSize: 13.5 })}
        ${field({ id: 'b-wa', key: 'e3.wa', type: 'tel', value: s.phone, prefix: '+20', attrs: 'inputmode="tel" autocomplete="tel-national" placeholder="10 2345 6789"' })}
        ${verified ? '' : btn({ key: 'b2.send', ic: icon('chat', { size: 18 }), cls: 'btn-sm', attrs: 'data-send' })}
        ${codeArea}
        <div class="card"><div class="check-row"><span class="tap-check"><input id="b-consent" type="checkbox"${s.consent !== false ? ' checked' : ''}></span>
          <label for="b-consent" class="t12 lh">${t('b2.consent')}${isAr() ? '' : ` <span class="muted">${t('b2.consent2')}</span>`}${sub('b2.consent', null, { cls: '' })}</label></div></div>
        ${err}
      </div></div>
      <div class="bar">${btn({ key: 'cont', to: 'B3', link: 'Continue', variant: 'navy', primary: true, cls: 'btn-56' })}</div>
    </section>`;
  },
  mount(root, p, api) {
    const s = state.signup;
    const wa = root.querySelector('#b-wa');
    wa.addEventListener('input', () => { s.phone = wa.value; });
    const c = root.querySelector('#b-consent');
    c.addEventListener('change', () => { s.consent = c.checked; });
    wireCode(root, 'b-code', (code) => { s.code = code; ui.wrong = false; });
    const send = root.querySelector('[data-send]');
    if (send) send.addEventListener('click', () => {
      ui.sent = true;
      ui.secs = 24;
      clearInterval(timer);
      timer = setInterval(() => {
        ui.secs = Math.max(0, ui.secs - 1);
        const el = document.querySelector('[data-screen="B2"]');
        if (!el || ui.secs === 0) clearInterval(timer);
        if (el) api.rerender();
      }, 1000);
      api.rerender();
      setTimeout(() => document.getElementById('b-code')?.focus(), 0);
    });
    const nc = root.querySelector('[data-new-code]');
    if (nc) nc.addEventListener('click', () => { s.code = ''; ui.wrong = false; state.force.wrongCode = false; emit(); });

    api.guard((a) => {
      if (a.dataset.to !== 'B3') return undefined;
      ui.err = null;
      if (!s.verified || state.force.wrongCode) {
        if ((s.phone || '').replace(/\D/g, '').length < 8) ui.err = 'e3.needPhone';
        else if ((s.code || '').length !== 4) ui.err = 'e3.needCode';
        else if (s.code === '0000' || state.force.wrongCode) { ui.wrong = true; api.rerender(); return false; }
      }
      if (!ui.err && s.consent === false) ui.err = 'b2.needConsent';
      if (ui.err) { api.rerender(); return false; }
      s.verified = true;
      if (!state.voter.phone) state.voter.phone = s.phone;
      return undefined;
    });
  },
};
