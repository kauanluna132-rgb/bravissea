import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {leadEvent,startTikTok} from '../server/tiktok.mjs';
const input={allowed:true,page:'https://bravissea.com.br/?email=secret#phone',ttclid:'click_123',email:'private@example.com',phone:'private'};
test('only permitted, allowlisted SubmitForm data; no PII, URL query or quote revenue',()=>{
 assert.equal(leadEvent({...input,allowed:false},'id',1000),null);
 assert.equal(leadEvent({...input,page:'https://evil.example/'},'id',1000),null);
 const event=leadEvent(input,'id',1000,'test-agent');
 assert.deepEqual(event,{event:'SubmitForm',event_id:'id',event_time:1,user:{user_agent:'test-agent',ttclid:'click_123'},page:{url:'https://bravissea.com.br/'}});
});
test('disabled destination never queues old leads',()=>{
 const db=new DatabaseSync(':memory:');const sender=startTikTok(db,{});
 sender.enqueue(input,'id',Date.now(),'test');
 assert.equal(db.prepare('SELECT count(*) AS n FROM tiktok_events').get().n,0);
});
test('durable dedup, retry stable event identity and scrub on successful delivery',async()=>{
 const db=new DatabaseSync(':memory:');const calls=[];
 const sender=startTikTok(db,{TIKTOK_EVENTS_ENABLED:'true',TIKTOK_PIXEL_ID:'DC2A9U3C77U0A5LSGGH0',TIKTOK_ACCESS_TOKEN:'test-secret'},async(url,opts)=>{
  calls.push(JSON.parse(opts.body));if(calls.length===1) throw new Error('network down');return {ok:true,json:async()=>({code:0})};
 });
 const now=Date.now();sender.enqueue(input,'unique',now,'test');sender.enqueue(input,'unique',now,'test');
 await sender.flush(); assert.equal(db.prepare('SELECT status FROM tiktok_events').get().status,'pending');
 db.exec('UPDATE tiktok_events SET next_attempt=0');await sender.flush();
 assert.deepEqual(calls[0].data,calls[1].data);assert.equal(calls[0].data[0].event_id,'unique');
 assert.equal(db.prepare('SELECT payload FROM tiktok_events').get().payload,'{}');
 await sender.flush();assert.equal(calls.length,2);
});

test('advanced matching normalizes and hashes contact identifiers; only allowlisted keys',()=>{
 const contact={email:' USER@Example.COM ',phone:'(21) 99999-1234',name:'secret',message:'private'};
 const a=leadEvent({...input,ttp:'cookie_123',locale:'pt-BR'},'id',1000,'agent',contact,'8.8.8.8');
 const b=leadEvent(input,'other',2000,'agent',{email:'user@example.com',phone:'+5521999991234'});
 assert.match(a.user.email,/^[a-f0-9]{64}$/);assert.match(a.user.phone,/^[a-f0-9]{64}$/);
 assert.equal(a.user.email,b.user.email);assert.equal(a.user.phone,b.user.phone);assert.equal(a.user.external_id,b.user.external_id);
 assert.equal(a.user.ip,'8.8.8.8');assert.equal(a.user.ttp,'cookie_123');assert.equal(a.user.locale,'pt_BR');
 assert.ok(!JSON.stringify(a).includes('user@example.com'));assert.ok(!JSON.stringify(a).includes('99999'));
 assert.equal(a.user.name,undefined);assert.equal(a.user.message,undefined);
 assert.equal(leadEvent({...input,allowed:false},'id',1000,'agent',contact),null);
});
test('proxy address uses last hop, excludes private addresses and ignores spoofed body data',async()=>{
 const {clientIP}=await import('../server/tiktok.mjs');
 assert.equal(clientIP({socket:{remoteAddress:'172.18.0.2'},headers:{'x-forwarded-for':'1.1.1.1, 8.8.8.8'}}),'8.8.8.8');
 assert.equal(clientIP({socket:{remoteAddress:'8.8.4.4'},headers:{'x-forwarded-for':'1.1.1.1'}}),'8.8.4.4');
 assert.equal(clientIP({socket:{remoteAddress:'172.18.0.2'},headers:{}}),'');
});
