// B1 · Show Cairo your cooking. Why enter: prizes, neighbours tasting her food,
// one CTA, and a WhatsApp route for cooks who would rather be helped through it.
import { t, sub, alt, isAr } from '../i18n.js';
import { icon, langToggle, logo, backBtn, btn, linkAttrs } from '../ui.js';
import { B1_BRUSH, B1_UNDERLINE, B1_WAVE, B1_LINES1, B1_LINES2 } from '../art-data.js';
import { state } from '../store.js';

const MARKER = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap';
const deco = (d, w, h, style = '') => `<svg width="${w}" height="${h}" viewBox="${d.vb}" aria-hidden="true" style="${style}">${d.body}</svg>`;

function step(n, ic, key, subKey) {
  return `<div class="b1-step"><div class="b1-step-ic"><span class="ring">${icon(ic, { size: 24, sw: 1.9 })}</span><span class="num marker">${n}</span></div>
    <div class="t125 w8" style="letter-spacing:.03em">${t(key)}</div>${isAr() ? '' : `<div class="t11 w7 teal-ink" style="margin-top:-4px">${alt(key)}</div>`}
    <div class="t105 muted" style="line-height:1.32">${t(subKey)}</div></div>`;
}
const arrow = () => `<div class="b1-arrow">${icon('chevR', { size: 14, sw: 3, color: 'var(--c-locked-fill)', cls: 'flip' })}</div>`;

export default {
  render() {
    return `<section class="scr">
      <div class="body">
        <div class="b1-hero">
          <div class="b1-photo" aria-hidden="true"><div class="b1-photo-frame"></div></div>
          <div class="b1-shade"></div>
          <div class="b1-row">${backBtn('A1', { dark: true })}${logo(true, 'logo logo-sm')}<div class="spacer"></div>${langToggle(true)}</div>
          <div class="b1-copy">
            <div class="b1-brush">${deco(B1_BRUSH, 200, 47, 'position:absolute;inset:0;display:block')}<span class="marker">${t('b1.cooking')}</span></div>
            <div class="marker white" style="font-size:25px;line-height:1.1;margin-top:6px">${t('b1.competition')}</div>
            <div class="t145 w8 white" style="margin-top:10px;line-height:1.35">${t('b1.show')}${isAr() ? '' : `<span style="color:var(--c-teal)">${t('b1.win')}</span>`}</div>
            ${isAr() ? '' : `<div class="t115 w7" style="color:rgba(255,255,255,.62);margin-top:7px;text-align:end">${alt('b1.show')}</div>`}
            <div style="margin-top:9px">${deco(B1_UNDERLINE, 92, 10)}</div>
          </div>
          <div class="b1-real"><span>${t('b1.real1')}</span><i></i><span>${t('b1.real2')}</span><i></i><span>${t('b1.real3')}</span></div>
          ${deco(B1_WAVE, 390, 18, 'position:absolute;left:0;right:0;bottom:-1px;width:100%;height:18px')}
        </div>
        <div class="pad">
          <div><div class="row" style="justify-content:center;gap:9px">${deco(B1_LINES1, 28, 24, 'flex:none')}<span class="marker navy" style="font-size:21px">${t('b1.easy')}</span>${deco(B1_LINES2, 28, 24, 'flex:none')}</div>${sub('b1.easy', null, { cls: 'c' })}</div>
          <div class="row" style="align-items:flex-start">${step(1, 'pot', 'b1.s1', 'b1.s1s')}${arrow()}${step(2, 'camera', 'b1.s2', 'b1.s2s')}${arrow()}${step(3, 'share', 'b1.s3', 'b1.s3s')}${arrow()}${step(4, 'trophy', 'b1.s4', 'b1.s4s')}</div>
          <div class="card-gold">
            <div class="row" style="gap:7px"><span class="t10 w8 gold-ink" style="letter-spacing:.1em">${t('b1.playing')}</span><span class="spacer"></span>${isAr() ? '' : `<span class="t11 w7 gold-ink">${alt('b1.playing')}</span>`}</div>
            <div style="height:1px;background:var(--c-gold-line);margin:8px 0 1px"></div>
            <div class="row" style="align-items:flex-start;gap:8px;padding:8px 0">${icon('gift', { size: 16, color: 'var(--c-gold)' })}<div class="grow"><div class="t12 w8" style="line-height:1.3">${t('b1.p1')}</div>${sub('b1.p1', null, { cls: 's' })}</div></div>
            <div style="height:1px;background:var(--c-gold-line)"></div>
            <div class="row" style="align-items:flex-start;gap:8px;padding:8px 0 0">${icon('crown', { size: 16, color: 'var(--c-gold)' })}<div class="grow"><div class="t12 w8" style="line-height:1.3">${t('b1.p2')}</div>${sub('b1.p2', null, { cls: 's' })}</div></div>
          </div>
          <div class="row" style="justify-content:center;gap:7px">${icon('clock', { size: 14, color: 'var(--c-muted)' })}<span class="t115 w7 muted">${t('b1.twoMin')}</span></div>
        </div>
      </div>
      <div class="bar">
        <div class="row" style="justify-content:center;gap:7px;flex-wrap:wrap">${icon('people', { size: 15, color: 'var(--c-teal-text)' })}<span class="t12 w8">${t('b1.already', { n: state.cooks.length })}</span>${isAr() ? '' : `<span class="t11 w6 muted">${alt('b1.already', { n: state.cooks.length })}</span>`}</div>
        ${btn({ key: 'b1.enter', to: 'B2', link: 'Enter now', primary: true })}
        <a class="link-quiet" ${linkAttrs('B2', { params: { help: 'wa' }, link: 'Prefer help? Send us your entry on WhatsApp' })}>${icon('chat', { size: 16, sw: 1.7, color: 'var(--c-muted)' })}<span>${t('b1.help')}</span></a>
      </div>
    </section>`;
  },
  mount() {
    // Permanent Marker is the poster voice on this screen only.
    if (!document.querySelector('link[data-marker]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = MARKER;
      l.dataset.marker = '';
      document.head.appendChild(l);
    }
  },
};
