// J2 · Titles in your area. Titles held now with their holder and how long
// they have held them, then the locked ones. A locked title is a recruitment
// ask. If she is the only cook in her area, the K3 first-cook state shows.
import { t, sub, alt, L, LO, isAr, esc } from '../i18n.js';
import { icon, appBar, btn, avatar, secHead, linkAttrs, track, titlePill } from '../ui.js';
import { state, cookById, TITLES, cooksIn, areaById, edition } from '../store.js';

let board = null;

function held(x, areaV) {
  const c = cookById(x.cook);
  return `<div class="card title-card"><div class="row" style="gap:10px">${titlePill(x.kind, x.key, { area: areaV })}</div>
    ${sub(x.key, { area: areaV })}
    <div class="holder">${avatar(c, 34)}<div class="grow"><div class="t13 w8">${L(c, 'name')}</div><div class="t105 muted" style="margin-top:1px">${t('j2.since')}</div></div>
      <div class="none" style="text-align:end"><div class="t13 w8">${c.votes}</div><div class="upper-num">${t('votes')}</div></div></div></div>`;
}
function locked(key, areaV, have) {
  const need = 3 - have;
  return `<div class="card-locked"><div class="row" style="gap:9px">${icon('lock', { size: 16, color: 'var(--c-muted)' })}
    <div class="grow"><div class="t125 w8 muted">${t(key, { area: areaV })}</div>${sub(key, { area: areaV }, { cls: 's' })}</div><span class="t115 w8">${t('k3.ofThree', { n: have })}</span></div>
    <div style="margin-top:9px">${track((have / 3) * 100, 'locked', 6)}</div>
    <a class="invite-btn" ${linkAttrs('C1', { link: need === 1 ? 'Invite 1 more cook to unlock' : 'Invite 2 more cooks to unlock' })}>${icon('plus', { size: 15, sw: 2.4 })}${t(need === 1 ? 'k3.invite1' : 'k3.invite2')}</a></div>`;
}

export default {
  render(p) {
    const me = cookById(state.myCookId);
    const areaId = p.area || (state.force.firstCook ? (me && cooksIn(me.area).length <= 1 ? me.area : 'New Cairo') : me ? me.area : state.voter.area || 'Mohandessin');
    const area = areaById(areaId) || areaById('Mohandessin');
    const areaV = { en: area.en, ar: area.ar };
    if (!board) board = 'area';
    const cooks = cooksIn(area.id);
    const first = state.force.firstCook || cooks.length <= 1;
    const chips = [['area', LO(area), isAr() ? '' : `<bdi lang="ar">${esc(area.ar)}</bdi>`], ['club', L(edition, 'club'), isAr() ? '' : `<bdi lang="ar">${esc(edition.club_ar)}</bdi>`], ['city', t('j2.cairo'), isAr() ? '' : alt('j2.cairo')]];
    let content;
    if (board === 'area' && first) {
      content = `<div class="card" data-k3="first-cook"><div class="state" style="padding:10px 4px">
          <div class="state-icon" style="background:var(--c-teal-bg);border:1.5px solid var(--c-teal)">${icon('pin', { size: 28, sw: 1.8, color: 'var(--c-teal-text)' })}</div>
          <div class="display state-title">${t('k3.firstCook', { area: areaV })}</div>${sub('k3.firstCook', { area: areaV }, { cls: 'c' })}
          <div class="t12 muted lh">${t('k3.firstBody', { area: areaV })}</div>
          <div style="width:100%;margin-top:4px">${btn({ key: 'k3.invite2cooks', to: 'C1', link: 'Invite 2 more cooks to unlock', cls: 'btn-sm', primary: true, attrs: 'data-state-source="K3"' })}</div></div></div>
        ${locked('title.cook1', areaV, Math.max(1, cooks.length))}`;
    } else {
      const heldHere = board === 'area' ? TITLES.filter((x) => x.area === area.id || (x.kind === 'club' && area.id === 'Mohandessin'))
        : board === 'club' ? TITLES.filter((x) => x.kind === 'club') : [];
      const lockedHere = board !== 'area' ? '' : area.id === 'Mohandessin'
        ? locked('title.bestMolokhia', areaV, cooks.filter((c) => c.dish_kind === 'molokhia').length) + locked('title.bestSweets', areaV, cooks.filter((c) => c.category === 'sweets').length)
        : heldHere.length ? locked('title.bestSweets', areaV, Math.min(2, cooks.filter((c) => c.category === 'sweets').length)) : locked('title.cook1', areaV, Math.min(2, cooks.length));
      content = `<div class="card"><div class="row" style="gap:10px"><div class="grow"><div class="t135 w8">${t('j2.season')}</div><div class="t11 muted" style="margin-top:2px">${t('j2.s2')}</div>${sub('j2.s2')}</div>
          <div class="center none"><div class="display" style="font-size:26px;line-height:1">${heldHere.length}</div><div class="upper-num" style="margin-top:3px">${t('j2.titles')}</div></div></div></div>
        ${secHead('j2.held')}
        ${heldHere.length ? heldHere.map((x) => held(x, areaV)).join('') : `<div class="t12 muted">${t('j2.none')}</div>`}
        ${lockedHere ? secHead('j2.locked') + lockedHere : ''}`;
    }
    return `<section class="scr">
      ${appBar({ back: { to: 'J1' }, title: t('j2.bar', { area: areaV }) })}
      <div class="body"><div class="pad" style="gap:10px;padding-top:12px">
        <div class="chips" data-primary>${chips.map(([k, l, a]) => `<button type="button" class="chip" data-board="${k}" aria-pressed="${board === k}"><span class="c1">${l}</span>${a ? `<span class="c2">${a}</span>` : ''}</button>`).join('')}</div>
        ${content}
      </div></div>
    </section>`;
  },
  mount(root, p, api) {
    root.querySelectorAll('[data-board]').forEach((b) => b.addEventListener('click', () => { board = b.dataset.board; api.rerender({ top: true }); }));
  },
};
