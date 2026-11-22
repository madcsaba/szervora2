/* ================= 2.0: témamotor (elem × napszak) ================= */
Object.assign(IC, {
  today: '<circle cx="12" cy="13" r="4"/><path d="M12 3v3M4.2 6.2l2 2M19.8 6.2l-2 2M3 21h18"/>',
  graph: '<circle cx="12" cy="12" r="3"/><circle cx="4.5" cy="6" r="2"/><circle cx="19.5" cy="6" r="2"/><circle cx="12" cy="20.5" r="2"/><path d="M6.2 7.2l3.3 2.9M17.8 7.2l-3.3 2.9M12 15v3.5"/>',
  journal: '<path d="M6 3h11a1 1 0 0 1 1 1v16H7a1 1 0 0 1-1-1zM9 8h6M9 12h6M9 16h4"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
  wave: '<path d="M2 12h3l2-6 3 12 3-9 2 5 2-2h5"/>', close: '<path d="M6 6l12 12M18 6 6 18"/>',
  eyeoff: '<path d="M3 3l18 18M10.6 6.1C11 6 11.5 6 12 6c6.5 0 10 6 10 6a17 17 0 0 1-3.3 4M6.6 6.6C3.8 8.3 2 12 2 12s3.5 6 10 6c1.7 0 3.2-.4 4.5-1"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/><path d="M9 12l2 2 4-4"/>', device: '<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 18.5h4"/>',
  screen: '<rect x="2.5" y="5" width="19" height="12" rx="2.5"/><path d="M8 20.5h8M12 17v3.5"/>', expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>', moon: '<path d="M20 14A8 8 0 1 1 10 4a6.5 6.5 0 0 0 10 10z"/>', plus: '<path d="M12 5v14M5 12h14"/>', speaker: '<path d="M4 9v6h4l5 4V5L8 9zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>'
});
ROUT.push({ id: 'fesz', icon: 'wave', steps: [['Bef-17', 45, 0], ['Szb-6', 60, 1], ['Sz-7', 60, 1], ['M-3', 60, 1]] });
ROUT.forEach((r) => { r.sec = r.steps.reduce((s, x) => s + x[1], 0); RBY[r.id] = r; });

const PALS = {
  fa: { l: ['#F6FBF6', '#FFFFFF', '#EAF3EC', '#CDEBD3', '#2F6B3E', '#FFFFFF', '#0F1F14', '#4D6153', '#D8E6DB'], d: ['#0E1612', '#16211B', '#1B2922', '#21402F', '#8FD19E', '#0B2614', '#E4EFE7', '#A3B9AA', '#2B3D33'] },
  tuz: { l: ['#FFF8F6', '#FFFFFF', '#FFEFEA', '#FFDAD1', '#A3331F', '#FFFFFF', '#2B0C05', '#6E4A42', '#F0D9D2'], d: ['#1A0F0C', '#241613', '#2D1C18', '#4A241B', '#FFB4A3', '#3B0D05', '#F7E6E1', '#C9A9A1', '#3D2822'] },
  fold: { l: ['#FFFAF1', '#FFFFFF', '#FFF2DA', '#F6E2B3', '#7A5200', '#FFFFFF', '#271B00', '#66573A', '#EBDFC4'], d: ['#16120A', '#201A10', '#282115', '#43361A', '#F0C46B', '#2A1D00', '#F3EBDB', '#C2B496', '#3A3122'] },
  fem: { l: ['#F5F8F9', '#FFFFFF', '#EBF1F3', '#DAE4E9', '#3E5966', '#FFFFFF', '#0F1C22', '#53636B', '#DCE3E6'], d: ['#0F1417', '#171E22', '#1D262B', '#2C3C45', '#B7CCD6', '#132026', '#E5ECEF', '#A3B2B9', '#2B363C'] },
  viz: { l: ['#F5F9FD', '#FFFFFF', '#E8F1F9', '#D3E6F7', '#245A85', '#FFFFFF', '#0A1B2A', '#4C6276', '#D7E3EE'], d: ['#08121C', '#0F1E2C', '#132638', '#15344F', '#93CCFF', '#06233D', '#E3EEF8', '#9DB3C7', '#1E3449'] }
};
const ELV = {
  l: { fa: ['#3F7D4E', '#DDEEE1', '#2F6B3E'], tuz: ['#B8452F', '#FFDAD1', '#A3331F'], fold: ['#9A6B14', '#F6E2B3', '#7A5200'], fem: ['#5F7079', '#DAE4E9', '#3E5966'], viz: ['#2F5D7C', '#D3E6F7', '#245A85'], er: ['#6B4F8A', '#E6DEEF', '#5E4479'] },
  d: { fa: ['#8FD19E', '#24352A', '#8FD19E'], tuz: ['#F2957F', '#3D2420', '#FFB4A3'], fold: ['#E7BE6A', '#3A2F18', '#F0C46B'], fem: ['#B7C6CE', '#283136', '#B7CCD6'], viz: ['#93CCFF', '#1E2E3A', '#93CCFF'], er: ['#C7B2E8', '#2E2638', '#C7B2E8'] }
};
const KEYS = ['bg', 'surf', 'surf2', 'cont', 'acc', 'onacc', 'on', 'mut', 'line'];
let MODE = 'l', CUREL = 'fa';
function themeVars(el, mode) {
  const p = PALS[el][mode], v = {};
  KEYS.forEach((k, i) => { v['--' + k] = p[i]; });
  Object.entries(ELV[mode]).forEach(([k, [c, l, tt]]) => { v['--' + k] = c; v['--' + k + '-l'] = l; v['--' + k + '-t'] = tt; });
  Object.assign(v, { '--ink': p[6], '--muted': p[7], '--chip': p[2], '--jade': p[4], '--jade-t': p[4], '--map': p[2], '--onel': mode === 'd' ? '#0E1210' : '#FFFFFF',
    '--warn': mode === 'd' ? '#3A2420' : '#FFE9E2', '--warn-line': mode === 'd' ? '#6B3A30' : '#F2C4B6', '--body': mode === 'd' ? '#3A3F3B' : '#E8DECA', '--body-line': mode === 'd' ? '#55594F' : '#CDBF9F',
    '--bone': mode === 'd' ? '#CFC8B8' : '#FFFDF6', '--bone-line': mode === 'd' ? '#7E7766' : '#A99B7C' });
  return v;
}
function applyTheme() {
  const d = now(), h = d.getHours(), pref = store.get('theme', 'auto');
  MODE = pref === 'dark' ? 'd' : pref === 'light' ? 'l' : (h >= 20 || h < 6 ? 'd' : 'l');
  CUREL = orgAt(d).el;
  const v = themeVars(CUREL, MODE), st = document.documentElement.style;
  Object.entries(v).forEach(([k, val]) => st.setProperty(k, val));
  document.documentElement.dataset.mode = MODE;
  const meta = $('meta[name=theme-color]'); if (meta) meta.setAttribute('content', v['--bg']);
}
const styleVars = (v) => Object.entries(v).map(([k, val]) => `${k}:${val}`).join(';');

