# Teák és fűszerek – forrásjegyzék

Az app Tudás → Teák lapja (`src/core.js`: `HERBS`; szövegek: `lang/*.js` → `c.herbs`) 41 hétköznapi konyhai és teanövényt mutat. Nem gyógyszer-adatbázis: gyógyszerként használt szerek (pl. ginzeng, orbáncfű, macskagyökér, édesgyökér) szándékosan nincsenek benne.

## Források

| Mire | Forrás | Megjegyzés |
|---|---|---|
| Biztonság, adagolás teaként | Európai Gyógyszerügynökség (EMA), HMPC gyógynövény-monográfiák és közérthető összefoglalók (ema.europa.eu/en/medicines/herbal/…) | Ellenjavallatok, korhatár, várandósság/szoptatás, allergiák; az app a növénynél megnevezi a monográfiát. Átfogalmazva. |
| Nevek (tudományos, magyar, kínai), azonosító | Wikidata (CC0) | A növényoldalon a Q-azonosító. |
| Kínai hagyományos besorolás (hőhatás, íz, csatornák) | A kínai hagyományos gyógynövénytan általánosan ismert besorolása | Csak a kínai hagyományban is ismert növényeknél; átfogalmazva, tájékoztató jelleggel. |
| Magyar névhasználat, népi hagyomány, elkészítés ellenőrzése | Gyógynövény Szövetség és Terméktanács (gyszt.hu), naturportal.hu, tudatosvasarlo.hu | Csak ellenőrzésre; szöveget nem vettünk át. |
| Rajzok | Wikimedia Commons, közkincs botanikai táblák | Lásd `assets/herbs/README.md`. |

## Szabályok (teszt ellenőrzi: `tests/safety.test.mjs`)

- Minden növénynél kötelező: név, a hagyományban, elkészítés, figyelem – magyarul és angolul.
- Nincs gyógyító állítás („gyógyít”, „megelőzi”, „treats”, „cures” stb.).
- Élénkítő (`stim`) tea este és a lecsendesedési sávban nem kerül ajánlásba; ott csak esti (`calm`) tea; a Ma nézetben a tea az esti lecsendesedés után jelenik meg.
- A réteg (Beállítások → Teák és fűszerek) kikapcsolható.
- A szakmai lektornak (gyógyszerész / fitoterapeuta) át kell néznie a biztonsági szövegeket.
