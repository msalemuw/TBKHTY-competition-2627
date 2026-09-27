// D1 · My entry dashboard. Rank with movement, total votes, votes today, the
// countdown, the close-race nudge, the milestone bar and the supporters.
// Below 5th place the K3 rule applies: never show the gap to the leader.
import { t, sub, alt, isAr, L, firstV, esc } from '../i18n.js';
import { icon, langToggle, logo, btn, avatar, move, secHead, linkAttrs, chev, track, bottomNav, badge, ordinal, clubName } from '../ui.js';
import { state, cookById, ranked, rankOf, votingOpen } from '../store.js';

export const COOK_NAV = [
  { id: 'D1', icon: 'home', key: 'nav.entry', link: 'My entry' },
  { id: 'D3', icon: 'pot', key: 'nav.kitchen', link: 'My kitchen' },
  { id: 'D4', icon: 'calendar', key: 'nav.tasting', link: 'Tasting day' },
];
// The dashboard belongs to the cook who signed up this session; before that it
// shows Amira, the cook the boards use. The dev drawer can force Heba at #12.
export const dashCook = () => (state.force.rank12 ? cookById('heba') : cookById(state.myCookId) || cookById('amira'));
const MILESTONES = [50, 100, 250, 500, 1000, 2000];
const POS_AR = { 1: 'الأول', 2: 'التاني', 3: 'التالت' };
// Votes today: the boards show 42 for Amira; a new entry's votes all came today.
const todayVotes = (c) => (c.isNew ? c.votes : c.id === 'amira' ? 42 : '–');

function nudge(c, rank, all) {
  if (rank === 1) {
    const second = all[1];
    const vars = { n: c.votes - second.votes, name: firstV(second) };
    return `<div class="card-coral"><div class="row" style="align-items:flex-start;gap:10px"><span class="flame-dot">${icon('flame', { size: 17, color: 'var(--c-white)', fill: 'var(--c-white)', sw: 1.2 })}</span>
      <div class="grow t135 w8" style="line-height:1.3">${t('d1.lead', vars)}</div></div>
      <a class="coral-cta" ${linkAttrs('D2', { params: { cook: c.id }, link: 'Share now to close the gap' })}>${icon('share', { size: 16, color: 'var(--c-white)' })}${t('d1.closeGap')}</a></div>`;
  }
  const above = all[rank - 2];
  const vars = { n: above.votes - c.votes, name: firstV(above), ord: ordinal(rank - 1), pos: POS_AR[rank - 1] || String(rank - 1) };
  return `<div class="card-coral"><div class="row" style="align-items:flex-start;gap:10px"><span class="flame-dot">${icon('flame', { size: 17, color: 'var(--c-white)', fill: 'var(--c-white)', sw: 1.2 })}</span>
    <div class="grow"><div class="t135 w8" style="line-height:1.3">${t('d1.behind', vars)}</div>${sub('d1.behind', vars, { cls: 'coral-ink' })}</div></div>
    <a class="coral-cta" ${linkAttrs('D2', { params: { cook: c.id }, link: 'Share now to close the gap' })}>${icon('share', { size: 16, color: 'var(--c-white)' })}${t('d1.closeGap')}</a></div>`;
}

// K3 · Dashboard below 5th: nearest cook below, movement, the nearest locked title.
function losing(c, rank, all) {
  const below = all[rank];
  const areaV = { en: c.area, ar: c.area_ar };
  return `<div class="card" data-k3="rank-low"><div class="row" style="gap:10px">
      <div class="center"><div class="display" style="font-size:30px;line-height:1">${c.votes}</div><div class="upper-num" style="margin-top:3px">${t('votes')}</div></div>
      <div style="width:1px;align-self:stretch;background:var(--c-line)"></div>
      <div class="grow"><div class="t13 w8">${t('k3.beat', { n: all.length - rank })}</div>
        ${c.move ? `<div class="t11 w7 ${c.move > 0 ? 'teal-ink' : 'coral-ink'}" style="margin-top:2px">${t(c.move > 0 ? 'k3.up' : 'k3.down', { n: Math.abs(c.move) })}</div>${c.move > 0 ? sub('k3.up') : ''}` : ''}
        ${below ? `<div class="t11 muted" style="margin-top:3px">${t('k3.nearest', { name: firstV(below), n: c.votes - below.votes })}</div>` : ''}</div></div></div>
    <div class="card-locked" data-state-source="K3"><div class="row" style="gap:9px">${icon('lock', { size: 16, color: 'var(--c-muted)' })}
      <div class="grow"><div class="t125 w8 muted">${t('title.bestSweets', { area: areaV })}</div>${sub('title.bestSweets', { area: areaV }, { cls: 's' })}</div><span class="t115 w8">${t('k3.ofThree', { n: 2 })}</span></div>
      <div style="margin-top:9px">${track(66, 'locked', 6)}</div>
      <a class="invite-btn" ${linkAttrs('C1', { link: 'Invite 1 more cook to unlock' })}>${icon('plus', { size: 15, sw: 2.4 })}${t('k3.invite1')}</a></div>`;
}

