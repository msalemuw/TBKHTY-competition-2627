// C2 · Nomination received. What the nominated cook sees when the WhatsApp
// invite lands: three neighbours in their own words, what they win, and
// straight into signup, already verified.
import { t, sub, alt, raw, isAr, esc } from '../i18n.js';

// Sample neighbours from the C2 board: names, not UI copy.
const KARIM = 'Karim S.';
const MONA = 'Mona A.';
import { icon, langToggle, logo, confetti, btn, avatar, secHead } from '../ui.js';
import { state } from '../store.js';

function quote(av, name, key, own = null) {
  const q = own ? `<div class="t12 muted lh" style="margin-top:3px">“${esc(own)}”</div>` : `<div class="t12 muted lh" style="margin-top:3px">“${t(key)}”</div>${isAr() ? '' : `<span class="sub" style="font-weight:400"><bdi lang="ar" dir="rtl">«${alt(key).replace(/<[^>]+>/g, '')}»</bdi></span>`}`;
  return `<div class="card"><div class="row" style="align-items:flex-start;gap:10px">${avatar(av, 36)}<div class="grow"><div class="t13 w8"><bdi>${esc(name)}</bdi></div>${q}</div></div></div>`;
}

export default {
  render() {
    const n = state.nominations.find((x) => x.id === state.lastNomination);
    // The first voice is the tester's own nomination, when there is one.
    const first = n && n.best ? quote('nadiaH', n.by || raw('e7.sampleName', 'en'), null, n.best) : quote('nadiaH', raw('e7.sampleName', 'en'), 'c2.q1');
    return `<section class="scr">
      <div class="body">
        <header class="hdr-dark" style="padding-bottom:20px">${confetti(5, 12, 390, 230)}
          <div class="hdr-row"><span data-hist-slot="dark"></span>${logo(true, 'logo logo-sm')}<div class="spacer"></div>${langToggle(true)}</div>
          <h1 class="display white" style="position:relative;font-size:32px;margin-top:6px">${t('c2.title')}</h1>
          ${isAr() ? '' : `<div class="t14 w7" style="position:relative;margin-top:8px;color:var(--c-teal);text-align:end">${alt('c2.title')}</div>`}
        </header>
        <div class="pad" style="gap:10px">
          ${secHead('c2.said')}
          ${first}${quote('karimS', KARIM, 'c2.q2')}${quote('monaA', MONA, 'c2.q3')}
          <div class="card-gold"><div class="row" style="gap:10px"><span class="gift-dot">${icon('gift', { size: 17, color: 'var(--c-gold)' })}</span><div class="grow"><div class="t125 w8">${t('c2.theyWin')}</div>${sub('c2.theyWin')}</div></div></div>
        </div>
      </div>
      <div class="bar">
        <div class="row" style="justify-content:center;gap:7px">${icon('clock', { size: 14, sw: 1.7, color: 'var(--c-muted)' })}<span class="t115 w7 muted">${t('c2.filled')}</span></div>
        ${btn({ key: 'c2.accept', to: 'B2', link: 'Accept my nomination', primary: true, cls: 'btn-56' })}
      </div>
    </section>`;
  },
  mount(root, p, api) {
    api.guard((a) => {
      if (a.dataset.to !== 'B2') return undefined;
      // Opens signup already verified, with her name filled in from the nomination.
      const n = state.nominations.find((x) => x.id === state.lastNomination);
      const s = state.signup;
      s.verified = true;
      if (n) { s.name = s.name || n.name; s.phone = s.phone || n.phone; s.nominatedBy = n.id; if (n.club && n.club !== 'none') s.club = n.club; }
      return undefined;
    });
  },
};
