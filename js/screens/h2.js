// H2 · Winner page. A permanent profile badge, the final score, the Grand Final
// line and a follow button that carries into Phase 2.
import { t, sub, alt, L, isAr, esc } from '../i18n.js';
import { icon, langToggle, logo, dish, avatar, badge, followBtn, secHead, linkAttrs, btn, sponsorSlot, titlePill, scrollHint, clubName } from '../ui.js';
import { cookById } from '../store.js';
import content from '../data/content.js';

export default {
  render() {
    const c = cookById('salma');
    const s = content.final_scores[0];
    const score = (s.judges_of_40 + s.tasting_of_30 + s.online_of_30).toFixed(1);
    const areaV = { en: c.area, ar: c.area_ar };
    return `<section class="scr">
      <div class="body">
        <div class="hero">${dish(c, { h: 210 })}<div class="hero-shade"></div>
          <div class="hero-left" style="display:flex;gap:6px;align-items:center"><span data-hist-slot="dark"></span>${logo(true, 'logo logo-sm')}</div>
          <div class="hero-right">${langToggle(true)}</div>
          <div class="hero-caption">${icon('crown', { size: 20, color: 'var(--c-gold)', fill: 'var(--c-gold)', sw: 1.2 })}<span class="t13 w8 white">${t('h2.banner')}</span></div></div>
        <div class="pad">
          <div class="row" style="align-items:flex-end;gap:12px;margin-top:-34px;position:relative">${avatar(c, 78, { ring: true })}
            <div class="grow row" style="gap:6px;flex-wrap:wrap;padding-bottom:6px">${badge(t('h2.winner'), 'gold', { ic: icon('crown', { size: 12, color: 'var(--c-navy)', fill: 'var(--c-navy)', sw: 1.2 }) })}${badge(t('h2.verified'), 'tealsoft')}</div></div>
          <div><h1 class="display" style="font-size:30px">${L(c, 'name')}</h1><div class="t13 w7 teal-ink" style="margin-top:4px">${L(c, 'dish')}</div>${isAr() ? '' : `<span class="sub"><bdi lang="ar" dir="rtl">${esc(c.dish_ar)} · ${esc(content.edition.club_ar)}</bdi></span>`}</div>
          <div class="card" style="padding:13px"><div class="row">
            <div class="dstat"><div class="display" style="font-size:25px;line-height:1" lang="en">${score}</div><div class="upper-num" style="margin-top:5px">${t('h2.final')}</div></div>
            <div class="dstat" style="border-inline-start:1px solid var(--c-line)"><div class="display" style="font-size:25px;line-height:1">${c.votes}</div><div class="upper-num" style="margin-top:5px">${t('h2.online')}</div></div>
            <div class="dstat" style="border-inline-start:1px solid var(--c-line)"><div class="display" style="font-size:25px;line-height:1" lang="en">186</div><div class="upper-num" style="margin-top:5px">${t('h2.tasting')}</div></div></div></div>
          <div class="card">${secHead('h2.titles')}
            <div class="row" style="gap:6px;flex-wrap:wrap;margin-top:10px">${titlePill('club', 'title.clubChamp')}${titlePill('area', 'title.cook1', { area: areaV })}${titlePill('cat', 'title.bestMains', { area: areaV })}</div>
            <a class="link-teal" ${linkAttrs('J3', { params: { cook: c.id }, link: 'See them on her profile' })}>${t('h2.see')}${icon('chevR', { size: 14, sw: 2.2, cls: 'flip' })}</a></div>
          <div class="card"><div class="row" style="gap:11px"><span class="nom-ic" style="background:var(--c-navy);border:0">${icon('trophy', { size: 19, sw: 1.9, color: 'var(--c-gold)' })}</span>
            <div class="grow"><div class="t135 w8">${t('h2.grand')}</div><div class="t115 muted" style="margin-top:1px">${t('h2.grandWhen')}</div>${isAr() ? '' : sub('h2.grand')}</div></div></div>
          <div class="row" style="gap:10px">${followBtn(c, { width: 126, h: 46 })}<div class="grow t11 muted" style="line-height:1.35">${t('e2.notified')}${sub('e2.notified')}</div></div>
          ${scrollHint()}
        </div>
      </div>
      <div class="bar">
        <div class="row" style="gap:8px"><span class="t11 w7 muted" style="letter-spacing:.06em">${t('by')}</span>${sponsorSlot(false, 'sponsor', 104)}</div>
        ${btn({ key: 'h2.share', to: 'D2', params: { cook: c.id }, link: 'Share the winner card', ic: icon('share', { size: 18, sw: 2.1 }), primary: true, cls: 'btn-52' })}
      </div>
    </section>`;
  },
};
