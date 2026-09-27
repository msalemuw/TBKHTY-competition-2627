// A2 · Club edition home. One edition: vote or enter, the countdown, the live
// top 3, social proof, and the way back to every competition.
import { t, ta, sub, alt, L, isAr, esc } from '../i18n.js';
import { icon, langToggle, logo, linkAttrs, btn, chev, secHead, rankRow, sponsorSlot, badge, infoNote, stackAvatars } from '../ui.js';
import { ranked, clubs, state } from '../store.js';
import { promo, wireCarousel } from './a1.js';

export default {
  render(p) {
    const club = clubs.find((c) => c.name === p.club) || clubs[0];
    const isShooting = club.name === 'Shooting Club';
    const clubV = { en: club.name, ar: club.name_ar };
    const top = ranked().slice(0, 3);
    const n = state.cooks.length;
    const topRows = isShooting
      ? top.map((c, i) => rankRow(c, { rank: i + 1, h: 46 })).join('')
      : `<div class="t12 muted" style="padding:10px 0">${t('a2.noEntries')}</div>`;
    const timeChip = isShooting
      ? `<span class="badge b-coral" style="min-height:27px">${icon('clock', { size: 13, sw: 2.3, color: 'var(--c-white)' })}${t('closesShort')}</span>`
      : badge(t('live'), 'tealsoft');
    return `<section class="scr">
      <div class="body">
        <header class="hdr-dark" style="min-height:212px;display:flex;flex-direction:column">
          <div class="hdr-row"><a class="icon-btn back on-dark" ${linkAttrs('A1', { link: 'All competitions', back: true })} aria-label="${ta('a2.all')}">${icon('chevL', { size: 21, sw: 1.7, cls: 'flip' })}</a>
            ${logo(true)}<div class="spacer"></div>${langToggle(true)}</div>
          <h1 class="display white" style="font-size:32px;margin-top:4px">${t('masters')}</h1>
          <div class="row" style="gap:8px;margin-top:6px;flex-wrap:wrap">
            <span class="t145 w8" style="color:var(--c-teal)">${t('a2.editionOf', { club: clubV })}</span>
            ${isAr() ? '' : `<span class="t13" style="color:rgba(255,255,255,.72)">${alt('a2.editionOf', { club: clubV })}</span>`}
            <span class="spacer"></span>${timeChip}</div>
          ${isShooting ? `<div class="t11 w7" style="margin-top:4px;color:rgba(255,255,255,.62)">${t('closesFri')}${isAr() ? '' : `<span class="sub inline" style="color:inherit">${alt('closesFri')}</span>`}</div>` : ''}
          <div class="spacer" style="min-height:10px"></div>
          <div class="row" style="gap:8px"><span class="t11 w7" style="letter-spacing:.06em;color:rgba(255,255,255,.72)">${t('by')}</span>${sponsorSlot(true, 'sponsor', 104)}</div>
        </header>
        <div class="pad" style="gap:10px">
          <div><div class="carousel" data-carousel>
            ${promo({ capHtml: `${L(club, 'name')}${isAr() ? '' : ` · <bdi lang="ar" dir="rtl">${esc(club.name_ar)}</bdi>`}`, titleKey: 'a2.tasting', subKey: 'a2.tastingSub', pillKey: 'a2.calendar', art: 'mahshi' })}
            ${promo({ capKey: 'a1.sponsoredCap', titleKey: 'clubSponsor', subKey: 'a2.clubBanner', pillKey: 'cta', art: 'bamya', dark: false })}
          </div><div class="dots" data-dots><span class="on"></span><span></span></div></div>
          ${btn({ key: 'a2.voteIn', to: 'E1', link: 'Vote in this edition', ic: icon('heart', { size: 19, sw: 2.1 }), primary: true, cls: 'btn-56' })}
          <div class="row" style="align-items:flex-start;gap:7px">${icon('info', { size: 14, color: 'var(--c-muted)' })}
            <div class="grow t11 muted lh">${t('a2.placed')} <a class="w8" style="display:inline-flex;align-items:center;min-height:44px" ${linkAttrs('A3', { link: 'How the competition works' })}>${t('a1.howComp')}</a></div></div>
          <a class="nom-card" style="min-height:56px" ${linkAttrs('C1', { link: 'Nominate a cook you know' })}>
            <span class="nom-ic">${icon('gift', { size: 20, color: 'var(--c-gold)' })}</span>
            <span class="grow"><span class="t135 w8 navy" style="display:block">${t('a1.nominate')}</span><span class="t11 muted" style="display:block;margin-top:2px">${t('a1.nomSub')}</span>${sub('a1.nomSub')}</span>${chev('R')}</a>
          ${isShooting ? `<div class="row" style="gap:8px;flex-wrap:wrap">${stackAvatars(['nadia', 'omar', 'heba'])}<span class="t12 w7 navy">${t('a2.neighbours')}</span>${isAr() ? '' : `<span class="t11 muted">${alt('a2.neighbours')}</span>`}</div>` : ''}
          <div class="card">
            ${secHead('a2.top3')}
            <div class="stack" style="margin-top:8px">${topRows}</div>
            <a class="link-teal" style="justify-content:center;width:100%;border-top:1px solid var(--c-line);margin-top:6px;font-size:13px" ${linkAttrs('F1', { link: `See all ${n} competitors` })}>${t('a2.seeAll', { n })}${icon('chevR', { size: 15, sw: 2.2, cls: 'flip' })}</a>
          </div>
        </div>
      </div>
    </section>`;
  },
  mount(root) { wireCarousel(root); },
};