/* ================= közös elemek (2.0) ================= */
const top = (title, sub, back, right = '') => `<header class="top">${back ? `<a class="iconbtn" href="#${back}" aria-label="${t('back_l')}">${ic('back', 24)}</a>` : ''}<div class="grow">${sub ? `<div class="sub">${sub}</div>` : ''}<h1>${title}</h1></div>${right}</header>`;
const row = (icn, title, sub, href, tag = '') => `<a class="row" href="${href}"><span class="ic">${ic(icn)}</span><span class="grow">${tag ? `<span class="tag">${tag}</span>` : ''}<span class="t">${title}</span>${sub ? `<span class="s">${sub}</span>` : ''}</span>${ic('chev', 18)}</a>`;
const tile = (k, v, bg) => `<div class="tile"${bg ? ` style="background:${bg}"` : ''}><div class="k">${k}</div><div class="v">${v}</div></div>`;
const disclaimer = () => `<p class="note">${t('disclaimer')}</p>`;
const relTiles = (e) => [['k_sense', e.sense], ['k_tissue', e.tissue], ['k_mirror', e.mirror], ['k_fluid', e.fluid], ['k_emo', e.emo], ['k_taste', e.taste]].map(([k, v]) => tile(t(k), v)).join('');
const settingsBtn = () => `<a class="iconbtn tonal" href="#beallitasok" aria-label="${t('settings_t')}">${ic('gear', 22)}</a>`;
const clockStr = (d) => `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
const dateStr = (d) => { const s = new Intl.DateTimeFormat(loc(), { weekday: 'long' }).format(d); return s[0].toUpperCase() + s.slice(1); };

/* ================= napló (helyi tárolás) ================= */
const getLog = () => store.get('log', []);
const setLog = (l) => store.set('log', l.slice(-400));
const lastCheckin = () => { const c = getLog().filter((x) => x.type === 'ci').pop(); return c && Date.now() - c.t < 3 * 3600e3 ? c : null; };

/* ================= ajánlómotor + biztonsági szűrő ================= */
function recommend(d, ci) {
  const h = d.getHours(); let id, ti, su;
  if (CALM(d)) { id = 'esti'; ti = t('rec_night_t'); su = t('rec_night_s'); }
  else if (ci && ci.m === 0) { id = 'fesz'; ti = t('rec_tense_t'); su = t('rec_tense_s'); }
  else if (ci && ci.e === 0) { id = 'reggel'; ti = t('rec_low_t'); su = t('rec_low_s'); }
  else { id = h >= 5 && h < 10 ? 'reggel' : h >= 13 && h < 16 ? 'emesztes' : 'kepernyo'; const rt = C('routines', id); ti = rt[0]; su = rt[1]; }
  if (id === 'emesztes' && !EAT(d)) id = 'kepernyo';
  return { id, ti, su, r: RBY[id] };
}

/* ================= napi kör: a teljes 24 óra, a „most” mindig felül ================= */
// Égbolt-sáv a valódi napkelte/naplemente szerint (a készülék időzónájából, lásd core.js: sunEventH).
const SKY = { night: '#1E2A4A', dawn: '#E49C86', gold: '#F0C66B', day: '#A6D1EC', dusk: '#DE8559', eve: '#6A4B7C' };
const hex2 = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mixHex = (a, b, f) => { const x = hex2(a), y = hex2(b); return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * f).toString(16).padStart(2, '0')).join(''); };
// Élénk elemszínek a szervórához (fa, tűz, föld, fém, víz), világos/sötét témára.
const DIAL_EL = {
  l: { fa: '#2E9E4F', tuz: '#E3412C', fold: '#DFA015', fem: '#8697A3', viz: '#1D5FB4' },
  d: { fa: '#3DBE63', tuz: '#FF5A41', fold: '#F2B92B', fem: '#D2DAE0', viz: '#3D8AF0' }
};
// Évszak → telítettség: tavasz (fa) és nyár (tűz) élénk, késő nyár (föld) kicsit visszafogott, ősz (fém) és tél (víz) fakóbb.
const SEASON_SAT = { fa: 1, tuz: 1, fold: 0.88, fem: 0.66, viz: 0.56 };
const dialSeason = (d) => { const loc = sunLoc(); return seasonEl(loc.lat < 0 ? new Date(d.getFullYear(), d.getMonth() + 6, 15) : d); };
function toneHex(h, sat, lift = 0) {
  let [r, g, b] = hex2(h).map((v) => v / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l0 = (mx + mn) / 2, dd = mx - mn;
  let hh = 0, ss = 0; if (dd) { ss = dd / (1 - Math.abs(2 * l0 - 1)); hh = mx === r ? ((g - b) / dd) % 6 : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4; }
  ss = Math.min(1, ss * sat); const l = Math.min(0.92, Math.max(0.08, l0 + lift)), c = (1 - Math.abs(2 * l - 1)) * ss, x = c * (1 - Math.abs((hh % 2) - 1)), m = l - c / 2;
  [r, g, b] = hh < 1 ? [c, x, 0] : hh < 2 ? [x, c, 0] : hh < 3 ? [0, c, x] : hh < 4 ? [0, x, c] : hh < 5 ? [x, 0, c] : [c, 0, x];
  return '#' + [r, g, b].map((v) => Math.round((v + m) * 255).toString(16).padStart(2, '0')).join('');
}
function skyAt(x, rise, set) {
  const k = [[rise - 1.2, SKY.night], [rise - 0.3, SKY.dawn], [rise + 0.8, SKY.gold], [rise + 2.5, SKY.day], [set - 2.5, SKY.day], [set - 0.8, SKY.gold], [set + 0.1, SKY.dusk], [set + 0.8, SKY.eve], [set + 1.6, SKY.night]];
  let y = x; if (y < k[0][0]) y += 24; if (y > k[k.length - 1][0] + 24) y -= 24;
  for (let i = 0; i < k.length - 1; i++) if (y >= k[i][0] && y <= k[i + 1][0]) return mixHex(k[i][1], k[i + 1][1], (y - k[i][0]) / Math.max(1e-6, k[i + 1][0] - k[i][0]));
  return SKY.night;
}
function dayArc(d) {
  const S = 360, cx = 180, cy = 180, R = 146, W = 24, x0 = hOf(d), cur = ORG.indexOf(orgAt(d));
  const ang = (x) => (x - x0) * 15;                                         // óra → fok, felülről, órajárás szerint
  const pt = (r, deg) => { const a = deg * Math.PI / 180; return [r1(cx + r * Math.sin(a)), r1(cy - r * Math.cos(a))]; };
  const arc = (r, a0, a1, sweep = 1) => { const [p, q] = pt(r, a0), [u, v] = pt(r, a1); return { m: `${p} ${q}`, a: `A${r} ${r} 0 ${Math.abs(a1 - a0) > 180 ? 1 : 0} ${sweep} ${u} ${v}` }; };
  const MYB = astroOn() ? [...new Set(bazi(getBirth()).P.map((p) => p[1]))] : [];
  const rise = sunriseH(d), set = sunsetH(d), sea = dialSeason(d), sat = SEASON_SAT[sea], pal = DIAL_EL[MODE === 'd' ? 'd' : 'l'];
  // ősszel/télen fakóbb (kicsit világosabb is), az évszak elemének szervei élénkebbek maradnak;
  // az aktív (mostani) szerv mindig a saját teljes, élénk színében látszik
  const elCol = (el) => toneHex(pal[el], el === sea ? Math.min(1, sat + 0.3) : sat, (1 - sat) * (MODE === 'd' ? -0.06 : 0.1));
  let s = '';
  // égbolt-sáv: 48 félórás darab
  for (let i = 0; i < 48; i++) { const x = i / 2, a0 = ang(x), a1 = ang(x + 0.5) + 0.3, o = arc(110, a0, a1), w = arc(118, a1, a0, 0); s += `<path d="M${o.m} ${o.a} L${w.m} ${w.a} Z" fill="${toneHex(skyAt(x + 0.25, rise, set), 0.55 + 0.45 * sat)}"/>`; }
  const noon = (rise + set) / 2, [sx, sy] = pt(114, ang(noon)), [mx, my] = pt(114, ang(noon + 12));
  s += `<circle cx="${sx}" cy="${sy}" r="7" fill="#FBE29A" stroke="#E9B949" stroke-width="1.5"><title>${esc(t('dial_sun', { r: fmtH(rise), s: fmtH(set) }))}</title></circle>`;
  s += `<path d="M${r1(mx + 4)} ${r1(my - 6)} a7 7 0 1 0 0 12 a5.5 5.5 0 1 1 0 -12z" fill="#E8EEF7" stroke="#B9C6D8" stroke-width="1"/>`;
  // 12 szerv-ág; a felső három (előző, mostani, következő) kiemelve és felirattal
  ORG.forEach((o, i) => {
    const k = ((i - cur + 18) % 12) - 6, on = k === 0, top = Math.abs(k) <= 1;
    const a0 = ang(o.s) + 1.2, a1 = ang(o.s + 2) - 1.2, ro = R + (on ? 6 : 0), ri = R - W, out = arc(ro, a0, a1), inn = arc(ri, a1, a0, 0);
    s += `<a href="#szerv-${slug(o.c)}" data-dial="${i}" aria-label="${esc(orgN(o.c))}, ${t('hours', { w: win(o) })}"><path d="M${out.m} ${out.a} L${inn.m} ${inn.a} Z" fill="${on ? pal[o.el] : elCol(o.el)}" opacity="${on || top ? 1 : 0.86}"/></a>`;
    if (top) { const l = arc(R + 13, a0 - 10, a1 + 10); s += `<path id="dl${i}" d="M${l.m} ${l.a}" fill="none"/><text font-size="11" font-weight="${on ? 700 : 600}" style="fill:var(--${on ? 'on' : 'mut'})" pointer-events="none"><textPath href="#dl${i}" startOffset="50%" text-anchor="middle">${esc(C('org', o.c)[1])}</textPath></text>`; }
    if (MYB.includes(i)) { const [qx, qy] = pt(ri - 0, (a0 + a1) / 2); s += `<circle cx="${qx}" cy="${qy}" r="3.5" style="fill:var(--on)" pointer-events="none"><title>${esc(t('my_windows'))}</title></circle>`; }
  });
  // „most” mutató felül, az égbolt-sávon (a felirattal nem ütközik)
  s += `<line x1="${cx}" y1="${cy - 104}" x2="${cx}" y2="${cy - 125}" style="stroke:var(--on)" stroke-width="3.5" stroke-linecap="round" pointer-events="none"/><circle cx="${cx}" cy="${cy - 104}" r="3.5" style="fill:var(--on)" pointer-events="none"/>`;
  return `<svg class="dial" viewBox="0 0 ${S} ${S}" role="img" aria-label="${esc(t('arc_label'))}" style="width:100%;max-width:${S}px;display:block;margin:0 auto;overflow:visible;font-family:Inter,sans-serif">${s}</svg>`;
}
const centerHtml = (o, d) => `<div class="eyebrow">${d ? t('now_el', { e: elT(o.el).n.toUpperCase() }) : elT(o.el).n.toUpperCase()}</div><div class="organ" style="font-size:${orgN(o.c).length > 11 ? 26 : orgN(o.c).length > 8 ? 32 : 38}px">${orgN(o.c)}</div><div class="sub">${String(o.s).padStart(2, '0')}:00–${String((o.s + 2) % 24).padStart(2, '0')}:00${d ? ' · ' + fmtLeft(minsLeft(o, d)) : ''}</div>`;
// Rámutatásra / fókuszra a kör közepén az adott szerv látszik; elhagyva visszaáll a mostanira.
const dialPreview = (e) => { const a = e.target.closest && e.target.closest('[data-dial]'), c = $('#view .arccenter'); if (!c) return; if (!c.dataset.now) c.dataset.now = c.innerHTML; c.innerHTML = a ? centerHtml(ORG[+a.dataset.dial]) : c.dataset.now; c.classList.toggle('preview', !!a); };
['pointerover', 'focusin'].forEach((ev) => document.addEventListener(ev, (e) => { if (e.target.closest && (e.target.closest('[data-dial]') || $('#view .arccenter.preview'))) dialPreview(e); }));

const V = {};
/* ================= MA ================= */
V.ma = () => {
  const d = now(), o = orgAt(d), e = elT(o.el), h = d.getHours(), rec = recommend(d, lastCheckin()), i = ORG.indexOf(o), ci = lastCheckin();
  const later = [1, 2].map((k) => ORG[(i + k) % 12]);
  return `${top(t('tab_ma'), `${dateStr(d)} · ${clockStr(d)}`, '', `<a class="iconbtn tonal" href="#kijelzo" aria-label="${t('kij_open')}">${ic('screen', 22)}</a>${settingsBtn()}`)}
  <section class="arcwrap" aria-label="${t('arc_label')}">${dayArc(d)}
    <div class="arccenter" aria-live="polite">${centerHtml(o, d)}</div>
  </section>
  <section class="pad stack">
    <div class="hero">
      <div class="eyebrow acc">${ic(CALM(d) ? 'moon' : 'today', 18)}${t('enough')}</div>
      <h2 class="display">${rec.ti}</h2>
      <p>${rec.su}</p>
      <div class="btnrow"><a class="btn" href="#rutin-${rec.id}">${ic('play', 20, 2.2)}${t('start_min', { m: Math.max(1, Math.round(rec.r.sec / 60)) })}</a><a class="btn tonal" href="#gyakorlat-legzes">${t('only_breath')}</a></div>
    </div>
    <button type="button" class="row" data-act="checkin" style="width:100%;text-align:left;cursor:pointer;border:0"><span class="ic">${ic('emotion')}</span><span class="grow"><span class="t">${t('checkin_btn')}</span><span class="s">${ci ? `${t('ci_last')}: ${t('lvl_e' + ci.e)} · ${t('mood_' + ci.m)}` : t('checkin_sub')}</span></span>${ic('chev', 18)}</button>
    ${astroOn() ? astroTodayRow(d) : ''}
    ${!EAT(d) ? `<div class="row flat"><span class="ic">${ic('nofood')}</span><span class="grow"><span class="t">${t('eat_pause', { t: fmtH(sched(d).wake) })}</span><span class="s">${t('eat_pause_s')}</span></span></div>` : ''}
    <div class="sec"><h2>${t('later')}</h2></div>
    <div class="grid2">${later.map((x) => `<a class="tile big" href="#szerv-${slug(x.c)}"><div class="k">${String(x.s).padStart(2, '0')}:00 · ${elT(x.el).n}</div><div class="v">${orgN(x.c)}</div></a>`).join('')}</div>
    <div class="card quiet"><div class="s">${C('org', o.c)[2]}</div></div>
    ${disclaimer()}
  </section>`;
};
/* ---- check-in lap ---- */
let CI = { e: 1, m: 1, s: 1 };
function sheetHtml() {
  const seg = (k, label, keys) => `<div class="field"><div class="flabel" id="lb-${k}">${label}</div><div class="seg" role="radiogroup" aria-labelledby="lb-${k}">${keys.map((kk, i) => `<button type="button" role="radio" aria-checked="${CI[k] === i}" data-act="ci" data-k="${k}" data-v="${i}">${t(kk)}</button>`).join('')}</div></div>`;
  const rec = recommend(now(), CI);
  return `<div class="scrim" data-act="ciclose"></div><section class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-t">
    <div class="grip"></div>
    <div style="display:flex;gap:8px;align-items:flex-start"><div class="grow"><h2 id="sheet-t" class="display" style="font-size:24px">${t('checkin_btn')}</h2><div class="sub">${t('checkin_sub')}</div></div><button type="button" class="iconbtn tonal" data-act="ciclose" aria-label="${t('close_l')}">${ic('close')}</button></div>
    ${seg('e', t('energy'), ['lvl_e0', 'lvl_e1', 'lvl_e2'])}${seg('m', t('mood'), ['mood_0', 'mood_1', 'mood_2'])}${seg('s', t('sleepq'), ['sleep_0', 'sleep_1', 'sleep_2'])}
    <div class="hero" style="padding:16px"><div class="eyebrow acc">${t('for_you')}</div><div class="display" id="cirec" style="font-size:19px;margin-top:4px">${rec.ti} · ${t('min_n', { n: Math.max(1, Math.round(rec.r.sec / 60)) })}</div>
      <div class="btnrow"><button type="button" class="btn" data-act="cigo" id="cigo" data-r="${rec.id}">${ic('play', 18, 2.2)}${t('lets_go')}</button><button type="button" class="btn tonal" data-act="cisave">${t('save_ci')}</button></div>
      <div class="sub" style="display:flex;align-items:center;gap:6px;margin-top:10px">${ic('device', 16)}${t('on_device')}</div></div>
  </section>`;
}
function openSheet() { const l = lastCheckin(); CI = l ? { e: l.e, m: l.m, s: l.s } : { e: 1, m: 1, s: 1 }; let el = $('#sheetbox'); if (!el) { el = document.createElement('div'); el.id = 'sheetbox'; document.body.appendChild(el); } el.innerHTML = sheetHtml(); const f = $('.sheet [aria-checked=true]'); if (f) f.focus(); }
function closeSheet() { const el = $('#sheetbox'); if (el) el.innerHTML = ''; }
function saveCheckin() { const l = getLog(); l.push({ type: 'ci', t: Date.now(), e: CI.e, m: CI.m, s: CI.s }); setLog(l); }

/* ================= SZERV ================= */
V.szerv = (code) => {
  const o = ORG.find((x) => slug(x.c) === code) || orgAt(now()), e = elT(o.el), d = now(), active = orgAt(d) === o, pair = OBY[PAIR[o.c]], snd = C('snd', SOUND_OF[o.c]);
  const startIn = ((o.s * 60) - (d.getHours() * 60 + d.getMinutes()) + 1440) % 1440, pts = PTS.filter((p) => p.ch === o.c);
  const cards = [];
  cards.push(`<a class="card livecard" href="#test-ch-${slug(o.c)}">${miniFigure(o.c)}<span class="grow"><span class="tag">${t('tag_meridian')}</span><span class="t">${chName(o.c)}</span><span class="s">${t('live_flow', { f: chT(o.c)[2] })}</span></span>${ic('chev', 18)}</a>`);
  if (L.mozgas) cards.push(row('move', t('heal_sound', { s: snd[1] }), t('min5', { o: snd[0] }), '#gyakorlat', t('tag_qigong')));
  if (L.taplalkozas) cards.push(nightOrg(o) ? `<div class="card quiet"><span class="tag">${t('tag_food')}</span><div style="display:flex;gap:10px;margin-top:4px"><span style="color:var(--mut)">${ic('nofood', 20)}</span><div class="s">${t('night_food', { t: fmtH(sched().eat0) })} <b>${e.foods}</b></div></div></div>` : row('food', t('taste_color', { t: e.taste, c: e.color.toLowerCase() }), e.foods, `#elem-${o.el}`, t('tag_food')));
  pts.forEach((p) => cards.push(row('hand', C('area', p.id), `${pc(p)} · ${ptT(p.id)[3]}`, `#pont-${p.s}`, t('tag_press'))));
  if (L.erzelmek) cards.push(`<div class="card"><span class="tag">${t('tag_emo')}</span><div class="t">${e.emo}</div><div class="s"><b>${t('in_balance')}</b> ${e.bal}</div><div class="s">${e.dis}</div></div>`);
  if (L.gyogynovenyek) cards.push(`<div class="card"><span class="tag">${t('tag_tea')}</span><div class="t">${e.tea}</div><div class="s">${t('tea_note')}</div></div>`);
  return `${top(orgN(o.c), `${o.py} · ${o.yy} · ${e.n}`, 'ma')}
  <section class="pad stack">
    <div class="hero"><div class="han bgglyph" aria-hidden="true">${o.han}</div><div class="chips">${['hours', active ? 'active_now' : 'in_hm'].map((k) => `<span>${k === 'hours' ? t('hours', { w: win(o) }) : k === 'active_now' ? t('active_now') : (startIn >= 60 ? t('in_hm', { h: Math.floor(startIn / 60), m: startIn % 60 }) : t('in_m', { m: startIn }))}</span>`).join('')}<span>${t('pair', { o: orgN(pair.c) })}</span></div><p style="margin-top:12px">${C('org', o.c)[2]}</p></div>
    <div class="sec"><h2>${t('relations')}</h2><span>${t('element_x', { e: e.n })}</span></div><div class="grid3">${relTiles(e)}</div>
    ${cards.join('')}
    ${row('clock', t('pair', { o: orgN(pair.c) }), `${t('hours', { w: win(pair) })} · ${pair.yy}`, `#szerv-${slug(pair.c)}`)}
    ${disclaimer()}
  </section>`;
};

/* ================= TEST ================= */
const TS = { v: 'f', sel: 'Sz-7', ch: 'all', q: '', skin: true, chOn: true, pts: true, bones: false, mode: store.get('tmode', '3d') };
const hay = (p) => [C('area', p.id), ptT(p.id)[0], p.py, p.id, p.who, chT(p.ch)[0], ...p.goals.map((g) => C('goals', g)[0])].join(' ').toLowerCase();
const tMatch = (p) => (TS.ch === 'all' || p.ch === TS.ch) && (!TS.q || hay(p).includes(TS.q));
V.test = (arg) => {
  if (arg.startsWith('ch-')) { const c = CHORDER.find((x) => slug(x) === arg.slice(3)); if (c) { TS.ch = c; TS.q = ''; const f = PTS.find((p) => p.ch === c); if (f) { TS.sel = f.id; TS.v = CHP[c] ? CHP[c][0] : f.v[0]; } } }
  if (arg.startsWith('p-') && PBS[arg.slice(2)]) { const p = PBS[arg.slice(2)]; TS.sel = p.id; TS.v = p.v.includes(TS.v) ? TS.v : p.v[0]; }
  const layers = [['skin', 'body', 'layer_skin'], ['chOn', 'wave', 'layer_ch'], ['pts', 'hand', 'layer_pts'], ['bones', 'bone', 'layer_bones']];
  return `${top(t('tab_test'), `${orgN(orgAt(now()).c)} · ${clockStr(now())}`, '', settingsBtn())}
  <div class="pad"><label for="tq" class="sr">${t('search_body')}</label><div class="search">${ic('search', 20)}<input id="tq" type="search" placeholder="${esc(t('search_body'))}" value="${esc(TS.q)}" autocomplete="off"><span id="tcount" class="sub" style="white-space:nowrap"></span></div></div>
  <div class="pills" role="group" aria-label="${t('channel')}">${[['all', t('all_ch')], ...CHORDER.map((c) => [c, chA(c)])].map(([k, n]) => `<button type="button" class="pill" data-act="tch" data-k="${k}" aria-pressed="${k === TS.ch}" ${k !== 'all' ? `aria-label="${esc(chT(k)[0])}" style="--dotc:var(--${CHEL[k]})"` : ''}>${k !== 'all' ? '<span class="dot" style="background:var(--dotc)"></span>' : ''}${n}</button>`).join('')}</div>
  <div class="pad" style="margin-top:8px"><div class="seg" role="group" aria-label="${t('view')}">${[['2d', 'mode_2d'], ['3d', 'mode_3d']].map(([k, n]) => `<button type="button" data-act="tmode" data-k="${k}" aria-pressed="${TS.mode === k}">${t(n)}</button>`).join('')}<a href="#foto">${t('mode_foto')}</a></div></div>
  ${TS.mode === '3d' ? `<div class="map map3" id="tmap" tabindex="0" aria-label="${t('map3_label')}"><canvas></canvas>
    <div class="layerbox" role="group" aria-label="${t('layers_l')}">${[['chOn', 'wave', 'layer_ch'], ['pts', 'hand', 'layer_pts']].map(([k, i, l]) => `<button type="button" data-act="tlayer" data-k="${k}" aria-pressed="${TS[k]}">${ic(i, 20)}<span>${t(l)}</span></button>`).join('')}<button type="button" data-m3="auto" aria-pressed="false">${ic('reset', 20)}<span>${t('auto_rot')}</span></button></div>
    <div class="mapview" role="group" aria-label="${t('view')}">${[['front', 'front'], ['side', 'side_v'], ['back', 'back']].map(([k, n], i) => `<button type="button" class="pill" data-m3="${k}" aria-pressed="${i === 0}">${t(n)}</button>`).join('')}</div>
    <div class="mapctl"><button type="button" data-m3="zin" aria-label="${t('zoom_in')}">+</button><span data-zl>1×</span><button type="button" data-m3="zout" aria-label="${t('zoom_out')}">−</button><button type="button" data-m3="zreset" aria-label="${t('zoom_reset')}">${ic('reset', 18)}</button></div>
    <div class="hint3">${t('drag_rotate')}</div></div>` : `<div class="map" id="tmap" tabindex="0" aria-label="${t('map_label')}">
    <div class="layerbox" role="group" aria-label="${t('layers_l')}">${layers.map(([k, i, l]) => `<button type="button" data-act="tlayer" data-k="${k}" aria-pressed="${TS[k]}">${ic(i, 20)}<span>${t(l)}</span></button>`).join('')}</div>
    <div class="mapview" role="group" aria-label="${t('view')}">${['f', 'b'].map((k) => `<button type="button" class="pill" data-mz="view-${k}" aria-pressed="${k === TS.v}">${t(k === 'f' ? 'front' : 'back')}</button>`).join('')}</div>
    <div class="mapctl"><button type="button" data-mz="zin" aria-label="${t('zoom_in')}">+</button><span data-zl>1×</span><button type="button" data-mz="zout" aria-label="${t('zoom_out')}">−</button><button type="button" data-mz="zreset" aria-label="${t('zoom_reset')}">${ic('reset', 18)}</button></div>
  </div>`}
  <section class="pad stack" style="margin-top:12px"><div class="card" id="tcard" aria-live="polite"></div>${row('screen', t('foto_t'), t('foto_row_s'), '#foto')}${disclaimer()}</section>`;
};
function tCard(p) {
  const tx = ptT(p.id), m = measureText(p), c = ec(p.el);
  return `<div style="display:flex;align-items:center;gap:8px"><span class="dot" style="background:${c.c}"></span><span class="sub grow">${chName(p.ch)} · ${pc(p)} · ${p.py}</span></div>
  <h2 class="display" style="font-size:24px;margin-top:4px">${C('area', p.id)}</h2>
  <div class="s" style="margin-top:4px">${tx[3]}</div>
  ${L.csontok ? `<div class="kv" style="margin-top:8px"><div class="k">${t('k_from')}</div><div class="v">${m.from} · ${m.meas}</div></div>` : ''}
  ${tx[5] ? `<div class="warnbox" style="margin-top:8px">${ic('warn', 18)}<span>${tx[5]}</span></div>` : ''}
  <div class="btnrow"><a class="btn" href="#pont-${p.s}">${t('guide_there')}</a>${p.goals.slice(0, 2).map((g) => `<span class="echip" style="background:var(--surf2)">${C('goals', g)[0]}</span>`).join('')}</div>`;
}
function initTest3D(signal) {
  let m3 = null;
  const card = () => { $('#tcard').innerHTML = tCard(PBY[TS.sel]); $('#tcount').textContent = TS.q || TS.ch !== 'all' ? t('n_pts', { n: PTS.filter(tMatch).length }) : ''; };
  const ensure = () => { const p = PBY[TS.sel]; if (!tMatch(p)) { const f = PTS.find(tMatch); if (f) TS.sel = f.id; } };
  ensure();
  m3 = SK3D($('#tmap'), { sel: TS.sel, signal, channelOfSel: TS.ch === 'all', dim: (p) => !tMatch(p), onPick: (id) => { TS.sel = id; m3.select(id); card(); } });
  const flags = () => { m3.pts = TS.pts; m3.chOn = TS.chOn; if (TS.ch !== 'all') m3.ch = TS.ch; };
  flags(); m3.select(TS.sel); card();
  $('#view').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
    if (a === 'tlayer') { const k = b.dataset.k; TS[k] = !TS[k]; b.setAttribute('aria-pressed', TS[k]); flags(); m3.redraw(); }
    if (a === 'tch') { TS.ch = b.dataset.k; $$('[data-act=tch]').forEach((x) => x.setAttribute('aria-pressed', x === b)); ensure(); flags(); m3.select(TS.sel); if (TS.ch === 'all') m3.ch = PBY[TS.sel].ch; card(); }
  }, { signal });
  $('#view').addEventListener('input', (e) => { if (e.target.id !== 'tq') return; TS.q = e.target.value.trim().toLowerCase(); ensure(); m3.select(TS.sel); card(); }, { signal });
}
function initTest(signal) {
  if (TS.mode === '3d') return initTest3D(signal);
  const opts = { v: TS.v, signal, channelOfSel: TS.ch === 'all', dim: (p) => !tMatch(p), onPick: (id) => { TS.sel = id; map.select(id); card(); }, onView: (v) => { TS.v = v; } };
  let map = null;
  const card = () => { $('#tcard').innerHTML = tCard(PBY[TS.sel]); $('#tcount').textContent = TS.q || TS.ch !== 'all' ? t('n_pts', { n: PTS.filter(tMatch).length }) : ''; };
  map = BodyMap($('#tmap'), opts);
  const flags = () => { map.skin = TS.skin; map.pts = TS.pts; map.chOn = TS.chOn; map.bones = TS.bones; if (TS.ch !== 'all') map.ch = TS.ch; };
  const ensure = () => { let p = PBY[TS.sel]; if (!tMatch(p)) { const f = PTS.find((q) => q.v.includes(TS.v) && tMatch(q)) || PTS.find(tMatch); if (f) TS.sel = f.id; } };
  flags(); ensure(); map.select(TS.sel, TS.ch !== 'all' ? false : false); flags(); map.drawSk(); map.drawCh(); map.renderPts(); card();
  $('#view').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
    if (a === 'tlayer') { const k = b.dataset.k; TS[k] = !TS[k]; b.setAttribute('aria-pressed', TS[k]); flags(); if (k === 'bones' && TS.bones && map.z < 2.2) { map.z = 2.6; map.centerOn(PBY[TS.sel], true); } map.drawSk(); map.drawCh(); map.renderPts(); }
    if (a === 'tch') { TS.ch = b.dataset.k; $$('[data-act=tch]').forEach((x) => x.setAttribute('aria-pressed', x === b)); opts.channelOfSel = TS.ch === 'all'; ensure(); if (TS.ch !== 'all') { map.ch = TS.ch; const pv = CHP[TS.ch] ? CHP[TS.ch][0] : PBY[TS.sel].v[0]; if (pv !== map.v) map.setView(pv); } map.select(TS.sel); flags(); map.drawCh(); map.renderPts(); card(); }
  }, { signal });
  $('#view').addEventListener('input', (e) => { if (e.target.id !== 'tq') return; TS.q = e.target.value.trim().toLowerCase(); const before = TS.sel; ensure(); if (before !== TS.sel) map.select(TS.sel); else map.renderPts(); card(); }, { signal });
}

/* ================= PONT ================= */
V.pont = (s) => {
  const p = PBS[s] || PBY['Sz-7'], c = ec(p.el), tx = ptT(p.id), v = p.v.includes('f') ? 'f' : 'b';
  const crop = `<svg viewBox="${p.x - 46} ${p.y - 40} 92 80" role="img" aria-label="${esc(t('crop_label', { p: C('area', p.id) }))}" class="crop"><g opacity="${L.csontok ? .42 : 1}">${bodyInner(v)}</g>${L.csontok ? skelSvg(v, SK()) : ''}${CHP[p.ch] && CHP[p.ch][0] === v ? flowPath(p.ch, true) : ''}<circle cx="${p.x}" cy="${p.y}" r="6" style="fill:${c.c}" opacity=".25"/><circle cx="${p.x}" cy="${p.y}" r="2.6" style="fill:${c.c};stroke:#fff" stroke-width="1"/>${L.csontok ? measureSvg(p, SK(), 3.4) : ''}</svg>`;
  return `${top(C('area', p.id), `${chName(p.ch)} · ${pc(p)} · ${p.py}`, `test-p-${p.s}`)}
  <section class="pad stack">
    ${crop}
    <div class="card"><span class="tag">${t('what_do')}</span><div class="t" style="font-size:17px">${tx[4]}</div><div class="kv" style="margin-top:8px"><div class="k">${t('where_exact')}</div><div class="v">${tx[2]}</div></div><div class="kv"><div class="k">${t('k_use')}</div><div class="v">${tx[3]}</div></div>${boneRows(p)}</div>
    ${tx[5] ? `<div class="warnbox">${ic('warn', 18)}<span>${tx[5]}</span></div>` : ''}
    <div class="seg" role="group" aria-label="${t('technique')}">${['ton', 'sed'].map((k) => `<button type="button" data-act="tech" data-k="${k}" aria-pressed="${k === tech}">${t(k === 'ton' ? 'tonify' : 'sedate')}</button>`).join('')}</div>
    <div class="card" id="techcard">${techCard()}</div>
    <div class="card" style="text-align:center">
      <svg class="ring" viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" fill="none" style="stroke:var(--surf2)" stroke-width="10"/><circle id="ringp" cx="60" cy="60" r="52" fill="none" style="stroke:var(--acc)" stroke-width="10" stroke-linecap="round" stroke-dasharray="326.7" stroke-dashoffset="0" transform="rotate(-90 60 60)"/><text id="ringt" x="60" y="69" text-anchor="middle" font-size="26" font-weight="700" style="fill:var(--on);font-family:'Inter Tight',Inter,sans-serif">1:00</text></svg>
      <div class="seg" style="margin-top:8px" role="group" aria-label="${t('duration')}">${[30, 60, 120].map((x) => `<button type="button" data-act="tdur" data-k="${x}" aria-pressed="${x === 60}">${x < 60 ? t('sec_n', { n: x }) : t('min_n', { n: x / 60 })}</button>`).join('')}</div>
      <div class="btnrow" style="justify-content:center"><button type="button" class="btn" data-act="tgo" id="tgo">${ic('play', 16, 2)}${t('start')}</button><button type="button" class="btn tonal" data-act="treset">${t('again')}</button></div>
      <div id="tmsg" class="sub" style="margin-top:8px;min-height:18px" aria-live="polite"></div>
    </div>
    ${row('hand', t('grips_contra'), t('tech_title'), '#technikak')}
    ${disclaimer()}
  </section>`;
};

/* ================= GYAKORLAT ================= */
V.gyakorlat = (arg) => {
  const d = now(), o = orgAt(d), snd = C('snd', SOUND_OF[o.c]), rec = recommend(d, lastCheckin());
  const rcard = (r, hl) => { const rt = C('routines', r.id); return `<a class="rcard${hl ? ' hl' : ''}" href="#rutin-${r.id}"><span class="ic">${ic(r.icon)}</span><span class="grow"><span class="t">${rt[0]}</span><span class="s">${rt[1]}</span><span class="meta">${t('routine_meta', { m: Math.max(1, Math.round(r.sec / 60)), n: r.steps.length })}</span></span><span class="playdot">${ic('play', 18, 2.2)}</span></a>`; };
  return `${top(t('tab_prac'), t('prac_sub'), '', settingsBtn())}
  <section class="pad stack">
    <div class="sec"><h2>${t('recommended')}</h2></div>
    ${rcard(rec.r, true)}
    <div class="sec"><h2>${t('routines_h')}</h2><span>${ROUT.length}</span></div>
    ${ROUT.filter((r) => r.id !== rec.id).map((r) => rcard(r)).join('')}
    ${L.legzes ? `<div class="card" id="legzes" style="--bc:var(--acc);--bl:var(--cont)">
      <div class="sec" style="padding:0"><h2>${t('breath_h')}</h2><span id="brcount">${t('cycles_n', { n: brCycles })}</span></div>
      <div class="seg" style="margin-top:10px" role="group" aria-label="${t('rhythm')}">${Object.keys(PATS).map((k) => `<button type="button" data-act="pat" data-k="${k}" aria-pressed="${k === brPat}">${t('pat_' + k)}</button>`).join('')}</div>
      <div class="breath"><div class="r1"></div><div class="r2"></div><div class="core" id="core"><div id="phase" style="font-size:16px;font-weight:600">${t('ready')}</div><div class="n" id="num">${PATS[brPat][0][1]}</div></div></div>
      <p id="brhint" class="s" style="text-align:center;margin:12px 0 0">${t('exhale_hint', { s: snd[1] })}</p>
      <div style="margin-top:12px"><div style="display:flex;justify-content:space-between" class="sub"><span id="brcyc">${t('cyc_of', { a: 0, b: brCycles })}</span><span id="brleft"></span></div><div class="prog"><i id="brprog"></i></div></div>
      <div class="btnrow" style="justify-content:center"><button type="button" class="btn" data-act="brgo" id="brgo">${ic('play', 16, 2)}${t('start')}</button><button type="button" class="btn tonal" data-act="brstop">${t('finish')}</button><button type="button" class="btn tonal" data-act="brcyc" aria-label="${t('cycle_toggle')}"><span id="brcycl">${brCycles}×</span></button></div>
    </div>` : ''}
    ${L.mozgas ? `<div class="card"><span class="tag">${t('qigong_tag')}</span><div class="t" style="font-size:18px">${snd[0]}: ${qt(snd[1])}</div><p class="s" style="font-size:15px;line-height:22px;color:var(--on)">${snd[2]}</p><p class="s">${t('qigong_rep')}</p></div>` : ''}
    ${row('hand', t('tech_title'), t('tech_sub'), '#technikak')}
    ${disclaimer()}
  </section>`;
};

/* ================= LEJÁTSZÓ (csukott szemmel is) ================= */
const speak = (txt) => { if (!store.get('voice', false)) return; try { const u = new SpeechSynthesisUtterance(txt); u.lang = loc(); u.rate = 0.95; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {} };
function pCrop(pid) {
  const p = PBY[pid], v = p.v.includes('f') ? 'f' : 'b';
  return `<svg viewBox="${p.x - 44} ${p.y - 38} 88 76" role="img" aria-label="${esc(C('area', pid))}" class="pcrop">${bodyInner(v)}${CHP[p.ch] && CHP[p.ch][0] === v ? flowPath(p.ch, true) : ''}${PSPEC[pid].k === 'seg' ? measureSvg(p, SK(), 4) : ''}<circle cx="${p.x}" cy="${p.y}" r="7" style="fill:var(--${p.el})" opacity=".3"/><circle cx="${p.x}" cy="${p.y}" r="3.2" style="fill:var(--${p.el});stroke:#fff" stroke-width="1.2"/></svg>`;
}
V.rutin = (id) => {
  const r = RBY[id] || ROUT[0], rt = C('routines', r.id), warns = [...new Set(r.steps.map(([pid]) => ptT(pid)[5]).filter(Boolean))];
  const sw = (k, n, def) => `<label class="swl"><input class="switch" type="checkbox" data-pref="${k}"${store.get(k, def) ? ' checked' : ''}>${t(n)}</label>`;
  const pv = styleVars(themeVars(CUREL, 'd'));
  return `<div class="player" id="player" style="${pv}">
    <header class="phead"><a class="iconbtn tonal" href="#gyakorlat" aria-label="${t('exit')}">${ic('close')}</a><div class="grow" style="text-align:center"><div class="sub">${rt[0]}</div><div class="t" id="pstep"></div></div><button type="button" class="iconbtn tonal" data-act="eyes" aria-pressed="false" aria-label="${t('eyes_mode')}">${ic('eyeoff')}</button></header>
    <section class="pring"><svg viewBox="0 0 270 270" aria-hidden="true"><circle cx="135" cy="135" r="118" fill="none" style="stroke:var(--surf2)" stroke-width="18"/><circle id="pringc" cx="135" cy="135" r="118" fill="none" style="stroke:var(--acc)" stroke-width="18" stroke-linecap="round" stroke-dasharray="741.4" stroke-dashoffset="741.4" transform="rotate(-90 135 135)"/></svg><div class="pmid"><div id="ptime" class="ptime">0:00</div><div id="pside" class="pside"></div></div></section>
    <section class="pbody">
      <div class="pinfo"><div id="pcrop" class="pcropbox ph"></div><div class="grow"><div id="parea" class="parea"></div><div id="ptech" class="ptech"></div></div></div>
      <div class="row flat ph" style="background:var(--surf)"><span style="color:var(--acc)">${ic('wave', 22)}</span><span class="s" style="color:var(--on)">${t('eyes_hint')}</span></div>
      <div class="pctl"><button type="button" class="round" data-act="pprev" aria-label="${t('prev')}">${ic('prev', 24, 2.2)}</button><button type="button" class="bigplay" data-act="pgo" id="pgo" aria-label="${t('start')}">${ic('play', 34, 2.6)}</button><button type="button" class="round" data-act="pnext" aria-label="${t('next')}">${ic('next', 24, 2.2)}</button></div>
      <div id="pdots" class="pdots" aria-hidden="true"></div>
      <div class="ptoggles ph">${sw('sound', 'sound_t', true)}${sw('vibrate', 'vibrate_t', true)}${sw('voice', 'voice', false)}</div>
      <div id="pdone" class="pdone" hidden><div class="ptime">✓</div><p>${t('routine_done')}</p><div class="btnrow" style="justify-content:center"><button type="button" class="btn" data-act="pagain">${t('again')}</button><a class="btn tonal" href="#naplo">${t('tab_log')}</a></div></div>
      <details class="pover ph"><summary>${t('how_h')} · ${t('routine_steps')}</summary><p class="s">${C('how', r.id)}</p>${warns.map((w) => `<div class="warnbox" style="margin-top:8px">${ic('warn', 18)}<span>${w}</span></div>`).join('')}<ol class="psteps">${r.steps.map(([pid, sec, bi]) => `<li><b>${C('area', pid)}</b><span class="sub"> · ${mmss(sec)}${bi ? ' · ' + t('side_left') + ' / ' + t('side_right') : ''}</span></li>`).join('')}</ol></details>
    </section>
  </div>`;
};
function initPlayer(signal, id) {
  const r = RBY[id] || ROUT[0]; let i = 0, left = r.steps[0][1], run = false, last = 0, iv = null, side = 0, finished = false, started = false;
  const C2 = 741.4;
  const sideTxt = () => { const [pid, , bi] = r.steps[i], p = PBY[pid]; return bi ? t(side ? 'side_right' : 'side_left') + (side ? '' : ' · ' + t('switch_at', { t: mmss(r.steps[i][1] / 2) })) : t(p.x === 150 ? 'side_mid' : 'side_both'); };
  const show = (full) => {
    const [pid, sec] = r.steps[i], tx = ptT(pid);
    $('#ptime').textContent = mmss(Math.ceil(left)); $('#pside').textContent = finished ? '' : sideTxt();
    $('#pringc').setAttribute('stroke-dashoffset', r1(C2 * (left / sec)));
    if (full) { $('#pstep').textContent = t('step_of', { a: i + 1, b: r.steps.length }); $('#parea').textContent = C('area', pid); $('#ptech').textContent = tx[4]; $('#pcrop').innerHTML = pCrop(pid); $('#pdots').innerHTML = r.steps.map((s, k) => `<span class="${k < i ? 'ok' : k === i ? 'on' : ''}"></span>`).join(''); }
    $('#pgo').innerHTML = ic(run ? 'pause' : 'play', 34, 2.6); $('#pgo').setAttribute('aria-label', t(run ? 'pause' : started ? 'resume' : 'start'));
    $('#pdone').hidden = !finished; $('.pring').style.opacity = finished ? .3 : 1;
  };
  const go = (k, cue) => { i = Math.max(0, Math.min(r.steps.length - 1, k)); left = r.steps[i][1]; side = 0; finished = false; show(true); if (cue) { beep(520, .14); beep(780, .18, .16); buzz([120, 80, 120]); speak(C('area', r.steps[i][0]) + '. ' + ptT(r.steps[i][0])[4]); } };
  const finish = () => { run = false; clearInterval(iv); finished = true; show(false); beep(523, .2); beep(659, .2, .22); beep(784, .35, .44); buzz([100, 80, 100, 80, 100]); speak(t('routine_done')); const l = getLog(); l.push({ type: 'done', t: Date.now(), r: r.id }); setLog(l); };
  const tick = () => {
    const n = performance.now(); left -= (n - last) / 1000; last = n; const [, sec, bi] = r.steps[i];
    if (bi && side === 0 && left <= sec / 2) { side = 1; beep(600, .35); buzz(400); speak(t('switch_side')); }
    if (left <= 0) { if (i >= r.steps.length - 1) { finish(); return; } go(i + 1, true); return; }
    show(false);
  };
  $('#view').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
    if (a === 'pgo') { if (finished) return; if (run) { run = false; clearInterval(iv); show(false); return; } audio(); run = true; last = performance.now(); if (!started) { started = true; speak(C('area', r.steps[i][0]) + '. ' + ptT(r.steps[i][0])[4]); } beep(520, .14); buzz(60); iv = setInterval(tick, 200); show(false); }
    if (a === 'pprev') go(i - 1, run); if (a === 'pnext') { if (i >= r.steps.length - 1) finish(); else go(i + 1, run); }
    if (a === 'pagain') { started = false; go(0); }
    if (a === 'eyes') { const on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); $('#player').classList.toggle('eyes', on); if (on && !store.get('voice', false)) { store.set('voice', true); const v = $('[data-pref=voice]'); if (v) v.checked = true; } }
  }, { signal });
  signal.addEventListener('abort', () => { clearInterval(iv); try { speechSynthesis.cancel(); } catch (e) {} });
  show(true);
}

/* ================= TUDÁS ================= */
let KPATH = [];
function graphSvg(el) {
  const e = elT(el), cx = 175, cy = 176, c = ec(el);
  const sats = [...ELORG[el].map((oc) => [orgN(oc), `#szerv-${slug(oc)}`]), [e.sense, ''], [e.tissue, ''], [e.emo, ''], [e.taste, ''], [e.season, ''], [e.climate, '']];
  const n = sats.length, mother = Object.keys(GEN).find((x) => GEN[x] === el), ctrlBy = Object.keys(CTRL).find((x) => CTRL[x] === el);
  const corners = [[mother, t('feeds'), 30, 28], [GEN[el], t('feeds_it'), 320, 28], [ctrlBy, t('ctrl_by'), 30, 334], [CTRL[el], t('ctrls'), 320, 334]];
  let s = '';
  for (const [k, , x, y] of corners) s += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" style="stroke:var(--${k})" stroke-width="2" stroke-dasharray="4 4" opacity=".7"/>`;
  const ws = sats.map(([label]) => Math.min(112, Math.min(label.length, 14) * 7.2 + 22));
  const pos = sats.map((_, i) => { const a = (-90 + i * 360 / n) * Math.PI / 180, d = i % 2 ? 118 : 92; return [cx + d * Math.cos(a) * 1.15, cy + d * Math.sin(a)]; });
  for (let it = 0; it < 120; it++) {
    for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) {
      const [ax, ay] = pos[a], [bx, by] = pos[b], ox = (ws[a] + ws[b]) / 2 + 6 - Math.abs(ax - bx), oy = 36 - Math.abs(ay - by);
      if (ox > 0 && oy > 0) { if (ox < oy * 1.4) { const sx = (ax < bx ? -1 : 1) * ox / 2; pos[a][0] += sx; pos[b][0] -= sx; } else { const sy = (ay < by ? -1 : 1) * oy / 2; pos[a][1] += sy; pos[b][1] -= sy; } }
    }
    pos.forEach((q, i) => { const dx = q[0] - cx, dy = q[1] - cy, dd = Math.hypot(dx, dy) || 1, need = 46 + ws[i] / 4; if (dd < need) { q[0] = cx + dx / dd * need; q[1] = cy + dy / dd * need; } q[0] = Math.max(ws[i] / 2 + 4, Math.min(350 - ws[i] / 2 - 4, q[0])); q[1] = Math.max(70, Math.min(292, q[1])); });
  }
  pos.forEach(([x, y]) => { s += `<line x1="${cx}" y1="${cy}" x2="${r1(x)}" y2="${r1(y)}" style="stroke:${c.c}" stroke-width="1.5" opacity=".45"/>`; });
  sats.forEach(([label, href], i) => {
    const [x, y] = pos[i], w = ws[i], org = !!href;
    const node = `<rect x="${r1(x - w / 2)}" y="${r1(y - 15)}" width="${r1(w)}" height="30" rx="15" style="fill:${org ? c.c : 'var(--surf)'};stroke:${c.c}" stroke-width="1.5"/><text x="${r1(x)}" y="${r1(y + 4.5)}" text-anchor="middle" font-size="12" font-weight="600" style="fill:${org ? 'var(--onel)' : 'var(--on)'}">${esc(label.length > 14 ? label.slice(0, 13) + '…' : label)}</text>`;
    s += org ? `<a href="${href}" aria-label="${esc(label)}">${node}</a>` : `<g><title>${esc(label)}</title>${node}</g>`;
  });
  for (const [k, rel, x, y] of corners) s += `<a href="#tudas-graf-${k}" aria-label="${esc(elT(k).n + ': ' + rel)}"><circle cx="${x}" cy="${y}" r="22" style="fill:var(--${k})"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--onel)">${elT(k).n}</text></a><text x="${x}" y="${y + (y < 100 ? 37 : -29)}" text-anchor="middle" font-size="11" font-weight="600" style="fill:var(--mut)">${rel}</text>`;
  s += `<a href="#elem-${el}" aria-label="${esc(e.n)}"><circle cx="${cx}" cy="${cy}" r="36" style="fill:${c.c}"/><text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="22" style="fill:var(--onel);font-family:'Noto Serif SC',serif">${HAN[el]}</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" font-weight="700" style="fill:var(--onel)">${e.n}</text></a>`;
  return `<svg viewBox="0 0 350 362" role="img" aria-label="${esc(t('graph_label', { e: e.n }))}" style="width:100%;max-width:420px;display:block;margin:0 auto;font-family:Inter,sans-serif">${s}</svg>`;
}
V.tudas = (arg) => {
  let tab = 'graf', el = KPATH.length ? KPATH[KPATH.length - 1] : orgAt(now()).el;
  if (arg.startsWith('graf-') && ELK.includes(arg.slice(5))) el = arg.slice(5); else if (arg === 'lexikon' || arg === 'ciklusok' || arg === 'asztro') tab = arg;
  if (tab === 'graf' && KPATH[KPATH.length - 1] !== el) KPATH = [...KPATH, el].slice(-6);
  const e = elT(el), mother = Object.keys(GEN).find((x) => GEN[x] === el), ctrlBy = Object.keys(CTRL).find((x) => CTRL[x] === el);
  const tabs = `<div class="seg tabs" role="tablist" aria-label="${t('view')}">${[['graf', 'graph', `#tudas-graf-${el}`], ['lexikon', 'lexicon', '#tudas-lexikon'], ['ciklusok', 'cycles', '#tudas-ciklusok'], ...(L.asztro ? [['asztro', 'astro', '#tudas-asztro']] : [])].map(([k, n, h]) => `<a role="tab" aria-selected="${k === tab}" href="${h}">${t(n)}</a>`).join('')}</div>`;
  let body = '';
  if (tab === 'graf') body = `<div class="pad">${graphSvg(el)}</div><section class="pad stack">
    <div class="sub">${t('graph_hint')}</div>
    <div class="crumbs" aria-label="${t('path_h')}">${KPATH.map((k, i) => `<a href="#tudas-graf-${k}" class="${i === KPATH.length - 1 ? 'on' : ''}" style="--dotc:var(--${k})">${elT(k).n}</a>`).join('<span aria-hidden="true">→</span>')}</div>
    <div class="card"><span class="tag">${t('why_h')}</span><div class="t">${e.n} · ${e.fn}</div><div class="s">${t('k_sense')}: ${e.sense} · ${t('k_tissue')}: ${e.tissue} · ${t('k_emo')}: ${e.emo} · ${t('k_taste')}: ${e.taste}</div><div class="s">${t('feeds')}: <b>${elT(mother).n}</b> · ${t('ctrl_by')}: <b>${elT(ctrlBy).n}</b></div><div class="btnrow"><a class="btn tonal" href="#elem-${el}">${t('el_details')}</a></div></div>
  </section>`;
  if (tab === 'lexikon') body = `<div class="pad"><label for="lexq" class="sr">${t('search_rel_label')}</label><div class="search">${ic('search', 20)}<input id="lexq" type="search" placeholder="${esc(t('search_ph_rel'))}" value="${esc(lexQ)}" autocomplete="off"></div></div>
  <div class="pills" role="group" aria-label="${t('filter_el')}">${[['all', t('all')], ...ELK.map((k) => [k, elT(k).n])].map(([k, n]) => `<button type="button" class="pill" data-act="lexel" data-k="${k}" aria-pressed="${k === lexEl}">${n}</button>`).join('')}</div>
  <section class="pad" id="lexlist">${lexList()}</section>`;
  if (tab === 'ciklusok') body = `<div class="pills" role="group" aria-label="${t('cycle')}">${Object.keys(CYCST).map((k) => `<button type="button" class="pill" data-act="cyc" data-k="${k}" aria-pressed="${k === elemCyc}">${C('cyc', k)[0]}</button>`).join('')}</div>
  <div class="pad" id="cycfig">${cycleSvg(elemCyc)}</div><section class="pad stack"><div class="card" id="cyctext">${cycText()}</div></section>`;
  if (tab === 'asztro') body = astroView();
  return `${top(t('tab_know'), t('know_sub'), '', settingsBtn())}<div class="pad">${tabs}</div>${body}<div class="pad">${disclaimer()}</div>`;
};
let elemCyc = 'tap';
const cycText = () => { const c = C('cyc', elemCyc); return `<div class="t">${c[1]} <span class="sub">· ${c[2]}</span></div><p class="s" style="color:var(--on)">${c[3]}</p><p class="s">${c[4]}</p>`; };

