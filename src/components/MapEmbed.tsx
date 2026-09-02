import { useTranslations } from 'next-intl';

const FALLBACK_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d18231.640029756818!2d19.9481142!3d50.0380942!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b5116eb7d0f%3A0x76735d35fb48c49b!2z5YWL5ouJ5bqr5pav5LiY!5e1!3m2!1szh-CN!2s!4v1788336053275!5m2!1szh-CN!2s';

export default function MapEmbed() {
  const t = useTranslations('mapSection');
  const mapUrl = t('embedUrl') || FALLBACK_EMBED_URL;

  return (
    <section id="map" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>{t('subtitle')}</p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        {/* Map */}
        <div
          className="map-container relative rounded-xl overflow-hidden"
          style={{ border: '1px solid var(--map-border)' }}
        >
          <iframe
            src={mapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={`Google Maps - ${t('title')}`}
          />
        </div>

        {/* Open in Google Maps */}
        <div className="mt-6 flex justify-center">
          <a
            href={t('mapsUrl') || 'https://maps.app.goo.gl/nKLB2UWiMWqCKgoV8'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white transition-colors"
            style={{ background: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {t('openMaps')}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>

        {/* Official tourism authority link */}
        <p className="mt-6 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('authorityLabel')}{' '}
          <a
            href={t('authorityUrl') || 'https://www.poland.travel/en'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-medium"
            style={{ color: 'var(--accent)' }}
          >
            {t('authorityText')}
          </a>
        </p>
      </div>
    </section>
  );
}
