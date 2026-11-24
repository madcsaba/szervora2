// A CLAUDE.md „nem lazítható” szabályainak automatikus ellenőrzése a kész appon
// (dist/pwa/index.html). Futtatás: npm run build && npm test
//
// Az esti határok a felhasználó napirendjéből számolódnak (core.js: sched):
//   evési szünet: lefekvés − 3 óra → ébredés
//   esti lecsendesedés az első ajánlás: lefekvés − 1,5 óra → ébredés − 2 óra
//   napirend nélkül: lefekvés = naplemente + 3,5 óra (negyedórára kerekítve, 21:30–22:30 közé szorítva), ébredés 7:00;
//   a naplemente helye a készülék időzónájából jön (src/tzcoords.js)
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const APP = ROOT + 'dist/pwa/index.html';
const URL_ = pathToFileURL(APP).href;
const BIRTH = { date: '1990-05-17', time: '06:15', lon: 19.04, tz: 1 };

const hm = (s) => { const [a, b] = s.split(':').map(Number); return a + b / 60; };
const mod = (x) => ((x % 24) + 24) % 24;
const inWin = (x, a, b) => (a <= b ? x >= a && x < b : x >= a || x < b);
const label = (x) => `${Math.floor(x)}:${String(Math.round((x % 1) * 60)).padStart(2, '0')}`;
/** A képlet független megvalósítása a tesztben: elvárt határok egy napirendhez. */
const expected = (bed, wake) => ({ eat0: mod(bed - 3), wake, calm0: mod(bed - 1.5), calm1: mod(wake - 2) });
const SLOTS = Array.from({ length: 48 }, (_, i) => i / 2);   // 0:00, 0:30, … 23:30

let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser?.close(); });

/** Megnyitja az appot rögzített helyi idővel (Budapest) és előre beállított tárolóval. */
async function open({ day = '2026-03-11', tz = 'Europe/Budapest', sched = null, birth = null, checkin = null, hash = 'ma', layers = null } = {}) {
  const ctx = await browser.newContext({ timezoneId: tz, locale: 'hu-HU' });
  const page = await ctx.newPage();
  const errors = [], requests = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('request', (r) => { if (!/^(file|data|blob):/.test(r.url())) requests.push(r.url()); });
  const seed = { lang: 'hu', birth, ...(sched ? { sched } : {}), ...(layers ? { layers } : {}) };
  // A check-in a (rögzített) oldalidőhöz képest 10 perce történt; minden betöltéskor beírjuk.
  await page.addInitScript(([s, c]) => { if (location.protocol !== 'file:') return; for (const [k, v] of Object.entries(s)) localStorage.setItem('szervora.' + k, JSON.stringify(v)); localStorage.setItem('szervora.log', JSON.stringify(c ? [{ type: 'ci', t: Date.now() - 10 * 60e3, s: 1, ...c }] : [])); }, [seed, checkin]);
  /** Az óra beállítása és az oldal újratöltése (a check-in ehhez az időhöz képest 10 perce történt). */
  const at = async (x) => {
    // Budapest szerinti helyi idő → időbélyeg, a böngészőben számolva (nyári időszámítás is helyes).
    const [y, m, d] = day.split('-').map(Number);
    const ms = await page.evaluate(([yy, mm, dd, hh, mi]) => new Date(yy, mm - 1, dd, hh, mi).getTime(), [y, m, d, Math.floor(x), Math.round((x % 1) * 60)]);
    await page.clock.setFixedTime(ms);
    await page.goto('about:blank');           // teljes újratöltés kell (csak hash-váltásnál nem töltene újra)
    await page.goto(`${URL_}#${hash}`);
    await page.waitForSelector('#view .top');   // minden nézetnek van fejléce
  };
  await page.goto(URL_ + '#' + hash);  // file:// eredet, hogy a localStorage elérhető legyen
  return { page, ctx, errors, requests, at };
}

const recId = async (page) => (await page.getAttribute('#view a.btn[href^="#rutin-"]', 'href')).slice('#rutin-'.length);
const eatPause = async (page) => (await page.locator('#view .row.flat', { hasText: 'Evési szünet' }).count()) > 0;

