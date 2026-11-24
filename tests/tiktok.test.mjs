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
