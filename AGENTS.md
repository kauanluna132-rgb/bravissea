# Project architecture
- Keep lead semantics and destination settings in `src/lib/lead-events.ts`; WhatsApp intent must not imply a confirmed booking or paid sale.
- Use `src/lib/ad-measurement.ts` as the sole advertising sender instead of the old GTM automatic-click tags, reusing their existing destinations to prevent duplicate Meta/Google conversions.
- Measurement starts automatically per the owner’s explicit instruction; do not reintroduce region or saved-choice gates.
- Keep native Lovable event calls directly in existing action handlers and catalog their closed, non-personal schemas.
- Send only allowlisted event properties; reservation contact details and WhatsApp URLs stay outside measurement payloads.
- Keep TikTok disabled until its pixel ID is supplied; do not invent destination IDs or create conversion actions without verified provider settings.
- Keep the linked privacy policy accurate about automatic measurement and server-side matching.