import { createHash, timingSafeEqual } from 'node:crypto';
import { normalizePhone } from './tiktok.mjs';

const sha = value => createHash('sha256').update(value).digest('hex');
const validId = value => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value || '');
const text = (value, limit = 500) => typeof value === 'string' ? value.trim().slice(0, limit) : '';

export function createWonConversions(db, env = process.env, send = fetch) {
 db.exec(`CREATE TABLE IF NOT EXISTS won_conversions (
  opportunity_id TEXT NOT NULL, platform TEXT NOT NULL, payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', attempts INTEGER NOT NULL DEFAULT 0,
  next_attempt INTEGER NOT NULL DEFAULT 0, created INTEGER NOT NULL,
  PRIMARY KEY(opportunity_id, platform)
 )`);
 const ready = {
  meta: () => !!(env.META_DATASET_ID && env.META_CAPI_TOKEN),
  google: () => !!(env.GOOGLE_CONVERSION_ACTION_ID && env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.GOOGLE_REFRESH_TOKEN),
  tiktok: () => !!(env.TIKTOK_OFFLINE_EVENT_SET_ID && env.TIKTOK_ACCESS_TOKEN),
 };
 let busy = false;

 async function capture(opportunityId) {
  if (!validId(opportunityId) || !env.TWENTY_URL || !env.TWENTY_API_KEY) throw new Error('CRM unavailable');
  const res = await send(`${env.TWENTY_URL}/rest/opportunities/${opportunityId}`, {
   headers: { Authorization: `Bearer ${env.TWENTY_API_KEY}` }, signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`CRM lookup ${res.status}`);
  const result = await res.json();
  const record = result.data?.opportunity ?? result.data ?? result.opportunity ?? result;
  if (record.id !== opportunityId || record.stage !== 'CUSTOMER') return { queued: false, reason: 'not_won' };
  const micros = Number(record.amount?.amountMicros);
  if (!Number.isSafeInteger(micros) || micros <= 0 || record.amount?.currencyCode !== 'BRL') throw new Error('Won opportunity needs a positive BRL amount');
  const email = text(record.leadEmail).toLowerCase();
  const phone = normalizePhone(record.leadPhone);
  const name = text(record.leadName).toLowerCase().split(/\s+/).filter(Boolean);
  const now = Date.now();
  const payload = {
   id: opportunityId, time: Math.floor(now / 1000), value: micros / 1e6, currency: 'BRL',
   email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? sha(email) : '',
   phone: phone ? sha(phone) : '',
   firstName: name[0] ? sha(name[0]) : '', lastName: name.length > 1 ? sha(name.at(-1)) : '',
   gclid: text(record.gclid), gbraid: text(record.gbraid), wbraid: text(record.wbraid),
   ttclid: text(record.ttclid), vessel: text(record.vesselName, 120),
  };
  const insert = db.prepare('INSERT OR IGNORE INTO won_conversions(opportunity_id,platform,payload,created) VALUES (?,?,?,?)');
  db.exec('BEGIN IMMEDIATE');
  try { for (const platform of ['meta', 'google', 'tiktok']) insert.run(opportunityId, platform, JSON.stringify(payload), now); db.exec('COMMIT'); }
  catch (error) { db.exec('ROLLBACK'); throw error; }
  return { queued: true };
 }

 async function post(url, token, body, extraHeaders = {}) {
  const res = await send(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...extraHeaders }, body: JSON.stringify(body), signal: AbortSignal.timeout(15000) });
  const result = await res.json().catch(() => ({}));
  if (!res.ok || result.error || (typeof result.code === 'number' && result.code !== 0)) throw new Error(`Conversion rejected (${res.status})`);
  return result;
 }

 async function sendMeta(p) {
  const user_data = {};
  if (p.email) user_data.em = [p.email];
  if (p.phone) user_data.ph = [p.phone];
  if (p.firstName) user_data.fn = [p.firstName];
  if (p.lastName) user_data.ln = [p.lastName];
  const event = { event_name: 'Purchase', event_time: p.time, event_id: p.id,
   action_source: 'system_generated', user_data,
   custom_data: { value: p.value, currency: p.currency, order_id: p.id } };
  if (p.vessel) event.custom_data.content_name = p.vessel;
  await post(`https://graph.facebook.com/v25.0/${encodeURIComponent(env.META_DATASET_ID)}/events?access_token=${encodeURIComponent(env.META_CAPI_TOKEN)}`, '', { data: [event] });
 }

 async function sendTikTok(p) {
  const user = {};
  if (p.email) user.emails = [p.email];
  if (p.phone) user.phone_numbers = [p.phone];
  if (p.ttclid) user.ttclid = p.ttclid;
  const body = { event_set_id: env.TIKTOK_OFFLINE_EVENT_SET_ID, event: 'Purchase',
   event_id: p.id, timestamp: new Date(p.time * 1000).toISOString(),
   context: { user }, properties: { order_id: p.id, currency: p.currency, value: p.value } };
  await post('https://business-api.tiktok.com/open_api/v1.3/offline/track/', env.TIKTOK_ACCESS_TOKEN, body, { 'Access-Token': env.TIKTOK_ACCESS_TOKEN });
 }

 async function sendGoogle(p) {
  const form = new URLSearchParams({ client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET,
   refresh_token: env.GOOGLE_REFRESH_TOKEN, grant_type: 'refresh_token' });
  const tokenResponse = await send('https://oauth2.googleapis.com/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: form, signal: AbortSignal.timeout(15000) });
  const token = await tokenResponse.json();
  if (!tokenResponse.ok || !token.access_token) throw new Error('Google OAuth refresh failed');
  const event = { eventTimestamp: new Date(p.time * 1000).toISOString(), transactionId: p.id,
   conversionValue: p.value, currency: p.currency, eventSource: 'WEB' };
  const ids = [];
  if (p.email) ids.push({ emailAddress: p.email });
  if (p.phone) ids.push({ phoneNumber: p.phone });
  if (ids.length) event.userData = { userIdentifiers: ids };
  const adIdentifiers = {};
  for (const key of ['gclid', 'gbraid', 'wbraid']) if (p[key]) adIdentifiers[key] = p[key];
  if (Object.keys(adIdentifiers).length) event.adIdentifiers = adIdentifiers;
  if (!ids.length && !Object.keys(adIdentifiers).length) throw new Error('Google match identifiers missing');
  const account = { accountType: 'GOOGLE_ADS', accountId: '4766829666' };
  const body = { destinations: [{ operatingAccount: account, loginAccount: account,
   productDestinationId: env.GOOGLE_CONVERSION_ACTION_ID }], encoding: 'HEX', events: [event] };
  await post('https://datamanager.googleapis.com/v1/events:ingest', token.access_token, body);
 }

 async function flush() {
  if (busy) return;
  busy = true;
  try {
   const now = Date.now();
   const rows = db.prepare("SELECT * FROM won_conversions WHERE status='pending' AND next_attempt<=? ORDER BY created LIMIT 10").all(now);
   for (const row of rows) {
    if (!ready[row.platform]()) continue;
    try {
     const p = JSON.parse(row.payload);
     if (row.platform === 'meta') await sendMeta(p);
     if (row.platform === 'google') await sendGoogle(p);
     if (row.platform === 'tiktok') await sendTikTok(p);
     db.prepare("UPDATE won_conversions SET status='sent',payload='{}' WHERE opportunity_id=? AND platform=?").run(row.opportunity_id, row.platform);
    } catch (error) {
     const delay = Math.min(6 * 3600000, 30000 * 2 ** Math.min(row.attempts, 10));
     db.prepare('UPDATE won_conversions SET attempts=attempts+1,next_attempt=? WHERE opportunity_id=? AND platform=?').run(now + delay, row.opportunity_id, row.platform);
     console.error(`${row.platform} sale conversion pending retry:`, error.message);
    }
   }
  } finally { busy = false; }
 }
 const timer = setInterval(() => void flush(), 30000); timer.unref(); void flush();
 return { capture, flush, ready: () => Object.fromEntries(Object.entries(ready).map(([platform, check]) => [platform, check()])) };
}

export function validWonSecret(provided, expected) {
 if (!expected || typeof provided !== 'string') return false;
 const a = Buffer.from(provided), b = Buffer.from(expected);
 return a.length === b.length && timingSafeEqual(a, b);
}
