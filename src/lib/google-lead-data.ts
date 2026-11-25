/** Match keys for Google Ads enhanced conversions; raw form data stays out of GTM. */
export function normalizeLeadEmail(value: string) {
  const email = value.trim().toLowerCase();
  const at = email.lastIndexOf('@');
  if (at < 1 || at === email.length - 1) return '';
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  return `${domain === 'gmail.com' || domain === 'googlemail.com' ? local.replace(/\./g, '') : local}@${domain}`;
}

export function normalizeLeadPhone(value: string) {
  const digits = value.replace(/\D/g, '');
  const international = value.trim().startsWith('+');
  const number = !international && (digits.length === 10 || digits.length === 11) ? `55${digits}` : digits;
  return number.length >= 11 && number.length <= 15 && number[0] !== '0' ? `+${number}` : '';
}

async function sha256(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function googleLeadMatchData(email: string, phone: string) {
  const normalizedEmail = normalizeLeadEmail(email);
  const normalizedPhone = normalizeLeadPhone(phone);
  try {
    return {
      sha256_email_address: normalizedEmail ? await sha256(normalizedEmail) : null,
      sha256_phone_number: normalizedPhone ? await sha256(normalizedPhone) : null,
    };
  } catch {
    return { sha256_email_address: null, sha256_phone_number: null };
  }
}