export default {
  render() {
    const c = dashCook();
    const all = ranked();
    const rank = rankOf(c.id);
    const low = rank > 5;
    const ms = MILESTONES.find((m) => m > c.votes) || c.votes + 100;
    const sample = !c.isNew;
    const supporters = sample
      ? [['nadia', 'Nadia H.', 'd1.sup1', 23], ['omar', 'Omar T.', 'd1.sup2', 14], ['heba', 'Heba S.', 'd1.sup3', 8]].map(([av, n, k, v]) => `<div class="row" style="gap:10px;min-height:46px">${avatar(av, 32)}<div class="grow"><div class="t125 w8"><bdi lang="en" dir="ltr">${n}</bdi></div><div class="t105 muted">${t(k)}</div></div><span class="t13 w8 teal-ink">+${v}</span></div>`).join('')
        + `<div class="t12 w8 teal-ink" style="border-top:1px solid var(--c-line);margin-top:6px;padding-top:9px">${t('d1.seeAll')}</div>`
      : `<div class="t12 muted" style="padding:8px 0">${t('d1.noSupporters')}</div>`;
    return `<section class="scr">
      <header class="hdr"><span data-hist-slot></span>${logo(false)}<div class="spacer"></div>${langToggle(false)}</header>
      <div class="body"><div class="pad" style="gap:10px">
        <div class="card" style="padding:13px">
          <div class="row" style="gap:11px">${avatar(c, 46)}<div class="grow"><div class="t15 w8">${L(c, 'name')}</div><div class="t115 w6 muted">${L(c, 'dish')} · ${clubName()}</div></div>${badge(t('live'), 'coralsoft')}</div>
          <div class="rule" style="margin:12px 0"></div>
          <div class="row">
            <div class="dstat"><div class="row" style="justify-content:center;gap:5px"><span class="display" style="font-size:30px;line-height:1">${rank}</span>${move(c.move)}</div><div class="upper-num" style="margin-top:5px">${t('d1.rank')}</div>${isAr() ? '' : `<div class="t11 muted">${alt('d1.rank')}</div>`}<div class="t10 muted">${t('edition')}</div></div>
            <div class="vr" style="margin:0"></div>
            <div class="dstat"><div class="display" style="font-size:30px;line-height:1">${c.votes}</div><div class="upper-num" style="margin-top:5px">${t('d1.total')}</div>${isAr() ? '' : `<div class="t11 muted">${alt('d1.total')}</div>`}</div>
            <div class="vr" style="margin:0"></div>
            <div class="dstat"><div class="display teal-ink" style="font-size:30px;line-height:1">${todayVotes(c)}</div><div class="upper-num" style="margin-top:5px">${t('d1.today')}</div>${isAr() ? '' : `<div class="t11 muted">${alt('d1.today')}</div>`}</div>
          </div>
          <div class="closes-in">${icon(votingOpen() ? 'clock' : 'lock', { size: 15, sw: 2.1, color: 'var(--c-coral-text)' })}<span>${t(votingOpen() ? 'closes' : 'closedBand')}</span></div>
        </div>
        ${low ? losing(c, rank, all) : nudge(c, rank, all)}
        ${low ? '' : `<div class="card" style="padding:13px"><div class="row" style="align-items:baseline;gap:6px"><span class="t12 w8">${t('d1.milestone')}</span><span class="spacer"></span><span class="t13 w8 teal-ink">${c.votes}</span><span class="t12 w7 muted">${t('d1.ofVotes', { n: ms })}</span></div>
          <div style="margin-top:9px">${track((c.votes / ms) * 100)}</div>
          <div class="row" style="justify-content:space-between;margin-top:7px;gap:8px"><span class="t11 muted">${t('d1.toGo', { n: ms - c.votes })}</span>${isAr() ? '' : `<span class="t11 muted">${alt('d1.toGo', { n: ms - c.votes })}</span>`}</div></div>`}
        ${btn({ key: 'd1.shareGet', to: 'D2', params: { cook: c.id }, link: 'Share to get votes', ic: icon('share', { size: 18, sw: 2.1 }), primary: true, cls: 'btn-52' })}
        <div class="card">${secHead('d1.supporters')}<div style="margin-top:4px">${supporters}</div></div>
        <a class="row card" style="gap:10px;min-height:52px;padding:0 12px;color:inherit" ${linkAttrs('H3', { link: 'Your season so far' })}>${icon('trophy', { size: 19, sw: 1.9, color: 'var(--c-gold)' })}
          <div class="grow"><div class="t125 w8">${t('d1.season')}</div><div class="t11 muted" style="margin-top:1px">${t('d1.seasonSub')}</div></div>${chev('R', { size: 17 })}</a>
      </div></div>
      ${bottomNav(COOK_NAV, 'D1')}
    </section>`;
  },
};
