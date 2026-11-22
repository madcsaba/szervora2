import re
src = open('legacy_webapp1x/index.html', encoding='utf8').read().split('\n')
L = lambda a, b: '\n'.join(src[a-1:b])
core = L(157, 478)
common = L(485, 490)
bm = L(492, 563)
def rep(s, a, b, n=1):
    assert s.count(a) == n, (a, s.count(a)); return s.replace(a, b)
bm = rep(bm, "M.bones = !!(L.csontok && store.get('bones', false));", "M.bones = false; M.skin = true; M.pts = true; M.chOn = true;")
bm = rep(bm, "bgG.style.opacity = M.bones ? .42 : 1;", "bgG.style.opacity = !M.skin ? (M.bones ? .1 : .16) : M.bones ? .42 : 1;")
bm = rep(bm, "cg.innerHTML = M.ch && L.meridianok &&", "cg.innerHTML = M.ch && M.chOn &&")
bm = rep(bm, "M.list.filter((p) => p.v.includes(M.v)).map", "M.list.filter((p) => p.v.includes(M.v) && (M.pts || p.id === M.sel)).map")
bm = rep(bm, "closest('.mapctl,.mapview')", "closest('.mapctl,.mapview,.layerbox')")
elem = L(637, 656)
elem = rep(elem, "top(t('el_details'), '', 'elemek')", "top(t('el_details'), '', 'tudas-graf-' + k)")
elem = rep(elem, '<section class="hero" style', '<section class="hero solid" style')
lex = L(657, 662)
bone = L(693, 693)
tech = L(730, 731) + '\n' + L(753, 775)
br = L(794, 795) + '\n' + L(819, 839)
techv = L(902, 920)
techv = rep(techv, "top(t('tech_title'), t('tech_sub'), 'meridian-sz')", "top(t('tech_title'), t('tech_sub'), 'gyakorlat')")
v2 = open('src/views2.js', encoding='utf8').read()
mark = '/* ================= útválasztó ================= */'
a, b = v2.split(mark)
js = '\n'.join([core, common, bm, a, open('src/sk3d.js', encoding='utf8').read(), '/* ---- átvett nézetek és motorok (1.x) ---- */', elem, lex, bone, tech, br, techv, mark + b])
css = open('src/style.css', encoding='utf8').read()
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
open('index.html', 'w', encoding='utf8').write(html)
open('/tmp/app.js', 'w', encoding='utf8').write('{\n' + js + '\n}')
print(len(html))
