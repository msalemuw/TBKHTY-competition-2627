// F1 · Club leaderboard. Podium, the ranked list with movement, a close-race
// band between second and third, and the note that judges and tasting stay sealed.
import { t, sub, L, isAr, firstV } from '../i18n.js';
import { icon, appBar, closesBand, rankRow, dish, avatar, linkAttrs, clubName } from '../ui.js';
import { ranked, state } from '../store.js';

function podium(c, rank, h, big = false) {
  return `<div class="pod">${big ? icon('crown', { size: 21, color: 'var(--c-gold)', fill: 'var(--c-gold)', sw: 1.2 }) : ''}
    <div style="position:relative">${dish(c, { w: 74, h: 74, radius: 999 })}<span class="pod-av">${avatar(c, 34)}</span></div>
    <div class="center" style="margin-top:9px"><div class="t115 w8" style="line-height:1.15">${L(c, 'name').replace(' ', '<br>')}</div><div class="t10 muted" style="margin-top:2px">${L(c, 'dish')}</div></div>
    <div class="pod-block" style="height:${h}px;background:${big ? 'var(--c-navy)' : 'var(--c-navy-2)'}"><div class="display white" style="font-size:${big ? 22 : 19}px">${c.votes}</div><div class="t10 w8" style="color:var(--c-teal);letter-spacing:.07em">#${rank}</div></div></div>`;
}

export default {
  render() {
    const all = ranked();
    const [a, b, c] = all;
    const gap = b.votes - c.votes;
    const rows = all.map((x, i) => {
      let out = rankRow(x, { rank: i + 1, me: x.id === state.myCookId });
      if (i === 1 && gap <= 20) out += `<div class="race">${icon('flame', { size: 15, color: 'var(--c-coral)', fill: 'var(--c-coral)', sw: 1.2 })}<span>${t('f1.close', { n: gap, a: firstV(b), b: firstV(c) })}</span></div>`;
      if (i === 2) out += '<div class="rule" style="margin:6px 8px"></div>';
      return out;
    }).join('');
    return `<section class="scr">
      ${appBar({ back: { to: 'A1' }, title: clubName() })}
      ${closesBand()}
      <div class="body"><div class="pad" style="gap:10px;padding-top:12px">
        <div class="podium" aria-label="${t('edition')}">${podium(b, 2, 56)}${podium(a, 1, 78, true)}${podium(c, 3, 42)}</div>
        <div class="stack" aria-label="${t('edition')}">${rows}</div>
        <div class="card row" style="align-items:flex-start;gap:8px;padding:10px">${icon('eye', { size: 15, sw: 1.7, color: 'var(--c-muted)' })}<div class="grow t11 muted lh">${t('f1.sealed')}${sub('f1.sealed')}</div></div>
      </div></div>
      <div class="bar"><div class="row" style="gap:9px" data-primary>
        <a class="btn-tile" ${linkAttrs('F2', { link: 'Club vs club' })}>${t('f1.vs')}</a>
        <a class="btn-tile" ${linkAttrs('H1', { link: 'Final results' })}>${icon('trophy', { size: 16, color: 'var(--c-gold)' })}${t('f1.final')}</a>
      </div></div>
    </section>`;
  },
};
