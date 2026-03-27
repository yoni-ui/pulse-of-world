import { VARIANT_STORAGE_KEY } from '@/types/brand';

const buildVariant = (() => {
  try {
    return import.meta.env?.VITE_VARIANT || 'full';
  } catch {
    return 'full';
  }
})();

function readStoredVariant(): string | null {
  if (typeof window === 'undefined') return null;
  const v = localStorage.getItem(VARIANT_STORAGE_KEY);
  if (v === 'tech' || v === 'full' || v === 'finance' || v === 'happy' || v === 'commodity') return v;
  return null;
}

export const SITE_VARIANT: string = (() => {
  if (typeof window === 'undefined') return buildVariant;

  const isTauri = '__TAURI_INTERNALS__' in window || '__TAURI__' in window;
  if (isTauri) {
    return readStoredVariant() ?? buildVariant;
  }

  const h = location.hostname;
  if (h.startsWith('tech.')) return 'tech';
  if (h.startsWith('finance.')) return 'finance';
  if (h.startsWith('happy.')) return 'happy';
  if (h.startsWith('commodity.')) return 'commodity';

  if (h === 'localhost' || h === '127.0.0.1') {
    return readStoredVariant() ?? buildVariant;
  }

  return 'full';
})();
