'use client';

import { useTranslations, useMessages } from 'next-intl';

type Story = { title: string; body: string; type: 'legend' | 'tradition' | 'history' | string };

const BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  legend: { bg: 'color-mix(in srgb, var(--accent) 14%, transparent)', color: 'var(--accent)' },
  tradition: { bg: 'rgba(230, 180, 60, 0.15)', color: '#b8860b' },
  history: { bg: 'rgba(90, 150, 200, 0.15)', color: '#3a7a8d' },
};

export default function StoriesSection() {
  const t = useTranslations('stories');
  const messages = useMessages() as any;
  const stories = (messages?.stories?.stories || []) as Story[];
  const badges = (messages?.stories?.badges || {}) as Record<string, string>;

  if (stories.length === 0) return null;

  return (
    <section id="stories" className="section-padding">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, index) => {
            const badgeStyle = BADGE_COLORS[story.type] || BADGE_COLORS.legend;
            return (
              <article
                key={index}
                className="rounded-2xl p-6 flex flex-col gap-4 transition-shadow hover:shadow-md"
                style={{
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"
                    style={{ ...badgeStyle }}
                  >
                    {badges[story.type] || ''}
                  </span>
                  <span className="text-3xl font-display font-bold opacity-15 ml-auto" style={{ color: 'var(--accent)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {story.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {story.body}
                </p>
              </article>
            );
          })}
        </div>

        <div
          className="mt-10 rounded-xl p-5"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {t('note')}
          </p>
        </div>
      </div>
    </section>
  );
}
