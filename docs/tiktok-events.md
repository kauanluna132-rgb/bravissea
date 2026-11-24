# TikTok Events API — Bravissea

Verified advertiser: Bravissea0218 (7472556945627742215).
Verified pixel: Bravissea (DC2A9U3C77U0A5LSGGH0).

Runtime-only Coolify variables on the website application:
- TIKTOK_PIXEL_ID=DC2A9U3C77U0A5LSGGH0
- TIKTOK_ACCESS_TOKEN: private Events API token (never a VITE_ or build variable)
- TIKTOK_EVENTS_ENABLED=true (enable only after token is saved)
- TIKTOK_TEST_EVENT_CODE: optional Test Events code; remove after verification.

Only new validated forms saved to the durable lead database generate SubmitForm.
A server-side SQLite outbox retries failures for up to 48 hours with the original event_id and event_time. Duplicate form requests do not add another event. Successful/expired event payloads are scrubbed. CRM synchronization and TikTok delivery have independent retries.

The existing advertising permission is required at submission time. Unknown region, refusal, GPC, and withdrawn permission block new advertising events. Automatic URL attribution saved to the CRM does not grant advertising permission. No checkbox is added to forms.

Allowed payload (expanded matching explicitly authorized by the owner): SubmitForm, lead request UUID, submission timestamp, page origin/path, user-agent and ttclid if available. Matching identifiers now also include server-hashed email, E.164 phone and stable external_id, public client IP from the trusted reverse proxy, locale and existing _ttp cookie when available. Raw contact details, free text, query strings, WhatsApp URLs and catalogue prices are excluded. SubmitForm does not represent confirmed booking or payment. This integration sends no browser-side SubmitForm, so do not add an Event Builder duplicate. Browser pixel remains disabled separately until explicitly configured.

Verification: run Node 24 `node --test tests/tiktok.test.mjs tests/attribution.test.cjs`; deploy; use a Test Events code and submit a clearly labelled test lead with advertising permitted. Verify SubmitForm in Events Manager, then remove the test code and redeploy. No historical leads are replayed when enabling.

Official references:
- https://business-api.tiktok.com/portal/docs/events-api-for-web/v1.3
- https://ads.tiktok.com/resources/help/article/tiktok-click-id?lang=en
