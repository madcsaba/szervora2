// A CLAUDE.md „nem lazítható” szabályainak automatikus ellenőrzése a kész appon
// (dist/pwa/index.html). Futtatás: npm run build && npm test
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { chromium } from 'playwright';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const APP = ROOT + 'dist/pwa/index.html';
const URL_ = pathToFileURL(APP).href;
const NIGHT = (h) => h >= 21 || h < 5;          // recommend(): esti lecsendesedés
const EAT = (h) => h >= 7 && h < 19;            // étkezési ablak
const DAY = '2026-03-11';                        // tetszőleges hétköznap

let browser;
before(async () => { browser = await chromium.launch(); });
after(async () => { await browser?.close(); });

/** Megnyitja az appot rögzített helyi idővel és előre beállított tárolóval. */
async function open({ hour, minute = 30, checkin = null, birth = null, hash = 'ma' }) {
  const ctx = await browser.newContext({ timezoneId: 'Europe/Budapest', locale: 'hu-HU' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  const requests = [];  // minden nem helyi kérés, már az első betöltéstől
  page.on('request', (r) => { if (!/^(file|data|blob):/.test(r.url())) requests.push(r.url()); });
  const time = new Date(`${DAY}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00+01:00`);
  await page.clock.setFixedTime(time);
  const seed = { lang: 'hu', log: checkin ? [{ type: 'ci', t: time.getTime() - 10 * 60e3, s: 1, ...checkin }] : [], birth };
  await page.addInitScript((s) => { for (const [k, v] of Object.entries(s)) localStorage.setItem('szervora.' + k, JSON.stringify(v)); }, seed);
  await page.goto(`${URL_}#${hash}`);
  await page.waitForSelector('#view .hero');
  return { page, ctx, errors, requests };
}

const recId = async (page) => (await page.getAttribute('#view a.btn[href^="#rutin-"]', 'href')).slice('#rutin-'.length);
const hasEatPause = async (page) => (await page.locator('#view', { hasText: 'Evési szünet' }).count()) > 0;

test('étkezés: 19 és 7 óra között jelzés, és nincs emésztési rutin', async () => {
  for (let h = 0; h < 24; h++) {
    const { page, ctx, errors } = await open({ hour: h });
    assert.equal(await hasEatPause(page), !EAT(h), `${h}:30 – étkezési szünet jelzése`);
    if (!EAT(h)) assert.notEqual(await recId(page), 'emesztes', `${h}:30 – éjjel nem ajánlhat emésztési rutint`);
    assert.deepEqual(errors, []);
    await ctx.close();
  }
});

test('este a lecsendesedés az első, bármilyen check-in mellett', async () => {
  for (const h of [21, 22, 23, 0, 2, 4]) {
    for (const e of [0, 1, 2]) for (const m of [0, 1, 2]) {
      const { page, ctx } = await open({ hour: h, checkin: { e, m } });
      assert.equal(await recId(page), 'esti', `${h}:30, energia=${e}, hangulat=${m}`);
      await ctx.close();
    }
  }
});

test('a kínai asztrológia nem írja felül az ajánlást', async () => {
  const birth = { date: '1990-05-17', time: '06:15', lon: 19.04, tz: 1 };
  for (let h = 0; h < 24; h += 1) {
    const plain = await open({ hour: h });
    const astro = await open({ hour: h, birth });
    assert.ok(await astro.page.locator('#view a[href="#tudas-asztro"]').count(), `${h}:30 – az asztrológia sor megjelenik`);
    assert.equal(await recId(astro.page), await recId(plain.page), `${h}:30 – ajánlás asztrológiával is ugyanaz`);
    assert.equal(await hasEatPause(astro.page), await hasEatPause(plain.page));
    await plain.ctx.close(); await astro.ctx.close();
  }
});

test('az app nem küld hálózati kérést (adat csak az eszközön)', async () => {
  const { page, ctx, errors, requests } = await open({ hour: 10, birth: { date: '1990-05-17', time: '06:15', lon: 19.04, tz: 1 } });
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

test('nyelvi csomagok: minden kulcs mindkét nyelvben megvan', () => {
  const window = {};
  for (const l of ['hu', 'en']) new Function('window', readFileSync(`${ROOT}lang/${l}.js`, 'utf8'))(window);
  const { hu, en } = window.SZ_LANG;
  const diff = (a, b) => Object.keys(a).filter((k) => !(k in b));
  assert.deepEqual(diff(hu.ui, en.ui), [], 'csak magyarul létező ui kulcsok');
  assert.deepEqual(diff(en.ui, hu.ui), [], 'csak angolul létező ui kulcsok');
  assert.deepEqual(diff(hu.c, en.c), [], 'csak magyarul létező tartalmi szakaszok');
  assert.deepEqual(diff(en.c, hu.c), [], 'csak angolul létező tartalmi szakaszok');
});

test('a napló mintái „megfigyelés, nem diagnózis” jelzést kapnak', () => {
  const window = {};
  for (const l of ['hu', 'en']) new Function('window', readFileSync(`${ROOT}lang/${l}.js`, 'utf8'))(window);
  assert.match(window.SZ_LANG.hu.ui.pattern_s, /megfigyelés, nem diagnózis/);
  assert.match(window.SZ_LANG.en.ui.pattern_s, /observation, not a diagnosis/);
});
