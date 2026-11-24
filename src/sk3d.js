/* ================= 3D CSONTVÁZ (könyvtár nélküli megjelenítő) ================= */
const PZ = { 'Kor-20': 0, 'H-1': 16, 'Kor-26': 19, 'Vab-20': 17, 'T-1': 14, 'Bef-17': 17, 'Bef-12': 18, 'Bef-6': 19, 'Bef-4': 18, 'T-5': 6, 'Vab-11': 3, 'Sz-3': 3, 'T-7': 3, 'T-9': 5, 'Szb-6': 6, 'Hm-5': -6, 'Sz-7': 5, 'Szb-8': 5, 'Vab-4': -4, 'Véb-3': 0,
  'Lh-10': 4, 'Lh-9': 3, 'Lh-6': 2, 'V-3': -4, 'Gy-36': 8, 'Gy-40': 6, 'Eh-34': 0, 'H-60': -5, 'H-40': -10, 'M-3': 21, 'Eh-20': -16, 'Eh-21': -4, 'Kor-14': -15, 'Kor-4': -15, 'H-23': -15 };
const PY3 = { 'M-3': 455.5 }, PX3 = { 'M-3': 172.5 };
const pt3 = (p) => [(PX3[p.id] || p.x) - 150, -(PY3[p.id] || p.y), PZ[p.id] ?? 0];
const spineZ = (y) => { const T = [[50, -2], [86, -10], [137, -16], [188, -12], [213, -6], [234, -9], [256, -15]]; if (y <= T[0][0]) return T[0][1]; for (let i = 1; i < T.length; i++) if (y <= T[i][0]) { const [y0, z0] = T[i - 1], [y1, z1] = T[i]; return z0 + (z1 - z0) * (y - y0) / (y1 - y0); } return T[T.length - 1][1]; };
function skel3dModel(S) {
  const Pr = [], mx = ([x, y, z]) => [-x, y, z], q = (p, z) => [p[0] - 150, -p[1], z];
  const cap = (a, b, r, k) => { Pr.push({ t: 'c', a, b, r, k }); if (Math.abs(a[0]) > 0.6 || Math.abs(b[0]) > 0.6) Pr.push({ t: 'c', a: mx(a), b: mx(b), r, k }); };
  const sph = (p, r, k) => { Pr.push({ t: 's', p, r, k }); if (Math.abs(p[0]) > 0.6) Pr.push({ t: 's', p: mx(p), r, k }); };
  const poly = (pts, k) => { Pr.push({ t: 'p', pts, k }); Pr.push({ t: 'p', pts: pts.map(mx), k }); };
  const chain = (pts, r, k) => { for (let i = 1; i < pts.length; i++) cap(pts[i - 1], pts[i], r, k); };
  /* koponya */
  // agykoponya, homlok, arckoponya (felső állcsont, járomcsont, orrnyílás, szemüreg), fogsorok, állkapocs, csecsnyúlvány
  Pr.push({ t: 'k', p: [0, -34, -1], rx: 16.5, ry: 19.5, rz: 20 });
  poly([[0, -22, 16], [11, -25, 12], [14, -34, 9], [12, -38, 12], [0, -37, 17.5]]);
  poly([[0, -37, 17.5], [12, -38, 12.5], [14.5, -45, 9], [11, -51, 11], [6, -53.5, 14], [0, -54, 16]]);
  sph([6.5, -40, 15.5], 3.9, 'h'); Pr.push({ t: 'p', k: 'h', pts: [[0, -41.5, 18.6], [2.6, -46.5, 17.6], [1.4, -48.8, 17.4], [-1.4, -48.8, 17.4], [-2.6, -46.5, 17.6]] });
  cap([12.5, -44, 11], [16, -44.5, 1], 1.9); sph([13, -45, 10], 2.3);
  for (let i = 0; i < 7; i++) { const a = (i + 0.5) / 7 * 1.25, x = 6.6 * Math.sin(a), z = 15.6 - 6.2 * (1 - Math.cos(a)); sph([x, -54.5, z], i < 2 ? 1.05 : 1.2); sph([x * 0.96, -57, z - 0.4], i < 2 ? 0.95 : 1.15); }
  chain([[14.5, -45.5, -2.5], [13.8, -56, -3], [10.5, -61.5, 6], [5.5, -63.8, 12.5], [0, -64.5, 15]], 2.5);
  cap([14.5, -45.5, -2.5], [13.5, -47, 3], 1.6); sph([15, -48, -6], 2);
  /* gerinc */
  for (let i = -6; i <= 17; i++) {
    const y = i < 0 ? S.c7[1] + i * 4.6 : S.c7[1] + i * VERT, z = spineZ(y), r = i < 0 ? 3 : i <= 12 ? 3.6 : 4.6;
    Pr.push({ t: 's', p: [0, -y, z], r }); Pr.push({ t: 'c', a: [0, -y, z], b: [0, -(y + (i < 13 ? 3 : 1)), z - (i < 0 ? 5 : 7)], r: 1.4 });
    if (i > 12) cap([0, -y, z - 1], [9, -y, z - 3], 1.3);
  }
  Pr.push({ t: 'p', pts: [[-10, -236, -11], [10, -236, -11], [0, -258, -17]] });
  /* szegycsont, kulcscsont, lapocka */
  Pr.push({ t: 'c', a: [0, -S.jugulum[1] - 1, 11], b: [0, -S.xiphoid[1], 17], r: 3.3 }); Pr.push({ t: 'c', a: [0, -S.xiphoid[1], 17], b: [0, -S.xiphoid[1] - 6, 15], r: 1.4 });
  const ac = q(S.acromion, -1); chain([[4, -S.jugulum[1], 10], [22, -S.jugulum[1] - 1, 10], ac], 2);
  poly([[8, -102, -16], [34, -98, -12], [20, -150, -16]]); cap([11, -108, -18], [ac[0] - 2, ac[1] - 3, -6], 1.5);
  /* bordák */
  const W = [0, 15, 23, 28, 32, 35, 37, 38, 38, 37, 34, 29, 23], D = [0, 12, 15, 17, 18, 19, 19.5, 20, 20, 19, 18, 16, 14];
  const ends = [];
  for (let n = 1; n <= 12; n++) {
    const y0 = S.c7[1] + n * VERT - 2, zs = spineZ(y0) + 1, th = n <= 7 ? Math.PI * 0.9 : n <= 10 ? Math.PI * 0.84 : n === 11 ? Math.PI * 0.6 : Math.PI * 0.48, drop = 8 + n * 1.6, pts = [];
    for (let k = 0; k <= 9; k++) { const tt = th * k / 9; pts.push([4 + W[n] * Math.sin(tt), -(y0 + drop * Math.pow(k / 9, 1.4)), k === 0 ? zs : -2 - D[n] * Math.cos(tt) * (k < 2 ? 0.85 : 1)]); }
    chain(pts, 1.5); ends[n] = pts[pts.length - 1];
    if (n <= 7) { const ys = S.jugulum[1] + 4 + (n - 1) * ((S.xiphoid[1] - S.jugulum[1] - 6) / 6); cap(ends[n], [3, -ys, 15], 1.3, 'g'); }
    else if (n <= 10) cap(ends[n], [ends[n - 1][0] - 2, ends[n - 1][1] - 3, ends[n - 1][2] - 1], 1.3, 'g');
  }
  /* medence */
  const hipP = q(S.hip, 0);
  chain([[8, -232, -14], [22, -222, -10], [32, -218, -2], [30, -224, 8], [26, -228, 12]], 2.3);
  poly([[8, -234, -13], [22, -222, -10], [32, -218, -2], [30, -224, 8], [26, -230, 12], [hipP[0], hipP[1] + 2, 2], [10, -240, -8]]);
  chain([[hipP[0], hipP[1], 4], [3, -240, 10], [6, -252, 6], [12, -258, -4], [hipP[0], hipP[1] - 2, -2]], 2.1);
  /* comb, térd, lábszár, láb */
  const K = q(S.knee, 2), Kx = K[0];
  sph(hipP, 5); cap(hipP, [hipP[0] + 8, hipP[1] - 4, 0], 3.2); sph([hipP[0] + 11, hipP[1] - 3, -1], 3.5);
  cap([hipP[0] + 8, hipP[1] - 6, 0], [Kx, K[1] + 4, 1], 3.6); sph([Kx - 4, K[1] + 2, 1], 4); sph([Kx + 4, K[1] + 2, 1], 4);
  Pr.push({ t: 's', p: [Kx, K[1] + 8, 8], r: 3.2 }); Pr.push({ t: 's', p: [-Kx, K[1] + 8, 8], r: 3.2 });
  const TC = q(S.tibia_cond, 2), MM = q(S.mal_med, 1), ML = q(S.mal_lat, -2);
  cap([TC[0] - 1, TC[1] + 3, 2], [TC[0] + 13, TC[1] + 3, 2], 3); cap([TC[0] + 3, TC[1], 2], [MM[0] + 2, MM[1] + 4, 1], 3.1); sph(MM, 2.2);
  sph([TC[0] + 15, TC[1] - 1, -2], 2.3); cap([TC[0] + 15, TC[1] - 1, -2], ML, 1.6); sph(ML, 2.4);
  const ax = (MM[0] + ML[0]) / 2, ay = MM[1];
  // lábtő (ugrócsont, sarokcsont, sajkacsont, kockacsont, 3 ékcsont), 5 lábközépcsont, lábujjpercek; a lábboltozat felülről lejt
  sph([ax, ay - 3, 2], 3.4); cap([ax, ay - 3.5, 3], [ax - 1.8, ay - 6, 8.5], 2.5);
  cap([ax + 0.5, ay - 7, 1.5], [ax + 1, ay - 12, -8.5], 3.4); sph([ax + 1, ay - 12.2, -9], 3.7);
  sph([ax - 3.2, ay - 7.2, 11.2], 2.4); sph([ax + 3.6, ay - 10.8, 10.2], 2.5);
  for (const [x, y] of [[-5.7, -9.4], [-2.9, -8.6], [-0.2, -9.2]]) sph([ax + x, ay + y, 15.4], 1.9);
  const MT = [[-6, -9.8, 17.5, -7, -13, 33, 1.9], [-3, -9, 17.5, -3.4, -13, 34.5, 1.3], [-0.4, -9.4, 17.5, -0.4, -13.2, 33.5, 1.25], [2.2, -10.2, 16.5, 2.8, -13.4, 32, 1.2], [4.6, -11.6, 14.5, 5.6, -13.6, 30, 1.2]];
  sph([ax + 5.4, ay - 12, 14], 1.6);
  MT.forEach(([x0, y0, z0, x1, y1, z1, r], j) => {
    const B = [ax + x0, ay + y0, z0], E = [ax + x1, ay + y1, z1]; cap(B, E, r); sph(E, r * 1.25);
    const L = j ? [4.6 - j * 0.35, 2.2 - j * 0.15, 1.9 - j * 0.1] : [6, 4.6], rr = j ? [r * 0.78, r * 0.7, r * 0.66] : [1.75, 1.5];
    let P = E, z = z1;
    L.forEach((l, k) => { z += l; const N = [ax + x1 - (j ? 0.15 * k : 0.2 * k), ay + y1 + (k === 0 ? 0.6 : -0.4), z]; cap(P, N, rr[k]); if (k < L.length - 1) sph(N, rr[k] * 1.05); P = N; });
  });
  /* kar és kéz */
  const SH = q(S.shoulder, 0), EL = q(S.elbow, 0), WR = q(S.wrist, 1), FT = q(S.fingertip, 1);
  sph(SH, 5); cap(SH, EL, 3.2); sph([EL[0] + 3, EL[1], -1], 2.6); sph([EL[0] - 4, EL[1] - 1, -1], 2.6);
  let ux = WR[0] - EL[0], uy = WR[1] - EL[1], l = Math.hypot(ux, uy); ux /= l; uy /= l; let nx = -uy, ny = ux; if (nx < 0) { nx = -nx; ny = -ny; }
  cap([EL[0] + nx * 2.6, EL[1] + ny * 2.6, 1], [WR[0] + nx * 2.6, WR[1] + ny * 2.6, 1], 1.9); cap([EL[0] - nx * 2.3, EL[1] - ny * 2.3, -0.5], [WR[0] - nx * 2.3, WR[1] - ny * 2.3, -0.5], 1.8);
  let hx = FT[0] - WR[0], hy = FT[1] - WR[1], hl = Math.hypot(hx, hy); hx /= hl; hy /= hl; let kx = -hy, ky = hx; if (kx < 0) { kx = -kx; ky = -ky; }
  const H = (a, b, z) => [WR[0] + hx * a + kx * b, WR[1] + hy * a + ky * b, z];
  // kéztőcsontok két sorban, 5 kézközépcsont fejjel, ujjpercek ízületekkel (hüvelykujj: 2 perc); a tenyér +z felé néz
  for (const b of [-3.3, -1.1, 1.1, 3.3]) { sph(H(2.2, b, 1.2), 1.35); sph(H(4.6, b * 1.05, 1.4), 1.3); }
  const FL = [[3.4, 0.95, 1.12], [1.15, 1.0, 1.2], [-1.15, 0.96, 1.12], [-3.3, 0.8, 1.0]];
  for (const [b, f, r] of FL) {
    const mb = H(6.4, b * 0.95, 1.4), mh = H(hl * 0.52, b * 1.15, 1.8);
    cap(mb, mh, r); sph(mh, r * 1.32);
    const l1 = hl * 0.2 * f, l2 = hl * 0.12 * f, l3 = hl * 0.09 * f, a0 = hl * 0.52;
    const p1 = H(a0 + l1, b * 1.25, 2.6), p2 = H(a0 + l1 + l2, b * 1.3, 3.6), p3 = H(a0 + l1 + l2 + l3, b * 1.32, 4.4);
    cap(mh, p1, r * 0.86); sph(p1, r * 0.95); cap(p1, p2, r * 0.74); sph(p2, r * 0.8); cap(p2, p3, r * 0.64);
  }
  const t0 = H(5.2, 4.2, 2.2), t1 = H(13.5, 8.6, 5.2), t2 = H(19, 10.8, 7.2), t3 = H(23.5, 12, 8.6);
  sph(H(4.2, 3.9, 1.8), 1.4); cap(t0, t1, 1.25); sph(t1, 1.5); cap(t1, t2, 1.1); sph(t2, 1.15); cap(t2, t3, 0.95);
  return Pr;
}
const hexRgb = (h) => { h = (h || '#ccc').trim(); if (h.startsWith('rgb')) return h.match(/\d+/g).slice(0, 3).map(Number); if (h.length === 4) h = '#' + [...h.slice(1)].map((c) => c + c).join(''); return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)); };
const ZMAX = 8;
const mixc = (a, b, t) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;
function SK3D(root, o) {
  const cv = $('canvas', root), ctx = cv.getContext('2d'), M = { yaw: o.yaw || 0, pitch: 0.06, z: 1, sel: o.sel, ch: null, pts: true, chOn: true, auto: false, list: o.list || PTS };
  let model = skel3dModel(SK()), W = 1, Hh = 1, dpr = 1, scr = [], raf = 0, ty = 0;
  const css = () => { const s = getComputedStyle(root); return { bone: hexRgb(s.getPropertyValue('--bone')), line: s.getPropertyValue('--bone-line').trim() || '#998', map: hexRgb(s.getPropertyValue('--map')), acc: s.getPropertyValue('--acc').trim(), on: s.getPropertyValue('--on').trim(), surf: s.getPropertyValue('--surf').trim(), onel: s.getPropertyValue('--onel').trim() }; };
  let C = css();
  const fit = () => { const r = root.getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1); W = r.width || 300; Hh = r.height || 400; cv.width = W * dpr; cv.height = Hh * dpr; cv.style.width = W + 'px'; cv.style.height = Hh + 'px'; };
  const selPos = () => { const p = PBY[M.sel]; return p ? pt3(p) : [0, -240, 0]; };
  function draw() {
    raf = 0; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, Hh);
    const sc = Math.min(W / 240, (Hh - 40) / 480) * M.z, tz = Math.min(1, (M.z - 1) / 1.6), sp = selPos(), T = [sp[0] * tz, -240 + (sp[1] + 240) * tz, sp[2] * tz];
    const cy = Math.cos(M.yaw), sy = Math.sin(M.yaw), cp = Math.cos(M.pitch), spt = Math.sin(M.pitch), cx0 = W / 2, cy0 = Hh / 2 + 16;
    const pr = (v) => { const x = v[0] - T[0], y = v[1] - T[1], z = v[2] - T[2], x1 = x * cy + z * sy, z1 = -x * sy + z * cy, y2 = y * cp - z1 * spt, z2 = y * spt + z1 * cp, f = 900 / (900 - z2); return [cx0 + x1 * sc * f, cy0 - y2 * sc * f, z2, f]; };
    const items = [];
    for (const m of model) {
      if (m.t === 'c') { const a = pr(m.a), b = pr(m.b); items.push({ d: (a[2] + b[2]) / 2, m, a, b }); }
      else if (m.t === 's' || m.t === 'k') { const a = pr(m.p); items.push({ d: a[2], m, a }); }
      else if (m.t === 'p') { const P = m.pts.map(pr); items.push({ d: P.reduce((s, x) => s + x[2], 0) / P.length - 3, m, P }); }
    }
    /* csatorna és mérés */
    const sel = PBY[M.sel];
    if (M.ch && M.chOn) {
      const cp3 = M.list.filter((p) => p.ch === M.ch).sort((a, b) => parseInt(a.id.split('-')[1]) - parseInt(b.id.split('-')[1])).map(pt3);
      for (const side of [1, -1]) for (let i = 1; i < cp3.length; i++) { const A = cp3[i - 1], B = cp3[i]; if (side < 0 && Math.abs(A[0]) < 1 && Math.abs(B[0]) < 1) continue; const a = pr([A[0] * side, A[1], A[2] + 1]), b = pr([B[0] * side, B[1], B[2] + 1]); items.push({ d: (a[2] + b[2]) / 2 + 2, m: { t: 'ch', c: `var(--${CHEL[M.ch]})` }, a, b }); }
    }
    let meas = null;
    if (sel && PSPEC[sel.id].k === 'seg') { const sp0 = PSPEC[sel.id], [la, lb, len] = SEG[sp0.seg], S = SK(), z = PZ[sel.id] ?? 0, A = [S[la][0] - 150, -S[la][1], z], B = [S[lb][0] - 150, -S[lb][1], z]; meas = { A, B, len }; }
    if (meas) { const a = pr(meas.A), b = pr(meas.B); items.push({ d: Math.max(a[2], b[2]) + 4, m: { t: 'ms', len: meas.len }, a, b, A: meas.A, B: meas.B, pr }); }
    /* pontok */
    scr = [];
    for (const p of M.list) {
      if (!M.pts && p.id !== M.sel) continue; const P = pt3(p);
      for (const side of (Math.abs(P[0]) > 1 ? [1, -1] : [1])) { const a = pr([P[0] * side, P[1], P[2]]); items.push({ d: a[2] + 1.5, m: { t: 'pt', p }, a }); scr.push([a[0], a[1], p.id]); }
    }
    items.sort((u, v) => u.d - v.d);
    const dmin = -60, dmax = 60, shade = (d) => mixc(C.map, C.bone, 0.45 + 0.55 * Math.max(0, Math.min(1, (d - dmin) / (dmax - dmin))));
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const it of items) {
      const m = it.m;
      if (m.t === 'c') { const w = 2 * m.r * sc * it.a[3]; ctx.globalAlpha = m.k === 'g' ? 0.5 : 1; ctx.strokeStyle = C.line; ctx.lineWidth = w + 1.4; ctx.beginPath(); ctx.moveTo(it.a[0], it.a[1]); ctx.lineTo(it.b[0], it.b[1]); ctx.stroke(); ctx.strokeStyle = shade(it.d); ctx.lineWidth = w; ctx.stroke(); ctx.globalAlpha = 1; }
      else if (m.t === 's') { const r = m.r * sc * it.a[3]; ctx.beginPath(); ctx.arc(it.a[0], it.a[1], r, 0, 7); if (m.k === 'h') { ctx.fillStyle = C.line; ctx.globalAlpha = 0.75; ctx.fill(); ctx.globalAlpha = 1; } else { const g = ctx.createRadialGradient(it.a[0] - r * 0.35, it.a[1] - r * 0.35, r * 0.1, it.a[0], it.a[1], r); g.addColorStop(0, mixc(C.bone, [255, 255, 255], 0.35)); g.addColorStop(1, shade(it.d)); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1; ctx.stroke(); } }
      else if (m.t === 'k') { const f = it.a[3], rx = Math.hypot(m.rx * Math.cos(M.yaw), m.rz * Math.sin(M.yaw)) * sc * f, ry = m.ry * sc * f; ctx.beginPath(); ctx.ellipse(it.a[0], it.a[1], rx, ry, 0, 0, 7); const g = ctx.createRadialGradient(it.a[0] - rx * 0.3, it.a[1] - ry * 0.35, 2, it.a[0], it.a[1], Math.max(rx, ry)); g.addColorStop(0, mixc(C.bone, [255, 255, 255], 0.3)); g.addColorStop(1, shade(it.d - 10)); ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = C.line; ctx.lineWidth = 1.2; ctx.stroke(); }
      else if (m.t === 'p') { ctx.beginPath(); it.P.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.globalAlpha = m.k === 'h' ? 0.75 : 0.92; ctx.fillStyle = m.k === 'h' ? C.line : shade(it.d); ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = C.line; ctx.lineWidth = 1.2; ctx.stroke(); }
      else if (m.t === 'ch') { ctx.save(); ctx.setLineDash([5, 5]); ctx.strokeStyle = getComputedStyle(root).getPropertyValue(`--${CHEL[M.ch]}`) || C.acc; ctx.lineWidth = 3; ctx.globalAlpha = 0.85; ctx.beginPath(); ctx.moveTo(it.a[0], it.a[1]); ctx.lineTo(it.b[0], it.b[1]); ctx.stroke(); ctx.restore(); }
      else if (m.t === 'ms') { ctx.save(); ctx.strokeStyle = C.acc; ctx.fillStyle = C.acc; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(it.a[0], it.a[1]); ctx.lineTo(it.b[0], it.b[1]); ctx.stroke(); const dx = it.b[0] - it.a[0], dy = it.b[1] - it.a[1], L0 = Math.hypot(dx, dy) || 1, nx2 = -dy / L0 * 5, ny2 = dx / L0 * 5; for (let i = 0; i <= m.len; i++) { const x = it.a[0] + dx * i / m.len, y = it.a[1] + dy * i / m.len, big = i === 0 || i === m.len; ctx.beginPath(); ctx.moveTo(x - nx2 * (big ? 1.4 : 0.7), y - ny2 * (big ? 1.4 : 0.7)); ctx.lineTo(x + nx2 * (big ? 1.4 : 0.7), y + ny2 * (big ? 1.4 : 0.7)); ctx.stroke(); } ctx.font = '600 11px Inter,sans-serif'; ctx.fillText(`${m.len} cun`, (it.a[0] + it.b[0]) / 2 + nx2 * 2.4, (it.a[1] + it.b[1]) / 2 + ny2 * 2.4); ctx.restore(); }
      else if (m.t === 'pt') {
        const p = m.p, isSel = p.id === M.sel, dim = o.dim && o.dim(p), col = getComputedStyle(root).getPropertyValue(`--${p.el}`).trim() || C.acc;
        ctx.globalAlpha = dim && !isSel ? 0.22 : 1;
        if (isSel) { ctx.beginPath(); ctx.arc(it.a[0], it.a[1], 13, 0, 7); ctx.fillStyle = col; ctx.globalAlpha = 0.3; ctx.fill(); ctx.globalAlpha = 1; }
        ctx.beginPath(); ctx.arc(it.a[0], it.a[1], isSel ? 8 : 5.5, 0, 7); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke();
        if (isSel || M.z >= 2.2) { const lbl = pc(p); ctx.font = '600 11px Inter,sans-serif'; const tw = ctx.measureText(lbl).width; ctx.fillStyle = isSel ? col : C.surf; ctx.beginPath(); ctx.roundRect ? ctx.roundRect(it.a[0] + 11, it.a[1] - 9, tw + 12, 18, 8) : ctx.rect(it.a[0] + 11, it.a[1] - 9, tw + 12, 18); ctx.fill(); ctx.fillStyle = isSel ? C.onel : C.on; ctx.fillText(lbl, it.a[0] + 17, it.a[1] + 4); }
        ctx.globalAlpha = 1;
      }
    }
    const zl = $('[data-zl]', root); if (zl) zl.textContent = num(Math.round(M.z * 10) / 10) + '×';
  }
  M.redraw = () => { if (!raf) raf = requestAnimationFrame(draw); };
  M.select = (id) => { M.sel = id; if (o.channelOfSel && PBY[id]) M.ch = PBY[id].ch; M.redraw(); };
  M.setYaw = (y, anim) => { cancelAnimationFrame(ty); if (!anim || matchMedia('(prefers-reduced-motion: reduce)').matches) { M.yaw = y; M.redraw(); return; } let d = ((y - M.yaw) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI; const y0 = M.yaw, t0 = performance.now(); const step = (n) => { const k = Math.min(1, (n - t0) / 450), e = 1 - Math.pow(1 - k, 3); M.yaw = y0 + d * e; draw(); if (k < 1) ty = requestAnimationFrame(step); }; ty = requestAnimationFrame(step); };
  M.zoom = (f) => { M.z = Math.min(ZMAX, Math.max(1, M.z * f)); M.redraw(); };
  M.reset = () => { M.z = 1; M.pitch = 0.06; M.setYaw(0, true); };
  M.rebuild = () => { model = skel3dModel(SK()); C = css(); M.redraw(); };
  let autoT = 0; const spin = () => { if (!M.auto) return; M.yaw += 0.008; draw(); autoT = requestAnimationFrame(spin); };
  M.setAuto = (on) => { M.auto = on; cancelAnimationFrame(autoT); if (on) autoT = requestAnimationFrame(spin); const b = $('[data-m3=auto]', root); if (b) b.setAttribute('aria-pressed', on); };
  fit(); M.select(M.sel);
  const sig = o.signal, ro = new ResizeObserver(() => { fit(); draw(); }); ro.observe(root); sig.addEventListener('abort', () => { ro.disconnect(); cancelAnimationFrame(autoT); cancelAnimationFrame(raf); cancelAnimationFrame(ty); });
  const ptrs = new Map(); let st = null, pinch = null, moved = false, lastTap = 0;
  cv.addEventListener('pointerdown', (e) => { cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, [e.clientX, e.clientY]); if (ptrs.size === 1) { st = { x: e.clientX, y: e.clientY, yaw: M.yaw, pitch: M.pitch }; moved = false; } if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), z: M.z }; } }, { signal: sig });
  cv.addEventListener('pointermove', (e) => {
    if (!ptrs.has(e.pointerId)) return; ptrs.set(e.pointerId, [e.clientX, e.clientY]);
    if (ptrs.size >= 2 && pinch) { const [a, b] = [...ptrs.values()]; M.z = Math.min(ZMAX, Math.max(1, pinch.z * Math.hypot(a[0] - b[0], a[1] - b[1]) / pinch.d)); moved = true; M.redraw(); }
    else if (st) { const dx = e.clientX - st.x, dy = e.clientY - st.y; if (Math.hypot(dx, dy) > 6) { moved = true; if (M.auto) M.setAuto(false); } if (moved) { M.yaw = st.yaw + dx * 0.012; M.pitch = Math.max(-0.7, Math.min(0.7, st.pitch + dy * 0.006)); M.redraw(); } }
  }, { signal: sig });
  const up = (e) => {
    if (!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch = null;
    if (ptrs.size === 0) {
      if (!moved) { const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, now2 = performance.now(); let best = null, bd = 26; for (const [sx, sy, id] of scr) { const d = Math.hypot(sx - x, sy - y); if (d < bd) { bd = d; best = id; } } if (best && o.onPick) o.onPick(best); else if (now2 - lastTap < 320) M.reset(); lastTap = now2; }
      st = null;
    }
  };
  cv.addEventListener('pointerup', up, { signal: sig }); cv.addEventListener('pointercancel', up, { signal: sig });
  cv.addEventListener('wheel', (e) => { e.preventDefault(); M.zoom(Math.exp(-e.deltaY * 0.0018)); }, { passive: false, signal: sig });
  root.addEventListener('keydown', (e) => { if (e.target !== root) return; const k = e.key; if (k === 'ArrowLeft') M.yaw -= 0.2; else if (k === 'ArrowRight') M.yaw += 0.2; else if (k === 'ArrowUp') M.pitch = Math.max(-0.7, M.pitch - 0.1); else if (k === 'ArrowDown') M.pitch = Math.min(0.7, M.pitch + 0.1); else if (k === '+' || k === '=') M.z = Math.min(ZMAX, M.z * 1.3); else if (k === '-') M.z = Math.max(1, M.z / 1.3); else return; e.preventDefault(); M.redraw(); }, { signal: sig });
  root.addEventListener('click', (e) => { const b = e.target.closest('[data-m3]'); if (!b) return; const a = b.dataset.m3; if (a === 'front') M.setYaw(0, true); if (a === 'side') M.setYaw(Math.PI / 2, true); if (a === 'back') M.setYaw(Math.PI, true); if (a === 'zin') M.zoom(1.4); if (a === 'zout') M.zoom(1 / 1.4); if (a === 'zreset') M.reset(); if (a === 'auto') M.setAuto(!M.auto); if (['front', 'side', 'back'].includes(a)) $$('[data-m3=front],[data-m3=side],[data-m3=back]', root).forEach((x) => x.setAttribute('aria-pressed', x === b)); }, { signal: sig });
  return M;
}

