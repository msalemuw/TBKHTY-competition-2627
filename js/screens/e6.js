// E6 · Already voted today. The one-vote-a-day rule made friendly: countdown
// to the next vote, the streak at stake, share instead, and cooks to follow.
import { t, sub, L, firstV } from '../i18n.js';
import { icon, appBar, btn, dish, followBtn, streakCard, secHead } from '../ui.js';
import { state, cookById, ranked } from '../store.js';

function untilMidnight() {
  const now = new Date();
  const mid = new Date(now);
  mid.setHours(24, 0, 0, 0);
  const mins = Math.max(1, Math.round((mid - now) / 60000));
  return `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, '0')}m`;
}

export default {
  render(p) {
    const cook = cookById(p.cook) || cookById(state.voter.lastVoted) || cookById('amira');
    const name = firstV(cook);
    const others = ranked().filter((c) => c.id !== cook.id && !state.voter.votedToday[c.id]).slice(3, 6);
    return `<section class="scr">
      ${appBar({ back: { to: 'E1' } })}
      <div class="body"><div class="pad" style="gap:12px">
        <div class="row" style="justify-content:center;margin-top:6px"><div class="clock-ring">${icon('clock', { size: 54, sw: 1.7, color: 'var(--c-teal-text)' })}</div></div>
        <div class="center"><h1 class="display" style="font-size:30px">${t('e6.title')}</h1>${sub('e6.title', null, { cls: 'c' })}</div>
        <div class="center display coral-ink" style="font-size:44px;line-height:1.1" lang="en" data-countdown>${untilMidnight()}</div>
        <div class="center t12 w7 muted" style="margin-top:-6px">${t('e6.until')}${sub('e6.until', null, { cls: 'c' })}</div>
        ${streakCard(Math.max(1, state.voter.streak))}
        ${btn({ key: 'e6.shareInstead', vars: { name }, to: 'D2', params: { cook: cook.id }, link: `Share instead to help ${name.en}`, ic: icon('share', { size: 18, sw: 2.1 }), primary: true, cls: 'btn-52' })}
        ${secHead('e6.others')}
        <div class="carousel" style="gap:10px">${others.map((c) => `<div class="mini-cook">${dish(c, { w: '100%', h: 72 })}
          <div style="padding:9px"><div class="t115 w8 ellip">${L(c, 'name')}</div><div class="t10 muted">${t('votesLower', { n: c.votes })}</div>
          <div style="margin-top:8px">${followBtn(c, { width: 100, h: 44 })}</div></div></div>`).join('')}</div>
      </div></div>
    </section>`;
  },
};
