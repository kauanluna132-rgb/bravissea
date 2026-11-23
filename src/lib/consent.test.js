import { afterAll, expect, test } from "bun:test";
import { canTrack, readChoice, saveChoices } from "./consent";

const originals = Object.fromEntries(["window", "navigator", "location", "localStorage", "fetch"].map((key) => [key, Object.getOwnPropertyDescriptor(globalThis, key)]));
const storage = new Map();
const browser = new EventTarget();
Object.defineProperty(globalThis, "window", { configurable: true, value: browser });
Object.defineProperty(globalThis, "navigator", { configurable: true, value: { globalPrivacyControl: false } });
Object.defineProperty(globalThis, "location", { configurable: true, value: { hostname: "bravissea.com.br" } });
Object.defineProperty(globalThis, "localStorage", { configurable: true, value: { getItem: (key) => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) } });
Object.defineProperty(globalThis, "fetch", { configurable: true, value: async () => new Response("unknown location", { status: 503 }) });

test("unknown geography without a banner blocks advertising", async () => {
  storage.clear();
  expect(await canTrack("advertising")).toBe(false);
});
test("analytics acceptance alone does not permit advertising", async () => {
  storage.clear();
  saveChoices({ analytics: "granted" });
  expect(await canTrack("advertising")).toBe(false);
});
test("explicit advertising acceptance permits ordinary advertising", async () => {
  storage.clear();
  saveChoices({ advertising: "granted" });
  expect(await canTrack("advertising")).toBe(true);
});
test("withdrawal immediately overrides previous acceptance", async () => {
  saveChoices({ advertising: "denied" });
  expect(readChoice("advertising")).toBe("denied");
  expect(await canTrack("advertising")).toBe(false);
});
test("Global Privacy Control overrides stored acceptance", async () => {
  saveChoices({ advertising: "granted" });
  navigator.globalPrivacyControl = true;
  expect(await canTrack("advertising")).toBe(false);
  navigator.globalPrivacyControl = false;
});

afterAll(() => {
  for (const [key, descriptor] of Object.entries(originals)) {
    if (descriptor) Object.defineProperty(globalThis, key, descriptor);
    else delete globalThis[key];
  }
});