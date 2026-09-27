// A1 · TBKHTY home. Above any single club: the topline ranking with its filters,
// then the competitions themselves, soonest to close first.
import { t, ta, sub, alt, L, isAr, esc } from '../i18n.js';
import { icon, langToggle, logo, linkAttrs, btn, chev, secHead, rankRow, dish, sponsorSlot, badge, num, histBack, clubName } from '../ui.js';
import { state, ranked, clubs } from '../store.js';
import { canGoBack } from '../router.js';

let filter = 'all';

export function promo({ capKey = null, capHtml = null, titleKey, subKey, pillKey, pillTo = null, pillLink = '', art, dark = true }) {
  const cap = capHtml || `${t(capKey)}${!isAr() && alt(capKey) ? ` · ${alt(capKey)}` : ''}`;
  const pillInner = `${t(pillKey)}${icon('chevR', { size: 13, sw: 2.4, cls: 'flip' })}`;
  const pill = pillTo
    ? `<a class="promo-pill ${dark ? '' : 'on-coral'}" ${linkAttrs(pillTo, { link: pillLink })}>${pillInner}</a>`
    : `<span class="promo-pill ${dark ? '' : 'on-coral'}">${pillInner}</span>`;
  return `<div class="promo ${dark ? 'promo-navy' : 'promo-coral'}">
    <div class="promo-text"><div class="promo-cap">${cap}</div><div class="promo-title">${t(titleKey)}</div>
    <div class="promo-sub">${t(subKey)}</div><div class="spacer"></div>${pill}</div>
    ${dish(art, { w: 118, h: 150 })}</div>`;
}

function rows() {
  const all = ranked();
  let list;
  if (filter === 'area') {
    const seen = new Set();
    list = all.filter((c) => (seen.has(c.area) ? false : seen.add(c.area))).slice(0, 3);
  } else if (filter === 'dish') {
    const seen = new Set();
    list = all.filter((c) => (seen.has(c.category) ? false : seen.add(c.category))).slice(0, 3);
  } else list = all.slice(0, 3);
  return list.map((c) => {
    const rank = all.indexOf(c) + 1;
    const detail = `${L(c, 'area')} · ${clubName()}`;
    return rankRow(c, { rank, to: 'E2', link: 'Any cook in the top 3', detail, crown: rank === 1, h: 46, av: 34 });
  }).join('');
}

const FILTERS = [['all', 'a1.fAll'], ['area', 'a1.fArea'], ['club', 'a1.fClub'], ['dish', 'a1.fDish']];
const CLUB_ORDER = ['Shooting Club', 'Gezira Club', 'Maadi Club', 'Wadi Degla'];

function clubCard(c) {
  const closing = c.name === 'Shooting Club';
  const chip = closing
    ? badge(t('a1.closesIn'), 'coral', { ic: icon('clock', { size: 12, sw: 2.3, color: 'var(--c-white)' }), cls: 'sm-chip' })
    : badge(t('live'), 'tealsoft', { cls: 'sm-chip' });
  // The Shooting Club numbers are live: they move with every vote and signup.
  const cooks = closing ? state.cooks.length : c.cooks;
  const votes = closing ? state.cooks.reduce((sum, x) => sum + x.votes, 0) : c.votes;
  return `<a class="club-card" ${linkAttrs('A2', { params: { club: c.name }, link: 'Any competition card' })}>
    <span class="club-ic">${icon('trophy', { size: 19, sw: 1.9 })}</span>
    <span class="grow"><span class="row" style="gap:7px;flex-wrap:wrap"><span class="t14 w8 navy">${L(c, 'name')}</span>${chip}</span>
    <span class="t11 muted" style="display:block;margin-top:3px">${t('a1.cooksVotes', { c: cooks, v: num(votes) })}</span>
    ${isAr() ? '' : `<span class="t11 muted" style="display:block" lang="ar">${esc(c.name_ar)}</span>`}</span>${chev('R')}</a>`;
}

