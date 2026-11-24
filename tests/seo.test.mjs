import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createServer} from 'node:http';
import {serveStatic} from '../server/static.mjs';
const pages=JSON.parse(readFileSync('server/pages.json','utf8'));
test('every indexable route has complete static content, one H1, unique metadata and valid matching schema',()=>{
 const titles=new Set();assert.equal(Object.keys(pages).length,24);
 for(const [path,file] of Object.entries(pages)){
  const html=readFileSync('dist/'+file,'utf8');
  assert.match(html,/<html lang="pt-BR">/);assert.equal((html.match(/<h1\b/g)||[]).length,1,path);
  const title=html.match(/<title>(.*?)<\/title>/)[1];assert.ok(!titles.has(title),path);titles.add(title);
  assert.ok(html.includes(`rel="canonical" href="https://bravissea.com.br${path}"`));
  assert.match(html,/id="root"><div/);assert.ok(!html.includes('lovable.dev/opengraph'));
  const schema=JSON.parse(html.match(/id="bravissea-schema" type="application\/ld\+json">(.*?)<\/script>/)[1]);
  const page=schema['@graph'].find(x=>x['@type']==='WebPage');assert.equal(page.url,'https://bravissea.com.br'+path);
  assert.ok(!schema['@graph'].some(x=>x.aggregateRating),'No unverified review markup');
  for(const link of html.matchAll(/href="(\/(?:vessel\/[^"#?]+|aluguel-de-[^"#?]+|lancha-privada-[^"#?]+))"/g))assert.ok(pages[link[1]],link[1]);
 }
});
test('sitemap contains every canonical page and robots declares it',()=>{
 const xml=readFileSync('dist/sitemap.xml','utf8');assert.match(xml,/^<\?xml/);assert.equal((xml.match(/<loc>/g)||[]).length,24);
 for(const path of Object.keys(pages))assert.ok(xml.includes(`<loc>https://bravissea.com.br${path}</loc>`));
 assert.match(readFileSync('dist/robots.txt','utf8'),/Sitemap: https:\/\/bravissea.com.br\/sitemap.xml/);
});
test('real HTTP routing distinguishes valid pages, unknown URLs, redirects, cache and HEAD',async()=>{
 const server=createServer(serveStatic);await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base=`http://127.0.0.1:${server.address().port}`;
 try {
  for(const path of ['/','/vessel/mcell','/aluguel-de-lancha-rio-de-janeiro']){const r=await fetch(base+path);assert.equal(r.status,200);assert.match(await r.text(),/<h1\b/);}
  const missing=await fetch(base+'/nao-existe');assert.equal(missing.status,404);assert.equal(missing.headers.get('x-robots-tag'),'noindex');
  assert.equal((await fetch(base+'/assets/missing.js')).status,404);
  const redirect=await fetch(base+'/vessel/mcell/?utm_source=teste',{redirect:'manual'});assert.equal(redirect.status,301);assert.equal(redirect.headers.get('location'),'/vessel/mcell?utm_source=teste');
  const map=await fetch(base+'/sitemap.xml');assert.match(map.headers.get('content-type'),/xml/);
  assert.equal((await fetch(base+'/',{method:'HEAD'})).status,200);
 }finally{await new Promise(resolve=>server.close(resolve));}
});
test('homepage uses the requested title, a general summary, varied original images and excludes fleet card snippets',()=>{
 const html=readFileSync('dist/index.html','utf8');
 assert.ok(html.includes('<title>Aluguel de Lanchas, Iates e Catamarãs no Rio de Janeiro | Bravissea</title>'));
 assert.match(html,/<meta name="description" content="Bravissea: aluguel de lanchas, iates e catamarãs/);
 assert.match(html,/<div id="embarcações" data-nosnippet="">/);
 const images=[...html.matchAll(/<meta property="og:image" content="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(new Set(images).size,3);assert.ok(images.every(image=>image.includes('/lovable-uploads/')&&image.endsWith('.png')));
 for(const file of Object.values(pages))assert.ok(!readFileSync('dist/'+file,'utf8').includes('/optimized/'),file);
 const schema=JSON.parse(html.match(/id="bravissea-schema" type="application\/ld\+json">(.*?)<\/script>/)[1]);
 assert.equal(schema['@graph'].find(x=>x['@type']==='WebPage').image.length,3);
 assert.ok(!schema['@graph'].some(x=>x['@type']==='ItemList'));
});
