# Taichi Zidong – videó-adatbázis és beillesztési javaslat

Forrás: a **Taichi Zidong** YouTube-csatorna (@taichi_zidong, `UCan3pma_fRcB28ml2mTZPkg`, kb. 1,02 millió feliratkozó, Wudang Sanfeng ági taoista tanító). Gyűjtés: 2026. november 24.

## Fájlok

| Fájl | Tartalom |
|---|---|
| `taichi_zidong_videok.csv` | Teljes adatbázis (UTF-8 BOM, `;` elválasztó – Excelben közvetlenül megnyitható) |
| `taichi_zidong_videok.json` | Ugyanez JSON-ban |
| `javaslat.json` | Az alábbi javaslat gépi formában: app-cél → videóazonosítók |

### Oszlopok

| Oszlop | Jelentés |
|---|---|
| `id`, `link` | YouTube-azonosító és link |
| `tipus` | `Videó` (hosszabb) vagy `Short` |
| `cim_en` | Eredeti cím (a csatorna saját sorszám-előtagja, pl. `261137-`, nélkül) |
| `cim_hu` | Magyar fordítás (2 951 egyedi cím; a pontnevek mellett zárójelben az app magyar kódja, pl. „Taichong (M-3)”) |
| `temak` | Témacímkék (pl. *szervóra, hat gyógyító hang, öt elem qigong, pontnyomás, kéz és ujjak, láb és lábujjak, alvás és este, reggel / ébredés, légzés…*) |
| `pontok` | A címben szereplő pontok magyar kóddal |
| `app_pontok` | Ezek közül azok, amelyek **már benne vannak az appban** (36 pont) |
| `egeszsegugyi_allitas` | `igen`, ha a cím betegséget, kezelést vagy gyógyulást ígér (pl. vérnyomás, stroke, cukorbetegség, „minden betegség elmúlik”) – **ezek az appban nem jeleníthetők meg** |
| `datum`, `hossz`, `megtekintes`, `leiras_hu` | A felhasználói CSV-ből (84 válogatott videó) – a többinél csak a megtekintésszám ismert |
| `forras` | `csatorna`, `csatorna + CSV`, vagy `csak CSV` |

### Számok

- **3 876 sor**: 84 hosszabb videó + 3 776 Short a csatorna oldaláról, és 16 videó, amely csak a felhasználói CSV-ben szerepelt (15 hosszabb, 1 Short – ezeket a csatorna-lista görgetése nem érte el; a magyar címük helyett a CSV leírása szerepel).
- **339** cím tartalmaz egészségügyi állítást.
- **96** videó köthető közvetlenül az app 27 pontjához (állítás nélkül; állítással együtt 97).

### Korlátok

- A fordítás saját, gépi segítség nélkül készült, a címek hű fordítása – nem az app szövege. Az appba kerülő megnevezéseket külön, semlegesen kell megírni (lásd lent).
- A videók **tartalmát nem néztük meg**, csak a címüket. A beillesztés előtt minden kiválasztott videót egyszer meg kell nézni (és a lektornak is), hogy a mozdulat egyezik-e a címmel, és nincs-e benne gyógyító ígéret.
- A témacímkék kulcsszavas besorolásból jönnek; kb. 300 cím maradt címke nélkül.

## Javaslat: hová illeszteném be

Alapelvek (a CLAUDE.md szabályai szerint):
1. **Csak link, nincs beágyazás.** A YouTube-lejátszó beágyazása megnyitáskor külső kérést küldene (sütik, IP-cím) – ez sértené az „adat csak az eszközön” szabályt. A videó csak a felhasználó kattintására nyílik meg, „Külső videó – a YouTube-on nyílik meg” jelzéssel.
2. **Csak az `egeszsegugyi_allitas` nélküli videók**, és az app **saját, semleges címmel** mutatja őket (pl. „Wudang öt elem qigong – daru forma”, nem „a szív egészségéért”).
3. **Forrásmegjelölés**: „Videó: Taichi Zidong (YouTube)”.
4. A kiválasztott listát a **lektor** is nézze át.

