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
han = '%E5%BF%83%E6%9C%A8%E7%81%AB%E5%9C%9F%E9%87%91%E6%B0%B4%E8%83%86%E8%82%9D%E8%82%BA%E5%A4%A7%E8%82%A0%E8%83%83%E8%84%BE%E5%B0%8F%E8%86%80%E8%83%B1%E8%82%BE%E5%8C%85%E4%B8%89%E7%84%A6'
html = f'''<!DOCTYPE html>
<html lang="hu">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#F6FBF6">
<title>Szervóra 2.0</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@600;700;800&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600&text={han}&display=swap">
<style>
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
