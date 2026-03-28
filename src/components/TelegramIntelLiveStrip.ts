import { h } from 'preact';
import { useTelegramFeed } from '@/hooks/useTelegramFeed';
import { t } from '@/services/i18n';
import { formatTelegramTime } from '@/services/telegram-intel';
import { sanitizeUrl } from '@/utils/sanitize';

function safeImageSrc(url: string): string {
  if (url.startsWith('data:image/jpeg;base64,') || url.startsWith('data:image/png;base64,')) return url;
  return sanitizeUrl(url);
}

/** Futuristic pulse strip — newest row gets a glow (matches PulseOfGlobe radar aesthetic). */
export function TelegramIntelLiveStrip() {
  const { messages, status, error } = useTelegramFeed();

  if (status === 'disabled') {
    return h('div', { className: 'telegram-pulse-live telegram-pulse-live--off' },
      h('span', { className: 'telegram-pulse-live-status' }, t('components.telegramIntel.wsDisabled')),
    );
  }

  return h('div', { className: 'telegram-pulse-live' },
    h('div', { className: 'telegram-pulse-live-header' },
      h('span', { className: 'telegram-pulse-live-title' }, t('components.telegramIntel.livePulse')),
      h('span', {
        className: `telegram-pulse-live-dot ${status === 'open' ? 'is-on' : ''}`,
        title: status,
      }),
      error ? h('span', { className: 'telegram-pulse-live-err' }, error) : null,
    ),
    messages.length === 0
      ? h('div', { className: 'telegram-pulse-live-empty' }, t('components.telegramIntel.waitingLive'))
      : h('div', { className: 'telegram-pulse-live-list' },
        ...messages.map((m, i) =>
          h('div', {
            key: m.id,
            className: `telegram-pulse-row${i === 0 ? ' is-newest' : ''}`,
          },
          m.imageUrl
            ? h('div', { className: 'telegram-pulse-thumb-wrap' },
              h('img', {
                className: 'telegram-pulse-thumb',
                src: safeImageSrc(m.imageUrl),
                alt: '',
                loading: 'lazy',
              }),
            )
            : null,
          h('div', { className: 'telegram-pulse-body' },
            h('div', { className: 'telegram-pulse-meta' },
              h('span', { className: 'telegram-pulse-ch' }, m.channelName),
              h('span', { className: 'telegram-pulse-time' }, formatTelegramTime(m.timestamp)),
            ),
            m.text
              ? h('div', { className: 'telegram-pulse-text' }, m.text)
              : null,
            m.url
              ? h('a', {
                className: 'telegram-pulse-link',
                href: sanitizeUrl(m.url),
                target: '_blank',
                rel: 'noopener noreferrer',
              }, t('components.telegramIntel.viewSource'))
              : null,
          ),
        ),
      ),
  );
}
