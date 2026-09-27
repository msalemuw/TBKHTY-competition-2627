// E1 · Browse entries. Entries as social posts under a sticky countdown, with
// category filters. The vote button sits where a like button would.
import { t, ta, alt, isAr } from '../i18n.js';
import { icon, langToggle, logo, linkAttrs, closesBand, post, bottomNav } from '../ui.js';
import { ranked, state } from '../store.js';

let filter = 'all';
const FILTERS = [['all', 'e1.fAll'], ['trend', 'e1.fTrend'], ['mains', 'e1.fMains'], ['sweets', 'e1.fSweets'], ['baked', 'e1.fBaked']];
export const VOTER_NAV = [
  { id: 'E1', icon: 'heart', key: 'nav.vote', link: 'Vote' },
  { id: 'E8', icon: 'search', key: 'nav.find', link: 'Find a cook' },
  { id: 'E7', icon: 'people', key: 'nav.me', link: 'Me' },
];

function list() {
  const all = ranked();
  if (filter === 'trend') return [...all].sort((a, b) => b.move - a.move || b.votes - a.votes);
  if (filter === 'all') return all;
  return all.filter((c) => c.category === filter);
}

export default {
  render() {
    const cooks = list();
    return `<section class="scr">
      <header class="hdr"><span data-hist-slot></span>${logo(false)}<div class="spacer"></div>
        <a class="icon-btn ring" ${linkAttrs('E8', { link: 'Find a cook' })} aria-label="${ta('a1.findCook')}">${icon('search', { size: 18, sw: 2.1 })}</a>${langToggle(false)}</header>
      <div class="edition-row">${icon('trophy', { size: 15, color: 'var(--c-gold)' })}
        <span class="t125 w8 navy ellip">${t('edition')}</span><span class="t11 muted w6" style="flex:none">${t('e1.cooks', { n: state.cooks.length })}</span>
        <span class="spacer"></span><a class="link-teal" style="font-size:12px;padding:0 4px" ${linkAttrs('A1', { link: 'Change edition' })}>${t('e1.change')}</a></div>
      ${closesBand()}
      <div class="filter-row"><div class="chips">${FILTERS.map(([k, key]) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="${filter === k}"><span class="c1">${t(key)}</span>${isAr() ? '' : `<span class="c2">${alt(key)}</span>`}</button>`).join('')}</div></div>
      <div class="body" style="background:var(--c-paper)"><div class="feed">
        ${cooks.map((c, i) => post(c, { primary: i === 0, cardLink: { to: 'E2', params: { cook: c.id }, link: 'Any entry card' } })).join('')}
      </div></div>
      ${bottomNav(VOTER_NAV, 'E1')}
    </section>`;
  },
  mount(root, p, api) {
    root.querySelectorAll('[data-filter]').forEach((b) => b.addEventListener('click', () => {
      filter = b.dataset.filter;
      api.rerender({ top: true });
    }));
  },
};
