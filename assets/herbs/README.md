# Növényrajzok – forrás és licenc

Ide kerülnek a Teák és fűszerek lap botanikai rajzai: `<növény-azonosító>.jpg` (kicsinyített, kb. 240 px széles), és `credits.json` (fájlonként: eredeti Commons-fájl, szerző, dátum, licenc, `credit` = az appban megjelenő forrássor). A build (`build.py`) data URI-ként ágyazza be őket (`HERB_IMG`, `HERB_CR`). Ha egy növénynek nincs rajza, az app egy semleges ikont mutat.

Csak közkincs (public domain) vagy szabad licencű (CC BY / CC BY-SA, forrásmegjelöléssel) rajz kerülhet ide, elsősorban 19. századi botanikai táblák (pl. Köhler: Medizinal-Pflanzen, 1887; Thomé: Flora von Deutschland, 1885) a Wikimedia Commonsról.
