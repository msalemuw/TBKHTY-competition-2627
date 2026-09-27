// B4 · Your signature dish. Dish name, one photo with three shooting tips, a
// two-line story and one category. This is the screen that makes the feed post.
import { t, alt, isAr } from '../i18n.js';
import { icon, appBar, btn, title, field, steps, dish } from '../ui.js';
import { state } from '../store.js';
import { uploadFailed, wirePhoto } from './b3.js';

const CATS = [['mains', 'cat.mains'], ['baked', 'cat.baked'], ['sweets', 'cat.sweets'], ['mezze', 'cat.mezze']];
let ui = { err: null };

export default {
  render() {
    const s = state.signup;
    const failed = s.dishFailSize || (state.force.uploadFailed ? 4.2 * 1024 * 1024 : 0);
    const pic = failed
      ? uploadFailed(Math.max(failed, s.dishFailSize || 0))
      : `<div class="card"><div class="row" style="gap:8px;margin-bottom:10px"><span class="t12 w8">${t('b4.photo')}</span><span class="spacer"></span>${isAr() ? '' : `<span class="t11 w6 muted">${alt('b4.photo')}</span>`}</div>
        <div style="position:relative">${dish({ dish_kind: 'custom', dishPhoto: s.dishPhoto }, { h: 168, radius: 13 })}
          <button type="button" class="photo-change" data-pick>${icon('camera', { size: 14, color: 'var(--c-white)' })}${t(s.dishPhoto ? 'b4.change' : 'b4.add')}</button></div>
        <div class="row" style="gap:12px;margin-top:10px;flex-wrap:wrap">${['b4.tip1', 'b4.tip2', 'b4.tip3'].map((k) => `<span class="row" style="gap:6px">${icon('check', { size: 13, sw: 2.6, color: 'var(--c-teal-text)' })}<span class="t11 w6 muted">${t(k)}</span></span>`).join('')}</div></div>`;
    const err = ui.err ? `<div class="err-text" role="alert">${icon('info', { size: 15, color: 'var(--c-coral-text)' })}<span>${t(ui.err)}</span></div>` : '';
    return `<section class="scr">
      ${appBar({ back: { to: 'B3d' } })}
      <div class="body"><div class="pad" style="gap:12px">
        ${steps(4)}
        <div class="sec-head"><div class="cap">${t('step', { n: 4 })}</div><span class="spacer"></span><span class="note">${alt('step', { n: 4 })}</span></div>
        ${title('b4.title', { size: 30, subSize: 13.5 })}
        ${field({ id: 'b-dish', key: 'b4.name', value: s.dish })}
        ${pic}
        <input type="file" accept="image/*" hidden data-file>
        <div>${field({ id: 'b-story', key: 'b4.story', value: s.story, textarea: true })}<div class="t11 muted" style="margin-top:6px">${t('b4.plenty')}${isAr() ? '' : ` · ${alt('b4.plenty')}`}</div></div>
        <div><div class="field-label">${t('b4.category')}<span class="note">${isAr() ? '' : alt('b4.category')}</span></div>
          <div class="chips wrap" style="margin-top:8px">${CATS.map(([k, key]) => `<button type="button" class="chip" data-cat="${k}" aria-pressed="${s.category === k}"><span class="c1">${t(key)}</span>${isAr() ? '' : `<span class="c2">${alt(key)}</span>`}</button>`).join('')}</div></div>
        ${err}
      </div></div>
      <div class="bar">${btn({ key: 'cont', to: 'B5', link: 'Continue', variant: 'navy', primary: true, cls: 'btn-56' })}</div>
    </section>`;
  },
  mount(root, p, api) {
    const s = state.signup;
    const d = root.querySelector('#b-dish');
    d.addEventListener('input', () => { s.dish = d.value; });
    const st = root.querySelector('#b-story');
    st.addEventListener('input', () => { s.story = st.value; });
    root.querySelectorAll('[data-cat]').forEach((b) => b.addEventListener('click', () => { s.category = b.dataset.cat; api.rerender(); }));
    wirePhoto(root, api, (url, size) => {
      if (url) { s.dishPhoto = url; s.dishFailSize = 0; state.force.uploadFailed = false; } else s.dishFailSize = size;
    });
    api.guard((a) => {
      if (a.dataset.to !== 'B5') return undefined;
      ui.err = s.dish.trim() ? null : 'b4.needDish';
      if (ui.err) { api.rerender(); return false; }
      return undefined;
    });
  },
};