async function checkDay(name, opts, exp) {
  const { page, ctx, errors, at } = await open(opts);
  for (const x of SLOTS) {
    await at(x);
    const pause = !inWin(x, exp.wake, exp.eat0);
    assert.equal(await eatPause(page), pause, `${name} ${label(x)} – evési szünet jelzése`);
    if (pause) {
      assert.notEqual(await recId(page), 'emesztes', `${name} ${label(x)} – evési szünetben nincs emésztési rutin`);
      assert.ok(await page.locator('#view', { hasText: `Evési szünet ${label(exp.wake)}-ig` }).count(), `${name} ${label(x)} – az ébredési időt mutatja`);
    }
    if (inWin(x, exp.calm0, exp.calm1)) assert.equal(await recId(page), 'esti', `${name} ${label(x)} – lecsendesedés az első`);
  }
  assert.deepEqual(errors, []);
  await ctx.close();
}

test('saját napirend 22:00–7:00 → evési szünet 19:00–7:00, lecsendesedés 20:30–5:00', () =>
  checkDay('22–7', { sched: { bed: '22:00', wake: '07:00' } }, expected(22, 7)));

test('késői napirend 0:30–8:30 → evési szünet 21:30–8:30, lecsendesedés 23:00–6:30', () =>
  checkDay('0:30–8:30', { sched: { bed: '00:30', wake: '08:30' } }, expected(0.5, 8.5)));

test('korai napirend 21:00–5:30 → evési szünet 18:00–5:30, lecsendesedés 19:30–3:30', () =>
  checkDay('21–5:30', { sched: { bed: '21:00', wake: '05:30' } }, expected(21, 5.5)));

test('napirend nélkül nyáron a naplemente adja az alapot (lefekvés 22:30)', () =>
  checkDay('nyár', { day: '2026-06-21' }, expected(22.5, 7)));

test('napirend nélkül télen a 21:30-as alsó határ érvényes', () =>
  checkDay('tél', { day: '2026-12-21' }, expected(21.5, 7)));

test('napirend nélkül a naplemente a készülék időzónájából: Budapest szeptemberben 22:15', () =>
  checkDay('Budapest ősz', { day: '2026-09-22' }, expected(22.25, 7)));

test('ugyanaznap Madridban később van naplemente → lefekvés 22:30', () =>
  checkDay('Madrid ősz', { day: '2026-09-22', tz: 'Europe/Madrid' }, expected(22.5, 7)));

