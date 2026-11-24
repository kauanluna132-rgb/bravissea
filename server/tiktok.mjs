// Server-only Events API. Contact details and quote values never enter this payload.
export function leadEvent(input, id, now, userAgent = '') {
 if (input?.allowed !== true) return null;
 let page;
 try {
  const url = new URL(input.page);
  if (url.origin !== 'https://bravissea.com.br') return null;
  page = { url: `${url.origin}${url.pathname}` };
 } catch { return null; }
 const user = { user_agent: String(userAgent).slice(0,500) };
 if (typeof input.ttclid === 'string' && /^[a-zA-Z0-9_\-.]{1,500}$/.test(input.ttclid)) user.ttclid = input.ttclid;
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
  enqueue(input,id,now,userAgent) {
   if(!enabled) return;
   const event=leadEvent(input,id,now,userAgent);
   if(event) db.prepare('INSERT OR IGNORE INTO tiktok_events(id,payload,created) VALUES (?,?,?)').run(id,JSON.stringify(event),now);
  }, flush,
 };
}
