V.elem = (k) => {
  if (!elT(k) || k === 'er') k = 'fa'; const e = elT(k), c = ec(k);
  const mother = Object.keys(GEN).find((x) => GEN[x] === k), ctrlBy = Object.keys(CTRL).find((x) => CTRL[x] === k), snd = C('snd', SOUND_OF[ELORG[k][0]]);
  const cc = (x, role) => `<a href="#elem-${x}" style="flex:1;display:flex;flex-direction:column;align-items:center;padding:8px 4px;border-radius:12px;background:${ec(x).l};text-align:center"><span style="font-size:11px;line-height:1.2">${role}</span><span style="font-size:15px;font-weight:600">${elT(x).n}</span></a>`;
  return `${top(t('el_details'), '', 'tudas-graf-' + k)}
  <section class="hero solid" style="background:${c.c}"><div class="bg han" aria-hidden="true">${HAN[k]}</div><div style="position:relative"><div class="big">${e.n}</div><div style="font-size:13px">${PY[k]} · ${e.fn}</div><div class="chips"><span>${e.season}</span><span>${e.climate}</span><span>${e.color}</span></div></div></section>
  <section class="pad stack" style="margin-top:12px">
    <div class="sec"><h2>${t('organs_h')}</h2><span>${t('with_window')}</span></div>
    <div class="grid2">${ELORG[k].map((oc) => { const o = OBY[oc]; return `<a class="tile" href="#szerv-${slug(oc)}" style="background:${c.l}"><div class="k">${o.yy} · ${t('hours', { w: win(o) })}</div><div class="v">${orgN(oc)}</div></a>`; }).join('')}</div>
    ${L.kapcsolatok ? `<div class="sec"><h2>${t('relations')}</h2></div><div class="grid3">${relTiles(e)}${tile(t('k_voice'), e.voice)}${tile(t('k_season'), e.season)}${tile(t('k_climate'), e.climate)}</div>` : ''}
    <div class="sec"><h2>${t('in_cycles')}</h2></div>
    <div style="display:flex;gap:6px">${cc(mother, t('feeds'))}${cc(GEN[k], t('feeds_it'))}${cc(ctrlBy, t('ctrl_by'))}${cc(CTRL[k], t('ctrls'))}</div>
    <div class="grid2"><div class="card" style="padding:10px 12px"><span class="tag">${t('balanced')}</span><div style="font-size:14px;line-height:19px;margin-top:2px">${e.bal}</div></div><div class="card" style="padding:10px 12px"><span class="tag" style="color:var(--tuz-t)">${t('disturbed')}</span><div style="font-size:14px;line-height:19px;margin-top:2px">${e.dis}</div></div></div>
    ${L.taplalkozas ? `<div class="card"><span class="tag">${t('tag_food')}</span><div style="font-size:15px;font-weight:600;margin-top:2px">${t('taste_x', { t: e.taste })}</div><div style="font-size:14px;line-height:20px">${e.foods}</div><div style="font-size:13px;line-height:19px;color:var(--muted);margin-top:4px">${e.tfx}</div><div style="font-size:12px;font-weight:600;color:var(--jade-t);margin-top:6px;display:flex;align-items:center;gap:6px">${ic('clock', 14)}${t('eat_window', { a: fmtH(sched().wake), b: fmtH(sched().eat0) })}</div></div>` : ''}
    ${L.mozgas ? row('move', t('heal_sound', { s: snd[1] }), snd[0], `#gyakorlat-${slug(ELORG[k][0])}`, t('tag_move')) + vidElem(k) + vidSound(SOUND_OF[ELORG[k][0]]) : ''}
    ${L.gyogynovenyek ? `<div class="card"><span class="tag">${t('tag_tea')}</span><div style="font-size:15px;font-weight:600">${e.tea}</div></div>` : ''}
    ${disclaimer()}
  </section>`;
};

let lexEl = 'all', lexQ = '';
function lexList() {
  const q = lexQ.trim().toLowerCase();
  const rows = C('lex').filter(([tm, d, e]) => (lexEl === 'all' || e === lexEl) && (!q || (tm + ' ' + d).toLowerCase().includes(q))).sort((a, b) => a[0].localeCompare(b[0], loc()));
  return `<div style="font-size:12px;color:var(--muted);padding:0 6px 6px">${t('results', { n: rows.length })}</div>${rows.length ? `<div class="list">${rows.map(([tm, d, e]) => `<a class="li" href="#elem-${e}"><span class="dot" style="background:${ec(e).c}"></span><span class="grow"><span style="display:block;font-size:15px;font-weight:600">${tm}</span><span style="display:block;font-size:13px;color:var(--muted)">${d}</span></span><span class="echip" style="background:${ec(e).l}">${elT(e).n}</span></a>`).join('')}</div>` : `<div class="card" style="text-align:center;color:var(--muted)">${t('no_results_rel')}</div>`}`;
}
const boneRows = (p) => { if (!L.csontok) return ''; const m = measureText(p); return `<div class="kv"><div class="k">${t('k_bone')}</div><div class="v">${m.bone}</div></div><div class="kv"><div class="k">${t('k_from')}</div><div class="v">${m.from}</div></div><div class="kv"><div class="k">${t('k_meas')}</div><div class="v">${m.meas}</div></div>`; };
let tech = 'ton';
const techCard = () => { const tc = C('tech', tech); return `<div style="font-size:14px;font-weight:600;color:var(--jade-t);margin-bottom:4px">${tc[0]}</div>${tc[1].map(([k, v]) => `<div class="kv"><div class="k">${k.toUpperCase()}</div><div class="v">${v}</div></div>`).join('')}`; };
function initTimer(signal) {
  let dur = 60, left = 60, run = false, last = 0, iv = null;
  const ring = $('#ringp'), txt = $('#ringt'), go = $('#tgo'), msg = $('#tmsg');
  const draw = () => { ring.setAttribute('stroke-dashoffset', (326.7 * (1 - left / dur)).toFixed(1)); txt.textContent = mmss(Math.ceil(left)); };
  const label = () => { go.innerHTML = `${ic(run ? 'pause' : 'play', 16, 2)}${t(run ? 'pause' : left < dur && left > 0 ? 'resume' : 'start')}`; };
  const stop = () => { run = false; clearInterval(iv); label(); };
  const tick = () => { const n = performance.now(); left -= (n - last) / 1000; last = n; if (left <= 0) { left = 0; draw(); stop(); msg.textContent = t('timer_done'); buzz([200, 100, 200]); beep(660, .25); return; } draw(); };
  $('#view').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
    if (a === 'tgo') { if (run) { stop(); return; } audio(); if (left <= 0) left = dur; run = true; last = performance.now(); msg.textContent = t('timer_run'); label(); iv = setInterval(tick, 200); }
    if (a === 'treset') { stop(); left = dur; msg.textContent = ''; draw(); label(); }
    if (a === 'tdur') { stop(); dur = left = +b.dataset.k; $$('[data-act=tdur]').forEach((x) => x.setAttribute('aria-pressed', x === b)); msg.textContent = ''; draw(); label(); }
    if (a === 'tech') { tech = b.dataset.k; $$('[data-act=tech]').forEach((x) => x.setAttribute('aria-pressed', x === b)); $('#techcard').innerHTML = techCard(); }
  }, { signal });
  signal.addEventListener('abort', () => clearInterval(iv));
  draw();
}

/* ---- hang és rezgés ---- */
let AC = null;
const audio = () => { try { if (!AC) AC = new (window.AudioContext || window.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume(); } catch (e) { AC = null; } };
const beep = (f = 520, d = .18, when = 0) => { if (!AC || !store.get('sound', true)) return; try { const o = AC.createOscillator(), g = AC.createGain(), t0 = AC.currentTime + when; o.type = 'sine'; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t0 + d); o.connect(g).connect(AC.destination); o.start(t0); o.stop(t0 + d + 0.05); } catch (e) {} };
const buzz = (p) => { if (!store.get('vibrate', true)) return; try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} };
const PATS = { calm: [['inhale', 4, 'in'], ['exhale', 6, 'out']], even: [['inhale', 5, 'in'], ['exhale', 5, 'out']], sleep: [['inhale', 4, 'in'], ['hold', 7, 'hold'], ['exhale', 8, 'out']] };
let brPat = 'calm', brCycles = 8, brUser = false;
function initBreath(signal) {
  if (!$('#core')) return;
  const core = $('#core'), ph = $('#phase'), numEl = $('#num'), go = $('#brgo'), prog = $('#brprog');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let run = false, i = 0, cyc = 0, elapsed = 0, last = 0, iv = null;
  const P = () => PATS[brPat], total = () => P().reduce((s, x) => s + x[1], 0);
  const setPhase = (rem) => { const [n, , ty] = P()[i]; ph.textContent = t(n); const sc = ty === 'in' ? 1 : ty === 'out' ? .6 : null; if (sc !== null) { core.style.transition = reduce ? 'none' : `transform ${rem}s ease-in-out`; core.style.transform = `translate(-50%,-50%) scale(${sc})`; } };
  const ui = () => { const d = P()[i][1]; numEl.textContent = Math.max(1, Math.ceil(d - elapsed)); const done = cyc * total() + P().slice(0, i).reduce((s, x) => s + x[1], 0) + elapsed; prog.style.width = Math.min(100, done / (total() * brCycles) * 100) + '%'; $('#brcyc').textContent = t('cyc_of', { a: Math.min(cyc + 1, brCycles), b: brCycles }); $('#brleft').textContent = t('left_t', { t: mmss(Math.max(0, total() * brCycles - done)) }); };
  const finish = (ok) => { run = false; clearInterval(iv); i = 0; cyc = 0; elapsed = 0; core.style.transition = reduce ? 'none' : 'transform 1s ease'; core.style.transform = 'translate(-50%,-50%) scale(.6)'; ph.textContent = t(ok ? 'done' : 'ready'); numEl.textContent = ok ? '✓' : P()[0][1]; prog.style.width = ok ? '100%' : '0'; go.innerHTML = `${ic('play', 16, 2)}${t('start')}`; if (ok) { $('#brhint').textContent = t('breath_done'); beep(660, .3); } };
  const tick = () => { const n = performance.now(); elapsed += (n - last) / 1000; last = n; if (elapsed >= P()[i][1]) { elapsed = 0; i++; if (i >= P().length) { i = 0; cyc++; if (cyc >= brCycles) { finish(true); return; } } setPhase(P()[i][1]); } ui(); };
  const pause = () => { run = false; clearInterval(iv); const m = getComputedStyle(core).transform; core.style.transition = 'none'; if (m !== 'none') core.style.transform = m; go.innerHTML = `${ic('play', 16, 2)}${t('resume')}`; };
  $('#view').addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b) return; const a = b.dataset.act;
    if (a === 'brgo') { if (run) { pause(); return; } audio(); run = true; last = performance.now(); setPhase(P()[i][1] - elapsed); go.innerHTML = `${ic('pause', 16, 2)}${t('pause')}`; ui(); iv = setInterval(tick, 100); }
    if (a === 'brstop') finish(false);
    if (a === 'pat') { brPat = b.dataset.k; brUser = true; $$('[data-act=pat]').forEach((x) => x.setAttribute('aria-pressed', x === b)); finish(false); }
    if (a === 'brcyc') { brCycles = brCycles === 6 ? 8 : brCycles === 8 ? 12 : 6; $('#brcycl').textContent = brCycles + '×'; $('#brcount').textContent = t('cycles_n', { n: brCycles }); finish(false); $('#brcyc').textContent = t('cyc_of', { a: 0, b: brCycles }); }
  }, { signal });
  signal.addEventListener('abort', () => clearInterval(iv));
}

V.technikak = () => {
  const T = C('tech');
  const dots = (n) => `<div style="display:flex;gap:3px;justify-content:center">${[0, 1, 2].map((i) => `<span class="dot" style="width:8px;height:8px;background:${i < n ? 'var(--jade)' : 'var(--line)'}"></span>`).join('')}</div>`;
  const ing = (n, [a, b]) => `<div style="flex:1;padding:10px 6px;border-radius:12px;background:var(--bg);text-align:center">${dots(n)}<div style="font-size:14px;font-weight:600;margin-top:6px">${a}</div><div style="font-size:12px;color:var(--muted)">${b}</div></div>`;
  const finger = (w) => `<span style="display:block;width:${w}px;height:34px;border-radius:9px 9px 4px 4px;background:var(--body);border:1.5px solid var(--body-line)"></span>`;
  const cun = (n, k, w, cap) => `<div style="display:flex;flex-direction:column;align-items:center;gap:6px"><div style="font-size:14px;font-weight:600;color:var(--jade-t)">${num(n)} ${T.cun_u}</div><div style="align-self:stretch;height:6px;border:1.5px solid var(--jade-t);border-bottom:0;margin:0 4px"></div><div style="display:flex;gap:1px">${Array.from({ length: k }, () => finger(w)).join('')}</div><div style="font-size:12px;color:var(--muted);text-align:center">${cap}</div></div>`;
  return `${top(t('tech_title'), t('tech_sub'), 'gyakorlat')}
  <section class="pad stack">
    <div class="card"><h2>${T.intensity}</h2><div style="display:flex;gap:6px;margin-top:10px">${T.ing.map((x, i) => ing(i + 1, x)).join('')}</div><p style="margin:10px 0 0;font-size:14px;line-height:20px;color:var(--muted)">${T.ing_note}</p></div>
    <div class="sec"><h2>${T.grips}</h2><span>${T.grips_n}</span></div>
    <div class="list">${T.fog.map(([n, z, d], i) => `<div class="li" style="align-items:flex-start"><span style="width:28px;height:28px;border-radius:14px;background:var(--chip);color:var(--jade-t);font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center;flex:none">${i + 1}</span><span class="grow"><span style="display:block;font-size:15px;font-weight:600">${n} <span style="font-weight:400;color:var(--muted);font-size:13px">(${z})</span></span><span style="display:block;font-size:14px;color:var(--muted);line-height:20px">${d}</span></span></div>`).join('')}</div>
    <div class="card"><h2>${T.cun}</h2><p style="margin:4px 0 12px;font-size:14px;line-height:20px;color:var(--muted)">${T.cun_note}</p><div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;align-items:end">${cun(1, 1, 22, T.cun_caps[0])}${cun(1.5, 2, 15, T.cun_caps[1])}${cun(2, 3, 14, T.cun_caps[2])}${cun(3, 4, 13, T.cun_caps[3])}</div></div>
    <div class="card"><h2>${t('bones_h')}</h2><p style="margin:4px 0 10px;font-size:14px;line-height:20px;color:var(--muted)">${t('bones_note')}</p>
      <div class="list" style="border-radius:12px">${Object.entries(SEG).filter(([, x]) => !x[4]).map(([k, [a, b, len]]) => `<div class="li" style="min-height:44px;padding:8px 12px"><span class="grow" style="font-size:14px">${C('lm', a)} – ${C('lm', b)}</span><b style="white-space:nowrap">${len} cun</b></div>`).join('')}${C('cun_extra').map(([n, len]) => `<div class="li" style="min-height:44px;padding:8px 12px"><span class="grow" style="font-size:14px">${n}</span><b style="white-space:nowrap">${len} cun</b></div>`).join('')}</div></div>
    <div class="card"><h2>${T.open}</h2><p style="margin:4px 0 0;font-size:14px;line-height:20px">${T.open_txt}</p></div>
    <div class="card" style="background:var(--warn);border-color:var(--warn-line)"><h2 style="display:flex;align-items:center;gap:8px;color:var(--tuz-t)">${ic('warn', 20)}<span style="color:var(--ink)">${T.contra}</span></h2><ul style="margin:8px 0 0;padding-left:18px;font-size:14px;line-height:22px">${T.contra_list.map((x) => `<li>${x}</li>`).join('')}</ul><p class="note">${T.contra_note}</p></div>
  </section>`;
};
