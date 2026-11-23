import { describe, expect, test } from "bun:test";
import { googleConversionDestination, leadPayload, measurementConfig } from "./lead-events";

describe("WhatsApp intent measurement", () => {
  test("all general contacts reuse the existing contact conversion", () => {
    expect(googleConversionDestination("contact_clicked")).toBe("AW-17381921158/6v53CKuBm5UbEIajrOBA");
  });
  test("route inquiries reuse the existing route/contact conversion", () => {
    expect(googleConversionDestination("route_inquiry_clicked")).toBe("AW-17381921158/6v53CKuBm5UbEIajrOBA");
  });
  test("booking requests reuse the existing booking-button conversion, not Purchase", () => {
    expect(googleConversionDestination("booking_request_opened")).toBe("AW-17381921158/Q8CjCKm3yZ0bEIajrOBA");
  });
  test("personal form data and full URLs cannot enter the shared payload", () => {
    const payload = leadPayload({ kind: "booking_request_opened", source: "booking_form", vessel_id: "oceano", name: "Private name", email: "private@example.invalid", phone: "private phone", message: "private text", url: "https://wa.me/?text=private" }, "test-event-id");
    expect(payload).toEqual({ event: "bravissea.booking_request_opened", event_id: "test-event-id", lead_type: "booking_request_opened", source: "booking_form", contact_method: "whatsapp", vessel_id: "oceano" });
  });
  test("TikTok stays disabled until its ID is supplied", () => {
    expect(measurementConfig.tiktokPixelId).toBe("");
  });
});