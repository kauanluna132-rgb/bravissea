const {test}=require('node:test');const assert=require('node:assert/strict');const ts=require('typescript');const fs=require('node:fs');const vm=require('node:vm');
test('automatic measurement requires neither region network calls nor saved browser choices',async()=>{
 const module={exports:{}};
 const code=ts.transpileModule(fs.readFileSync('src/lib/consent.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
 vm.runInNewContext(code,{module,exports:module.exports,fetch:()=>{throw Error('Unexpected lookup')},localStorage:{getItem:()=>{throw Error('Unexpected preference read')}}});
 for(const purpose of ['advertising','analytics']) {assert.equal(await module.exports.canTrack(purpose),true);assert.equal(module.exports.readChoice(purpose),null);}
 const html=fs.readFileSync('index.html','utf8');assert.ok(!html.includes("gtag('consent'"));assert.ok(html.includes('window.dataLayer'));assert.ok(!fs.readFileSync('src/components/Footer.tsx','utf8').includes('<PrivacySettings'));
});
