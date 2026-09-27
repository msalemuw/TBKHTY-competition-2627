// F2 · Club vs club. Five clubs by total participation, your club pinned, and
// one share to push it up the city table.
import { t, sub, L, isAr, esc } from '../i18n.js';
import { icon, appBar, btn, title, track, num } from '../ui.js';
import { clubs, state, edition } from '../store.js';

export default {
  render() {
    const live = clubs.map((c) => (c.name === edition.club ? { ...c, votes: state.cooks.reduce((s, x) => s + x.votes, 0), cooks: state.cooks.length } : c))
      .sort((a, b) => b.votes - a.votes);
    const max = live[0].votes;
    return `<section class="scr">
      ${appBar({ back: { to: 'F1' }, title: t('f2.title') })}
      <div class="body"><div class="pad" style="gap:10px">
        ${title('f2.title', { size: 30 })}
        <div class="t12 muted lh">${t('f2.ranked')}${sub('f2.ranked', null, { cls: '' })}</div>
        <div class="stack" style="gap:9px">${live.map((c, i) => {
          const mine = c.name === edition.club;
          return `<div class="club-row${mine ? ' mine' : ''}"><div class="row" style="gap:9px"><span class="t13 w8 muted" style="width:18px">${i + 1}</span>
            <div class="grow"><div class="row" style="gap:7px;flex-wrap:wrap"><span class="t135 w8">${L(c, 'name')}</span>${mine ? `<span class="badge b-navy sm">${t('f2.yours')}</span>` : ''}</div>${isAr() ? '' : `<div class="t11 muted" lang="ar" style="margin-top:1px">${esc(c.name_ar)}</div>`}</div>
            <div class="none" style="text-align:end"><div class="t14 w8">${num(c.votes)}</div><div class="upper-num">${t('votes')}</div></div></div>
            <div style="margin-top:9px">${track((c.votes / max) * 100, 'teal-dark', 9)}</div>
            <div class="row" style="gap:14px;margin-top:7px"><span class="t105 w7 muted">${t('f2.verified', { n: num(c.voters) })}</span><span class="t105 w7 muted">${t('b6.cooksN', { n: c.cooks })}</span></div></div>`;
        }).join('')}</div>
      </div></div>
      <div class="bar">${btn({ key: 'f2.help', to: 'D2', link: 'Help Shooting Club lead the city', ic: icon('share', { size: 18, sw: 2.1 }), primary: true })}</div>
    </section>`;
  },
};