| # | Hová az appban | Mely videók | Miért illik |
|---|---|---|---|
| 1 | **Szerv oldalak** és a **Ma** nézet „Most” kártyája | „12 órás szervóra” sorozat (10 Short): 5–7 Vastagbél … 21–23 Hármasmelegítő, plusz egy éjszakai (22–6) | Ugyanaz a szervóra-logika, időablakonként. Hiányzik: 23–1 Epehólyag, 1–3 Máj, 3–5 Tüdő (az éjszakai videó lefedi). |
| 2 | **Gyakorlat → Chi kung, hat gyógyító hang** kártya (szervenként) | Hat gyógyító hang: he (Szív), xu (Máj), hu (Lép), si (Tüdő), xi (Hármasmelegítő) | Az app már most szervenként mutatja a hangot; a videó megmutatja a mozdulatot. A vese „chui” hangjához nincs videó. |
| 3 | **Elem oldalak** (Tudás → elem), és az **évszak eleméhez** | Wudang öt elem qigong: leopárd (fa), daru (tűz), kígyó (föld), tigris (fém), sárkány (víz) | Pontosan az öt elem rendszere; az évszak eleme (pl. télen a víz) kiemelhető. |
| 4 | **Gyakorlat → új „Hagyományos sorok” rész** | Baduanjin 1–8 (7 hosszabb videó + 1 Short), Yi Jin Jing sorozat | Klasszikus, jól ismert qigong-sorok; a Baduanjin reggeli napszakhoz illik. |
| 5 | **Pont oldalak** („Videó ehhez a ponthoz” sor) | 27 app-pont, 96 videó; pl. M-3 Taichong (9), Bef-4 Guanyuan (9), Kor-14 Dazhui (8), Bef-17 Shanzhong (7), Vab-4 Hegu (6), Kor-20 Baihui (6) | A pontnyomás bemutatása mozgóképen. |
| 6 | **Új kézmasszázs-funkció** | ~150 kéz- és ujjvideó: Wogu (ölelő ököl), ujjpöckölés, tenyér- és hüvelykujjpárna-dörzsölés, csuklógyakorlatok, körömcsipkedés (ujjanként) | A kéz–csatorna térkép és a kézmasszázs-rutin mellé. |
| 7 | **Új láb- és lábujj-funkció**, **esti lábrutin** | ~125 láb- és lábujjvideó: Yongquan (V-1), talppaskolás, „Lábkopogtató” sorozat 1–7, Laogong–Yongquan dörzsölés, lábáztatás lefekvés előtt, Qiaoyin (Eh-44) | A lábujjak–csatornák térképhez és a lecsendesedési sávhoz. |
| 8 | **Napszakos ajánlás** (reggel / este) | Reggel: „9 légzés ébredés után” sorozat, ébresztő gyakorlatok; este: alvógyakorlatok, „Légzés a gyorsabb elalvásért” | A `daypart` logikához: reggel élénkítő, este lecsendesítő. |
| 9 | **Képernyőszünet rutin** | Szemápoló videók (szempaskolás, szemüreg-masszázs, „米” alakú szem- és nyakápolás) | A meglévő képernyőszünet-rutin kiegészítése. |

### Állapot

- **Beépítve (2026. november):** 2. Hat gyógyító hang (Gyakorlat chi kung kártya, szervek oldala, elemek oldala) és 3. Wudang öt elem qigong (elemek oldala, a tűz és a víz formánál a lépésenkénti részekkel). Kód: `src/views2.js` → `VID_SOUND`, `VID_ELEM`, `vidRow`; Beállítások → „Külső videók (YouTube)” réteg.
- **Még nincs beépítve:** 1, 4, 5, 6, 7, 8, 9.
- A beépített videók tartalmát a lektornak meg kell néznie (a válogatás csak a címek alapján készült).

### Javasolt sorrend

1. A 2. és a 3. pont (hat gyógyító hang, öt elem qigong): kevés videó, azonnal illeszkedik a meglévő tartalomhoz.
2. Az 5. pont (pontok): automatikusan összekapcsolható, de minden videót egyszer meg kell nézni.
3. A 6. és 7. pont a kéz- és lábfunkcióval együtt.
4. Az 1. és 4. pont: ezek hosszabb sorozatok, a lektorálás után.
