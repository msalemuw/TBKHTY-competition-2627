// J4 · Your title is challenged. Eight votes apart with three days left brings a
// holder back to share again. Shown to Salma, the holder, as on the board.
import { t, sub, alt, isAr, first } from '../i18n.js';
import { icon, appBar, btn, avatar, linkAttrs, titlePill } from '../ui.js';
import { cookById } from '../store.js';

export default {
  render() {
    const s = cookById('salma');
    const a = cookById('amira');
    const side = (c, votes, key, ring, color) => `<div class="stack grow" style="align-items:center;gap:7px;flex:1 1 0"><span style="border-radius:50%;border:3px solid ${ring}">${avatar(c, 62)}</span>
      <div class="t125 w8"><bdi>${isAr() ? first(c.name_ar) : first(c.name)}</bdi></div><div class="display" style="font-size:26px;line-height:1" lang="en">${votes}</div><div class="t105 w8" style="letter-spacing:.06em;color:${color}">${t(key)}</div></div>`;
    return `<section class="scr">
      ${appBar({ back: { to: 'D1' } })}
      <div class="body"><div class="pad">
        <div class="row" style="justify-content:center;margin-top:4px"><div class="threat">${icon('trophy', { size: 38, sw: 1.8, color: 'var(--c-coral-text)' })}</div></div>
        <div class="center"><h1 class="display" style="font-size:30px">${t('j4.title')}</h1>${isAr() ? '' : `<div class="t135 w7 coral-ink" style="margin-top:5px">${alt('j4.title')}</div>`}</div>
        <div class="card" style="padding:13px"><div class="row" style="justify-content:center">${titlePill('area', 'title.cook1', { area: { en: s.area, ar: s.area_ar } })}</div>
          <div class="row" style="gap:8px;margin-top:14px;align-items:flex-end">${side(s, 412, 'j4.holding', 'var(--c-teal)', 'var(--c-teal-text)')}<div class="display muted" style="font-size:15px;padding-bottom:14px">${t('j4.vs')}</div>${side(a, 404, 'j4.challenger', 'var(--c-coral)', 'var(--c-coral-text)')}</div>
          <div style="margin-top:14px;height:10px;background:var(--c-coral-bg);border-radius:999px;overflow:hidden"><i style="display:block;width:51%;height:100%;background:var(--c-teal);border-radius:999px"></i></div>
          <div class="center t13 w8 coral-ink" style="margin-top:9px">${t('j3.apart')}</div>${sub('j3.apart', null, { cls: 'c' })}</div>
        <div class="card-coral" style="padding:12px"><div class="row" style="gap:10px">${icon('clock', { size: 18, color: 'var(--c-coral-text)' })}<div class="grow"><div class="t125 w8">${t('j4.closes')}</div>${sub('j4.closes')}</div></div></div>
      </div></div>
      <div class="bar">
        ${btn({ key: 'j4.defend', to: 'D2', params: { cook: 'salma' }, link: 'Defend my title', ic: icon('share', { size: 19, sw: 2.1 }), primary: true, cls: 'btn-56' })}
        <a class="link-quiet" style="font-weight:800;font-size:13px" ${linkAttrs('J2', { params: { area: s.area }, link: 'See the area board' })}>${t('j4.board')}</a>
      </div>
    </section>`;
  },
};
