const CACHE='infinia-calendar-v3';
const STATIC=['./','./index.html','./config.js','./manifest.webmanifest'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(STATIC)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  const u=new URL(event.request.url);
  // Never cache OAuth, identity, userinfo, or private Calendar API responses.
  if(u.hostname.endsWith('googleapis.com')||u.hostname==='accounts.google.com')return;
  event.respondWith((async()=>{
    try{
      const r=await fetch(event.request,{cache:'no-store'});
      if(r.ok){const c=await caches.open(CACHE);c.put(event.request,r.clone())}
      return r;
    }catch(err){
      const hit=await caches.match(event.request);if(hit)return hit;throw err;
    }
  })());
});
