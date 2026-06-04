import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

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
  const baseUrl = 'https://krakusmound.com';

  const localeUrls: Record<string, string> = {
    zh: `${baseUrl}/zh`,
    en: `${baseUrl}/en`,
    pl: `${baseUrl}/pl`,
    ru: `${baseUrl}/ru`,
    de: `${baseUrl}/de`,
  };
  const selfUrl = localeUrls[locale] || localeUrls['en'];

  const languages: Record<string, string> = {};
  for (const [lang, url] of Object.entries(localeUrls)) {
    if (lang === 'zh') languages['zh-CN'] = url;
    else if (lang === 'en') languages['en-US'] = url;
    else languages[lang] = url;
  }

  const ogLocaleMap: Record<string, string> = {
    zh: 'zh_CN',
    en: 'en_US',
    pl: 'pl_PL',
    ru: 'ru_RU',
    de: 'de_DE',
  };

  return {
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

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} suppressHydrationWarning>
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossOrigin="anonymous" />
        <meta name="google-adsense-account" content="ca-pub-XXXXXXXXXX" />
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
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
