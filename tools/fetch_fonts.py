"""Betűtípusok letöltése a Google Fonts-ról a repóba (egyszeri, kézi lépés).

A build ezután nem hív külső szervert: a build.py a fonts/ mappából
base64-ként ágyazza be a betűtípusokat, így az app megnyitása nem küld
adatot (pl. IP-címet) harmadik félnek. Méret miatt csak a CHARS-ban
felsorolt karaktereket kérjük le (latin, magyar, pinyin, írásjelek), plusz
a kínai írásjegyeket. Ha új karakter kell, bővítsd a CHARS-t és futtasd újra;
a build.py figyelmeztet, ha a szövegekben lefedetlen karakter van.

Futtatás: python3 tools/fetch_fonts.py
"""
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'fonts'
UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36'
# A felületen használt kínai írásjegyek: elemek és szervek, valamint az asztrológia
# égi törzsei és földi ágai.
HAN = '心木火土金水胆肝肺大肠胃脾小膀胱肾包三焦' + '甲乙丙丁戊己庚辛壬癸' + '子丑寅卯辰巳午未申酉戌亥' + '米'
CHARS = (''.join(chr(c) for c in range(0x20, 0x7f)) + ''.join(chr(c) for c in range(0xa0, 0x100))
         + 'ŐőŰűĀāĒēĪīŌōŪūǍǎĚěǏǐǑǒǓǔǕǖǗǘǙǚǛǜ‐–—‘’‚“”„•…′″‹›€←↑→↓−✓')
SOURCES = [
    ('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700'
     '&family=Inter+Tight:wght@600;700;800&display=swap&text=' + urllib.request.quote(CHARS)),
    ('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600&display=swap&text='
     + urllib.request.quote(HAN)),
]


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': UA})) as r:
        return r.read()


def main():
    OUT.mkdir(exist_ok=True)
    for f in OUT.glob('*.woff2'):
        f.unlink()
    faces = {}  # (család, forrás-URL) -> {vastagságok}, a blokk többi része
    for url in SOURCES:
        text = get(url).decode('utf8')
        for m in re.finditer(r'@font-face \{.*?\}', text, re.S):
            block = m.group(0)
            fam = re.search(r"font-family: '([^']+)'", block).group(1)
            src = re.search(r'url\(([^)]+)\)', block).group(1)
            w = int(re.search(r'font-weight: (\d+)', block).group(1))
            rng = re.search(r'unicode-range: ([^;]+);', block).group(1)
            faces.setdefault((fam, src), {'w': set(), 'rng': rng})['w'].add(w)
    css = []
    # Változó betűtípus: egy fájl és egy @font-face családonként, vastagság-tartománnyal,
    # hogy a build ne ágyazza be többször ugyanazt.
    for (fam, src), f in faces.items():
        name = fam.lower().replace(' ', '-') + '.woff2'
        (OUT / name).write_bytes(get(src))
        lo, hi = min(f['w']), max(f['w'])
        css.append(f"@font-face {{\n  font-family: '{fam}';\n  font-style: normal;\n"
                   f"  font-weight: {lo if lo == hi else f'{lo} {hi}'};\n  font-display: swap;\n"
                   f"  src: url({name}) format('woff2');\n  unicode-range: {f['rng']};\n}}")
    (OUT / 'fonts.css').write_text(
        '/* tools/fetch_fonts.py generálta – ne szerkeszd kézzel. Licenc: SIL OFL 1.1 (lásd fonts/OFL-*.txt) */\n'
        + '\n'.join(css) + '\n', encoding='utf8')
    (OUT / 'charset.txt').write_text(CHARS + HAN + '\n', encoding='utf8')
    for n in sorted(OUT.glob('*.woff2')):
        print(n.name, n.stat().st_size, 'bájt')


if __name__ == '__main__':
    main()
