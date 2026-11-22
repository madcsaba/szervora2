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
async function open({ day = '2026-03-11', tz = 'Europe/Budapest', sched = null, birth = null, checkin = null, hash = 'ma' } = {}) {
  const ctx = await browser.newContext({ timezoneId: tz, locale: 'hu-HU' });
  const page = await ctx.newPage();
  const errors = [], requests = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('request', (r) => { if (!/^(file|data|blob):/.test(r.url())) requests.push(r.url()); });
  const seed = { lang: 'hu', birth, ...(sched ? { sched } : {}) };
  await page.addInitScript((s) => { if (location.protocol !== 'file:') return; for (const [k, v] of Object.entries(s)) localStorage.setItem('szervora.' + k, JSON.stringify(v)); }, seed);
  /** Az óra beállítása és az oldal újratöltése (a check-in ehhez az időhöz képest 10 perce történt). */
  const at = async (x) => {
    // Budapest szerinti helyi idő → időbélyeg, a böngészőben számolva (nyári időszámítás is helyes).
    const [y, m, d] = day.split('-').map(Number);
    const ms = await page.evaluate(([yy, mm, dd, hh, mi]) => new Date(yy, mm - 1, dd, hh, mi).getTime(), [y, m, d, Math.floor(x), Math.round((x % 1) * 60)]);
    await page.clock.setFixedTime(ms);
    await page.evaluate((c) => localStorage.setItem('szervora.log', JSON.stringify(c ? [{ type: 'ci', t: Date.now() - 10 * 60e3, s: 1, ...c }] : [])), checkin);
    await page.goto('about:blank');           // teljes újratöltés kell (csak hash-váltásnál nem töltene újra)
    await page.goto(`${URL_}#${hash}`);
    await page.waitForSelector('#view .hero');
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

test('a napíven egy felirat van (nincs egymásra csúszó név), és a napíven belül marad', async () => {
  const { page, ctx, at } = await open();
  for (const x of [8, 15, 20]) {   // köztük a leghosszabb név: „H. melegítő”
    await at(x);
    assert.equal(await page.locator('.arcwrap svg text').count(), 1, `${x}:00 – pontosan egy felirat`);
    const box = await page.locator('.arcwrap svg text').boundingBox();
    const svg = await page.locator('.arcwrap svg').boundingBox();
    assert.ok(box.x + box.width <= svg.x + svg.width, `${x}:00 – a felirat a napíven belül marad`);
  }
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
  const refs = html.match(/(?:src|href)\s*=\s*["']https?:|url\(\s*["']?https?:|@import/gi) || [];
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
