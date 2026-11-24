import http from 'node:http';
import { startTikTok, clientIP } from './tiktok.mjs';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { createHash } from 'node:crypto';
mkdirSync('/data', { recursive: true });
const db = new DatabaseSync('/data/leads.sqlite');
db.exec('PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS leads(id TEXT PRIMARY KEY, fingerprint TEXT, payload TEXT, synced INTEGER DEFAULT 0, created INTEGER); CREATE TABLE IF NOT EXISTS rates(ip TEXT PRIMARY KEY, count INTEGER, since INTEGER)');
const tiktok = startTikTok(db);
const prices=JSON.parse(readFileSync(new URL('./prices.json',import.meta.url),'utf8'));
const crm = process.env.TWENTY_URL, key = process.env.TWENTY_API_KEY;
let syncing = false;
async function sync() {
 if (syncing || !crm || !key) return;
 syncing = true;
 try { for (const row of db.prepare('SELECT * FROM leads WHERE synced=0 ORDER BY created LIMIT 20').all()) {
  const headers = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  const existing = await fetch(`${crm}/rest/opportunities/${row.id}`, { headers, signal: AbortSignal.timeout(15000) });
  if (existing.ok) { db.prepare('UPDATE leads SET synced=1,payload=? WHERE id=?').run('{}',row.id); continue; }
  if (existing.status !== 404) throw new Error(`CRM lookup ${existing.status}`);
  const r = await fetch(`${crm}/rest/opportunities`, { method:'POST',headers,body:row.payload,signal:AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`CRM create ${r.status}`);
  db.prepare('UPDATE leads SET synced=1,payload=? WHERE id=?').run('{}',row.id);
 } } catch (e) { console.error('Lead sync pending:',e.message); } finally { syncing=false; }
}
setInterval(sync,15000); void sync();
function reply(res,code,data) { res.writeHead(code,{'Content-Type':'application/json','Cache-Control':'no-store'}); res.end(JSON.stringify(data)); }
http.createServer(async(req,res)=>{
 if(req.url==='/healthz') return reply(res,200,{ok:true});
 if(req.url==='/api/events' && req.method==='POST') {
  try {
   if(req.headers.origin!==`https://${req.headers.host}`) return reply(res,403,{error:'Invalid origin'});
   let raw=''; for await(const chunk of req) {raw+=chunk;if(Buffer.byteLength(raw)>4000)return reply(res,413,{});}
   const p=JSON.parse(raw);
   if(!['ViewContent','Contact'].includes(p.event) || !/^[0-9a-f-]{36}$/i.test(p.id||'')) return reply(res,400,{});
   const ip=clientIP(req),now=Date.now(),rateKey='event:'+(ip||req.socket.remoteAddress);
   const rate=db.prepare('SELECT * FROM rates WHERE ip=?').get(rateKey);
   if(rate && now-rate.since<60000 && rate.count>=120) return reply(res,429,{});
   db.prepare('INSERT OR REPLACE INTO rates VALUES (?,?,?)').run(rateKey,rate&&now-rate.since<60000?rate.count+1:1,rate&&now-rate.since<60000?rate.since:now);
   const properties={};
   if(typeof p.vesselId==='string') { const vessel=prices[p.vesselId];if(!vessel)return reply(res,400,{});properties.contents=[{content_id:p.vesselId,content_name:vessel.name}];properties.content_type='product'; }
   if(['hero','footer','floating_button','how_it_works','catalog','vessel_card','tour_routes','booking_form'].includes(p.source)) properties.description=p.source;
   tiktok.enqueue(p.measurement,p.id,now,req.headers['user-agent'],{},ip,p.event,properties);
   reply(res,202,{ok:true});void tiktok.flush();
  } catch {reply(res,400,{});} return;
 }
 if(req.url==='/api/leads' && req.method==='POST') {
  try {
   if(req.headers.origin && req.headers.origin !== `http://${req.headers.host}` && req.headers.origin !== `https://${req.headers.host}`) return reply(res,403,{error:'Origem inválida'});
   let raw=''; for await(const chunk of req) { raw+=chunk; if(Buffer.byteLength(raw)>32000) return reply(res,413,{error:'Mensagem muito longa'}); }
   const p=JSON.parse(raw), txt=(k,max=200)=> typeof p[k]==='string'?p[k].trim().slice(0,max):'';
   if(txt('website')) return reply(res,200,{ok:true});
   const name=txt('name'), phone=txt('phone'), email=txt('email');
   if(name.length<2 || phone.replace(/\D/g,'').length<10 || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) || !/^[0-9a-f-]{36}$/i.test(p.requestId||'')) return reply(res,400,{error:'Confira nome, telefone e email.'});
   const now=Date.now(), ip=req.socket.remoteAddress;
   const rate=db.prepare('SELECT * FROM rates WHERE ip=?').get(ip);
   if(rate && now-rate.since<60000 && rate.count>=30) return reply(res,429,{error:'Aguarde um minuto e tente novamente.'});
   db.prepare('INSERT OR REPLACE INTO rates VALUES (?,?,?)').run(ip,rate&&now-rate.since<60000?rate.count+1:1,rate&&now-rate.since<60000?rate.since:now);
   const fingerprint=createHash('sha256').update(JSON.stringify([name,phone,email,txt('vesselId'),txt('vesselName'),txt('date'),txt('duration'),txt('guests'),txt('route'),txt('message',3000)])).digest('hex');
   const prior=db.prepare('SELECT id FROM leads WHERE id=? OR (fingerprint=? AND created>?)').get(p.requestId,fingerprint,now-600000);
   if(prior) return reply(res,200,{ok:true,id:prior.id});
   const vessel=prices[txt('vesselId')];
   if(txt('vesselId')&&!vessel) return reply(res,400,{error:'Embarcação inválida'});
   const payload={id:p.requestId,name:`${txt('vesselName')||'Contato'} — ${name}`,stage:'NEW',leadName:name,leadPhone:phone,leadEmail:email,vesselName:txt('vesselName'),tourDuration:txt('duration'),guestCount:txt('guests'),tourRoute:txt('route'),leadMessage:txt('message',3000),leadSource:'Site Bravissea'};
   if(vessel) {payload.vesselName=vessel.name;payload.amount={amountMicros:vessel.amountMicros,currencyCode:'BRL'};}
   const attributionKeys=['utmSource','utmMedium','utmCampaign','utmContent','utmTerm','utmId','fbclid','gclid','gbraid','wbraid','ttclid','campaignId','adGroupId','adId','placement','landingPath','referrerHost','firstTouch','lastTouch','attributionConsent'];
   if(p.attribution && typeof p.attribution==='object') for(const field of attributionKeys) if(typeof p.attribution[field]==='string') payload[field]=p.attribution[field].slice(0,field.endsWith('Touch')?7000:500);
   if(/^\d{4}-\d{2}-\d{2}$/.test(txt('date'))) payload.tourDate=txt('date');
   db.exec('BEGIN IMMEDIATE');
   try {
    db.prepare('INSERT INTO leads(id,fingerprint,payload,created) VALUES (?,?,?,?)').run(p.requestId,fingerprint,JSON.stringify(payload),now);
    tiktok.enqueue(p.measurement,p.requestId,now,req.headers['user-agent'],{email,phone},clientIP(req));
    db.exec('COMMIT');
   } catch(e) { db.exec('ROLLBACK'); throw e; }
   reply(res,202,{ok:true,id:p.requestId}); void sync(); void tiktok.flush();
  } catch { reply(res,400,{error:'Não foi possível receber sua solicitação.'}); }
  return;
 }
 if(req.url?.startsWith('/api/')) return reply(res,404,{error:'Not found'});
 const path=resolve('dist','.'+new URL(req.url,'http://localhost').pathname);
 if(!path.startsWith(resolve('dist')+'/') && path!==resolve('dist')) return reply(res,403,{});
 const file=existsSync(path)&&extname(path)?path:resolve('dist/index.html');
 try { const data=readFileSync(file); const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'}; res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(data); } catch { res.writeHead(404);res.end(); }
}).listen(3000,'0.0.0.0');
