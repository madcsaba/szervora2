import hashlib, re
html=open('index.html',encoding='utf8').read()
hu=open('lang/hu.js',encoding='utf8').read(); en=open('lang/en.js',encoding='utf8').read()
html=html.replace('<script src="lang/hu.js"></script>','<script>\n'+hu+'\n</script>').replace('<script src="lang/en.js"></script>','<script>\n'+en+'\n</script>')
head_add='<link rel="manifest" href="manifest.webmanifest">\n<link rel="apple-touch-icon" href="icon-192.png">\n<link rel="icon" type="image/png" href="icon-192.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="mobile-web-app-capable" content="yes">\n'
html=html.replace('<title>Szervóra 2.0</title>','<title>Szervóra 2.0</title>\n'+head_add)
html=html.replace('</body>',"<script>try{if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(function(){})}catch(e){}</script>\n</body>")
open('dist/szervora.html','w',encoding='utf8').write(html); open('dist/pwa/index.html','w',encoding='utf8').write(html)
# A gyorsítótár neve a tartalom hash-e: minden új build után frissül a telepített PWA is.
ver = hashlib.sha256(html.encode('utf8')).hexdigest()[:10]
sw = re.sub(r"const C='szervora-[^']*'", f"const C='szervora-{ver}'", open('dist/pwa/sw.js', encoding='utf8').read())
open('dist/pwa/sw.js', 'w', encoding='utf8').write(sw)
print('dist kész, sw cache:', ver)