export default {
  render() {
    const hb = canGoBack() ? histBack(true) : '';
    return `<section class="scr">
      <div class="body">
        <header class="hdr-dark" style="padding-bottom:13px">
          <div class="hdr-row">${hb}${logo(true)}<div class="spacer"></div>
            <a class="icon-btn ring-dark" ${linkAttrs('E8', { link: 'Find a cook' })} aria-label="${ta('a1.findCook')}">${icon('search', { size: 17, sw: 2.1 })}</a>
            <a class="icon-btn ring-dark" ${linkAttrs('A3', { link: 'How the competition works' })} aria-label="${ta('a1.howComp')}">${icon('info', { size: 17, sw: 2 })}</a>
            ${langToggle(true)}</div>
          <h1 class="display white" style="font-size:28px;margin-top:4px">${t('masters')}</h1>
          <div class="row" style="gap:8px;margin-top:5px"><span class="t125 w7" style="color:rgba(255,255,255,.72)">${t('tagline')}</span><span class="spacer"></span>${sponsorSlot(true)}</div>
        </header>
        <div class="pad" style="gap:10px">
          <div><div class="carousel" data-carousel>
            ${promo({ capKey: 'a1.annCap', titleKey: 'a1.annTitle', subKey: 'a1.annSub', pillKey: 'a1.voteNow', pillTo: 'E1', art: 'fatta' })}
            ${promo({ capKey: 'a1.sponsoredCap', titleKey: 'sponsor', subKey: 'a1.bannerSlot', pillKey: 'cta', art: 'feteer', dark: false })}
          </div><div class="dots" data-dots><span class="on"></span><span></span></div></div>
          ${btn({ key: 'a1.voteFav', to: 'E1', link: 'Vote for your favourite cook', ic: icon('heart', { size: 19, sw: 2.1 }), primary: true, cls: 'btn-50' })}
          ${btn({ key: 'a1.signup', to: 'B1', link: 'Sign up as a cook to compete', variant: 'outline', ic: icon('utensils', { size: 18 }), cls: 'btn-50' })}
          <a class="nom-card" ${linkAttrs('C1', { link: 'Nominate a cook you know' })}>
            <span class="nom-ic">${icon('gift', { size: 20, color: 'var(--c-gold)' })}</span>
            <span class="grow"><span class="t135 w8 navy" style="display:block">${t('a1.nominate')}</span><span class="t11 muted" style="display:block;margin-top:2px">${t('a1.nomSub')}</span>${sub('a1.nomSub')}</span>${chev('R')}</a>
          <a class="link-quiet" style="margin-top:-2px;font-weight:800" ${linkAttrs('A3', { link: 'New here? How the competition works' })}>${icon('info', { size: 15, color: 'var(--c-muted)' })}<span>${t('a1.newHere')}</span></a>
          <div class="card">
            ${secHead('a1.topCooks')}
            <div class="t105 muted" style="margin-top:3px">${t('a1.topSub')}</div>
            <div class="chips" style="margin:9px -12px 0;padding:0 12px">${FILTERS.map(([k, key]) => `<button type="button" class="chip" data-filter="${k}" aria-pressed="${filter === k}"><span class="c1">${t(key)}</span>${isAr() ? '' : `<span class="c2">${alt(key)}</span>`}</button>`).join('')}</div>
            <div style="margin-top:6px">${rows()}</div>
            <div class="row card-foot">
              <a class="link-teal grow" style="justify-content:center" ${linkAttrs('F1', { link: 'Full leaderboard' })}>${t('a1.full')}${icon('chevR', { size: 14, sw: 2.2, cls: 'flip' })}</a>
              <span class="vr"></span>
              <a class="link-teal grow" style="justify-content:center" ${linkAttrs('J2', { link: 'Area titles' })}>${t('a1.titles')}${icon('chevR', { size: 14, sw: 2.2, cls: 'flip' })}</a>
            </div>
          </div>
          ${secHead('a1.choose')}
          <div class="t11 muted" style="margin-top:-6px">${t('a1.chooseSub')}${isAr() ? '' : `<span class="sub inline">${alt('a1.chooseSub')}</span>`}</div>
          <div class="stack" style="gap:9px">${CLUB_ORDER.map((n) => clubCard(clubs.find((c) => c.name === n))).join('')}</div>
        </div>
      </div>
    </section>`;
  },
  mount(root, p, api) {
    root.querySelectorAll('[data-filter]').forEach((b) => b.addEventListener('click', () => { filter = b.dataset.filter; api.rerender(); }));
    wireCarousel(root);
  },
};

export function wireCarousel(root) {
  const car = root.querySelector('[data-carousel]');
  const dots = root.querySelector('[data-dots]');
  if (!car || !dots) return;
  car.addEventListener('scroll', () => {
    const w = car.firstElementChild.offsetWidth + 9;
    const i = Math.round(Math.abs(car.scrollLeft) / w);
    [...dots.children].forEach((d, j) => d.classList.toggle('on', i === j));
  }, { passive: true });
}