/* ================= NAPLÓ ================= */
function heatRing(wakes) {
  const cnt = ORG.map((o) => wakes.filter((w) => orgAt(new Date(w.t)) === o).length), max = Math.max(1, ...cnt), CX = 82, CY = 82, Ro = 74, Ri = 44;
  let s = '';
  ORG.forEach((o, i) => {
    const c = ((o.s + 1 - 12) * 15 + 360) % 360, a0 = (c - 14) * Math.PI / 180, a1 = (c + 14) * Math.PI / 180, P = (r, a) => [r1(CX + r * Math.sin(a)), r1(CY - r * Math.cos(a))];
    const [x0, y0] = P(Ro, a0), [x1, y1] = P(Ro, a1), [x2, y2] = P(Ri, a1), [x3, y3] = P(Ri, a0), v = cnt[i];
    s += `<path d="M${x0} ${y0} A${Ro} ${Ro} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${Ri} ${Ri} 0 0 0 ${x3} ${y3} Z" style="fill:${v ? `var(--${o.el})` : 'var(--on)'}" opacity="${v ? r1(0.3 + v / max * 0.7) : 0.08}"><title>${esc(orgN(o.c))}: ${v}</title></path>`;
  });
  return { svg: s, cnt };
}
V.naplo = () => {
  const log = getLog(), since = Date.now() - 30 * 864e5, wakes = log.filter((x) => x.type === 'wake' && x.t > since), cis = log.filter((x) => x.type === 'ci' && x.t > since), done = log.filter((x) => x.type === 'done' && x.t > since);
  const ring = heatRing(wakes), mx = Math.max(...ring.cnt), mi = ring.cnt.indexOf(mx), mo = ORG[mi];
  const pattern = wakes.length >= 3 && mx >= 3 && mx / wakes.length >= 0.4;
  const winTxt = `${String(mo.s).padStart(2, '0')}–${String((mo.s + 2) % 24).padStart(2, '0')}`;
  const ringSvg = `<svg width="164" height="164" viewBox="0 0 164 164" role="img" aria-label="${esc(t('ring_label'))}" style="flex:none">${ring.svg}<text x="82" y="82" text-anchor="middle" font-size="26" font-weight="700" style="fill:var(--on);font-family:'Inter Tight',Inter,sans-serif">${wakes.length ? mx + '×' : '–'}</text><text x="82" y="100" text-anchor="middle" font-size="11" style="fill:var(--mut)">${wakes.length ? winTxt : ''}</text></svg>`;
  const wins = ORG.slice(3).concat(ORG.slice(0, 1)), pts = wins.map((o, k) => { const v = cis.filter((c) => orgAt(new Date(c.t)) === o); return v.length ? [k, v.reduce((a, c) => a + c.e, 0) / v.length] : null; }).filter(Boolean);
  const lx = (k) => 14 + k * 32, ly = (v) => 92 - v * 38;
  const curve = pts.length >= 2 ? `<svg viewBox="0 0 330 118" role="img" aria-label="${esc(t('energy_curve'))}" style="width:100%;display:block">${wins.map((o, k) => `<rect x="${lx(k) - 16}" y="0" width="32" height="100" style="fill:var(--${o.el})" opacity=".1"/>`).join('')}<polyline points="${pts.map(([k, v]) => `${lx(k)},${r1(ly(v))}`).join(' ')}" fill="none" style="stroke:var(--acc)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${pts.map(([k, v]) => `<circle cx="${lx(k)}" cy="${r1(ly(v))}" r="3.6" style="fill:var(--surf);stroke:var(--acc)" stroke-width="2"/>`).join('')}${wins.map((o, k) => `<text x="${lx(k)}" y="114" text-anchor="middle" font-size="10.5" style="fill:var(--mut)">${o.s}</text>`).join('')}</svg>` : `<div class="s">${t('no_data')}</div>`;
  const recent = log.slice(-6).reverse().map((x) => { const d = new Date(x.t), when = new Intl.DateTimeFormat(loc(), { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d); const what = x.type === 'ci' ? `${t('ci_label')}: ${t('lvl_e' + x.e)} · ${t('mood_' + x.m)}` : x.type === 'wake' ? `${t('wake_label')} · ${orgN(orgAt(d).c)}` : `${C('routines', x.r)[0]} ✓`; return `<div class="li"><span class="dot" style="background:var(--${orgAt(d).el})"></span><span class="grow">${what}</span><span class="sub">${when}</span></div>`; }).join('');
  const lastNight = (() => { const d = new Date(); d.setHours(2, 0, 0, 0); if (d > new Date()) d.setDate(d.getDate() - 1); return d; })();
  return `${top(t('tab_log'), t('log_sub'), '', settingsBtn())}
  <section class="pad stack">
    <div class="btnrow" style="margin-top:0"><button type="button" class="btn tonal" data-act="checkin">${ic('emotion', 18)}${t('checkin_btn')}</button></div>
    <div class="card"><div class="t">${t('woke')}</div><div style="display:flex;gap:8px;align-items:center;margin-top:8px;flex-wrap:wrap"><label for="waket" class="sub">${t('woke_at')}</label><input id="waket" type="time" value="02:10" class="tinput"><button type="button" class="btn" data-act="wakeadd" data-base="${lastNight.getTime()}">${ic('plus', 18, 2.2)}${t('add')}</button></div><div id="wakemsg" class="sub" aria-live="polite" style="margin-top:6px"></div></div>
    <div class="card" style="display:flex;gap:14px;align-items:center">${ringSvg}<div class="grow">${pattern ? `<span class="tag">${t('pattern')}</span><div class="display" style="font-size:19px;line-height:24px;margin-top:2px">${t('pattern_t', { n: wakes.length, k: mx, w: winTxt })}</div><div class="s">${t('pattern_s', { o: orgN(mo.c) })}</div>` : `<div class="s">${t('no_data')}</div>`}</div></div>
    ${pattern ? `<div class="hero"><div class="t">${t('try_week')}</div><p>${t('try_txt')}</p><div class="btnrow"><a class="btn" href="#rutin-esti">${C('routines', 'esti')[0]}</a></div></div>` : ''}
    <div class="card"><div class="t">${t('energy_curve')}</div><div style="margin-top:8px">${curve}</div></div>
    <div class="chiprow"><span class="echip">${t('checkins_n', { n: cis.length })}</span><span class="echip">${t('wakes_n', { n: wakes.length })}</span><span class="echip">${t('done_n', { n: done.length })}</span><span class="echip">${t('not_diag')}</span></div>
    ${recent ? `<div class="sec"><h2>${t('recent')}</h2></div><div class="list">${recent}</div>` : ''}
    <div class="btnrow"><button type="button" class="btn tonal" data-act="sample">${t('sample')}</button><button type="button" class="btn tonal" data-act="clearlog">${t('clear_data')}</button></div>
    <p class="note">${ic('shield', 14)} ${t('local_only')} ${t('sample_note')}</p>
  </section>`;
};
function sampleData() {
  const out = [], day = 864e5, base = new Date(); base.setHours(0, 0, 0, 0);
  const wk = [[1, 1, 40], [2, 2, 15], [3, 1, 50], [5, 2, 30], [6, 3, 20], [8, 1, 10], [9, 2, 45], [11, 3, 40], [12, 23, 35], [13, 1, 25]];
  wk.forEach(([ago, h, m]) => out.push({ type: 'wake', t: base.getTime() - ago * day + h * 3600e3 + m * 60e3 + (h >= 23 ? -day : 0), demo: 1 }));
  const ci = [[1, 8, 1, 1], [1, 14, 0, 1], [2, 10, 2, 2], [2, 15, 0, 0], [3, 18, 2, 1], [3, 21, 1, 1], [4, 8, 1, 2], [4, 12, 2, 2], [5, 14, 0, 1], [5, 17, 2, 2], [6, 20, 1, 1], [7, 10, 2, 1], [7, 15, 1, 0], [8, 9, 1, 1], [8, 18, 2, 2]];
  ci.forEach(([ago, h, e, m]) => out.push({ type: 'ci', t: base.getTime() - ago * day + h * 3600e3, e, m, s: 1, demo: 1 }));
  [[1, 'esti'], [3, 'kepernyo'], [5, 'esti']].forEach(([ago, r]) => out.push({ type: 'done', t: base.getTime() - ago * day + 22 * 3600e3, r, demo: 1 }));
  return out.sort((a, b) => a.t - b.t);
}

/* ================= BEÁLLÍTÁSOK ================= */
V.beallitasok = () => {
  const seg = (act, items, cur) => `<div class="seg">${items.map(([k, n]) => `<button type="button" data-act="${act}" data-k="${k}" aria-pressed="${k === cur}">${n}</button>`).join('')}</div>`;
  const sw = (k, n, def) => `<div class="li"><label class="grow" for="pf-${k}">${t(n)}</label><input class="switch" type="checkbox" id="pf-${k}" data-pref="${k}"${store.get(k, def) ? ' checked' : ''}></div>`;
  const ly = (k) => `<div class="li"><label class="grow" for="ly-${k}"><span class="t">${t('ly_' + k)}</span><span class="s">${t('lyd_' + k)}</span></label><input class="switch" type="checkbox" role="switch" id="ly-${k}" data-layer="${k}"${L[k] ? ' checked' : ''}></div>`;
  return `${top(t('settings_t'), '', 'ma')}
  <section class="pad stack">
    <div class="card stack"><div><div class="flabel">${ic('globe', 16)} ${t('language')}</div>${seg('lang', LANGS.map((k) => [k, PACK[k].name]), lang)}</div>
      <div><div class="flabel">${ic('today', 16)} ${t('theme')}</div>${seg('theme', [['auto', t('th_auto')], ['light', t('th_light')], ['dark', t('th_dark')]], store.get('theme', 'auto'))}</div>
      <div><div class="flabel">${ic('body', 16)} ${t('model')}</div>${seg('model', [['f', t('female')], ['m', t('male')]], MODEL)}</div></div>
    ${schedCard()}
    <div class="sec"><h2>${t('guidance_h')}</h2></div><div class="list">${sw('sound', 'sound_t', true)}${sw('vibrate', 'vibrate_t', true)}${sw('voice', 'voice', false)}</div>
    <div class="sec"><h2>${t('content_h')}</h2></div><div class="list">${['mozgas', 'legzes', 'taplalkozas', 'csontok', 'erzelmek', 'gyogynovenyek', 'asztro'].map(ly).join('')}</div>
    ${row('screen', t('kij_open'), t('kij_sub'), '#kijelzo')}
    ${row('hand', t('tech_title'), t('tech_sub'), '#technikak')}
    <button type="button" class="btn tonal" data-act="lyreset">${t('reset_layers')}</button>
    ${disclaimer()}
  </section>`;
};

/* ---- napirend (az esti határok forrása, lásd core.js: sched) ---- */
function schedCard() {
  const u = getSched(), s = sched(), f = (x) => { const m = Math.round(mod24(x) * 60) % 1440; return `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`; };
  return `<div class="card stack" id="schedcard"><div class="t">${ic('sleep', 18)} ${t('sched_h')}</div><div class="s">${t('sched_s')}</div>
    <div class="grid2"><label class="flabel" style="flex-direction:column;align-items:stretch">${t('sched_bed')}<input id="sbed" class="tinput" type="time" value="${f(s.bed)}"></label><label class="flabel" style="flex-direction:column;align-items:stretch">${t('sched_wake')}<input id="swake" class="tinput" type="time" value="${f(s.wake)}"></label></div>
    <div class="kv"><div class="v" id="ssum">${t('sched_sum', { e: fmtH(s.eat0), w: fmtH(s.wake), c: fmtH(s.calm0) })}</div></div>
    <div class="sub">${u ? t('sched_own') : t('sched_def', { s: fmtH(sunsetH(now())), p: sunLoc().place || t('sched_tz'), b: fmtH(s.bed), w: fmtH(s.wake) })}</div>
    <div class="btnrow"><button type="button" class="btn" data-act="ssave">${t('sched_save')}</button>${u ? `<button type="button" class="btn tonal" data-act="sclear">${t('sched_clear')}</button>` : ''}</div>
    <div id="smsg" class="sub" aria-live="polite"></div><p class="note">${ic('shield', 14)} ${t('sched_local')}</p></div>`;
}

/* ================= KIJELZŐ MÓD (képernyőkímélő) ================= */
function kInner() {
  const d = now(), o = orgAt(d), i = ORG.indexOf(o), nx = ORG[(i + 1) % 12], e = elT(o.el), h = d.getHours();
  const frac = Math.min(100, Math.max(0, ((((h * 60 + d.getMinutes()) - o.s * 60) + 1440) % 1440) / 120 * 100));
  return `<div class="kclock">${clockStr(d)}</div><div class="kdate">${dateStr(d)}</div>
  <div class="kmain"><div class="kfig">${miniFigure(o.c)}</div>
    <div class="kinfo"><div class="eyebrow">${t('now_el', { e: e.n.toUpperCase() })}</div><div class="korg">${orgN(o.c)}</div>
      <div class="sub">${String(o.s).padStart(2, '0')}:00–${String((o.s + 2) % 24).padStart(2, '0')}:00 · ${fmtLeft(minsLeft(o, d))}</div>
      <div class="kbar" aria-hidden="true"><i style="width:${r1(frac)}%"></i></div>
      <div class="kline"><span class="dot" style="background:var(--${CHEL[o.c]})"></span>${chName(o.c)}</div><div class="sub">${t('live_flow', { f: chT(o.c)[2] })}</div>
      <div class="kline" style="margin-top:14px"><span class="dot" style="background:var(--${nx.el})"></span>${t('kij_next', { o: orgN(nx.c), h: String(nx.s).padStart(2, '0') })}</div>
      ${!EAT(d) ? `<div class="kline kmut">${ic('nofood', 18)}${t('eat_pause', { t: fmtH(sched(d).wake) })}</div>` : ''}
    </div></div>`;
}
V.kijelzo = () => `<div class="kij${(() => { const h = now().getHours(); return h >= 22 || h < 6 ? ' dim' : ''; })()}" id="kij" style="${styleVars(themeVars(CUREL, 'd'))}">
  <div class="kctl"><a class="iconbtn tonal" href="#ma" aria-label="${t('exit')}">${ic('close')}</a><span class="grow"></span><button type="button" class="iconbtn tonal" data-act="kfull" aria-label="${t('kij_full')}">${ic('expand')}</button></div>
  <div class="kbody" id="kbody">${kInner()}</div>
  <div class="kstatus" id="kstatus" aria-live="polite">${t('kij_tap')}</div></div>`;
function initKijelzo(signal) {
  const box = $('#kij'), st = $('#kstatus'); let wl = null, hideT = null;
  const show = () => { box.classList.add('show'); clearTimeout(hideT); hideT = setTimeout(() => box.classList.remove('show'), 4000); };
  const lock = async () => { try { if (!('wakeLock' in navigator)) throw 0; wl = await navigator.wakeLock.request('screen'); st.textContent = t('kij_wake_ok'); } catch (e) { st.textContent = t('kij_wake_no'); } };
  const drift = () => { const x = Math.round(Math.random() * 24 - 12), y = Math.round(Math.random() * 24 - 12); $('#kbody').style.transform = `translate(${x}px,${y}px)`; };
  const tick = () => { if (document.hidden) return; const h = now().getHours(); applyTheme(); Object.entries(themeVars(orgAt(now()).el, 'd')).forEach(([k, v]) => box.style.setProperty(k, v)); box.classList.toggle('dim', h >= 22 || h < 6); $('#kbody').innerHTML = kInner(); drift(); };
  lock(); show();
  box.addEventListener('pointerdown', show, { signal });
  box.addEventListener('click', (e) => { const b = e.target.closest('[data-act=kfull]'); if (!b) return; try { if (document.fullscreenElement) document.exitFullscreen(); else document.documentElement.requestFullscreen().catch(() => { st.textContent = t('kij_full_no'); show(); }); } catch (err) { st.textContent = t('kij_full_no'); } }, { signal });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && !wl) lock(); }, { signal });
  const iv = setInterval(tick, 20000);
  signal.addEventListener('abort', () => { clearInterval(iv); clearTimeout(hideT); try { wl && wl.release(); } catch (e) {} wl = null; try { if (document.fullscreenElement) document.exitFullscreen(); } catch (e) {} });
}

