import { applySignals, canTrack, onConsentChange, readChoice } from "./consent";
import { googleConversionDestination, leadPayload, measurementConfig, type LeadEvent } from "./lead-events";

let started = false;
let advertisingAllowed = false;
let analyticsConfigured = false;
let adsConfigured = false;
let metaConfigured = false;
let googleLoaded = false;
let tiktokConfigured = false;
let revision = 0;

function google(...args: unknown[]) {
  window.gtag?.(...args);
}

function loadGoogle() {
  if (googleLoaded) return;
  googleLoaded = true;
  google("set", "developer_id.dZjgwMW", true);
  google("js", new Date());
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementConfig.googleAnalyticsId}`;
  script.id = "bravissea-google-tag";
  document.head.appendChild(script);
}

function loadMeta() {
  if (metaConfigured) {
    window.fbq?.("consent", "grant");
    return;
  }
  metaConfigured = true;
  if (!window.fbq) {
    const pixel: NonNullable<Window["fbq"]> = Object.assign(function (...args: unknown[]) {
      if (pixel.callMethod) pixel.callMethod.apply(pixel, args);
      else pixel.queue.push(args);
    }, { queue: [] as unknown[][], loaded: true, version: "2.0" });
    pixel.push = pixel;
    window.fbq = pixel;
    window._fbq = pixel;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    script.id = "bravissea-meta-pixel";
    document.head.appendChild(script);
  }
  window.fbq?.("consent", "grant");
  window.fbq?.("set", "autoConfig", false, measurementConfig.metaPixelId);
  window.fbq?.("init", measurementConfig.metaPixelId, {}, { agent: "lovable" });
  window.fbq?.("trackSingle", measurementConfig.metaPixelId, "PageView");
}

function loadTikTok() {
  const id = measurementConfig.tiktokPixelId;
  if (!id) return;
  if (tiktokConfigured) {
    window.ttq?.grantConsent?.();
    return;
  }
  tiktokConfigured = true;
  // Official deferred Pixel API; no matching/identify calls are enabled.
  const queue = [] as unknown as NonNullable<Window["ttq"]>;
  queue.track = (...args: unknown[]) => queue.push(["track", ...args]);
  queue.page = () => queue.push(["page"]);
  queue.grantConsent = () => queue.push(["grantConsent"]);
  queue.revokeConsent = () => queue.push(["revokeConsent"]);
  queue.methods = ["track", "page", "grantConsent", "revokeConsent"];
  const url = "https://analytics.tiktok.com/i18n/pixel/events.js";
  queue._i = { [id]: Object.assign([], { _u: url }) };
  queue._t = { [id]: Date.now() };
  queue._o = { [id]: {} };
  window.TiktokAnalyticsObject = "ttq";
  window.ttq = queue;
  const script = document.createElement("script");
  script.async = true;
  script.src = `${url}?sdkid=${encodeURIComponent(id)}&lib=ttq`;
  document.head.appendChild(script);
  queue.grantConsent();
  queue.page();
}

async function refreshPermission() {
  const currentRevision = ++revision;
  // Immediately revoke while permission is being resolved, including withdrawals.
  advertisingAllowed = false;
  if (readChoice("advertising") === "denied") {
    window.fbq?.("consent", "revoke");
    window.ttq?.revokeConsent?.();
  }
  const [ads, analytics] = await Promise.all([canTrack("advertising"), canTrack("analytics")]);
  if (currentRevision !== revision) return;
  advertisingAllowed = ads;
  applySignals("advertising", ads ? "granted" : "denied");
  applySignals("analytics", analytics ? "granted" : "denied");
  if (ads || analytics) loadGoogle();
  if (analytics && !analyticsConfigured) {
    analyticsConfigured = true;
    google("config", measurementConfig.googleAnalyticsId, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
    google("event", "page_view", {
      send_to: measurementConfig.googleAnalyticsId,
      page_location: `${location.origin}${location.pathname}`,
      page_referrer: document.referrer ? new URL(document.referrer).origin : "",
    });
  }
  if (ads) {
    if (!adsConfigured) {
      adsConfigured = true;
      google("config", measurementConfig.googleAdsId, { send_page_view: false });
    }
    loadMeta();
    loadTikTok();
  } else {
    window.fbq?.("consent", "revoke");
    window.ttq?.revokeConsent?.();
  }
}

export function startAdMeasurement() {
  if (started) return;
  started = true;
  onConsentChange(() => { void refreshPermission(); });
  void refreshPermission();
}

export async function trackLead(event: LeadEvent) {
  // No replay: permission must exist at the action AND still exist at send time.
  if (!advertisingAllowed || readChoice("advertising") === "denied") return;
  const permitted = await canTrack("advertising");
  if (!permitted || !advertisingAllowed || readChoice("advertising") === "denied") return;
  const id = crypto.randomUUID();
  const payload = leadPayload(event, id);
  window.dataLayer.push(payload);
  // All three moments are WhatsApp contact intent, never a completed booking.
  window.fbq?.("trackSingle", measurementConfig.metaPixelId, "Contact", {
    content_category: event.kind,
    source: event.source,
    ...(event.vessel_id ? { content_ids: [event.vessel_id] } : {}),
  }, { eventID: id });
  google("event", "conversion", {
    send_to: googleConversionDestination(event.kind),
    transaction_id: id,
  });
  if (await canTrack("analytics")) {
    if (readChoice("advertising") === "denied" || !advertisingAllowed) return;
    const { event: _event, ...parameters } = payload;
    google("event", event.kind, {
      ...parameters,
      send_to: measurementConfig.googleAnalyticsId,
    });
  }
  if (advertisingAllowed && readChoice("advertising") !== "denied") {
    window.ttq?.track("Contact", {
      content_type: "product",
      description: event.kind,
    }, { event_id: id });
  }
}
/** Capture permission at submission time; blocked actions are never replayed later. */
export async function leadSubmissionMeasurement(ttclid?: string) {
 const allowedAtAction = advertisingAllowed && readChoice("advertising") !== "denied";
 if (!allowedAtAction || !(await canTrack("advertising")) || !advertisingAllowed || readChoice("advertising") === "denied") return { allowed: false };
 let ttp = "";
 try { ttp = decodeURIComponent(document.cookie.split("; ").find(c => c.startsWith("_ttp="))?.slice(5) || ""); } catch { /* Missing/invalid cookie is optional. */ }
 return { allowed: true, ttp, locale: navigator.language, page: `${location.origin}${location.pathname}`, ...(ttclid ? { ttclid } : {}) };
}
