// D2 · Share card. The 9:16 story image she posts, four one-tap destinations,
// and the credit line from her last share. Nothing is actually sent.
import { t, ta, sub, alt, L, isAr, firstV, esc } from '../i18n.js';
import { icon, appBar, title, dish, avatar, logo, sponsorSlot, clubName } from '../ui.js';
import { state, cookById, rankOf } from '../store.js';
import { dashCook } from './d1.js';

export default {
  render(p) {
    const c = cookById(p.cook) || dashCook();
    const mine = c.id === state.myCookId || (!state.myCookId && c.id === 'amira' && !p.cook);
    const slug = esc(String(c.name).split(' ')[0].toLowerCase());
    const head = mine ? t('d2.voteMe') : t('d2.voteHer', { name: firstV(c) });
    const tile = (ic, key, act, teal = false) => `<button type="button" class="share-tile${teal ? ' teal' : ''}" data-share="${act}"${teal ? ' data-primary' : ''}>${icon(ic, { size: 21 })}<span class="stack" style="text-align:start"><span class="t125 w8">${t(key)}</span>${isAr() ? '' : `<span class="t11" style="opacity:.7">${alt(key)}</span>`}</span></button>`;
    return `<section class="scr">
      ${appBar({ back: { to: 'D1' }, title: t('d2.title') })}
      <div class="body"><div class="pad" style="gap:12px">
        ${title(mine ? 'd2.yours' : 'd2.theirs', { size: 28 })}
        <div class="row" style="justify-content:center"><div class="story-card">
          ${dish(c, { w: 214, h: 214 })}
          <div class="story-logo">${logo(true, 'logo logo-xs')}</div><div class="story-sponsor">${sponsorSlot(true, 'sponsor', 0)}</div>
          <div class="story-av">${avatar(c, 52)}</div>
          <div class="story-text">
            <div class="display white" style="font-size:21px">${head}</div>
            ${mine && !isAr() ? `<div class="t11 w7" style="margin-top:5px;color:var(--c-teal);text-align:end">${alt('d2.voteMe')}</div>` : ''}
            <div class="row" style="gap:6px;margin-top:8px"><span class="badge b-teal sm">${t('d2.rank', { n: rankOf(c.id) })}</span><span class="t105 w7" style="color:rgba(255,255,255,.75)">${clubName()}</span></div>
            <div class="spacer"></div>
            <div class="row" style="gap:8px"><span class="t11 w8 white" lang="en">tbkhty.app/${slug}</span></div>
          </div></div></div>
        <div class="share-grid">${tile('chat', 'd2.wa', 'wa', true)}${tile('chat', 'd2.status', 'status')}${tile('insta', 'd2.insta', 'insta')}${tile('copy', 'd2.copy', 'copy')}</div>
        ${c.isNew ? '' : `<div class="card"><div class="row" style="gap:10px"><span class="soft-dot">${icon('heart', { size: 17, color: 'var(--c-teal-text)', fill: 'var(--c-teal-text)', sw: 1.2 })}</span><div class="grow"><div class="t125 w8">${t('d2.last')}</div>${sub('d2.last')}</div></div></div>`}
      </div></div>
    </section>`;
  },
  mount(root, p, api) {
    const c = cookById(p.cook) || dashCook();
    root.querySelectorAll('[data-share]').forEach((b) => b.addEventListener('click', async () => {
      if (b.dataset.share === 'copy') {
        // The link copied is this demo's own page for the cook, nothing external.
        const url = `${location.origin}${location.pathname}${location.search}#/e2?cook=${c.id}`;
        try { await navigator.clipboard.writeText(url); } catch (e) { /* clipboard may be blocked */ }
        api.toast('toastCopied');
      } else api.toast('toastDemo');
    }));
  },
};
