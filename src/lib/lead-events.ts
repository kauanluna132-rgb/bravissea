// Destinations verified in the published GTM-W9MGL923 container (version 5).
// A WhatsApp action is an intent signal, not a confirmed lead or sale.
export const measurementConfig = {
  metaPixelId: "618975987909341",
  googleAnalyticsId: "G-BFQWK1GY74",
  googleAdsId: "AW-17381921158",
  contactConversionLabel: "6v53CKuBm5UbEIajrOBA",
  bookingConversionLabel: "Q8CjCKm3yZ0bEIajrOBA",
  // TikTok remains disabled until the owner supplies their pixel ID.
  tiktokPixelId: "",
};

export type LeadKind = "contact_clicked" | "route_inquiry_clicked" | "booking_request_opened";
export type LeadSource = "hero" | "footer" | "floating_button" | "how_it_works" | "catalog" | "vessel_card" | "tour_routes" | "booking_form";
export interface LeadEvent {
  kind: LeadKind;
  source: LeadSource;
  vessel_id?: string;
  route_id?: number;
}

export function leadPayload(event: LeadEvent, eventId: string) {
  // Explicit allowlist: never spread form data, WhatsApp text or URLs into events.
  return {
    event: `bravissea.${event.kind}`,
    event_id: eventId,
    lead_type: event.kind,
    source: event.source,
    contact_method: "whatsapp",
    ...(event.vessel_id ? { vessel_id: event.vessel_id } : {}),
    ...(event.route_id !== undefined ? { route_id: event.route_id } : {}),
  };
}

export function googleConversionDestination(kind: LeadKind) {
  const label = kind === "booking_request_opened"
    ? measurementConfig.bookingConversionLabel
    : measurementConfig.contactConversionLabel;
  return `${measurementConfig.googleAdsId}/${label}`;
}