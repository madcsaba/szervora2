"""Szervóra 2.0 build: a src/ fájlokból összefűzi az index.html-t.

Sorrend: core.js, views2.js (útválasztó előtti rész), sk3d.js, legacy.js, views2.js útválasztó.
Minden forrás a src/ mappában van; az 1.x webapp (legacy_webapp1x) már nem kell.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / 'src'
read = lambda name: (SRC / name).read_text(encoding='utf8').rstrip('\n')

v2 = read('views2.js') + '\n'
mark = '/* ================= útválasztó ================= */'
assert v2.count(mark) == 1, 'views2.js: az útválasztó jelölő pontosan egyszer szerepeljen'
a, b = v2.split(mark)
js = '\n'.join([read('core.js'), a, read('sk3d.js') + '\n', '/* ---- átvett nézetek és motorok (1.x) ---- */', read('legacy.js') + '\n', mark + b])
css = (SRC / 'style.css').read_text(encoding='utf8')

# Betűtípusok beágyazva (fonts/, lásd tools/fetch_fonts.py): nincs külső kérés megnyitáskor.
import base64, re
FONTS = ROOT / 'fonts'
fonts_css = re.sub(r'url\(([\w.-]+\.woff2)\)',
                   lambda m: 'url(data:font/woff2;base64,' + base64.b64encode((FONTS / m.group(1)).read_bytes()).decode() + ')',
                   (FONTS / 'fonts.css').read_text(encoding='utf8'))
covered = set((FONTS / 'charset.txt').read_text(encoding='utf8'))
text = ''.join((ROOT / 'lang' / n).read_text(encoding='utf8') for n in ('hu.js', 'en.js')) + js
missing = sorted({c for c in text if ord(c) > 0x7e and c not in covered
                  and not 0x300 <= ord(c) <= 0x36f and not 0xfe00 <= ord(c) <= 0xfe0f and not ord(c) >= 0x1f000})
if missing:
    print('FIGYELEM: a betűtípus nem fedi le ezeket a karaktereket (bővítsd a CHARS-t a tools/fetch_fonts.py-ban):', ''.join(missing))
html = f'''<!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F6FBF6">
<title>Szervóra 2.0</title>
<style>
{fonts_css}
{css}
</style>
</head>
<body>
<div id="app"><main id="view"></main></div>
<nav class="tabs" id="nav"></nav>
<script src="lang/hu.js"></script>
<script src="lang/en.js"></script>
<script>
{{
{js}
}}
</script>
</body>
</html>
'''
(ROOT / 'index.html').write_text(html, encoding='utf8')
print('index.html', len(html), 'karakter')
