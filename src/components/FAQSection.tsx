'use client';

import { useTranslations, useMessages, useLocale } from 'next-intl';
import { useState } from 'react';

type FaqItem = { q: string; a: string };

export default function FAQSection() {
  const t = useTranslations('faq');
  const locale = useLocale();
  const messages = useMessages() as any;
  const items = (messages?.faq?.items || []) as FaqItem[];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  const faqPageSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  });

  return (
    <>
      <section id="faq" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
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
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden"
                  style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <span className="font-display text-base sm:text-lg font-semibold">{item.q}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="2.5"
                      className={`flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div
                    hidden={!isOpen}
                    className="px-6 pb-5 text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        id={`faq-jsonld-${locale}`}
        dangerouslySetInnerHTML={{ __html: faqPageSchema }}
      />
    </>
  );
}
