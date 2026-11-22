# Szervóra 2.0 – projektjegyzet a Claude Code-nak

TCM wellness-app (kínai szervóra) webes prototípusa, Android-irányú tervekkel. A felület nyelve magyar (angol második nyelv); a felhasználóval magyarul beszélj.

## Szerkezet
- `src/core.js` – nyelvfüggetlen adatmotor (eredetileg az 1.x webappból): szervek (ORG), elemek, csatornák (CHP), pontok (PTS), csontváz-adatbázis (SKEL, SEG, PSPEC, place/layout), rutinok (ROUT), SVG-rajzolók, BodyMap.
- `src/views2.js` – 2.0 felület: témamotor (elem × napszak), Ma / Test / Gyakorlat / Tudás / Napló / Beállítások, check-in és ajánlómotor, lejátszó, tudásgráf, napló, kijelző mód, kínai asztrológia réteg, útválasztó.
- `src/sk3d.js` – könyvtár nélküli 3D csontváz (Canvas 2D) és a fotós pontkereső.
- `src/legacy.js` – 1.x nézetek és motorok, amiket a 2.0 újrahasznál (elem oldal, lexikon, időzítő, légzés, technikák).
- `src/style.css` – stílusok (CSS-változók a témamotorból).
- `lang/hu.js`, `lang/en.js` – nyelvi csomagok: `window.SZ_LANG.{hu,en} = { ui, c }`. Új felületi szöveg mindig mindkét nyelvbe kerüljön.
- `build.py` – a `src/` fájlokat fűzi össze `index.html`-lé (sorrend: core → views2 útválasztó előtti része → sk3d → legacy → útválasztó). Külső/1.x függősége nincs, az 1.x webapp (`legacy_webapp1x`) el lett távolítva – a `src/` az egyetlen forrás, ott szerkessz; `build_dist.py` – egyfájlos `dist/szervora.html` és telepíthető PWA (`dist/pwa/`).

Fejlesztés: `python3 build.py && python3 build_dist.py`, majd `index.html` megnyitása böngészőben.

## Tartalmi és biztonsági szabályok (nem lazíthatók)
- Este 19 és reggel 7 között nem ajánlunk étkezést; ezt jelezni kell (`EAT(h)`).
- Nincs betegség-gyógyítási állítás és diagnózis. A napló mintái „megfigyelés, nem diagnózis”.
- Az ajánlómotor biztonsági szűrője elsőbbséget élvez; este mindig a lecsendesedés az első.
- A kínai asztrológia kulturális, kikapcsolható réteg, tudományos alátámasztás nélkül; soha nem ad egészségügyi tanácsot, és nem írja felül az ajánlást.
- Felhasználói adat (napló, születési adat, fotó) csak az eszközön marad.
- A pontleírások Temesvári Gabriella „Pontmasszázs” könyvének átfogalmazott tényein alapulnak: szó szerinti átvétel nincs, a rajzok saját készítésűek.

## Következő lépések (a tervtábla szerint)
1. Felhasználói teszt 5–8 fővel (van forgatókönyv).
2. Szakmai lektorálás.
3. Natív Android MVP: Kotlin, Jetpack Compose, Material 3 Expressive; képernyővédő (DreamService), élő háttérkép, widget, Wear OS.
4. Valódi 3D anatómiai modell (pl. Z-Anatomy, CC BY-SA – a licenc szerinti forrásmegjelöléssel), kamerás testkövetés (MediaPipe Pose Landmarker).
