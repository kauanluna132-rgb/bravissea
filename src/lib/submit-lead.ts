export async function submitLead(data: Record<string, string>, requestId: string) {
 const response = await fetch('/api/leads', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({...data, requestId}), signal: AbortSignal.timeout(20000) });
 if (!response.ok) throw new Error('Não foi possível enviar. Confira seus dados e tente novamente.');
 return response.json();
}

export function leadRequestId() { return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c => (Number(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number(c) / 4).toString(16)); }