/* ================= KÍNAI ASZTROLÓGIA (réteg) ================= */
if (L.asztro === undefined) L.asztro = true;
const STEM = '甲乙丙丁戊己庚辛壬癸', BRANCH = '子丑寅卯辰巳午未申酉戌亥';
const BEL = ['viz', 'fold', 'fa', 'fa', 'fold', 'tuz', 'tuz', 'fold', 'fem', 'fem', 'fold', 'viz'];
const HIDS = [[9], [5, 9, 7], [0, 2, 4], [1], [4, 1, 9], [2, 4, 6], [3, 5], [5, 3, 1], [6, 8, 4], [7], [4, 7, 3], [8, 0]];
const sEl = (i) => ELK[Math.floor(i / 2)], sYY = (i) => i % 2 ? 'yin' : 'yang', md = (a, n) => ((a % n) + n) % n;
const jdnOf = (y, m, d) => { const a = Math.floor((14 - m) / 12), y2 = y + 4800 - a, m2 = m + 12 * a - 3; return d + Math.floor((153 * m2 + 2) / 5) + 365 * y2 + Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045; };
const dayIdx = (y, m, d) => md(jdnOf(y, m, d) + 49, 60);
function sunLon(ms) { const n = ms / 864e5 + 2440587.5 - 2451545, Lm = 280.46 + 0.9856474 * n, g = (357.528 + 0.9856003 * n) * Math.PI / 180; return md(Lm + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g), 360); }
function eotMin(ms) { const d = new Date(ms), n = Math.floor((ms - Date.UTC(d.getUTCFullYear(), 0, 0)) / 864e5), b = 2 * Math.PI / 365 * (n - 81); return 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b); }
const monthBranch = (ms) => md(Math.floor(md(sunLon(ms) - 315, 360) / 30) + 2, 12);
function yearIdx(y, m, ms) { const l = sunLon(ms); if (m <= 2 && l >= 270 && l < 315) y--; return y; }
function bazi(b) {
  const [y, m, d] = b.date.split('-').map(Number), [hh, mi] = b.time.split(':').map(Number);
  const utc = Date.UTC(y, m - 1, d, hh, mi) - b.tz * 3600e3, sol = new Date(utc + (b.lon * 4 + eotMin(utc)) * 60e3);
  let sd = [sol.getUTCFullYear(), sol.getUTCMonth() + 1, sol.getUTCDate()]; const sh = sol.getUTCHours();
  let di = dayIdx(...sd); if (sh >= 23) di = md(di + 1, 60);
  const yy = yearIdx(y, m, utc), ys = md(yy - 4, 10), yb = md(yy - 4, 12), mb = monthBranch(utc), ms = md((ys % 5) * 2 + 2 + md(mb - 2, 12), 10);
  const hb = Math.floor((sh + 1) / 2) % 12, hs = md((di % 10 % 5) * 2 + hb, 10);
  const P = [[ys, yb], [ms, mb], [di % 10, di % 12], [hs, hb]];
  const cnt = Object.fromEntries(ELK.map((k) => [k, [0, 0]]));
  P.forEach(([st, br]) => { cnt[sEl(st)][0]++; cnt[BEL[br]][0]++; HIDS[br].forEach((h) => cnt[sEl(h)][1]++); });
  return { P, dm: di % 10, cnt, solar: `${String(sh).padStart(2, '0')}:${String(sol.getUTCMinutes()).padStart(2, '0')}` };
}
const relOf = (x, d) => x === d ? 'self' : GEN[d] === x ? 'out' : CTRL[d] === x ? 'wealth' : CTRL[x] === d ? 'officer' : 'resource';
const getBirth = () => store.get('birth', null);
const astroOn = () => L.asztro && getBirth();
function todayPillar(d) { const di = dayIdx(d.getFullYear(), d.getMonth() + 1, d.getDate()), mb = monthBranch(d.getTime()), yy = yearIdx(d.getFullYear(), d.getMonth() + 1, d.getTime()); return { s: di % 10, b: di % 12, off: md(di % 12 - mb, 12), ys: md(yy - 4, 10), yb: md(yy - 4, 12) }; }
const pillarTxt = (s, b) => `${STEM[s]}${BRANCH[b]}`;
const animal = (b) => C('astro').animals[b];
function astroToday(d) {
  const B0 = getBirth(); if (!B0) return null; const z = bazi(B0), tp = todayPillar(d), dmEl = sEl(z.dm), rel = relOf(sEl(tp.s), dmEl), o = C('astro').officers[tp.off];
  return { z, tp, rel, o };
}
const astroTodayRow = (d) => { const a = astroToday(d); if (!a) return ''; return `<a class="row" href="#tudas-asztro"><span class="ic han" style="font-size:17px">${pillarTxt(a.tp.s, a.tp.b)}</span><span class="grow"><span class="tag">${t('astro_today_tag')}</span><span class="t">${t('astro_today_t', { r: t('rel_' + a.rel), o: a.o[0] })}</span><span class="s">${t('good_for')}: ${a.o[1]}</span></span>${ic('chev', 18)}</a>`; };
function astroForm(b) {
  b = b || { date: '', time: '', lon: 19.04, tz: 1 };
  return `<div class="card stack"><div class="t">${t('astro_form_h')}</div><div class="s">${t('astro_form_s')}</div>
    <div class="grid2"><label class="flabel" style="flex-direction:column;align-items:stretch">${t('birth_date')}<input id="bdate" class="tinput" type="date" value="${esc(b.date)}" required></label><label class="flabel" style="flex-direction:column;align-items:stretch">${t('birth_time')}<input id="btime" class="tinput" type="time" value="${esc(b.time)}" required></label></div>
    <label class="flabel" style="flex-direction:column;align-items:stretch">${t('birth_lon')}<input id="blon" class="tinput" type="number" step="0.01" min="-180" max="180" value="${esc(b.lon)}"><span class="sub" style="font-weight:400">${t('birth_lon_hint')}</span></label>
    <div><div class="flabel">${t('birth_tz')}</div><div class="seg">${[[1, 'tz_w'], [2, 'tz_s'], [0, 'tz_0']].map(([v, k]) => `<button type="button" data-act="btz" data-k="${v}" aria-pressed="${+b.tz === v}">${t(k)}</button>`).join('')}</div><div class="sub" style="margin-top:6px">${t('tz_hint')}</div></div>
    <div class="btnrow" style="margin-top:4px"><button type="button" class="btn" data-act="bsave">${t('astro_calc')}</button>${getBirth() ? `<button type="button" class="btn tonal" data-act="bcancel">${t('cancel')}</button>` : ''}</div>
    <div id="bmsg" class="sub" aria-live="polite"></div><p class="note">${ic('shield', 14)} ${t('birth_local')}</p></div>`;
}
let astroEdit = false;
function astroView() {
  const b = getBirth(); if (!b || astroEdit) return `<section class="pad stack"><div class="card quiet"><div class="t">${t('astro_intro_h')}</div><div class="s">${t('astro_intro')}</div></div>${astroForm(b)}<p class="note">${t('astro_note')}</p></section>`;
  const z = bazi(b), A = C('astro'), dmEl = sEl(z.dm), d = now(), a = astroToday(d);
  const score = (k) => z.cnt[k][0] + z.cnt[k][1] * 0.5, order = [...ELK].sort((x, y) => score(y) - score(x)), strong = order[0], weak = order[order.length - 1];
  const pill = (lbl, [st, br], i) => { const o = ORG[br]; return `<div class="pillar${i === 2 ? ' dm' : ''}"><div class="k">${t(lbl)}</div><div class="han pz">${STEM[st]}<br>${BRANCH[br]}</div><div class="pe"><span class="dot" style="background:var(--${sEl(st)})"></span>${sYY(st)} ${elT(sEl(st)).n}</div><div class="pe"><span class="dot" style="background:var(--${BEL[br]})"></span>${animal(br)}</div><a class="pw" href="#szerv-${slug(o.c)}">${win(o)} · ${orgN(o.c)}</a></div>`; };
  const maxc = Math.max(...ELK.map((k) => z.cnt[k][0] + z.cnt[k][1]));
  const bars = ELK.map((k) => `<div class="ebar"><a href="#elem-${k}" class="en">${elT(k).n}</a><div class="et"><i style="width:${z.cnt[k][0] / maxc * 100}%;background:var(--${k})"></i><i style="width:${z.cnt[k][1] / maxc * 100}%;background:var(--${k});opacity:.35"></i></div><span class="ev">${z.cnt[k][0]}${z.cnt[k][1] ? ` <span class="sub">+${z.cnt[k][1]}</span>` : ''}</span><span class="echip" style="min-width:74px;justify-content:center">${t('rel_' + relOf(k, dmEl))}</span></div>`).join('');
  const orgs = (k) => ELORG[k].map(orgN).join(', '), wins = (k) => ELORG[k].map((c) => win(OBY[c])).join(', ');
  const ctrlEl = Object.keys(CTRL).find((x) => CTRL[x] === dmEl), mother = Object.keys(GEN).find((x) => GEN[x] === weak), snd = C('snd', SOUND_OF[ELORG[dmEl][0]]);
  const lines = [t('hr_dm', { e: elT(dmEl).n, o: orgs(dmEl), w: wins(dmEl), s: elT(dmEl).sense.toLowerCase(), emo: elT(dmEl).emo.toLowerCase() }),
    t('hr_strong', { e: elT(strong).n, n: z.cnt[strong][0], c: elT(Object.keys(CTRL).find((x) => CTRL[x] === strong)).n, o: orgs(Object.keys(CTRL).find((x) => CTRL[x] === strong)) }),
    t('hr_weak', { e: elT(weak).n, n: z.cnt[weak][0], m: elT(mother).n, o: orgs(weak) })];
  if (z.cnt[ctrlEl][0] >= 3 || strong === ctrlEl) lines.push(t('hr_ctrl', { c: elT(ctrlEl).n, e: elT(dmEl).n, o: orgs(dmEl), cl: elT(dmEl).climate.toLowerCase() }));
  lines.push(t('hr_practice', { s: qt(snd[1]), e: elT(dmEl).n }));
  const myB = [...new Set(z.P.map((p) => p[1]))];
  return `<section class="pad stack">
    <div class="pillars">${pill('p_y', z.P[0], 0)}${pill('p_m', z.P[1], 1)}${pill('p_d', z.P[2], 2)}${pill('p_h', z.P[3], 3)}</div>
    <div class="sub">${t('solar_time', { t: z.solar })} · ${t('day_rule')}</div>
    <div class="hero"><div class="eyebrow acc">${t('daymaster')}</div><div class="display"><span class="han">${STEM[z.dm]}</span> ${sYY(z.dm)} ${elT(dmEl).n}</div><p>${A.stem_q[z.dm]}</p><p class="sub" style="margin-top:6px">${t('dm_animal', { a: animal(z.P[0][1]), q: A.animal_q[z.P[0][1]] })}</p></div>
    <div class="card"><div class="t">${t('el_balance')}</div><div class="s">${t('el_balance_s')}</div><div class="stack" style="gap:8px;margin-top:10px">${bars}</div>
      <details style="margin-top:10px"><summary class="sub" style="cursor:pointer;font-weight:600">${t('rel_explain_h')}</summary>${['self', 'resource', 'officer', 'out', 'wealth'].map((r) => `<div class="kv"><div class="k">${t('rel_' + r)}</div><div class="v">${t('reld_' + r)}</div></div>`).join('')}</details></div>
    <div class="card"><div class="t">${t('my_windows')}</div><div class="s">${t('my_windows_s')}</div><div class="chiprow" style="margin-top:8px">${myB.map((br) => `<a class="echip" href="#szerv-${slug(ORG[br].c)}" style="background:var(--surf2)"><span class="dot" style="background:var(--${ORG[br].el});margin-right:6px"></span>${win(ORG[br])} · ${orgN(ORG[br].c)} · ${animal(br)}</a>`).join('')}</div></div>
    <div class="card"><span class="tag">${t('health_h')}</span><ul class="hl">${lines.map((l) => `<li>${l}</li>`).join('')}</ul><div class="btnrow"><a class="btn tonal" href="#elem-${dmEl}">${elT(dmEl).n}</a><a class="btn tonal" href="#elem-${weak}">${elT(weak).n}</a><a class="btn tonal" href="#gyakorlat">${t('tab_prac')}</a></div></div>
    <div class="card"><span class="tag">${t('astro_today_tag')} · ${pillarTxt(a.tp.s, a.tp.b)} · ${sYY(a.tp.s)} ${elT(sEl(a.tp.s)).n} ${animal(a.tp.b)}</span><div class="t">${t('astro_today_t', { r: t('rel_' + a.rel), o: a.o[0] })}</div><div class="s">${t('reld_' + a.rel)}</div>
      <div class="kv" style="margin-top:8px"><div class="k">${t('good_for')}</div><div class="v">${a.o[1]}</div></div><div class="kv"><div class="k">${t('avoid')}</div><div class="v">${a.o[2]}</div></div>
      <div class="kv"><div class="k">${t('year_l')}</div><div class="v">${pillarTxt(a.tp.ys, a.tp.yb)} · ${sYY(a.tp.ys)} ${elT(sEl(a.tp.ys)).n} ${animal(a.tp.yb)} · ${t('rel_' + relOf(sEl(a.tp.ys), dmEl))}</div></div></div>
    <div class="card quiet"><div class="t">${t('animals_h')}</div><div class="s">${t('animals_s')}</div><div class="agrid">${ORG.map((o, i) => `<a href="#szerv-${slug(o.c)}" class="${myB.includes(i) ? 'my' : ''}"><span class="han">${BRANCH[i]}</span><b>${animal(i)}</b><span>${win(o)}</span><span>${orgN(o.c)}</span></a>`).join('')}</div></div>
    <div class="btnrow"><button type="button" class="btn tonal" data-act="bedit">${t('edit_birth')}</button><button type="button" class="btn tonal" data-act="bclear">${t('clear_birth')}</button></div>
    <p class="note">${t('astro_note')}</p>
  </section>`;
}

