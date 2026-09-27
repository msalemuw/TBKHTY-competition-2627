// E2 · Entry detail: an early creator profile. Vote, follow with the
// kitchen-opens promise, order intent with price chips, her other dishes.
import { t, ta, sub, alt, L, isAr, firstV, esc } from '../i18n.js';
import { icon, langToggle, backBtn, btn, dish, avatar, rankBadge, badge, followBtn, secHead, ordinal, closedPanel, clubName, clubAlt } from '../ui.js';
import { state, cookById, rankOf, votingOpen } from '../store.js';

const PRICES = ['50 EGP', '75 EGP', '100+ EGP'];

export default {
  render(p) {
    const cook = cookById(p.cook) || cookById('amira');
    const name = firstV(cook);
    const voted = !!state.voter.votedToday[cook.id];
    const areaV = { en: cook.area, ar: cook.area_ar };
    const intent = state.voter.orderIntent[cook.id];
    const others = cook.id === 'amira'
      ? `<div>${secHead('e2.other')}<div class="row" style="gap:9px;margin-top:8px;overflow-x:auto">
          ${[['mahshi', 'dish.mahshi'], ['basbousa', 'dish.basbousa'], ['koshari', 'dish.koshari']].map(([k, key]) => `<div class="none">${dish(k, { w: 104, h: 74, radius: 11 })}<div class="t105 w7 muted" style="margin-top:5px">${t(key)}</div></div>`).join('')}
        </div></div>` : '';
    const voteCta = votingOpen()
      ? btn({ key: 'e2.voteFor', vars: { name }, to: 'E3', params: { cook: cook.id }, link: `Vote for ${name.en}`, ic: icon('heart', { size: 19, sw: 2.1, fill: voted ? 'var(--c-navy)' : 'none' }), primary: true })
        + `<div class="row" style="justify-content:center;gap:6px;margin-top:-4px;flex-wrap:wrap">${icon('info', { size: 13, color: 'var(--c-muted)' })}<span class="t11 w7 muted">${t('e2.oneVote')}</span>${isAr() ? '' : `<span class="t11 muted">${alt('e2.oneVote')}</span>`}</div>`
      : closedPanel();
    return `<section class="scr">
      <div class="body">
        <div class="hero">${dish(cook, { h: 226 })}
          <div class="hero-left">${backBtn('E1', { float: true })}</div>
          <div class="hero-right"><button type="button" class="icon-btn float" data-toast="toastDemo" aria-label="${ta('share')}">${icon('share', { size: 18, sw: 1.7 })}</button>${langToggle(false)}</div>
        </div>
        <div class="pad" style="padding:0 16px 16px">
          <div class="row" style="align-items:flex-end;gap:11px;margin-top:-30px;position:relative">${avatar(cook, 74, { ring: true })}
            <div class="grow" style="padding-bottom:5px">${cook.isNew ? badge(t('newEntry'), 'sand') : rankBadge(cook)}</div></div>
          <div><h1 class="display" style="font-size:27px">${L(cook, 'name')}</h1>
            <div class="row" style="gap:7px;margin-top:4px;flex-wrap:wrap"><span class="t12 w7 muted">${clubName()}</span>${clubAlt()}<span style="color:var(--c-line)">|</span><span class="t12 w7 teal-ink">${L(cook, 'dish')}</span></div></div>
          <div class="row" style="gap:7px;flex-wrap:wrap">${badge(L(cook, 'area'), 'sand', { ic: icon('pin', { size: 12 }) })}<span class="t11 w7 muted">${t('e2.competing')}</span>${badge(t('e2.titleArea', { area: areaV }), 'navy', { ic: icon('trophy', { size: 12.5, color: 'var(--c-white)' }) })}</div>
          <div class="stats3">
            <div><b>${cook.votes}</b><span class="upper-num">${t('stat.votes')}</span></div>
            <div><b>${ordinal(rankOf(cook.id))}</b><span class="upper-num">${t('stat.rank')}</span></div>
            <div><b>${cook.followers ?? (cook.isNew ? 0 : '–')}</b><span class="upper-num">${t('stat.followers')}</span></div>
          </div>
          ${cook.story ? `<div class="t125 muted lh">${esc(isAr() ? cook.story.ar : cook.story.en)}${!isAr() && cook.story.ar !== cook.story.en ? `<span class="sub" style="font-size:11.5px;font-weight:400"><bdi lang="ar" dir="rtl">${esc(cook.story.ar)}</bdi></span>` : ''}</div>` : ''}
          ${voteCta}
          <div class="row" style="gap:10px">${followBtn(cook)}<div class="grow t11 muted" style="line-height:1.35">${t('e2.notified')}${sub('e2.notified', null, { cls: '' })}</div></div>
          <div class="card">
            <div class="row" style="gap:8px"><span class="t125 w8">${t('e2.order')}</span><span class="spacer"></span>${isAr() ? '' : `<span class="t11 muted w6">${alt('e2.order')}</span>`}</div>
            <div class="chips wrap" style="margin-top:10px">${PRICES.map((pr) => `<button type="button" class="chip" data-price="${pr}" aria-pressed="${intent === pr}"><span class="c1" lang="en" style="font-size:13px">${pr}</span></button>`).join('')}</div>
          </div>
          ${others}
        </div>
      </div>
    </section>`;
  },
  mount(root, p, api) {
    const cook = cookById(p.cook) || cookById('amira');
    root.querySelectorAll('[data-price]').forEach((b) => b.addEventListener('click', () => {
      const cur = state.voter.orderIntent[cook.id];
      state.voter.orderIntent[cook.id] = cur === b.dataset.price ? null : b.dataset.price;
      api.rerender();
    }));
    // A second vote for the same cook on the same day shows the already-voted state.
    api.guard((a) => {
      if (a.dataset.to === 'E3' && state.voter.votedToday[cook.id]) return { to: 'E6', params: { cook: cook.id } };
      return undefined;
    });
  },
};
