# Anatómiai rajzok – forrás és licenc

A kéz, a lábfej és a koponya csontrajzai a Wikimedia Commonsról származnak. A build (`build.py`) data URI-ként ágyazza be őket (`ANAT_IMG`), és `<image>` elemben jelennek meg, így megnyitáskor nincs külső kérés.

| Fájl | Eredeti | Szerző | Licenc |
|---|---|---|---|
| `hand.svg` | [Scheme human hand bones - no text.svg](https://commons.wikimedia.org/wiki/File:Scheme_human_hand_bones_-_no_text.svg) (bal kéz, tenyér felől) | Mariana Ruiz Villarreal (LadyofHats) | Közkincs (public domain) |
| `foot_top.svg` | [202110 Dorsal view of bones of right foot.svg](https://commons.wikimedia.org/wiki/File:202110_Dorsal_view_of_bones_of_right_foot.svg) (jobb lábfej felülről) | DataBase Center for Life Science (DBCLS), TogoTV, https://doi.org/10.7875/togopic.2021.124 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) |
| `skull_front.svg` | [Human skull front simplified (bones).svg](https://commons.wikimedia.org/wiki/File:Human_skull_front_simplified_(bones).svg) | Mariana Ruiz Villarreal (LadyofHats) | Közkincs (public domain) |
| `skull_side.svg` | [Human skull side simplified (bones).svg](https://commons.wikimedia.org/wiki/File:Human_skull_side_simplified_(bones).svg) | Mariana Ruiz Villarreal (LadyofHats) | Közkincs (public domain) |

## Módosítások

- Eltávolítottuk a feliratokat, a mutatóvonalakat, a jelmagyarázatot, a fehér hátteret, a szerkesztőprogramok metaadatait és minden nem rajzi elemet; a nézetmezőt a rajzra vágtuk, a számokat egy tizedesre kerekítettük.
- A kézrajz áttetsző (fehér alapra készült) színeit átlátszatlan, előre kevert színekre cseréltük, hogy sötét háttéren is látsszon.
- Az appban a rajzok szürke-szépia szűrőt kapnak (`.anat` a `src/style.css`-ben), hogy illeszkedjenek a csonttónushoz.
- A kézhát nézet a tenyér nézet tükörképe; a talp nézet – amíg a DBCLS talpi rajza (`202110 Plantar view of bones of right foot.svg`, ugyanazzal a licenccel) nincs letöltve – a felülnézeti lábrajz tükörképe. Ha a `foot_sole.svg` fájl bekerül ide, az app automatikusan azt használja.

A CC BY 4.0 rajz forrásmegjelölése az appban is látszik (Tudás → Kéz és láb, pont oldal → Közeli).
