import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

const MAX_MESSAGES = 20;

export interface TelegramWsMessage {
  id: string;
  channelName: string;
  channel: string;
  text: string;
  timestamp: string;
  imageUrl: string | null;
  url: string;
}

export interface UseTelegramFeedResult {
  messages: TelegramWsMessage[];
  status: 'disabled' | 'connecting' | 'open' | 'closed' | 'error';
  error: string | null;
  reconnect: () => void;
}

function buildRelayWsUrl(): string | null {
  const raw = import.meta.env.VITE_WS_RELAY_URL?.trim();
  if (!raw) return null;
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (u.protocol === 'http:') u.protocol = 'ws:';
  if (u.protocol === 'https:') u.protocol = 'wss:';
  const key = import.meta.env.VITE_RELAY_AUTH_KEY?.trim();
  if (key) u.searchParams.set('key', key);
  return u.toString();
}

/**
 * Subscribes to the Railway relay WebSocket and collects `telegram_update` events
 * (pushed by GramJS NewMessage in scripts/ais-relay.cjs). Ignores AIS vessel traffic.
 */
export function useTelegramFeed(): UseTelegramFeedResult {
  const [messages, setMessages] = useState<TelegramWsMessage[]>([]);
  const [status, setStatus] = useState<UseTelegramFeedResult['status']>('disabled');
  const [error, setError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const genRef = useRef(0);

  const connect = useCallback(() => {
    const url = buildRelayWsUrl();
    genRef.current += 1;
    const gen = genRef.current;

    if (!url) {
      setStatus('disabled');
      setError(null);
      return;
    }

    try {
      wsRef.current?.close();
    } catch {
      // ignore
    }

    setStatus('connecting');
    setError(null);

    let ws: WebSocket;
    try {
      ws = new WebSocket(url);
    } catch (e) {
      setStatus('error');
      setError(e instanceof Error ? e.message : 'WebSocket failed');
      return;
    }
    wsRef.current = ws;

    ws.onopen = () => {
      if (gen !== genRef.current) return;
      setStatus('open');
    };

    ws.onclose = () => {
      if (gen !== genRef.current) return;
      setStatus('closed');
    };

    ws.onerror = () => {
      if (gen !== genRef.current) return;
      setStatus('error');
      setError('WebSocket error');
    };

    ws.onmessage = (ev) => {
      const raw = typeof ev.data === 'string' ? ev.data : '';
      if (!raw.startsWith('{')) return;
      let data: Record<string, unknown>;
      try {
        data = JSON.parse(raw) as Record<string, unknown>;
      } catch {
        return;
      }
      if (data.type !== 'telegram_update') return;

      const id = String(data.id || '');
      if (!id) return;

      const msg: TelegramWsMessage = {
        id,
        channelName: String(data.channelName || data.channel || ''),
        channel: String(data.channel || ''),
        text: String(data.text || ''),
        timestamp: String(data.timestamp || new Date().toISOString()),
        imageUrl: data.imageUrl ? String(data.imageUrl) : null,
        url: String(data.url || ''),
      };

      setMessages((prev) => {
        const next = [msg, ...prev.filter((m) => m.id !== id)];
        return next.slice(0, MAX_MESSAGES);
      });
    };
  }, []);

  useEffect(() => {
    connect();
    return () => {
      genRef.current += 1;
      try {
        wsRef.current?.close();
      } catch {
        // ignore
      }
      wsRef.current = null;
    };
  }, [connect]);

  return { messages, status, error, reconnect: connect };
}
