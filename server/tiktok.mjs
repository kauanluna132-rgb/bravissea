import { createHash } from 'node:crypto';
import { isIP } from 'node:net';
const hash = value => createHash('sha256').update(value).digest('hex');
export function normalizePhone(value = '') {
 const raw=String(value).trim(); let digits=raw.replace(/\D/g,'');
 if(raw.startsWith('00')) digits=digits.slice(2);
 if(!raw.startsWith('+') && !raw.startsWith('00') && [10,11].includes(digits.length)) digits='55'+digits;
 return /^[1-9]\d{7,14}$/.test(digits) ? '+'+digits : '';
}
// Trust only the last forwarded hop added by the local reverse proxy, never body IPs.
export function clientIP(req) {
 const peer=(req.socket.remoteAddress||'').replace(/^::ffff:/,'');
 const privatePeer=/^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(peer)||peer==='::1';
 const candidate=privatePeer ? String(req.headers['x-forwarded-for']||'').split(',').at(-1).trim() : peer;
 if(!isIP(candidate) || /^(0\.|10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(candidate) || /^(::|fc|fd|fe80)/i.test(candidate)) return '';
 return candidate;
}
// Hash contact identifiers on the server. Never send names, messages or quote revenue.
export function leadEvent(input, id, now, userAgent = '', contact = {}, ip = '') {
 if (input?.allowed !== true) return null;
 let page;
 try {
  const url = new URL(input.page);
  if (url.origin !== 'https://bravissea.com.br') return null;
  page = { url: `${url.origin}${url.pathname}` };
 } catch { return null; }
 const user = { user_agent: String(userAgent).slice(0,500) };
 if (typeof input.ttclid === 'string' && /^[a-zA-Z0-9_\-.]{1,500}$/.test(input.ttclid)) user.ttclid = input.ttclid;
 const email=String(contact.email||'').trim().toLowerCase();
 const phone=normalizePhone(contact.phone);
 if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) user.email=hash(email);
 if(phone) user.phone=hash(phone);
 if(user.email || user.phone) user.external_id=hash('bravissea:'+ (user.email ? 'email:'+email : 'phone:'+phone));
 if(isIP(ip)) user.ip=ip;
 if(typeof input.ttp==='string' && /^[a-zA-Z0-9_.-]{1,500}$/.test(input.ttp)) user.ttp=input.ttp;
 if(typeof input.locale==='string' && /^[a-z]{2,3}([-_][a-zA-Z]{2,4})?$/.test(input.locale)) user.locale=input.locale.replace('-','_');
 return {event:'SubmitForm',event_id:id,event_time:Math.floor(now/1000),user,page};
}
export function startTikTok(db, env = process.env, send = fetch) {
 db.exec(`CREATE TABLE IF NOT EXISTS tiktok_events(id TEXT PRIMARY KEY,payload TEXT,created INTEGER,attempts INTEGER DEFAULT 0,next_attempt INTEGER DEFAULT 0,status TEXT DEFAULT 'pending')`);
 const enabled = env.TIKTOK_EVENTS_ENABLED === 'true' && env.TIKTOK_PIXEL_ID === 'DC2A9U3C77U0A5LSGGH0' && !!env.TIKTOK_ACCESS_TOKEN;
 let busy = false;
 async function flush() {
  if (!enabled || busy) return;
  busy = true;
  try {
   const now=Date.now();
   db.prepare("UPDATE tiktok_events SET status='expired',payload='{}' WHERE status='pending' AND created<?").run(now-48*3600000);
   for(const row of db.prepare("SELECT * FROM tiktok_events WHERE status='pending' AND next_attempt<=? ORDER BY created LIMIT 10").all(now)) {
    try {
     const body={event_source:'web',event_source_id:env.TIKTOK_PIXEL_ID,data:[JSON.parse(row.payload)]};
     if(env.TIKTOK_TEST_EVENT_CODE) body.test_event_code=env.TIKTOK_TEST_EVENT_CODE;
     const res=await send('https://business-api.tiktok.com/open_api/v1.3/event/track/',{method:'POST',headers:{'Content-Type':'application/json','Access-Token':env.TIKTOK_ACCESS_TOKEN},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)});
     const result=await res.json();
     if(!res.ok || result.code!==0) throw new Error('TikTok rejected event');
     db.prepare("UPDATE tiktok_events SET status='sent',payload='{}' WHERE id=?").run(row.id);
    } catch {
     db.prepare('UPDATE tiktok_events SET attempts=attempts+1,next_attempt=? WHERE id=?').run(now+Math.min(3600000,15000*2**Math.min(row.attempts,8)),row.id);
     console.error('TikTok event pending retry');
    }
   }
  } finally { busy=false; }
 }
 const timer=setInterval(()=>void flush(),15000); timer.unref(); void flush();
 return {
  enqueue(input,id,now,userAgent,contact,ip) {
   if(!enabled) return;
   const event=leadEvent(input,id,now,userAgent,contact,ip);
   if(event) db.prepare('INSERT OR IGNORE INTO tiktok_events(id,payload,created) VALUES (?,?,?)').run(id,JSON.stringify(event),now);
  }, flush,
 };
}
