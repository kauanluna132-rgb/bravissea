import { getLeadAttribution } from "./attribution";
import { applySignals, canTrack, onConsentChange, readChoice } from "./consent";
import { leadPayload, measurementConfig, type LeadEvent } from "./lead-events";

let started = false;
let advertisingAllowed = true;
let metaConfigured = false;
let revision = 0;

function google(...args: unknown[]) {
  window.gtag?.(...args);
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

async function refreshPermission() {
  const currentRevision = ++revision;
  // Automatic measurement starts immediately, independent of stored choices.
  advertisingAllowed = true;
  if (readChoice("advertising") === "denied") {
    window.fbq?.("consent", "revoke");
    window.ttq?.revokeConsent?.();
  }
  const [ads, analytics] = await Promise.all([canTrack("advertising"), canTrack("analytics")]);
  if (currentRevision !== revision) return;
  advertisingAllowed = ads;
  applySignals("advertising", ads ? "granted" : "denied");
  applySignals("analytics", analytics ? "granted" : "denied");
  // GTM initializes GA4, Google Ads and the TikTok browser pixel once.
  if (ads) {
    loadMeta();
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
  void trackSiteEvent("Contact", event.vessel_id, event.source);
  const id = crypto.randomUUID();
  const payload = leadPayload(event, id);
  window.dataLayer.push(payload);
  // GTM's published click triggers own Meta/Google Contact conversions.
  // Keep only the distinct analytics event and the server-side TikTok event here.
  if (await canTrack("analytics")) {
    if (readChoice("advertising") === "denied" || !advertisingAllowed) return;
    const { event: _event, ...parameters } = payload;
    google("event", event.kind, {
      ...parameters,
      send_to: measurementConfig.googleAnalyticsId,
    });
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

export async function trackSiteEvent(event: "ViewContent" | "Contact", vesselId?: string, source = "catalog") {
 const measurement = await leadSubmissionMeasurement(getLeadAttribution().ttclid);
 if (!measurement.allowed) return;
 const id = crypto.randomUUID();
 const body=JSON.stringify({event,id,vesselId,source,measurement});
 // Retrying uses the same ID. The durable server outbox handles provider failures.
 try {
  const response=await fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true});
  if(response.ok || response.status<500) return;
 } catch { /* One bounded retry while permission still exists. */ }
 if(readChoice("advertising")==="denied" || !advertisingAllowed) return;
 try { await fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true}); } catch { /* Never interrupt navigation. */ }
}
