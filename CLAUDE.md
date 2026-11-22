# Szervóra 2.0 – projektjegyzet a Claude Code-nak

TCM wellness-app (kínai szervóra) webes prototípusa, Android-irányú tervekkel. A felület nyelve magyar (angol második nyelv); a felhasználóval magyarul beszélj.

## Szerkezet
- `src/core.js` – nyelvfüggetlen adatmotor (eredetileg az 1.x webappból): szervek (ORG), elemek, csatornák (CHP), pontok (PTS), csontváz-adatbázis (SKEL, SEG, PSPEC, place/layout), rutinok (ROUT), SVG-rajzolók, BodyMap.
- `src/views2.js` – 2.0 felület: témamotor (elem × napszak), Ma / Test / Gyakorlat / Tudás / Napló / Beállítások, check-in és ajánlómotor, lejátszó, tudásgráf, napló, kijelző mód, kínai asztrológia réteg, útválasztó.
- `src/sk3d.js` – könyvtár nélküli 3D csontváz (Canvas 2D) és a fotós pontkereső.
- `src/legacy.js` – 1.x nézetek és motorok, amiket a 2.0 újrahasznál (elem oldal, lexikon, időzítő, légzés, technikák).
- `src/style.css` – stílusok (CSS-változók a témamotorból).
- `fonts/` – beágyazott betűtípusok (Inter, Inter Tight, Noto Serif SC részhalmaz; OFL). A `tools/fetch_fonts.py` tölti le egyszer; a build base64-ként ágyazza be, megnyitáskor nincs külső kérés. Új karakterhez bővítsd a `CHARS`/`HAN` listát és futtasd újra (a build figyelmeztet).
- `lang/hu.js`, `lang/en.js` – nyelvi csomagok: `window.SZ_LANG.{hu,en} = { ui, c }`. Új felületi szöveg mindig mindkét nyelvbe kerüljön.
- `build.py` – a `src/` fájlokat fűzi össze `index.html`-lé (sorrend: core → views2 útválasztó előtti része → sk3d → legacy → útválasztó). Külső/1.x függősége nincs, az 1.x webapp (`legacy_webapp1x`) el lett távolítva – a `src/` az egyetlen forrás, ott szerkessz; `build_dist.py` – egyfájlos `dist/szervora.html` és telepíthető PWA (`dist/pwa/`).

Fejlesztés: `python3 build.py && python3 build_dist.py`, majd `index.html` megnyitása böngészőben.

Tesztek: `npm install` (egyszer), majd `npm run build && npm test`. A `tests/safety.test.mjs` a kész appon (Playwright, rögzített órával) ellenőrzi a lenti nem lazítható szabályokat: a napirendből számolt evési szünet és esti lecsendesedés (több napirendre és napirend nélkül nyáron/télen), a Napirend beállítás, az asztrológia nem írja felül az ajánlást, nincs hálózati kérés, a nyelvi kulcsok egyeznek. Szabályt érintő változásnál előbb a tesztet frissítsd.

Közzététel: a `.github/workflows/ci.yml` minden pushnál buildel és tesztel (és ellenőrzi, hogy a commitolt `index.html`/`dist` friss); a `main` ágon zöld tesztek után GitHub Pages-re teszi a `dist/pwa/` tartalmát. A service worker gyorsítótár-neve a build tartalmának hash-e (`build_dist.py`), az oldal betöltése hálózat-elsőbbségű, így a telepített PWA is frissül.

## Tartalmi és biztonsági szabályok (nem lazíthatók)
- Az esti határok a felhasználó napirendjéből számolódnak (`core.js`: `sched`, `EAT(d)`, `CALM(d)`; Beállítások → Napirend, csak az eszközön tárolva). L = szokásos lefekvés, É = ébredés:
  - lefekvés előtt 3 órától ébredésig nem ajánlunk étkezést, és ezt jelezni kell;
  - lefekvés előtt 1,5 órától ébredés előtt 2 óráig az esti lecsendesedés az első ajánlás;
  - ha nincs megadva napirend: L = naplemente (Budapest) + 3,5 óra, negyedórára kerekítve, 21:30 és 22:30 közé szorítva; É = 7:00 (alapértékkel: evési szünet kb. 18:30/19:30-tól 7:00-ig).
  - Beégetett órát (pl. „19 óra”) a szövegekbe ne írj; helyőrzővel (`{t}`) és `fmtH(sched()...)`-val dolgozz.
- Nincs betegség-gyógyítási állítás és diagnózis. A napló mintái „megfigyelés, nem diagnózis”.
- Az ajánlómotor biztonsági szűrője elsőbbséget élvez; az esti sávban (`CALM`) mindig a lecsendesedés az első.
- A kínai asztrológia kulturális, kikapcsolható réteg, tudományos alátámasztás nélkül; soha nem ad egészségügyi tanácsot, nem írja felül az ajánlást, és nem befolyásolja az esti határokat (a születési adat nem napirend).
- Felhasználói adat (napló, születési adat, napirend, fotó) csak az eszközön marad.
- A pontleírások Temesvári Gabriella „Pontmasszázs” könyvének átfogalmazott tényein alapulnak: szó szerinti átvétel nincs, a rajzok saját készítésűek.

## Következő lépések (a tervtábla szerint)
1. Felhasználói teszt 5–8 fővel (van forgatókönyv).
2. Szakmai lektorálás.
3. Natív Android MVP: Kotlin, Jetpack Compose, Material 3 Expressive; képernyővédő (DreamService), élő háttérkép, widget, Wear OS.
4. Valódi 3D anatómiai modell (pl. Z-Anatomy, CC BY-SA – a licenc szerinti forrásmegjelöléssel), kamerás testkövetés (MediaPipe Pose Landmarker).
