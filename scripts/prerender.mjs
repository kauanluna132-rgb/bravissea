import { gzipSync } from 'node:zlib';
import {readFileSync,writeFileSync,mkdirSync,readdirSync} from 'node:fs';
import {dirname} from 'node:path';
import {render,getSeo,seoPaths} from '../dist-ssr/entry-server.js';
const origin='https://bravissea.com.br';
const escape=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const shell=readFileSync('dist/index.html','utf8');
const pages={};
for(const path of [...seoPaths,'/__404']) {
 const seo=getSeo(path);
 let html=shell.replace(/<title>[\s\S]*?<\/title>/,'').replace(/<meta\s+(?:name|property)="(?:description|keywords|author|robots|og:[^"]+|twitter:[^"]+)"[^>]*>/g,'').replace(/<link\s+rel="canonical"[^>]*>/g,'');
 const meta=`<title>${escape(seo.title)}</title>\n<meta name="description" content="${escape(seo.description)}"><meta name="robots" content="${escape(seo.robots)}"><link rel="canonical" href="${escape(seo.canonical)}">`;
 const openGraph=Object.entries({'og:title':seo.title,'og:description':seo.description,'og:url':seo.canonical,'og:locale':'pt_BR','og:site_name':'Bravissea','og:type':'website'}).map(([key,value])=>`<meta property="${key}" content="${escape(value)}">`).join('')+seo.images.map(image=>`<meta property="og:image" content="${escape(image)}">`).join('');
 const twitter=Object.entries({'twitter:card':'summary_large_image','twitter:title':seo.title,'twitter:description':seo.description,'twitter:image':seo.image}).map(([key,value])=>`<meta name="${key}" content="${escape(value)}">`).join('');
 const schema=`<script id="bravissea-schema" type="application/ld+json">${JSON.stringify(seo.schema).replaceAll('<','\\u003c')}</script>`;
 html=html.replace('</head>',meta+openGraph+twitter+schema+'</head>').replace('<div id="root"></div>',`<div id="root">${render(path)}</div>`);
 const file=path==='/__404'?'404.html':path==='/'?'index.html':path.slice(1)+'/index.html';
 mkdirSync(dirname('dist/'+file),{recursive:true});writeFileSync('dist/'+file,html);if(path!='/__404')pages[path]=file;
}
writeFileSync('server/pages.json',JSON.stringify(pages));
writeFileSync('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${seoPaths.map(path=>`<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>`);
console.log(`Pre-rendered ${seoPaths.length} public pages and a true 404.`);

for(const file of readdirSync('dist',{recursive:true}))if(/\.(html|css|js|xml|txt)$/.test(file))writeFileSync('dist/'+file+'.gz',gzipSync(readFileSync('dist/'+file),{level:9}));
