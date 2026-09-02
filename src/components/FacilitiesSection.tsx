'use client';

import { useTranslations, useMessages } from 'next-intl';

/**
 * Neutral, non-commercial facilities overview around Krakus Mound.
 * We only describe service TYPES (toilets, parking, food, lodging,
 * groceries, fuel/charging) and never endorse specific businesses.
 */

const FACILITY_ICONS = ['🚻', '🅿️', '🍽️', '🏨', '🛒', '⛽'];

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as any;
  const items = (messages?.facilities?.items || []) as Array<{ name: string; desc: string }>;

  if (items.length === 0) return null;

  return (
    <section id="facilities" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10 mx-auto" style={{ background: 'var(--accent)' }} />

        <p className="text-center max-w-3xl mx-auto mb-12 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl p-6"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div className="text-3xl mb-3" aria-hidden="true">
                {FACILITY_ICONS[index % FACILITY_ICONS.length]}
              </div>
              <h3 className="font-display text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-10 rounded-xl p-6 flex items-start gap-4"
          style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--accent)' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <div>
            <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {t('noteTitle')}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('noteContent')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
