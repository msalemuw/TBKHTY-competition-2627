// B5 · Entry preview. The entry rendered exactly as voters will see it, so
// nothing is a surprise. Confirm, or go back and edit.
import { t, sub } from '../i18n.js';
import { icon, appBar, btn, title, steps, post, badge, linkAttrs } from '../ui.js';
import { state, areaById, submitEntry } from '../store.js';

export function draftCook() {
  const s = state.signup;
  const a = areaById(s.area) || areaById('Mohandessin');
  const story = s.story.trim();
  return {
    id: 'draft', name: s.name.trim() || '—', name_ar: s.name.trim() || '—', dish: s.dish.trim() || '—', dish_ar: s.dish.trim() || '—',
    area: a.en, area_ar: a.ar, dish_kind: 'custom', votes: 0, move: 0, isNew: true, photo: s.photo, dishPhoto: s.dishPhoto,
    story: story ? { en: story, ar: story } : null,
  };
}

let approved = false;

export default {
  render() {
    const c = draftCook();
    const areaV = { en: c.area, ar: c.area_ar };
    return `<section class="scr">
      ${appBar({ back: { to: 'B4' } })}
      <div class="body"><div class="pad" style="gap:12px">
        ${steps(5)}
        ${title('b5.title', { size: 26, subSize: 13 })}
        <div class="preview" inert>${post(c, { voteTo: null, badgeHtml: badge(t('newEntry'), 'sand') })}</div>
        <div class="row" style="align-items:flex-start;gap:7px">${icon('info', { size: 14, color: 'var(--c-muted)' })}<div class="grow t11 muted lh">${t('b5.ranked', { area: areaV })}${sub('b5.ranked', { area: areaV })}</div></div>
        <div class="row" style="gap:9px">
          <button type="button" class="btn-tile" data-approve aria-pressed="${approved}" style="${approved ? 'background:var(--c-teal-bg);border-color:var(--c-teal);color:var(--c-teal-text)' : ''}">${icon('check', { size: 17, sw: 2.6 })}${t('b5.great')}</button>
          <a class="btn-tile" ${linkAttrs('B4', { link: 'Edit', back: true })}>${icon('pencil', { size: 16, sw: 1.7 })}${t('b5.edit')}</a>
        </div>
      </div></div>
      <div class="bar">${btn({ key: 'b5.submit', to: 'B6', link: 'Submit my entry', primary: true, replace: true, cls: 'btn-56' })}</div>
    </section>`;
  },
  mount(root, p, api) {
    root.querySelector('[data-approve]').addEventListener('click', () => { approved = !approved; api.rerender(); });
    api.guard((a) => { if (a.dataset.to === 'B6') { submitEntry(); approved = false; } return undefined; });
  },
};
