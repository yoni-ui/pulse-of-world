const MAX_AGE_SECONDS = 365 * 24 * 60 * 60;

function cookieDomainForHost(): string {
  const h = location.hostname;
  if (h.endsWith('pulseofglobe.ai')) return '.pulseofglobe.ai';
  return '.worldmonitor.app';
}

function usesCookies(): boolean {
  const h = location.hostname;
  return h.endsWith('worldmonitor.app') || h.endsWith('pulseofglobe.ai');
}

export function getDismissed(key: string): boolean {
  if (usesCookies()) {
    return document.cookie.split('; ').some((c) => c === `${key}=1`);
  }
  return localStorage.getItem(key) === '1' || localStorage.getItem(key) === 'true';
}

export function setDismissed(key: string): void {
  if (usesCookies()) {
    document.cookie = `${key}=1; domain=${cookieDomainForHost()}; path=/; max-age=${MAX_AGE_SECONDS}; SameSite=Lax; Secure`;
  }
  localStorage.setItem(key, '1');
}
