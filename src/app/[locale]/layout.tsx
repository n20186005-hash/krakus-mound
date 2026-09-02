import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

const baseUrl = 'https://krakusmound.com';
const GA_ID = 'G-HXM22WWPKP';
const MAPS_URL = 'https://maps.app.goo.gl/nKLB2UWiMWqCKgoV8';
const HERO_IMAGE = `${baseUrl}/gallery/krakus-mound-1.jpg`;
const SECOND_IMAGE = `${baseUrl}/gallery/krakus-mound-2.jpg`;

const htmlLang: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  pl: 'pl',
  ru: 'ru',
  de: 'de',
};

const localeName: Record<string, string> = {
  zh: '克拉庫斯丘',
  en: 'Krakus Mound',
  pl: 'Kopiec Krakusa',
  ru: 'Курган Крака',
  de: 'Krakus-Hügel',
};

const addressRegion: Record<string, string> = {
  zh: '小波兰省',
  en: 'Lesser Poland Voivodeship',
  pl: 'małopolskie',
  ru: 'Малопольское воеводство',
  de: 'Woiwodschaft Kleinpolen',
};

const addressCountryName: Record<string, string> = {
  zh: '波兰',
  en: 'Poland',
  pl: 'Polska',
  ru: 'Польша',
  de: 'Polen',
};

const addressLocality: Record<string, string> = {
  zh: '克拉科夫',
  en: 'Kraków',
  pl: 'Kraków',
  ru: 'Краков',
  de: 'Krakau',
};

const alternateNames = [
  'Krakus Mound',
  'Kopiec Krakusa',
  '克拉庫斯丘',
  'Kurhan Krakusa',
  'Krakus Mound (Kraków)',
];

const LATITUDE = 50.0380786;
const LONGITUDE = 19.9584364;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const selfUrl = `${baseUrl}/${locale}`;

  const languages: Record<string, string> = {};
  for (const [lang, url] of Object.entries({ zh: `${baseUrl}/zh`, en: `${baseUrl}/en`, pl: `${baseUrl}/pl`, ru: `${baseUrl}/ru`, de: `${baseUrl}/de` })) {
    if (lang === 'zh') languages['zh-CN'] = url;
    else if (lang === 'en') languages['en-US'] = url;
    else languages[lang] = url;
  }
  languages['x-default'] = `${baseUrl}/pl`;

  const ogLocaleMap: Record<string, string> = {
    zh: 'zh_CN',
    en: 'en_US',
    pl: 'pl_PL',
    ru: 'ru_RU',
    de: 'de_DE',
  };

  return {
    metadataBase: new URL(baseUrl),
    title: messages.meta.title,
    description: messages.meta.description,
    alternates: {
      canonical: selfUrl,
      languages,
    },
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: 'Krakus Mound',
      locale: ogLocaleMap[locale] || 'en_US',
      type: 'website',
      images: [
        {
          url: HERO_IMAGE,
          alt: `${localeName[locale]} – main view in ${addressLocality[locale]}, ${addressCountryName[locale]}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [HERO_IMAGE],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const selfUrl = `${baseUrl}/${locale}`;

  const touristAttractionSchema = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${baseUrl}/#attraction`,
    name: localeName[locale],
    alternateName: alternateNames,
    description: messages.meta.description,
    url: selfUrl,
    image: [HERO_IMAGE, SECOND_IMAGE],
    isAccessibleForFree: true,
    touristType: ['Prehistoric burial mound', 'Panoramic viewpoint', 'Historical landmark'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: addressLocality[locale],
      addressRegion: addressRegion[locale],
      postalCode: '30-543',
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
    hasMap: MAPS_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: 11297,
      bestRating: 5,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [MAPS_URL, 'https://www.poland.travel/en', 'https://visitkrakow.com/'],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Krakus Mound',
    url: baseUrl,
    logo: `${baseUrl}/icons/icon.svg`,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'Krakus Mound',
    inLanguage: htmlLang[locale] || 'en',
    publisher: { '@id': `${baseUrl}/#organization` },
  };

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [organizationSchema, websiteSchema, touristAttractionSchema],
  });

  return (
    <html lang={htmlLang[locale] || 'en'} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#3a7a8d" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* GA4 with consent gating */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              window.gtag = function() { window.dataLayer.push(arguments); };
              function loadGtag() {
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_ID}';
                document.head.appendChild(s);
                window.gtag('js', new Date());
                window.gtag('config', '${GA_ID}', { anonymize_ip: true });
              }
              function maybeLoadAnalytics() {
                var p = null;
                try { p = JSON.parse(localStorage.getItem('cookiePrefs') || '{}'); } catch(e) {}
                if (p && p.analytics === true) loadGtag();
              }
              maybeLoadAnalytics();
              window.addEventListener('consent-updated', maybeLoadAnalytics);
            `,
          }}
        />
        {/* Register Service Worker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').catch(function() {});
                });
              }
            `,
          }}
        />
        {/* Structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
