/// <reference types="vite/client" />

interface Window {
  dataLayer: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
    push?: (...args: unknown[]) => void;
    loaded: boolean;
    version: string;
  };
  _fbq?: Window["fbq"];
  ttq?: unknown[] & {
    track: (...args: unknown[]) => void;
    page: () => void;
    grantConsent?: () => void;
    revokeConsent?: () => void;
    methods?: string[];
    _i?: Record<string, unknown>;
    _t?: Record<string, number>;
    _o?: Record<string, unknown>;
  };
  TiktokAnalyticsObject?: string;
  __lovableEvents?: {
    track?: (event: string, properties?: Record<string, unknown>) => string | null;
  };
}
