/**
 * Single source of truth for PulseOfGlobe AI product branding, URLs, and storage keys.
 * (Proto package paths remain `worldmonitor/*` — do not rename generated code.)
 */

export const BRAND_STORAGE_PREFIX = 'pulseofglobe';
export const LEGACY_STORAGE_PREFIX = 'worldmonitor';

/** After one-time migration from LEGACY_STORAGE_PREFIX */
export const STORAGE_MIGRATION_MARKER_KEY = `${BRAND_STORAGE_PREFIX}-storage-migrated-v1`;

export const STORAGE_KEYS = {
  panels: `${BRAND_STORAGE_PREFIX}-panels`,
  monitors: `${BRAND_STORAGE_PREFIX}-monitors`,
  mapLayers: `${BRAND_STORAGE_PREFIX}-layers`,
  disabledFeeds: `${BRAND_STORAGE_PREFIX}-disabled-feeds`,
  liveChannels: `${BRAND_STORAGE_PREFIX}-live-channels`,
  mapMode: `${BRAND_STORAGE_PREFIX}-map-mode`,
  activeChannel: `${BRAND_STORAGE_PREFIX}-active-channel`,
  webcamPrefs: `${BRAND_STORAGE_PREFIX}-webcam-prefs`,
} as const;

export const VARIANT_STORAGE_KEY = `${BRAND_STORAGE_PREFIX}-variant`;
export const THEME_STORAGE_KEY = `${BRAND_STORAGE_PREFIX}-theme`;
export const BETA_MODE_STORAGE_KEY = `${BRAND_STORAGE_PREFIX}-beta-mode`;

export const PANEL_SPANS_STORAGE_KEY = `${BRAND_STORAGE_PREFIX}-panel-spans`;
export const PANEL_COL_SPANS_STORAGE_KEY = `${BRAND_STORAGE_PREFIX}-panel-col-spans`;
export const PANEL_ORDER_STORAGE_KEY = 'panel-order';

export const RUNTIME_TOGGLES_STORAGE_KEY = `${BRAND_STORAGE_PREFIX}-runtime-feature-toggles`;

export const WORLD_CLOCK_CITIES_KEY = `${BRAND_STORAGE_PREFIX}-world-clock-cities`;
export const RECENT_SEARCHES_KEY = `${BRAND_STORAGE_PREFIX}_recent_searches`;
export const INTEL_FINDINGS_KEY = `${BRAND_STORAGE_PREFIX}-intel-findings`;
export const TRENDING_CONFIG_KEY = `${BRAND_STORAGE_PREFIX}-trending-config-v1`;

export const CUSTOM_WIDGETS_STORAGE_KEY = 'wm-custom-widgets';

export const GITHUB_ORG = 'yyishak';
export const GITHUB_REPO = 'pulse-of-world';
export const GITHUB_REPO_URL = `https://github.com/${GITHUB_ORG}/${GITHUB_REPO}`;
export const GITHUB_API_REPO_URL = `https://api.github.com/repos/${GITHUB_ORG}/${GITHUB_REPO}`;

export const CANONICAL_ORIGIN = 'https://pulseofglobe.ai';
export const CANONICAL_WWW_ORIGIN = 'https://www.pulseofglobe.ai';

/** Default Edge API (override with VITE_WS_API_URL in env) */
export const DEFAULT_API_ORIGIN = 'https://api.worldmonitor.app';

export const VARIANT_PRODUCTION_URLS = {
  full: `${CANONICAL_ORIGIN}/`,
  tech: 'https://tech.pulseofglobe.ai/',
  finance: 'https://finance.pulseofglobe.ai/',
  commodity: 'https://commodity.pulseofglobe.ai/',
  happy: 'https://happy.pulseofglobe.ai/',
} as const;

export function proUrl(isDesktopApp: boolean): string {
  return isDesktopApp ? `${CANONICAL_ORIGIN}/pro` : `${CANONICAL_WWW_ORIGIN}/pro`;
}

export function blogUrl(isDesktopApp: boolean): string {
  return isDesktopApp ? `${CANONICAL_ORIGIN}/blog/` : `${CANONICAL_WWW_ORIGIN}/blog/`;
}

export function docsUrl(isDesktopApp: boolean): string {
  return isDesktopApp ? `${CANONICAL_ORIGIN}/docs` : `${CANONICAL_WWW_ORIGIN}/docs`;
}

/** Hosts where the SPA is served in production (legacy + new) */
export function isProductionAppHostname(hostname: string): boolean {
  if (!hostname) return false;
  const h = hostname.toLowerCase();
  if (h === 'pulseofglobe.ai' || h === 'www.pulseofglobe.ai') return true;
  if (h.endsWith('.pulseofglobe.ai')) return true;
  if (h === 'worldmonitor.app' || h === 'www.worldmonitor.app') return true;
  if (h.endsWith('.worldmonitor.app')) return true;
  return false;
}

/** Web API base is injected when the page is served from a known production host */
export function shouldUseRemoteWebApi(hostname: string): boolean {
  return isProductionAppHostname(hostname);
}
