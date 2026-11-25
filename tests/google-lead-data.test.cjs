const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createHash, webcrypto } = require('node:crypto');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const moduleUnderTest = { exports: {} };
const code = ts.transpileModule(readFileSync('src/lib/google-lead-data.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
vm.runInNewContext(code, { module: moduleUnderTest, exports: moduleUnderTest.exports, crypto: webcrypto, TextEncoder });
const { googleLeadMatchData, normalizeLeadEmail, normalizeLeadPhone } = moduleUnderTest.exports;
const hash = value => createHash('sha256').update(value).digest('hex');

test('Google match keys normalize and hash both email and Brazilian phone', async () => {
  assert.equal(normalizeLeadEmail('  Fi.RsT@GMAIL.COM '), 'first@gmail.com');
  assert.equal(normalizeLeadPhone('(21) 97400-4415'), '+5521974004415');
  const data = await googleLeadMatchData('  Fi.RsT@GMAIL.COM ', '(21) 97400-4415');
  assert.deepEqual({ ...data }, {
    sha256_email_address: hash('first@gmail.com'),
    sha256_phone_number: hash('+5521974004415'),
  });
  assert.ok(!JSON.stringify(data).includes('first@gmail.com'));
  assert.ok(!JSON.stringify(data).includes('97400'));
});

test('Optional email does not retain a previous lead match key', async () => {
  const data = await googleLeadMatchData('', '+5521974004415');
  assert.equal(data.sha256_email_address, null);
  assert.equal(data.sha256_phone_number, hash('+5521974004415'));
});
