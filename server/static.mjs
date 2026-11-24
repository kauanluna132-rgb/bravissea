import {readFileSync,existsSync,statSync} from 'node:fs';
import {resolve,extname} from 'node:path';
const root=resolve('dist');
const pages=JSON.parse(readFileSync(new URL('./pages.json',import.meta.url),'utf8'));
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.ico':'image/x-icon'};
export function serveStatic(req,res) {
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});return res.end();}
 let url;try{url=new URL(req.url,'https://bravissea.com.br');}catch{res.writeHead(400);return res.end();}
 const path=url.pathname;
 if(path==='/404.html'){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8','X-Robots-Tag':'noindex'});return res.end(req.method==='HEAD'?undefined:readFileSync(resolve(root,'404.html')));}
 const cleanIndex=path==='/index.html' ? '/' : path.endsWith('/index.html') ? path.slice(0,-11) : null;
 if(cleanIndex && pages[cleanIndex]){res.writeHead(301,{Location:cleanIndex+url.search});return res.end();}
 if(path.length>1 && path.endsWith('/')) {res.writeHead(301,{Location:path.replace(/\/+$/,'')+url.search});return res.end();}
 if(process.env.NODE_ENV==='production' && req.headers.host?.split(':')[0]!=='bravissea.com.br'){res.writeHead(301,{Location:'https://bravissea.com.br'+path+url.search});return res.end();}
 let file=pages[path] ? resolve(root,pages[path]) : resolve(root,'.'+path);
 let status=200;
 if(!file.startsWith(root+'/') || !existsSync(file) || !statSync(file).isFile()) {file=resolve(root,'404.html');status=404;}
 const ext=extname(file),cache=ext==='.html'?'no-cache':path.startsWith('/assets/')?'public, max-age=31536000, immutable':'public, max-age=86400';
 const headers={'Content-Type':types[ext]||'application/octet-stream','Cache-Control':cache,'X-Content-Type-Options':'nosniff'};
 if(status===404)headers['X-Robots-Tag']='noindex';
 if(/\bgzip\b(?!;q=0\b)/.test(req.headers['accept-encoding']||'')&&existsSync(file+'.gz')) {file+='.gz';headers['Content-Encoding']='gzip';}
 headers.Vary='Accept-Encoding';
 try {const data=readFileSync(file);headers['Content-Length']=data.length;res.writeHead(status,headers);res.end(req.method==='HEAD'?undefined:data);}catch{res.writeHead(500);res.end();}
}
