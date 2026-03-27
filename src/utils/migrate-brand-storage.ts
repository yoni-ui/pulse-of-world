import {
  BRAND_STORAGE_PREFIX,
  LEGACY_STORAGE_PREFIX,
  STORAGE_MIGRATION_MARKER_KEY,
} from '@/types/brand';

/**
 * Copies localStorage keys from legacy `worldmonitor-*` / `worldmonitor_*` to `pulseofglobe-*`
 * when the new key is missing. Idempotent; safe to call on every load.
 */
export function migrateLegacyBrandStorage(): void {
  if (typeof localStorage === 'undefined') return;
  try {
    if (localStorage.getItem(STORAGE_MIGRATION_MARKER_KEY)) return;

    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k) keys.push(k);
    }

    const legacyDash = `${LEGACY_STORAGE_PREFIX}-`;
    const legacyUnderscore = `${LEGACY_STORAGE_PREFIX}_`;

    for (const k of keys) {
      let newKey: string | null = null;
      if (k.startsWith(legacyDash)) {
        newKey = `${BRAND_STORAGE_PREFIX}-${k.slice(legacyDash.length)}`;
      } else if (k.startsWith(legacyUnderscore)) {
        newKey = `${BRAND_STORAGE_PREFIX}_${k.slice(legacyUnderscore.length)}`;
      }
      if (!newKey || localStorage.getItem(newKey) !== null) continue;
      const v = localStorage.getItem(k);
      if (v !== null) localStorage.setItem(newKey, v);
    }

    localStorage.setItem(STORAGE_MIGRATION_MARKER_KEY, '1');
  } catch {
    // ignore quota / private mode
  }
}
