# Szervóra 2.0 – prototípus

Lásd: CLAUDE.md (szerkezet, szabályok, következő lépések).

Megjegyzés: a build.py jelenleg az 1.x webapp fájljából (legacy_webapp1x/index.html) olvassa a core és legacy részeket.
A src/core.js és src/legacy.js ugyanezek kimásolt változata: első lépésként a build.py-t érdemes átírni,
hogy ezekből a fájlokból dolgozzon, és utána a legacy_webapp1x függőség megszüntethető.
