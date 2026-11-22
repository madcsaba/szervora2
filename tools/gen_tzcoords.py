"""Időzóna → koordináta tábla generálása (src/tzcoords.js) a tz adatbázisból.

A naplemente-számításhoz a böngésző időzónáját (pl. Europe/Budapest) a zóna
fővárosának koordinátájára fordítjuk: így nincs hálózati kérés és nincs
helymeghatározási engedély. Forrás: zone.tab (+ tzdata.zi régi nevek).
Futtatás: python3 tools/gen_tzcoords.py [zoneinfo mappa]
"""
import sys
from pathlib import Path

ZI = Path(sys.argv[1] if len(sys.argv) > 1 else '/usr/share/zoneinfo')
OUT = Path(__file__).resolve().parent.parent / 'src' / 'tzcoords.js'


def dms(s, deg_len):
    sign = -1 if s[0] == '-' else 1
    d, m, sec = int(s[1:1 + deg_len]), int(s[1 + deg_len:3 + deg_len]), int(s[3 + deg_len:5 + deg_len] or 0)
    return sign * (d + m / 60 + sec / 3600)


coords = {}
for line in (ZI / 'zone.tab').read_text().splitlines():
    if not line or line.startswith('#'):
        continue
    cc, co, tz = line.split('\t')[:3]
    i = max(co.rfind('+'), co.rfind('-'))
    lat_s, lon_s = co[:i], co[i:]
    coords[tz] = (dms(lat_s, 2), dms(lon_s, 3))
links = 0
zi = ZI / 'tzdata.zi'
if zi.exists():
    for line in zi.read_text().splitlines():
        if line.startswith('L '):
            _, target, alias = line.split()
            if target in coords and alias not in coords:
                coords[alias] = coords[target]; links += 1
body = ';'.join(f'{tz}:{la:.2f},{lo:.2f}' for tz, (la, lo) in sorted(coords.items()))
OUT.write_text('/* tools/gen_tzcoords.py generálta – ne szerkeszd kézzel. Forrás: IANA tz adatbázis (zone.tab, közkincs). */\n'
               f"const TZ_COORDS = '{body}';\n", encoding='utf8')
print(OUT.name, len(coords), 'zóna', links, 'régi név', OUT.stat().st_size, 'bájt')