/* ================= útválasztó ================= */
const TABS = [['ma', 'tab_ma', 'today'], ['test', 'tab_test', 'body'], ['gyakorlat', 'tab_prac', 'practice'], ['tudas', 'tab_know', 'graph'], ['naplo', 'tab_log', 'journal']];
const GROUP = { ma: 'ma', kijelzo: 'ma', foto: 'test', szerv: 'ma', beallitasok: 'ma', test: 'test', pont: 'test', gyakorlat: 'gyakorlat', rutin: 'gyakorlat', technikak: 'gyakorlat', tudas: 'tudas', elem: 'tudas', naplo: 'naplo' };
let ac = null, tickIv = null, lastHash = '';
function route() {
  const h = (location.hash.slice(1) || 'ma').toLowerCase();
  const i = h.indexOf('-'); let name = i < 0 ? h : h.slice(0, i); let arg = i < 0 ? '' : h.slice(i + 1);
  if (!V[name]) { name = 'ma'; arg = ''; }
  if (ac) ac.abort(); ac = new AbortController(); clearInterval(tickIv); closeSheet();
  document.documentElement.lang = lang; applyTheme(); layout();
  $('#view').innerHTML = V[name](arg);
  const immersive = name === 'rutin' || name === 'kijelzo'; document.body.classList.toggle('immersive', immersive);
  const nav = $('#nav'); nav.setAttribute('aria-label', t('nav_l'));
  nav.innerHTML = TABS.map(([href, n, icn]) => { const on = GROUP[name] === href; return `<a href="#${href}"${on ? ' aria-current="page"' : ''}><span class="ind">${ic(icn, 22, on ? 2.1 : 1.8)}</span><span>${t(n)}</span></a>`; }).join('');
  if (h !== lastHash) window.scrollTo(0, 0); lastHash = h;
  const sig = ac.signal;
  if (name === 'test') initTest(sig);
  if (name === 'foto') initFoto(sig);
  if (name === 'pont') initTimer(sig);
  if (name === 'gyakorlat') { initBreath(sig); if (arg === 'legzes') { const el = $('#legzes'); if (el) setTimeout(() => el.scrollIntoView({ block: 'start' }), 0); } }
  if (name === 'rutin') initPlayer(sig, arg);
  if (name === 'kijelzo') initKijelzo(sig);
  if (name === 'ma') tickIv = setInterval(() => { if (!document.hidden && !$('#sheetbox .sheet')) { const y = window.scrollY; applyTheme(); $('#view').innerHTML = V.ma(); window.scrollTo(0, y); } }, 30000);
  document.title = `${t(name === 'ma' ? 'app' : ({ szerv: 'organ_details', test: 'tab_test', pont: 'tab_test', gyakorlat: 'tab_prac', rutin: 'routine_label', technikak: 'tech_title', tudas: 'tab_know', elem: 'el_details', naplo: 'tab_log', beallitasok: 'settings_t', kijelzo: 'kij_open', foto: 'foto_t' })[name])} – ${t('app')}`;
}
document.addEventListener('click', (e) => {
  const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
  if (a === 'checkin') openSheet();
  if (a === 'ciclose') closeSheet();
  if (a === 'ci') { CI[b.dataset.k] = +b.dataset.v; $$(`#sheetbox [data-act=ci][data-k="${b.dataset.k}"]`).forEach((x) => x.setAttribute('aria-checked', x === b)); const rec = recommend(now(), CI); $('#cirec').textContent = `${rec.ti} · ${t('min_n', { n: Math.max(1, Math.round(rec.r.sec / 60)) })}`; $('#cigo').dataset.r = rec.id; }
  if (a === 'cisave') { saveCheckin(); closeSheet(); route(); }
  if (a === 'cigo') { saveCheckin(); closeSheet(); location.hash = 'rutin-' + b.dataset.r; }
  if (a === 'cyc') { elemCyc = b.dataset.k; $$('[data-act=cyc]').forEach((x) => x.setAttribute('aria-pressed', x === b)); $('#cycfig').innerHTML = cycleSvg(elemCyc); $('#cyctext').innerHTML = cycText(); }
  if (a === 'lexel') { lexEl = b.dataset.k; $$('[data-act=lexel]').forEach((x) => x.setAttribute('aria-pressed', x === b)); $('#lexlist').innerHTML = lexList(); }
  if (a === 'lyreset') { L = Object.assign({}, DEFAULT_LAYERS); store.set('layers', L); route(); }
  if (a === 'lang') { lang = b.dataset.k; store.set('lang', lang); route(); }
  if (a === 'model') { MODEL = b.dataset.k; store.set('model', MODEL); route(); }
  if (a === 'theme') { store.set('theme', b.dataset.k); route(); }
  if (a === 'wakeadd') { const [hh, mm] = ($('#waket').value || '02:00').split(':').map(Number); const d = new Date(+b.dataset.base); d.setHours(hh, mm, 0, 0); if (hh >= 18) d.setDate(d.getDate() - 1); const l = getLog(); l.push({ type: 'wake', t: d.getTime() }); setLog(l); route(); }
  if (a === 'sample') { setLog(getLog().filter((x) => !x.demo).concat(sampleData()).sort((x, y) => x.t - y.t)); route(); }
  if (a === 'clearlog') { setLog([]); route(); }
  if (a === 'tmode') { TS.mode = b.dataset.k; store.set('tmode', TS.mode); route(); }
  if (a === 'freg') { FS.reg = b.dataset.k; FS.lm = {}; FS.sel = null; route(); }
  if (a === 'fundo') { const r = FREG.find((x) => x.k === FS.reg), done = fregLms(r).filter((l) => FS.lm[l]); if (done.length) delete FS.lm[done[done.length - 1]]; FS.sel = null; route(); }
  if (a === 'freset') { FS.lm = {}; FS.sel = null; route(); }
  if (a === 'fflip') { FS.flip = -FS.flip; route(); }
  if (a === 'fsel' && !e.target.closest('a')) { FS.sel = b.dataset.k; route(); }
  if (a === 'btz') { $$('[data-act=btz]').forEach((x) => x.setAttribute('aria-pressed', x === b)); }
  if (a === 'bsave') { const dt = $('#bdate').value, tm = $('#btime').value, lon = parseFloat($('#blon').value), tzb = $('[data-act=btz][aria-pressed=true]'); if (!dt || !tm || isNaN(lon) || lon < -180 || lon > 180) { $('#bmsg').textContent = t('birth_err'); return; } store.set('birth', { date: dt, time: tm, lon, tz: tzb ? +tzb.dataset.k : 1 }); astroEdit = false; L.asztro = true; store.set('layers', L); route(); }
  if (a === 'bedit') { astroEdit = true; route(); }
  if (a === 'bcancel') { astroEdit = false; route(); }
  if (a === 'ssave') { const bed = $('#sbed').value, wake = $('#swake').value, len = mod24(hm(wake) - hm(bed)); if (!bed || !wake || len < 4 || len > 14) { $('#smsg').textContent = t('sched_err'); return; } store.set('sched', { bed, wake }); route(); const m = $('#smsg'); if (m) m.textContent = t('sched_saved'); }
  if (a === 'sclear') { store.set('sched', null); route(); }
  if (a === 'bclear') { store.set('birth', null); astroEdit = false; route(); }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && $('#sheetbox .sheet')) closeSheet(); });
document.addEventListener('input', (e) => { if (e.target.id === 'lexq') { lexQ = e.target.value; $('#lexlist').innerHTML = lexList(); } });
document.addEventListener('change', (e) => {
  const ds = e.target.dataset || {};
  if (ds.layer) { L[ds.layer] = e.target.checked; store.set('layers', L); }
  if (ds.pref) store.set(ds.pref, e.target.checked);
});
window.addEventListener('hashchange', route);
route();
