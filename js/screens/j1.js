// J1 · Two title tracks. Your area is open to everyone; your club is optional and
// members-only. Both feed the city title, with Hoda as the worked example.
import { t, sub, alt, isAr } from '../i18n.js';
import { icon, appBar, title, avatar } from '../ui.js';
import { cookById } from '../store.js';

function tier(color, key, exKey, last = false) {
  return `<div class="row" style="align-items:flex-start;gap:9px;padding:9px 0;${last ? '' : 'border-bottom:1px solid var(--c-line)'}"><span class="tier-dot" style="background:${color}"></span>
    <div class="grow"><div class="row" style="gap:6px"><span class="t12 w8 grow">${t(key)}</span>${isAr() ? '' : `<span class="t11 muted">${alt(key)}</span>`}</div><div class="t105 muted" style="margin-top:3px">${t(exKey)}</div></div></div>`;
}

export default {
  render() {
    return `<section class="scr">
      ${appBar({ back: { to: 'A1' }, title: t('j1.bar') })}
      <div class="body"><div class="pad" style="gap:10px">
        ${title('j1.title', { size: 30, subColor: 'var(--c-teal-text)', subWeight: 700 })}
        <div class="t12 muted lh">${t('j1.lede')}${sub('j1.lede', null, { cls: '' })}</div>
        <div class="row" style="gap:10px;align-items:stretch" data-primary>
          <div class="card grow" style="flex:1 1 0"><div class="row" style="gap:7px">${icon('pin', { size: 15, color: 'var(--c-teal-text)' })}<span class="t13 w8 grow">${t('j1.area')}</span>${isAr() ? '' : `<span class="t11 muted">${alt('j1.area')}</span>`}</div>
            <div class="t105 w7 teal-ink" style="margin-top:3px">${t('j1.everyone')}</div>
            <div style="margin-top:6px">${tier('var(--c-teal)', 'j1.dish', 'j1.dishEx')}${tier('var(--c-teal)', 'j1.cat', 'j1.catEx')}${tier('var(--c-navy)', 'j1.champ', 'j1.champEx', true)}</div></div>
          <div class="card grow" style="flex:1 1 0"><div class="row" style="gap:7px">${icon('trophy', { size: 15, color: 'var(--c-gold)' })}<span class="t13 w8 grow">${t('j1.club')}</span>${isAr() ? '' : `<span class="t11 muted">${alt('j1.club')}</span>`}</div>
            <div class="t105 w7 muted" style="margin-top:3px">${t('j1.members')}</div>
            <div style="margin-top:6px">${tier('var(--c-gold)', 'j1.clubChamp', 'title.clubChamp', true)}</div>
            <div class="t105 muted lh" style="margin-top:8px">${t('j1.noClub')}</div></div>
        </div>
        <div class="row" style="gap:9px"><div class="grow rule"></div><span class="t10 w8 muted" style="letter-spacing:.08em">${t('j1.both')}</span><div class="grow rule"></div></div>
        <div class="city-card"><div class="row" style="gap:10px">${icon('crown', { size: 20, color: 'var(--c-navy)', fill: 'var(--c-navy)', sw: 1.2 })}
          <div class="grow"><div class="t13 w8">${t('j1.city')}</div><div class="t105" style="opacity:.8;margin-top:1px">${t('j1.citySub')}</div></div>${isAr() ? '' : `<span class="t11 w7" style="opacity:.8">${alt('j1.city')}</span>`}</div></div>
        <div class="card-teal"><div class="row" style="align-items:flex-start;gap:10px">${avatar(cookById('hoda'), 36)}<div class="grow"><div class="t12 w8 lh">${t('j1.hoda')}</div>${sub('j1.hoda')}</div></div></div>
        <div class="card"><div class="row" style="align-items:flex-start;gap:10px">${icon('lock', { size: 16 })}<div class="grow"><div class="t12 w8" style="line-height:1.35">${t('j1.rule')}</div><div class="t105 muted lh" style="margin-top:4px">${t('j1.ruleSub')}</div></div></div></div>
      </div></div>
    </section>`;
  },
};
