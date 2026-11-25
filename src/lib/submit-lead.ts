import { getLeadAttribution } from "./attribution";
import { leadSubmissionMeasurement } from "./ad-measurement";
import { googleLeadMatchData } from "./google-lead-data";
export async function submitLead(data: Record<string, string>, requestId: string) {
 const attribution = getLeadAttribution();
 const measurement = await leadSubmissionMeasurement(attribution.ttclid);
 const response = await fetch('/api/leads', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...data, attribution, measurement, requestId}), signal: AbortSignal.timeout(20000) });
 if (!response.ok) throw new Error('Não foi possível enviar. Confira seus dados e tente novamente.');
 const result = await response.json();
 // A conversion represents a lead accepted by the API, never a button click.
 // The server returns the same ID for repeated requests, so Ads can deduplicate.
 if (result?.ok && typeof result.id === 'string' && /^[0-9a-f-]{36}$/i.test(result.id)) {
  const leadUserData = await googleLeadMatchData(data.email || '', data.phone || '');
  window.dataLayer.push({event: 'bravissea_lead_submitted', lead_id: result.id, lead_user_data: leadUserData});
 }
 return result;
}

export function leadRequestId() { return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)); }
