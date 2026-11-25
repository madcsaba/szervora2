const C='szervora-ef54100320';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
const put=(q,res)=>{if(res.ok&&new URL(q.url).origin===location.origin){const cp=res.clone();caches.open(C).then(c=>c.put(q,cp)).catch(()=>{})}return res};
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
if(q.mode==='navigate'){e.respondWith(fetch(q).then(r=>put(q,r)).catch(()=>caches.match(q).then(r=>r||caches.match('index.html'))));return}
e.respondWith(caches.match(q).then(r=>r||fetch(q).then(res=>put(q,res))))});
