// Automatic measurement policy requested by the site owner.
// No region lookup or saved browser choice gates measurement.
export type Purpose = "analytics" | "advertising";
export type Choice = "granted" | "denied";
export function readChoice(_purpose: Purpose): Choice | null { return null; }
export async function canTrack(_purpose: Purpose): Promise<boolean> { return true; }
export function applySignals(_purpose: Purpose, _choice: Choice) {}
export function saveChoices(_choices: Partial<Record<Purpose, Choice>>) {}
export async function needsAnswer(_purposes: Purpose[]): Promise<boolean> { return false; }
export function onConsentChange(_listener: () => void): () => void { return () => {}; }
