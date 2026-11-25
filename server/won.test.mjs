import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { createWonConversions, validWonSecret } from './won.mjs';

const id = '123e4567-e89b-42d3-a456-426614174000';
const env = {
 TWENTY_URL: 'https://crm.example.test', TWENTY_API_KEY: 'crm-key',
 META_DATASET_ID: '12345', META_CAPI_TOKEN: 'meta-key',
 TIKTOK_OFFLINE_EVENT_SET_ID: '98765', TIKTOK_ACCESS_TOKEN: 'tiktok-key',
 GOOGLE_CONVERSION_ACTION_ID: '56789', GOOGLE_CLIENT_ID: 'google-client',
 GOOGLE_CLIENT_SECRET: 'google-secret', GOOGLE_REFRESH_TOKEN: 'google-refresh',
};

test('queues one BRL sale per platform and sends only once with hashed match data', async () => {
 const db = new DatabaseSync(':memory:');
 const calls = [];
 const record = { id, stage: 'CUSTOMER', amount: { amountMicros: 12500000000, currencyCode: 'BRL' },
  leadName: 'Maria Silva', leadEmail: 'Maria@Example.com', leadPhone: '(21) 99999-8888',
  gclid: 'google-click', ttclid: 'tiktok-click', vesselName: 'Lancha Azul' };
 const send = async (url, options) => {
  calls.push({ url, options });
  if (url.endsWith(`/rest/opportunities/${id}`)) return Response.json({ data: { opportunity: record } });
  if (url.endsWith('/token')) return Response.json({ access_token: 'access' });
  if (url.includes('tiktok.com')) return Response.json({ code: 0 });
  return Response.json({ requestId: 'received' });
 };
 const won = createWonConversions(db, env, send);
 assert.deepEqual(await won.capture(id), { queued: true });
 assert.deepEqual(await won.capture(id), { queued: true });
 assert.equal(db.prepare('SELECT COUNT(*) AS n FROM won_conversions').get().n, 3);
 await won.flush();
 assert.equal(db.prepare("SELECT COUNT(*) AS n FROM won_conversions WHERE status='sent'").get().n, 3);
 const meta = calls.find(call => call.url.includes('graph.facebook.com'));
 const metaEvent = JSON.parse(meta.options.body).data[0];
 assert.equal(metaEvent.custom_data.value, 12500);
 assert.equal(metaEvent.custom_data.currency, 'BRL');
 assert.equal(metaEvent.user_data.em[0].length, 64);
 assert.ok(!meta.options.body.includes('Maria@Example.com'));
 const tiktok = calls.find(call => call.url.includes('offline/track'));
 assert.equal(JSON.parse(tiktok.options.body).event_set_id, '98765');
 const google = calls.find(call => call.url.includes('events:ingest'));
 assert.equal(JSON.parse(google.options.body).events[0].adIdentifiers.gclid, 'google-click');
 db.close();
});

test('ignores open opportunities and rejects missing sale amount', async () => {
 const db = new DatabaseSync(':memory:');
 const record = { id, stage: 'NEW', amount: { amountMicros: 1000000, currencyCode: 'BRL' } };
 const send = async () => Response.json({ data: { opportunity: record } });
 const won = createWonConversions(db, { TWENTY_URL: env.TWENTY_URL, TWENTY_API_KEY: env.TWENTY_API_KEY }, send);
 assert.deepEqual(await won.capture(id), { queued: false, reason: 'not_won' });
 record.stage = 'CUSTOMER'; record.amount.amountMicros = 0;
 await assert.rejects(won.capture(id), /positive BRL amount/);
 assert.equal(db.prepare('SELECT COUNT(*) AS n FROM won_conversions').get().n, 0);
 assert.equal(validWonSecret('correct', 'correct'), true);
 assert.equal(validWonSecret('incorrect', 'correct'), false);
 db.close();
});
