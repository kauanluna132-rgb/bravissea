const {test}=require('node:test');
const assert=require('node:assert/strict');
const ts=require('typescript');const vm=require('node:vm');const fs=require('node:fs');
function page(url,choices,storage=new Map()) {
 const location=new URL(url);const events={};const module={exports:{}};
 const code=ts.transpileModule(fs.readFileSync('src/lib/attribution.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
 vm.runInNewContext(code,{module,exports:module.exports,require:()=>({canTrack:async purpose=>choices[purpose],readChoice:purpose=>choices[purpose]?"granted":"denied"}),URL,URLSearchParams,Date,Promise,JSON,Object,location,document:{referrer:'https://www.google.com/search?q=private'},window:{addEventListener:(name,fn)=>events[name]=fn},localStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)}});
 module.exports.startAttribution();return module.exports;
}
test('captures allowed fields, strips sensitive URL, retains campaign after navigation',async()=>{
 const store=new Map(),choices={analytics:true,advertising:true};
 const first=await page('https://site.test/barco?utm_source=meta&utm_campaign=verao&fbclid=abc&email=private',choices,store).getAttribution();
 assert.equal(first.utmSource,'meta');assert.equal(first.fbclid,'abc');assert.equal(first.landingPath,'/barco');assert.ok(!JSON.stringify(first).includes('private'));
 const next=await page('https://site.test/outro',choices,store).getAttribution();assert.equal(next.utmCampaign,'verao');
});
test('denial and withdrawal remove click IDs without replaying the URL after later grant',async()=>{
 const choices={analytics:true,advertising:false};const p=page('https://site.test/?utm_source=google&gclid=secret',choices);
 assert.equal((await p.getAttribution()).gclid,undefined);choices.advertising=true;assert.equal((await p.getAttribution()).gclid,undefined);
 const c={analytics:true,advertising:true};const q=page('https://site.test/?ttclid=abc',c);assert.equal((await q.getAttribution()).ttclid,'abc');c.advertising=false;assert.equal((await q.getAttribution()).ttclid,undefined);
});
test('explicit submission consent captures entry UTMs after initial block and navigation',async()=>{
 const choices={analytics:false,advertising:false};const p=page('https://site.test/?utm_source=meta&utm_campaign=verao&fbclid=abc',choices);
 assert.deepEqual(JSON.parse(JSON.stringify(await p.getAttribution())),{});
 choices.analytics=true;choices.advertising=true;
 const result=await p.getAttribution(true);
 assert.equal(result.utmSource,'meta');assert.equal(result.utmCampaign,'verao');assert.equal(result.fbclid,'abc');
});

test('lead URL attribution is automatic without granting cookie consent or persisting identifiers',()=>{
 const store=new Map();const choices={analytics:false,advertising:false};
 const p=page('https://site.test/barco?utm_source=google&utm_campaign=verao&gclid=abc&email=private',choices,store);
 const result=p.getLeadAttribution();assert.equal(result.utmSource,'google');assert.equal(result.gclid,'abc');assert.ok(!JSON.stringify(result).includes('private'));
 assert.equal(JSON.parse(result.attributionConsent).advertising,'denied');assert.equal(choices.advertising,false);
});
