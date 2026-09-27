// C1 · Nominate a cook. The prize ladder first, because "nominate a cook" on its
// own gives a voter no reason to tap. Then five fields. Nothing is sent.
import { t, sub, alt, LO, isAr } from '../i18n.js';
import { icon, btn, title, field, selectField, linkAttrs, backBtn, langToggle } from '../ui.js';
import { state, addNomination } from '../store.js';
import content from '../data/content.js';

let form = { name: '', wa: '', club: 'none', best: '', by: '' };
let err = null;

export default {
  render() {
    if (!form.by && state.voter.name) form.by = state.voter.name;
    const right = `<a class="mine-chip" ${linkAttrs('C3', { link: 'My nominations' })}>${icon('gift', { size: 14, sw: 2.2, color: 'var(--c-gold)' })}<span>${t('c1.mine')}</span></a>`;
    const e = err ? `<div class="err-text" role="alert">${icon('info', { size: 15, color: 'var(--c-coral-text)' })}<span>${t(err)}</span></div>` : '';
    return `<section class="scr">
      <header class="hdr hdr-c1">${backBtn('A1')}<div class="hdr-title">${t('c1.title')}</div>${right}${langToggle(false)}</header>
      <div class="body"><div class="pad" style="gap:12px">
        ${title('c1.know', { size: 31, subSize: 13.5 })}
        <div class="t125 muted lh">${t('c1.lede')}${sub('c1.lede', null, { cls: '' })}</div>
        <div class="card-gold"><div class="row" style="align-items:flex-start;gap:9px"><span class="nom-ic" style="width:30px;height:30px;border-radius:50%">${icon('gift', { size: 16, color: 'var(--c-gold)' })}</span>
          <div class="grow"><div class="t125 w8">${t('c1.winWhen')}</div><div class="t11 muted lh" style="margin-top:2px">${t('c1.winBody')}</div>${sub('c1.winBody')}
          <a class="link-teal gold-ink" style="font-size:12px" ${linkAttrs('C3', { link: 'See all four rungs' })}>${t('c1.rungs')}${icon('chevR', { size: 13, sw: 2.4, cls: 'flip' })}</a></div></div></div>
        ${field({ id: 'n-name', key: 'c1.herName', value: form.name })}
        ${field({ id: 'n-wa', key: 'c1.herWa', type: 'tel', value: form.wa, prefix: '+20', attrs: 'inputmode="tel" placeholder="10 8877 4321"' })}
        <div>${selectField({ id: 'n-club', key: 'c1.herClub', value: form.club, options: content.club_dropdown.map((c) => ({ value: c.id, label: LO(c) })) })}<div class="t105 muted" style="margin-top:5px">${t('c1.clubNote')}</div></div>
        ${field({ id: 'n-best', key: 'c1.best', value: form.best, textarea: true })}
        <div>${field({ id: 'n-by', key: 'c1.yourName', value: form.by })}<div class="t11 muted" style="margin-top:6px">${t('c1.see')}${isAr() ? '' : ` · ${alt('c1.see')}`}</div></div>
        ${e}
      </div></div>
      <div class="bar">${btn({ key: 'c1.nominate', to: 'C2', link: 'Nominate her', primary: true })}</div>
    </section>`;
  },
  mount(root, p, api) {
    const bind = (id, k) => { const el = root.querySelector('#' + id); el.addEventListener('input', () => { form[k] = el.value; }); el.addEventListener('change', () => { form[k] = el.value; }); };
    bind('n-name', 'name'); bind('n-wa', 'wa'); bind('n-club', 'club'); bind('n-best', 'best'); bind('n-by', 'by');
    api.guard((a) => {
      if (a.dataset.to !== 'C2') return undefined;
      err = !form.name.trim() ? 'c1.needName' : form.wa.replace(/\D/g, '').length < 8 ? 'c1.needWa' : null;
      if (err) { api.rerender(); return false; }
      addNomination({ name: form.name, phone: form.wa, club: form.club, best: form.best, by: form.by });
      form = { name: '', wa: '', club: 'none', best: '', by: form.by };
      return undefined;
    });
  },
};
