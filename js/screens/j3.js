// J3 · Titled cook profile. Titles sit under her name on the same creator
// profile as E2, each with a held-since line. This is what carries into Phase 2.
import { t, sub, L, LO, isAr, esc } from '../i18n.js';
import { icon, langToggle, backBtn, dish, avatar, badge, followBtn, titlePill, secHead, linkAttrs, chev, clubName, clubAlt } from '../ui.js';
import { cookById, titlesOf, areaById } from '../store.js';

export default {
  render(p) {
    const c = cookById(p.cook) || cookById('salma');
    const areaV = { en: c.area, ar: c.area_ar };
    const titles = titlesOf(c.id);
    const areaT = titles.filter((x) => x.area);
    const clubT = titles.filter((x) => x.kind === 'club');
    const line = (x, top) => `<div class="row" style="gap:10px;min-height:44px;${top ? 'border-top:1px solid var(--c-line)' : ''}">${x.kind === 'club' ? icon('crown', { size: 16, color: 'var(--c-gold)', fill: 'var(--c-gold)', sw: 1.2 }) : icon('trophy', { size: 16 })}
      <div class="grow"><div class="t125 w8 ellip">${t(x.key, { area: areaV })}</div><div class="t10 muted">${t('j2.since')}</div></div><span class="t12 w8 teal-ink">${c.votes}</span></div>`;
    return `<section class="scr">
      <div class="body">
        <div class="hero">${dish(c, { h: 190 })}<div class="hero-left">${backBtn('J2', { float: true })}</div><div class="hero-right">${langToggle(false)}</div></div>
        <div class="pad">
          <div class="row" style="align-items:flex-end;gap:11px;margin-top:-30px;position:relative">${avatar(c, 74, { ring: true })}<div class="grow" style="padding-bottom:6px">${badge(t('h2.verified'), 'tealsoft')}</div></div>
          <div><h1 class="display" style="font-size:27px">${L(c, 'name')}</h1>
            <div class="row" style="gap:7px;margin-top:4px;flex-wrap:wrap">${icon('pin', { size: 14, color: 'var(--c-muted)' })}<span class="t12 w7 muted">${L(c, 'area')} · ${clubName()}</span>${isAr() ? '' : `<span class="t11 muted" lang="ar">${esc(c.area_ar)}</span>`}</div></div>
          <div class="row" style="gap:6px;flex-wrap:wrap">${titles.map((x) => titlePill(x.kind, x.key, { area: areaV })).join('')}</div>
          <div class="card">${secHead('j3.titlesHeld')}
            ${areaT.length ? `<div class="row" style="gap:6px;padding:6px 0 2px">${icon('pin', { size: 13, sw: 2.1, color: 'var(--c-teal-text)' })}<span class="t10 w8 muted" style="letter-spacing:.07em">${t('j3.fromArea', { area: { en: c.area.toUpperCase(), ar: c.area_ar } })}</span></div>${areaT.map((x, i) => line(x, i > 0)).join('')}` : ''}
            ${clubT.length ? `<div class="row" style="gap:6px;padding:6px 0 2px;margin-top:10px">${icon('trophy', { size: 13, sw: 2.1, color: 'var(--c-gold)' })}<span class="t10 w8 muted" style="letter-spacing:.07em">${t('j3.fromClub')}</span></div>${clubT.map((x) => line(x, false)).join('')}` : ''}</div>
          <div class="stats3"><div><b>${c.votes}</b><span class="upper-num">${t('votes')}</span></div><div><b>${titles.length}</b><span class="upper-num">${t('j3.titlesStat')}</span></div><div><b>${c.id === 'salma' ? 318 : '–'}</b><span class="upper-num">${t('stat.followers')}</span></div></div>
          <div class="row" style="gap:9px" data-primary><span class="pill vote closed grow" aria-disabled="true" style="min-height:48px">${icon('heart', { size: 17, color: 'var(--c-disabled)' })}<span>${t('votingClosed')}</span></span>${followBtn(c, { width: 118, h: 48 })}</div>
          ${c.id === 'salma' ? `<a class="challenge" ${linkAttrs('J4', { link: 'One of her titles is challenged' })}>${icon('flame', { size: 17, color: 'var(--c-coral)', fill: 'var(--c-coral)', sw: 1.2 })}
            <div class="grow"><div class="t125 w8 navy">${t('j3.challenged')}</div><div class="t11 w7 coral-ink" style="margin-top:1px">${t('j3.apart')}</div></div>${chev('R', { size: 17 })}</a>` : ''}
          <div class="t11 muted lh">${t('j3.stay')}${sub('j3.stay')}</div>
        </div>
      </div>
    </section>`;
  },
};
