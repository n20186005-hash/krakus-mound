import { useTranslations, useMessages } from 'next-intl';

type SourceItem = { name: string; url: string; desc: string };

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items = (messages?.sources?.items || []) as SourceItem[];

  if (items.length === 0) return null;

  return (
    <section id="sources" className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8 mx-auto" style={{ background: 'var(--accent)' }} />

        <p className="text-center max-w-3xl mx-auto mb-12 text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {t('intro')}
        </p>

        <div className="space-y-4">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 rounded-xl p-5 transition-shadow hover:shadow-md"
              style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ background: 'var(--accent)' }}
              >
                {index + 1}
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {item.name}
                  <span className="inline-block ml-2" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </span>
                </p>
                <p className="text-xs mb-1 break-all" style={{ color: 'var(--accent)' }}>
                  {item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Photo credit & neutrality note */}
        <div
          className="mt-10 rounded-xl p-5 text-sm leading-relaxed"
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          {t('photoCredit')}
        </div>
      </div>
    </section>
  );
}