/* ================= FOTÓS PONTKERESŐ ================= */
const FREG = [
  { k: 'kar', segs: ['farm', 'hand'], side: 'f' }, { k: 'karhat', segs: ['farm', 'hand'], side: 'b' }, { k: 'torzs', segs: ['sternum', 'abd_up', 'abd_lo'] },
  { k: 'labbel', segs: ['thigh_m', 'leg_m'] }, { k: 'labkul', segs: ['leg_l'] }
];
const fregLms = (r) => [...new Set(r.segs.flatMap((s) => [SEG[s][0], SEG[s][1]]))];
const fregPts = (r) => PTS.filter((p) => { const sp = PSPEC[p.id]; return sp.k === 'seg' && r.segs.includes(sp.seg) && (!r.side || p.v.includes(r.side)); });
const FS = { reg: 'kar', img: null, lm: {}, flip: 1, sel: null };
V.foto = () => {
  const r = FREG.find((x) => x.k === FS.reg), lms = fregLms(r), nextLm = lms.find((l) => !FS.lm[l]);
  return `${top(t('foto_t'), t('foto_sub'), 'test')}
  <div class="pills" role="group" aria-label="${t('foto_region')}">${FREG.map((x) => `<button type="button" class="pill" data-act="freg" data-k="${x.k}" aria-pressed="${x.k === FS.reg}">${t('freg_' + x.k)}</button>`).join('')}</div>
  <section class="pad stack">
    ${FS.img ? '' : `<div class="card quiet"><div class="t">${t('foto_how_h')}</div><ol class="psteps" style="margin-top:6px"><li>${t('foto_how1')}</li><li>${t('foto_how2', { n: lms.length })}</li><li>${t('foto_how3')}</li></ol></div>`}
    <label class="btn" style="cursor:pointer">${ic('screen', 18)}${t(FS.img ? 'foto_new' : 'foto_pick')}<input id="fimg" type="file" accept="image/*" capture="environment" class="sr"></label>
    ${FS.img ? `<div class="fstep" aria-live="polite">${nextLm ? `<span class="echip" style="background:var(--cont)">${lms.indexOf(nextLm) + 1}/${lms.length}</span> ${t('foto_tap', { l: C('lm', nextLm) })}` : `<span class="echip" style="background:var(--cont)">✓</span> ${t('foto_done', { n: fregPts(r).length })}`}</div>
    <div class="fstage" id="fstage"><canvas id="fcv" aria-label="${esc(t('foto_canvas'))}"></canvas></div>
    <div class="btnrow" style="margin-top:0"><button type="button" class="btn tonal" data-act="fundo">${t('foto_undo')}</button><button type="button" class="btn tonal" data-act="freset">${t('foto_reset')}</button>${!nextLm ? `<button type="button" class="btn tonal" data-act="fflip">${t('foto_flip')}</button>` : ''}</div>
    ${!nextLm ? `<div class="list">${fregPts(r).map((p) => `<button type="button" class="li" data-act="fsel" data-k="${p.id}" style="width:100%;text-align:left;border:0;border-top:1px solid var(--line);background:${FS.sel === p.id ? 'var(--cont)' : 'transparent'};cursor:pointer;font:inherit;color:inherit"><span class="dot" style="background:var(--${p.el})"></span><span class="grow"><span class="t">${C('area', p.id)}</span><span class="s">${pc(p)} · ${ptT(p.id)[3]}</span></span><a class="echip" href="#pont-${p.s}" style="background:var(--surf2)">${t('open_pt')}</a></button>`).join('')}</div>
      <p class="note">${t('foto_acc')}</p>` : ''}` : ''}
    <p class="note">${ic('shield', 14)} ${t('foto_private')}</p>
    ${disclaimer()}
  </section>`;
};
function fotoGeo(r) {
  const P = {};
  for (const p of fregPts(r)) {
    const sp = PSPEC[p.id], [la, lb, len] = SEG[sp.seg], A = FS.lm[la], B = FS.lm[lb]; if (!A || !B) continue;
    const dx = B[0] - A[0], dy = B[1] - A[1], Ln = Math.hypot(dx, dy) || 1, ux = dx / Ln, uy = dy / Ln, nx = uy * FS.flip, ny = -ux * FS.flip, s = Ln / len, fb = sp.from === 'B', O = fb ? B : A, dir = fb ? -1 : 1;
    P[p.id] = [O[0] + dir * ux * sp.d * s + nx * sp.o * s, O[1] + dir * uy * sp.d * s + ny * sp.o * s];
  }
  return P;
}
function initFoto(signal) {
  const inp = $('#fimg'); inp.addEventListener('change', () => { const f = inp.files && inp.files[0]; if (!f) return; const im = new Image(); im.onload = () => { if (FS.img && FS.img.src.startsWith('blob:')) URL.revokeObjectURL(FS.img.src); FS.img = im; FS.lm = {}; FS.sel = null; route(); }; im.src = URL.createObjectURL(f); }, { signal });
  const cv = $('#fcv'); if (!cv || !FS.img) return;
  const r = FREG.find((x) => x.k === FS.reg), lms = fregLms(r), ctx = cv.getContext('2d'), im = FS.img;
  let sc = 1, dpr = 1;
  const draw = () => {
    const box = $('#fstage').getBoundingClientRect(); dpr = Math.min(2, window.devicePixelRatio || 1); const w = box.width; sc = w / im.naturalWidth; const h = im.naturalHeight * sc;
    cv.width = w * dpr; cv.height = h * dpr; cv.style.width = w + 'px'; cv.style.height = h + 'px'; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.drawImage(im, 0, 0, w, h);
    const cs = getComputedStyle(cv), acc = cs.getPropertyValue('--acc').trim(), onacc = cs.getPropertyValue('--onacc').trim();
    const Pp = (p) => [p[0] * sc, p[1] * sc]; ctx.lineCap = 'round';
    for (const sgk of r.segs) { const [la, lb, len] = SEG[sgk], A = FS.lm[la], B = FS.lm[lb]; if (!A || !B) continue; const a = Pp(A), b = Pp(B), dx = b[0] - a[0], dy = b[1] - a[1], L0 = Math.hypot(dx, dy) || 1, nx = -dy / L0 * 6, ny = dx / L0 * 6; ctx.strokeStyle = 'rgba(0,0,0,.45)'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); ctx.strokeStyle = acc; ctx.lineWidth = 2.5; ctx.stroke(); ctx.lineWidth = 2; for (let i = 0; i <= len; i++) { const x = a[0] + dx * i / len, y = a[1] + dy * i / len; ctx.beginPath(); ctx.moveTo(x - nx, y - ny); ctx.lineTo(x + nx, y + ny); ctx.stroke(); } }
    lms.forEach((l, i) => { const A = FS.lm[l]; if (!A) return; const [x, y] = Pp(A); ctx.beginPath(); ctx.arc(x, y, 11, 0, 7); ctx.fillStyle = acc; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); ctx.fillStyle = onacc; ctx.font = '700 12px Inter,sans-serif'; ctx.textAlign = 'center'; ctx.fillText(String(i + 1), x, y + 4); ctx.textAlign = 'left'; });
    const G = fotoGeo(r);
    for (const [id, pos] of Object.entries(G)) { const p = PBY[id], [x, y] = Pp(pos), isSel = FS.sel === id, col = cs.getPropertyValue(`--${p.el}`).trim(); if (isSel) { ctx.beginPath(); ctx.arc(x, y, 16, 0, 7); ctx.fillStyle = col; ctx.globalAlpha = 0.35; ctx.fill(); ctx.globalAlpha = 1; } ctx.beginPath(); ctx.arc(x, y, isSel ? 9 : 7, 0, 7); ctx.fillStyle = col; ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2.5; ctx.stroke(); const lbl = pc(p); ctx.font = '700 12px Inter,sans-serif'; const tw = ctx.measureText(lbl).width; ctx.fillStyle = 'rgba(0,0,0,.6)'; ctx.fillRect(x + 12, y - 10, tw + 10, 20); ctx.fillStyle = '#fff'; ctx.fillText(lbl, x + 17, y + 4); }
  };
  draw();
  const ro = new ResizeObserver(draw); ro.observe($('#fstage')); signal.addEventListener('abort', () => ro.disconnect());
  cv.addEventListener('click', (e) => {
    const b = cv.getBoundingClientRect(), x = (e.clientX - b.left) / sc, y = (e.clientY - b.top) / sc, next = lms.find((l) => !FS.lm[l]);
    if (next) { FS.lm[next] = [x, y]; route(); return; }
    const G = fotoGeo(r); let best = null, bd = 30 / sc; for (const [id, pos] of Object.entries(G)) { const d = Math.hypot(pos[0] - x, pos[1] - y); if (d < bd) { bd = d; best = id; } }
    if (best) { FS.sel = best; route(); }
  }, { signal });
}