test('napi kör: 12 szelet, mindegyiken egymást nem fedő szervnév, középen yin-yang, rámutatásra előnézet', async () => {
  const { page, ctx, errors, at } = await open();
  for (const x of [8, 15, 20, 21.5]) {   // köztük a leghosszabb nevek: „H. melegítő”, „Hármasmelegítő”
    await at(x);
    assert.equal(await page.locator('.arcwrap [data-dial]').count(), 12, `${label(x)} – mind a 12 szerv látszik`);
    const labels = page.locator('.arcwrap svg text.dn');
    assert.equal(await labels.count(), 12, `${label(x)} – mind a 12 szeleten ott a szerv neve`);
    const svg = await page.locator('.arcwrap svg').boundingBox();
    const boxes = await Promise.all([...Array(12).keys()].map((i) => labels.nth(i).boundingBox()));
    for (const bx of boxes) assert.ok(bx.x >= svg.x - 1 && bx.x + bx.width <= svg.x + svg.width + 1, `${label(x)} – a felirat a körön belül marad`);
    for (let i = 0; i < 12; i++) for (let j = i + 1; j < 12; j++) {
      const p = boxes[i], q = boxes[j];
      const overlap = p.x < q.x + q.width && q.x < p.x + p.width && p.y < q.y + q.height && q.y < p.y + p.height;
      assert.ok(!overlap, `${label(x)} – a ${i}. és ${j}. felirat nem fedi egymást`);
    }
  }
  const now = await page.textContent('.arccenter .organ');
  await page.hover('[data-dial="6"]');               // Szív, 11–13
  assert.equal(await page.textContent('.arccenter .organ'), 'Szív');
  assert.match(await page.textContent('.arccenter .sub'), /11:00–13:00/);
  await page.mouse.move(5, 700);                     // el a körről → visszaáll
  assert.equal(await page.textContent('.arccenter .organ'), now);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('elrendezés: asztalon oldalsáv és kétoszlopos Ma, mobilon alsó sáv', async () => {
  for (const [w, h, desk] of [[1440, 900, true], [1920, 1080, true], [390, 844, false]]) {
    const ctx = await browser.newContext({ timezoneId: 'Europe/Budapest', locale: 'hu-HU', viewport: { width: w, height: h } });
    const page = await ctx.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`${URL_}#ma`); await page.waitForSelector('#view .hero');
    const nav = await page.locator('#nav').boundingBox(), dial = await page.locator('.arcwrap').boundingBox(), hero = await page.locator('#view .hero').boundingBox();
    if (desk) {
      assert.ok(nav.x === 0 && nav.height >= h - 1 && nav.width < 320, `${w}px – bal oldali, teljes magasságú oldalsáv`);
      assert.ok(await page.locator('#nav .navbrand').isVisible() && await page.locator('#nav [data-act=fs]').isVisible(), `${w}px – márka és teljes képernyő gomb`);
      assert.ok(hero.x > dial.x + dial.width - 1 && hero.y < dial.y + dial.height, `${w}px – az ajánlás a kör mellett, jobbra`);
      assert.ok(dial.width >= 420, `${w}px – nagy kör (${Math.round(dial.width)}px)`);
      const scroll = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      assert.ok(scroll <= 0, `${w}px – nincs vízszintes görgetés`);
    } else {
      assert.ok(nav.y > h - 120, '390px – alsó navigációs sáv');
      assert.equal(await page.locator('#nav .navbrand').isVisible(), false);
      assert.ok(hero.y >= dial.y + dial.height - 1, '390px – az ajánlás a kör alatt');
    }
    assert.deepEqual(errors, []);
    await ctx.close();
  }
});

test('pont oldal: 3D csontváz a ponthoz nagyítva, váltható a közeli rajzra', async () => {
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await ctx.newPage(); const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(`${URL_}#pont-szb-8`); await page.waitForSelector('#pmap canvas');
    // az első képkocka után frissül a felirat; ha nem nagyít 6×-re, itt időtúllépéssel bukik el
    await page.waitForFunction(() => /^6×$/.test(document.querySelector('#pmap [data-zl]').textContent), null, { timeout: 5000 })
      .catch(async () => assert.fail(`${w}px – kézpontnál közelről indul (felirat: ${await page.textContent('#pmap [data-zl]')})`));
    assert.equal(await page.locator('#pmap .mapview [aria-pressed=true]').count(), 1, `${w}px – egy nézetgomb aktív`);
    const nonBlank = await page.evaluate(() => { const c = document.querySelector('#pmap canvas'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data; let n = 0; for (let i = 3; i < d.length; i += 4 * 16) if (d[i] > 0) n++; return n; });
    assert.ok(nonBlank > 200, `${w}px – a csontváz kirajzolódik`);
    const seg = await page.locator('[data-act=pmode]').first().boundingBox();
    assert.ok(seg.x >= 0 && seg.x + seg.width <= w, `${w}px – a nézetváltó a képernyőn belül`);
    await page.click('[data-act=pmode][data-k="2d"]');
    await page.waitForSelector('svg.crop');
    // kézpont: a közeli nézet a valódi csontrajzot mutatja, forrásmegjelöléssel
    assert.equal(await page.locator('svg.crop image.anat').count(), 1, `${w}px – csontrajz a közeli nézetben`);
    assert.match(await page.getAttribute('svg.crop image.anat', 'href'), /^data:image\/svg\+xml;base64,/);
    assert.match(await page.textContent('.credit'), /LadyofHats/);
    assert.equal(await page.locator('#pmap').count(), 0);
    await page.reload(); await page.waitForSelector('svg.crop');   // a választás megmarad
    await page.click('[data-act=pmode][data-k="3d"]'); await page.waitForSelector('#pmap canvas');
    await page.goto(`${URL_}#pont-h-23`); await page.waitForSelector('#pmap canvas');
    assert.equal(await page.getAttribute('#pmap [data-m3=back]', 'aria-pressed'), 'true', `${w}px – hátoldali pont hátulról`);
    assert.deepEqual(errors, []);
    await ctx.close();
  }
});

test('gyakorlatok a napszakhoz igazodnak (napirend 22:30–7:00)', async () => {
  const cases = [
    // [idő, elérhető légzésminták, alapértelmezett, a főlistán NEM lehet, a „Más napszakra” részben kell]
    [7.5, ['calm', 'even'], 'even', ['esti'], ['esti']],
    [12, ['calm', 'even'], 'even', ['esti', 'reggel'], ['esti', 'reggel']],
    [19.75, ['calm', 'even'], 'calm', ['reggel', 'emesztes'], ['reggel', 'emesztes']],
    [22.5, ['calm', 'sleep'], 'sleep', ['reggel', 'kepernyo', 'emesztes'], ['reggel', 'kepernyo', 'emesztes']],
    [2, ['calm', 'sleep'], 'sleep', ['reggel', 'kepernyo'], ['reggel', 'kepernyo']],
  ];
  const { page, ctx, errors, at } = await open({ sched: { bed: '22:30', wake: '07:00' }, hash: 'gyakorlat' });
  for (const [x, pats, def, notMain, inOther] of cases) {
    await at(x);
    const got = await page.$$eval('[data-act=pat]', (bs) => bs.map((b) => b.dataset.k));
    assert.deepEqual(got, pats, `${label(x)} – légzésminták`);
    assert.equal(await page.getAttribute('[data-act=pat][aria-pressed=true]', 'data-k'), def, `${label(x)} – alapértelmezett minta`);
    const main = await page.$$eval('.dgrid > .rcard', (as) => as.map((a) => a.getAttribute('href').slice('#rutin-'.length)));
    for (const id of notMain) assert.ok(!main.includes(id), `${label(x)} – „${id}” nincs a főlistán`);
    const other = await page.$$eval('.othertime .rcard', (as) => as.map((a) => a.getAttribute('href').slice('#rutin-'.length)));
    for (const id of inOther) assert.ok(other.includes(id), `${label(x)} – „${id}” a „Más napszakra” részben`);
  }
  // Ma: reggel a reggeli rutin az ajánlás, alacsony energiánál este nem élénkítő
  await at(7.5); await page.goto(`${URL_}#ma`); await page.waitForSelector('#view .hero');
  assert.equal(await recId(page), 'reggel', '7:30 – reggeli ébresztő');
  assert.deepEqual(errors, []);
  await ctx.close();
  const low = await open({ sched: { bed: '22:30', wake: '07:00' }, checkin: { e: 0, m: 1 } });
  await low.at(10); assert.equal(await recId(low.page), 'reggel', '10:00, alacsony energia – élénkítő sor');
  await low.at(19.75); assert.notEqual(await recId(low.page), 'reggel', '19:45, alacsony energia – este nem élénkítő sor');
  await low.ctx.close();
});

test('kéz és láb: térkép, ujj–csatorna párosítás, rutinok napszak szerint, lábujjolvasás kikapcsolható', async () => {
  const { page, ctx, errors, at } = await open({ sched: { bed: '22:30', wake: '07:00' }, hash: 'tudas-kezlab' });
  await at(20.5);
  assert.equal(await page.locator('.hfpt').count(), 12, 'kézpontok: 9 új + 3 meglévő (Szb-8, Vab-4, Véb-3)');
  await page.click('.hfpt[data-hf="Hm-1"]');
  assert.match(await page.textContent('#hfcard'), /Gyűrűsujj/);
  assert.ok(await page.locator('#hfcard a[href="#szerv-hm"]').count(), 'a szerv oldalára mutat');
  const ring = await page.locator('.list .li', { hasText: 'Gyűrűsujj' }).textContent();
  assert.match(ring, /Hármasmelegítő/);
  // a reggeli kézrutin este nem kiemelt, az esti igen
  assert.equal(await page.locator('a.rcard.hl[href="#rutin-kez_este"]').count(), 1, '20:30 – az esti kézrutin kiemelt');
  assert.equal(await page.locator('a.rcard.hl[href="#rutin-kez_reggel"]').count(), 0, '20:30 – a reggeli kézrutin nem kiemelt');
  await page.goto(`${URL_}#tudas-kezlab-lab`); await page.waitForSelector('#hfcard');
  assert.match(await page.textContent('#hfcard'), /Yongquan/);
  assert.match(await page.textContent('#toeread'), /nem diagnózis/);
  // Gyakorlat reggel: az esti lábmasszázs a „Más napszakra” részben
  await at(7.5); await page.goto(`${URL_}#gyakorlat`); await page.waitForSelector('.othertime');
  const other = await page.$$eval('.othertime .rcard', (as) => as.map((x) => x.getAttribute('href')));
  assert.ok(other.includes('#rutin-lab_este') && other.includes('#rutin-kez_este'));
  // a lábujjolvasás réteg kikapcsolható (a beállítás az oldal betöltésekor kerül a tárolóba)
  const off = await open({ hash: 'tudas-kezlab-lab', layers: { labujj: false } });
  await off.at(20.5); await off.page.waitForSelector('#hfcard');
  assert.equal(await off.page.locator('#toeread').count(), 0, 'kikapcsolt réteg mellett nincs lábujjolvasás');
  await off.ctx.close();
  // a lejátszó kéz/láb ponttal is működik
  await page.goto(`${URL_}#rutin-lab_este`); await page.waitForSelector('#player');
  assert.match(await page.textContent('#parea'), /Talp/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('külső videók: csak link (új lapon, noopener), semleges cím, kikapcsolható, nincs beágyazás', async () => {
  const { page, ctx, errors, requests, at } = await open({ hash: 'elem-tuz' });
  await at(12);
  const main = page.locator('#view a.vid[href="https://www.youtube.com/watch?v=BBssxev3AI4"]');
  assert.equal(await main.count(), 1, 'a tűz elem oldalán a daru forma');
  assert.equal(await main.getAttribute('target'), '_blank');
  assert.match(await main.getAttribute('rel'), /noopener/);
  assert.match(await main.textContent(), /daru forma/);
  assert.equal(await page.locator('.vidparts a').count(), 4, 'a daru forma 4 lépésrésze');
  assert.equal(await page.locator('iframe, video, embed, object').count(), 0, 'nincs beágyazott lejátszó');
  await page.goto(`${URL_}#gyakorlat`); await page.waitForSelector('#view .top');
  assert.ok(await page.locator('#view a.vid[href*="youtube.com/watch"]').count() >= 1, '12:00 – a Szív gyógyító hangja');
  assert.deepEqual(requests, [], 'a link nem tölt be semmit a YouTube-ról');
  assert.deepEqual(errors, []);
  await ctx.close();
  const off = await open({ hash: 'elem-tuz', layers: { videok: false } });
  await off.at(12);
  assert.equal(await off.page.locator('a.vid').count(), 0, 'kikapcsolt réteg mellett nincs videólink');
  await off.ctx.close();
});

test('videók: szervóra, hagyományos sorok, pontok, kéz és láb, napszak, képernyőszünet – minden lista teljes', async () => {
  const { page, ctx, errors, requests, at } = await open({ sched: { bed: '22:30', wake: '07:00' }, hash: 'szerv-sz' });
  await at(12);
  assert.ok(await page.locator('a.vid[href$="ImRLxLjPA-g"]').count(), 'Szív oldalán a 11–13 órás szervóra-videó');
  await page.goto(`${URL_}#szerv-m`); await page.waitForSelector('#view .top');
  assert.ok(await page.locator('a.vid[href$="qFOtJM_sid0"]').count(), 'Máj oldalán az éjszakai videó');
  await page.goto(`${URL_}#gyakorlat`); await page.waitForSelector('[data-vset=bdj]');
  assert.equal(await page.locator('[data-vset=bdj] a').count(), 8, 'Baduanjin 1–8');
  assert.equal(await page.locator('[data-vset=yjj] a').count(), 6);
  await page.goto(`${URL_}#pont-m-3`); await page.waitForSelector('#view .top');
  assert.ok(await page.locator('a.vid').count(), 'M-3 ponthoz videó');
  await page.goto(`${URL_}#tudas-kezlab-lab`); await page.waitForSelector('[data-vset=foot]');
  assert.equal(await page.locator('[data-vset=foot] a').count(), 12);
  await page.goto(`${URL_}#rutin-kepernyo`); await page.waitForSelector('#player');
  assert.equal(await page.locator('[data-vset=eyes] a').count(), 5);
  const ma = await open({ sched: { bed: '22:30', wake: '07:00' }, hash: 'ma' });
  await ma.at(7.5); assert.ok(await ma.page.locator('[data-vset=morning]').count(), 'reggel: kilenc légzés');
  await ma.at(22.25); assert.ok(await ma.page.locator('[data-vset=evening]').count(), 'este: alvógyakorlatok');
  await ma.at(12); assert.equal(await ma.page.locator('[data-vset=morning], [data-vset=evening]').count(), 0, 'délben nincs napszakos videólista');
  assert.ok(await ma.page.locator('a.vid[href$="ImRLxLjPA-g"]').count(), 'Ma délben: a Szív szervóra-videója');
  await ma.ctx.close();
  // minden link YouTube-watch, új lapon, noopener
  const bad = await page.$$eval('a[data-vid]', (as) => as.filter((a) => !/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/.test(a.href) || a.target !== '_blank' || !/noopener/.test(a.rel)).length);
  assert.equal(bad, 0);
  assert.deepEqual(requests, []);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('a videónevek listái hossza egyezik a videókkal, és minden videó az adatbázisban van, állítás nélkül', () => {
  const window = {};
  for (const l of ['hu', 'en']) new Function('window', readFileSync(`${ROOT}lang/${l}.js`, 'utf8'))(window);
  const src = readFileSync(`${ROOT}src/views2.js`, 'utf8');
  const sets = JSON.parse(src.match(/const VID_SETS = (\{[\s\S]*?\n\});/)[1].replace(/(\w+):/g, '"$1":').replace(/'/g, '"'));
  const trad = JSON.parse(src.match(/const VID_TRAD_NAME = (\[[^\]]*\]);/)[1].replace(/'/g, '"'));
  const db = Object.fromEntries(JSON.parse(readFileSync(`${ROOT}research/taichi-zidong/taichi_zidong_videok.json`, 'utf8')).map((r) => [r.id, r]));
  for (const [k, ids] of Object.entries(sets)) {
    for (const l of ['hu', 'en']) assert.equal(window.SZ_LANG[l].c.vidnames[k].length, ids.length, `${l} ${k}`);
    for (const id of ids) { assert.ok(db[id], `${k}: ${id} az adatbázisban`); if (!trad.includes(id)) assert.notEqual(db[id].egeszsegugyi_allitas, 'igen', `${k}: ${id} állítás nélkül`); }
  }
  const all = [...src.matchAll(/'([\w-]{11})'/g)].map((m) => m[1]).filter((id) => db[id]);
  for (const id of all) if (!trad.includes(id)) assert.notEqual(db[id].egeszsegugyi_allitas, 'igen', `${id} állítás nélkül`);
});

test('videó: kattintásra ablak, jóváhagyás nélkül nincs lejátszó, jóváhagyás után youtube-nocookie, bezárva eltűnik', async () => {
  const { page, ctx, errors, requests, at } = await open({ hash: 'elem-tuz' });
  await page.route(/youtube/, (r) => r.abort());       // a teszt ne töltsön le semmit
  await at(12);
  assert.deepEqual(requests, [], 'megnyitáskor nincs kérés');
  await page.click('a.vid[data-vid="BBssxev3AI4"]');
  await page.waitForSelector('.vsheet');
  assert.equal(await page.locator('.vsheet iframe').count(), 0, 'jóváhagyás előtt nincs lejátszó');
  assert.deepEqual(requests, [], 'az ablak megnyitása sem küld kérést');
  assert.match(await page.textContent('.vsheet'), /youtube-nocookie/);
  await page.check('#vremember');
  await page.click('[data-act=vplay]');
  const src = await page.getAttribute('.vsheet iframe', 'src');
  assert.match(src, /^https:\/\/www\.youtube-nocookie\.com\/embed\/BBssxev3AI4\?/);
  assert.ok(requests.every((u) => u.startsWith('https://www.youtube-nocookie.com/')), 'csak a lejátszó töltődik');
  await page.click('.vsheet [data-act=vclose]');
  assert.equal(await page.locator('iframe').count(), 0, 'bezárva a lejátszó eltűnik');
  // megjegyzett döntés: a következő videó rögtön lejátszóval nyílik; a Beállításokban kikapcsolható
  await page.click('.vidparts a >> nth=0');
  assert.equal(await page.locator('.vsheet iframe').count(), 1);
  await page.keyboard.press('Escape');
  await page.goto(`${URL_}#beallitasok`); await page.waitForSelector('[data-pref=vidembed]');
  assert.equal(await page.isChecked('[data-pref=vidembed]'), true);
  await page.uncheck('[data-pref=vidembed]');
  assert.equal(await page.evaluate(() => localStorage.getItem('szervora.vidembed')), 'false');
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('asztrológia: lapozható fogalomtár (gombbal, ponttal, billentyűvel), mindkét nyelven ugyanannyi lap', async () => {
  const { page, ctx, errors } = await open({ hash: 'tudas-asztro' });
  await page.waitForSelector('.gloss .gslide');
  const n = await page.locator('.gloss .gslide').count();
  assert.ok(n >= 12, `legalább 12 lap (${n})`);
  assert.equal(await page.evaluate(() => window.SZ_LANG.hu.c.astro_gloss.length === window.SZ_LANG.en.c.astro_gloss.length), true);
  assert.equal(await page.locator('.gloss .gtab').count(), 2, 'törzsek és ágak táblázata');
  assert.equal(await page.locator('.gloss .gtab').nth(0).locator('tbody tr').count(), 10);
  assert.equal(await page.locator('.gloss .gtab').nth(1).locator('tbody tr').count(), 12);
  assert.equal(await page.textContent('.gcount'), `1 / ${n}`);
  await page.click('.gloss [data-gl="1"]');
  await page.waitForFunction(() => document.querySelector('.gcount').textContent.startsWith('2 '));
  await page.focus('.gtrack'); await page.keyboard.press('ArrowRight');
  await page.waitForFunction(() => document.querySelector('.gcount').textContent.startsWith('3 '));
  await page.click(`.gloss [data-gl-to="${n - 1}"]`);
  await page.waitForFunction((n) => document.querySelector('.gcount').textContent.startsWith(n + ' '), n);
  assert.equal(await page.locator('.gdots [aria-current]').count(), 1);
  // az utolsó lap: nem jóslás, nem egészségügyi tanács
  assert.match(await page.locator('.gslide').last().textContent(), /egészségügyi tanács/);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('a lecsendesedés az első, bármilyen check-in mellett', async () => {
  const exp = expected(22, 7);
  for (const x of [20.5, 22, 23.5, 0, 2.5, 4.5]) {
    assert.ok(inWin(x, exp.calm0, exp.calm1));
    for (const e of [0, 1, 2]) for (const m of [0, 1, 2]) {
      const { page, ctx, at } = await open({ sched: { bed: '22:00', wake: '07:00' }, checkin: { e, m } });
      await at(x);
      assert.equal(await recId(page), 'esti', `${label(x)}, energia=${e}, hangulat=${m}`);
      await ctx.close();
    }
  }
});

test('a kínai asztrológia nem írja felül az ajánlást', async () => {
  const plain = await open(), astro = await open({ birth: BIRTH });
  for (const x of SLOTS) {
    await plain.at(x); await astro.at(x);
    assert.ok(await astro.page.locator('#view a[href="#tudas-asztro"]').count(), `${label(x)} – az asztrológia sor megjelenik`);
    assert.equal(await recId(astro.page), await recId(plain.page), `${label(x)} – ajánlás asztrológiával is ugyanaz`);
    assert.equal(await eatPause(astro.page), await eatPause(plain.page), `${label(x)} – evési szünet asztrológiával is ugyanaz`);
  }
  await plain.ctx.close(); await astro.ctx.close();
});

test('napirend beállítása a Beállításokban: mentés, ellenőrzés, csak helyben', async () => {
  const { page, ctx, errors, requests } = await open();
  await page.clock.setFixedTime(new Date('2026-03-11T19:15:00+01:00').getTime());
  await page.goto('about:blank');
  await page.goto(`${URL_}#beallitasok`);
  await page.waitForSelector('#schedcard');
  // érvénytelen: 2 óra alvás
  await page.fill('#sbed', '23:00'); await page.fill('#swake', '01:00'); await page.click('[data-act=ssave]');
  assert.match(await page.textContent('#smsg'), /4 és 14 óra/);
  assert.equal(await page.evaluate(() => localStorage.getItem('szervora.sched')), null);
  // érvényes: 23:30–7:30 → evési szünet 20:30-tól, 19:15-kor még nincs
  await page.fill('#sbed', '23:30'); await page.fill('#swake', '07:30'); await page.click('[data-act=ssave]');
  assert.deepEqual(JSON.parse(await page.evaluate(() => localStorage.getItem('szervora.sched'))), { bed: '23:30', wake: '07:30' });
  assert.match(await page.textContent('#ssum'), /20:30–7:30/);
  await page.goto(`${URL_}#ma`); await page.waitForSelector('#view .hero');
  assert.equal(await eatPause(page), false, '19:15-kor 23:30-as lefekvésnél még nincs evési szünet');
  // vissza az alapértékre
  await page.goto(`${URL_}#beallitasok`); await page.click('[data-act=sclear]');
  assert.equal(await page.evaluate(() => localStorage.getItem('szervora.sched')), 'null');
  assert.deepEqual(requests, []);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('az app nem küld hálózati kérést (adat csak az eszközön)', async () => {
  const { page, ctx, errors, requests, at } = await open({ birth: BIRTH, sched: { bed: '22:00', wake: '07:00' } });
  await at(10);
  for (const h of ['ma', 'test', 'gyakorlat', 'tudas', 'tudas-lexikon', 'tudas-ciklusok', 'tudas-asztro', 'naplo', 'beallitasok', 'kijelzo', 'elem-fa', 'foto']) {
    await page.evaluate((x) => { location.hash = x; }, h);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => document.fonts.ready);
  assert.deepEqual(requests, []);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test('a kész HTML nem hivatkozik külső erőforrásra', () => {
  const html = readFileSync(APP, 'utf8');
  // a YouTube-videókra mutató sima linkek (kattintásra nyílnak, nem erőforrások) kivételek
  const refs = html.match(/src\s*=\s*["']https?:|href\s*=\s*["'](?!https:\/\/www\.youtube\.com\/watch\?v=)https?:|url\(\s*["']?https?:|@import/gi) || [];
  assert.deepEqual(refs, []);
});

const langs = () => {
  const window = {};
  for (const l of ['hu', 'en']) new Function('window', readFileSync(`${ROOT}lang/${l}.js`, 'utf8'))(window);
  return window.SZ_LANG;
};

test('nyelvi csomagok: minden kulcs mindkét nyelvben megvan', () => {
  const { hu, en } = langs();
  const diff = (a, b) => Object.keys(a).filter((k) => !(k in b));
  assert.deepEqual(diff(hu.ui, en.ui), [], 'csak magyarul létező ui kulcsok');
  assert.deepEqual(diff(en.ui, hu.ui), [], 'csak angolul létező ui kulcsok');
  assert.deepEqual(diff(hu.c, en.c), [], 'csak magyarul létező tartalmi szakaszok');
  assert.deepEqual(diff(en.c, hu.c), [], 'csak angolul létező tartalmi szakaszok');
});

test('a napló mintái „megfigyelés, nem diagnózis” jelzést kapnak', () => {
  const { hu, en } = langs();
  assert.match(hu.ui.pattern_s, /megfigyelés, nem diagnózis/);
  assert.match(en.ui.pattern_s, /observation, not a diagnosis/);
});

test('nincs beégetett 19/7 órás határ a szövegekben', () => {
  const { hu, en } = langs();
  const all = JSON.stringify([hu.ui, hu.c, en.ui, en.c]);
  assert.doesNotMatch(all, /19 óra|7 és 19|before 7 pm|after 7 pm|until 7 am/);
});
