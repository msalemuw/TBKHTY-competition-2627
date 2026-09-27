// C3 · My nominations. The cooks she found, how far each has got, the rung that
// unlocks next and a nudge to share the one who is closest.
import { t, sub, alt, L, LO, isAr, esc, firstV } from '../i18n.js';
import { icon, appBar, btn, avatar, secHead, linkAttrs, chev, track, scrollHint } from '../ui.js';
import { state, cookById, rankOf, rungsFor, ranked, areaById } from '../store.js';

const RUNGS = [['c3.r1', 'c3.r1s'], ['c3.r2', 'c3.r2s'], ['c3.r3', 'c3.r3s'], ['c3.r4', 'c3.r4s']];

function nomRow(n, i) {
  const c = n.cookId && cookById(n.cookId);
  const total = state.cooks.length;
  const sep = i ? '<div class="rule"></div>' : '';
  const just = n.id === state.lastNomination ? `<span class="badge b-goldsoft sm">${t('c3.justAdded')}</span>` : '';
  const right = `<div class="none" style="text-align:end"><div class="upper-num">${t('c3.unlocked')}</div><div class="t13 w8" style="margin-top:2px">${t('c3.xOf4', { n: rungsFor(n) })}</div></div>`;
  if (!c) {
    return `${sep}<div class="row" style="gap:10px;min-height:62px;padding:10px 0">${avatar({ id: 'x', name: n.name, name_ar: n.name }, 40)}
      <div class="grow"><div class="row" style="gap:6px"><span class="t13 w8"><bdi>${esc(n.name)}</bdi></span>${just}</div><div class="t105 muted" style="margin-top:2px">${t('c3.invited')}</div><div style="margin-top:6px">${track(0, 'gold', 5)}</div></div>${right}</div>`;
  }
  const r = rankOf(c.id);
  const a = areaById(c.area);
  return `${sep}<a class="row" style="gap:10px;min-height:62px;padding:10px 0;color:inherit" ${linkAttrs('E2', { params: { cook: c.id }, link: 'Any cook I nominated' })}>${avatar(c, 40)}
    <div class="grow"><div class="row" style="gap:6px"><span class="t13 w8">${L(c, 'name')}</span>${just}</div><div class="t105 muted" style="margin-top:2px">${t('c3.ofN', { r, n: total, area: a ? { en: a.en, ar: a.ar } : c.area })}</div>
    <div style="margin-top:6px">${track(((total - r + 1) / total) * 100, 'gold', 5)}</div></div>${right}${chev('R', { size: 16 })}</a>`;
}

export default {
  render() {
    const noms = state.nominations;
    const top10 = noms.filter((n) => n.cookId && rankOf(n.cookId) <= 10).length;
    const best = Math.max(0, ...noms.map(rungsFor));
    // The nudge goes to the nominee nearest the top 5 from below.
    const fifth = ranked()[4];
    const cand = noms.map((n) => n.cookId && cookById(n.cookId)).filter((c) => c && rankOf(c.id) > 5).sort((a, b) => rankOf(a.id) - rankOf(b.id))[0];
    const nudgeVars = cand ? { name: firstV(cand), n: fifth.votes - cand.votes + 1 } : null;
    const rung = ([k, s], i) => {
      const done = i < best;
      const now = i === best;
      const dot = done ? `<span class="rung on">${icon('check', { size: 12, sw: 3, color: 'var(--c-navy)' })}</span>` : `<span class="rung${now ? ' now' : ''}"></span>`;
      return `${i ? '<div class="rule" style="margin-inline-start:30px"></div>' : ''}<div class="row" style="align-items:flex-start;gap:10px;padding:9px 0">${dot}
        <div class="grow"><div class="t125 w8${done || now ? '' : ' muted'}">${t(k)}</div><div class="t115 muted" style="margin-top:2px;line-height:1.35">${t(s)}</div></div>${now ? `<span class="badge b-goldsoft sm">${t('c3.now')}</span>` : ''}</div>`;
    };
    return `<section class="scr">
      ${appBar({ back: { to: 'A1' }, title: t('c1.mine') })}
      <div class="body"><div class="pad">
        <div class="card" style="padding:13px"><div class="row" style="gap:11px"><span class="nom-ic" style="width:46px;height:46px;border-radius:13px;background:var(--c-gold-bg)">${icon('gift', { size: 23, color: 'var(--c-gold)' })}</span>
          <div class="grow"><div class="t15 w8">${t('c3.found', { n: noms.length })}</div><div class="t115 muted" style="margin-top:2px">${t('c3.top10', { n: top10 })}</div>${sub('c3.found', { n: noms.length })}</div>
          <div class="none" style="text-align:end"><div class="t20 w8">${top10 * 5}</div><div class="upper-num">${t('c3.entries')}</div></div></div></div>
        ${secHead('c3.list')}
        <div class="card" style="padding:2px 12px">${noms.map(nomRow).join('')}</div>
        ${cand ? `<div class="card-coral"><div class="row" style="align-items:flex-start;gap:10px"><span class="flame-dot">${icon('flame', { size: 17, color: 'var(--c-white)', fill: 'var(--c-white)', sw: 1.2 })}</span>
          <div class="grow"><div class="t135 w8" style="line-height:1.3">${t('c3.nudge', nudgeVars)}</div>${sub('c3.nudge', nudgeVars, { cls: 'coral-ink' })}</div></div>
          <a class="coral-cta" ${linkAttrs('D2', { params: { cook: cand.id }, link: "Share this cook's entry" })}>${icon('share', { size: 16, color: 'var(--c-white)' })}${t('c3.share')}</a></div>` : ''}
        <div class="card"><div class="row" style="gap:9px"><span class="gift-dot">${icon('gift', { size: 17, color: 'var(--c-gold)' })}</span><div class="grow"><div class="t135 w8">${t('c3.winWhen')}</div>${sub('c3.winWhen')}</div></div>
          <div class="rule" style="margin-top:10px"></div>${RUNGS.map(rung).join('')}</div>
        ${scrollHint()}
      </div></div>
      <div class="bar">${btn({ key: 'c3.another', to: 'C1', link: 'Nominate another cook', variant: 'outline', ic: icon('plus', { size: 18, sw: 2.4 }), primary: true, cls: 'btn-52' })}</div>
    </section>`;
  },
};
