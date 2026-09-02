import { getLocale, getMessages, getTranslations } from 'next-intl/server';

/**
 * Live weather & multi-day forecast for Krakus Mound.
 * - Data source: Open-Meteo (free, no API key required) https://open-meteo.com
 * - Server Component: fetch happens on the server and the result is cached
 *   for 30 minutes (`next: { revalidate: 1800 }`). On static export builds the
 *   data is fetched once during the build (prerender) and safely falls back
 *   to a friendly placeholder if the API is unreachable.
 */

type CurrentWeather = {
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  weather_code: number;
  wind_speed_10m: number;
  is_day: number;
};

type DailyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: (number | null)[];
  temperature_2m_min: (number | null)[];
  precipitation_probability_max: (number | null)[];
  sunrise: string[];
  sunset: string[];
};

type WeatherData = { current: CurrentWeather; daily: DailyWeather };

const MOUND_LAT = '50.0381';
const MOUND_LNG = '19.9581';
const MOUND_TZ = 'Europe/Warsaw';
const FORECAST_DAYS = 7;
const CACHE_SECONDS = 1800;

async function fetchWeather(): Promise<WeatherData | null> {
  const params = new URLSearchParams({
    latitude: MOUND_LAT,
    longitude: MOUND_LNG,
    current:
      'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m,is_day',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    timezone: MOUND_TZ,
    forecast_days: String(FORECAST_DAYS),
  });

  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
      next: { revalidate: CACHE_SECONDS },
      headers: { accept: 'application/json' },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as Partial<WeatherData>;
    if (!json.current || !json.daily) return null;
    return json as WeatherData;
  } catch {
    return null;
  }
}

type GlyphKind = 'sun' | 'moon' | 'cloud' | 'partly' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'storm';

function glyphKind(code: number): GlyphKind {
  if (code === 0) return 'sun';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'cloud';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if (code >= 61 && code <= 67) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 80 && code <= 82) return 'rain';
  if (code >= 85 && code <= 86) return 'snow';
  if (code >= 95 && code <= 99) return 'storm';
  return 'cloud';
}

function WeatherGlyph({ code, size, isDay }: { code: number; size: number; isDay: boolean }) {
  const kind = glyphKind(code);
  const strokeWidth = 1.7;
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {kind === 'sun' &&
        (isDay ? (
          <g {...common}>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M6.34 17.66l-1.41 1.41" />
            <path d="M19.07 4.93l-1.41 1.41" />
          </g>
        ) : (
          <path {...common} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        ))}
      {(kind === 'partly' || kind === 'cloud') && (
        <g {...common}>
          {kind === 'partly' && isDay && <circle cx="9" cy="8" r="3" />}
          <path d="M18 11.5h-1.03a4.4 4.4 0 1 0-7.2-1.02A3.6 3.6 0 1 0 9.5 19H17.5a3.5 3.5 0 0 0 .5-7.5z" />
        </g>
      )}
      {kind === 'fog' && (
        <g {...common}>
          <path d="M18 9.5h-1.5a4.5 4.5 0 1 0-7.8-2.9A4.5 4.5 0 1 0 8.5 16.5H18a3 3 0 0 0 0-6z" />
          <path d="M5 19h14" />
          <path d="M7 22h10" />
        </g>
      )}
      {(kind === 'drizzle' || kind === 'rain' || kind === 'snow') && (
        <g {...common}>
          <path d="M17.5 12.5H16a5 5 0 1 0-8.9-3.1A5 5 0 1 0 9 16.5h8.5a3 3 0 0 0 0-4z" />
          {kind === 'drizzle' && (
            <>
              <path d="M9.5 15.5l-1 2.5" />
              <path d="M15.5 15.5l-1 2.5" />
            </>
          )}
          {kind === 'rain' && (
            <>
              <path d="M8 15l-1.2 3" />
              <path d="M13 15l-1.2 3" />
              <path d="M18 15l-1.2 3" />
            </>
          )}
          {kind === 'snow' && (
            <>
              <circle cx="8" cy="16.5" r="1" />
              <circle cx="13" cy="16.5" r="1" />
              <circle cx="18" cy="16.5" r="1" />
            </>
          )}
        </g>
      )}
      {kind === 'storm' && (
        <g {...common}>
          <path d="M17.5 10.5H16a5 5 0 1 0-8.9-3.1A5 5 0 1 0 9 14.5h8.5a3 3 0 0 0 0-4z" />
          <path d="M11.5 14.5l-1.7 4h2.2l-1.5 4" />
        </g>
      )}
      {kind === 'moon' && <path {...common} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />}
    </svg>
  );
}

const DATE_LOCALE: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en-US',
  pl: 'pl-PL',
  ru: 'ru-RU',
  de: 'de-DE',
};

export default async function WeatherSection() {
  const [locale, t, messages] = await Promise.all([
    getLocale(),
    getTranslations('weather'),
    getMessages(),
  ]);

  const codes = ((messages as any)?.weather?.codes ?? {}) as Record<string, string>;
  const weather = await fetchWeather();

  const dateLocale = DATE_LOCALE[locale] || locale;
  const dayFmt = new Intl.DateTimeFormat(dateLocale, {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const desc = (code: number) => codes[`c${code}`] || String(code);
  const hour = (iso: string | undefined) => (iso ? iso.slice(11, 16) : '—');
  const stat = (value: string) => (
    <span className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
      {value}
    </span>
  );

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-10 mx-auto" style={{ background: 'var(--accent)' }} />

        {!weather ? (
          <div
            className="rounded-2xl p-8 text-center max-w-xl mx-auto"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
              {t('fallbackTitle')}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t('fallbackBody')}
            </p>
          </div>
        ) : (
          <>
            {/* Current conditions */}
            <div
              className="rounded-2xl p-6 sm:p-8 mb-6"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-5"
                style={{ color: 'var(--accent)' }}
              >
                {t('currentTitle')}
              </div>
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-center">
              <div className="flex items-center gap-6 flex-1 min-w-0">
                <div style={{ color: 'var(--accent)' }}>
                  <WeatherGlyph
                    code={weather.current.weather_code}
                    size={84}
                    isDay={weather.current.is_day === 1}
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-5xl sm:text-6xl font-bold leading-none mb-2" style={{ color: 'var(--text-primary)' }}>
                    {Math.round(weather.current.temperature_2m)}°C
                  </div>
                  <div className="text-base font-medium mb-1" style={{ color: 'var(--text-secondary)' }}>
                    {desc(weather.current.weather_code)}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {weather.daily.temperature_2m_max[0] != null &&
                      `H ${Math.round(weather.daily.temperature_2m_max[0])}°`}
                    {weather.daily.temperature_2m_min[0] != null &&
                      `  L ${Math.round(weather.daily.temperature_2m_min[0])}°`}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto lg:min-w-[420px]">
                <div className="rounded-xl px-4 py-3" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                    {t('feelsLike')}
                  </div>
                  {stat(`${Math.round(weather.current.apparent_temperature)}°C`)}
                </div>
                <div className="rounded-xl px-4 py-3" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                    {t('humidity')}
                  </div>
                  {stat(`${Math.round(weather.current.relative_humidity_2m)}%`)}
                </div>
                <div className="rounded-xl px-4 py-3" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                    {t('wind')}
                  </div>
                  {stat(`${Math.round(weather.current.wind_speed_10m)} km/h`)}
                </div>
                <div className="rounded-xl px-4 py-3" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                    {t('sunrise')}
                  </div>
                  {stat(hour(weather.daily.sunrise[0]))}
                </div>
                <div className="rounded-xl px-4 py-3" style={{ border: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                  <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                    {t('sunset')}
                  </div>
                  {stat(hour(weather.daily.sunset[0]))}
                </div>
              </div>
              </div>
            </div>

            {/* Multi-day forecast */}
            <h3
              className="font-display text-xl sm:text-2xl font-semibold mb-5"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('forecastTitle')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {weather.daily.time.map((date, i) => {
                const max = weather.daily.temperature_2m_max[i];
                const min = weather.daily.temperature_2m_min[i];
                const precip = weather.daily.precipitation_probability_max[i];
                const today = i === 0;
                return (
                  <div
                    key={date}
                    className="rounded-2xl p-4 text-center flex flex-col items-center gap-2"
                    style={{
                      background: 'var(--card-bg)',
                      border: today ? '1px solid var(--accent)' : '1px solid var(--border-color)',
                      boxShadow: 'var(--card-shadow)',
                    }}
                  >
                    <div className="text-xs font-medium uppercase tracking-wide" style={{ color: today ? 'var(--accent)' : 'var(--text-muted)' }}>
                      {today ? t('today') : dayFmt.format(new Date(`${date}T12:00:00Z`))}
                    </div>
                    {today && (
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {dayFmt.format(new Date(`${date}T12:00:00Z`))}
                      </div>
                    )}
                    <div style={{ color: 'var(--accent)' }}>
                      <WeatherGlyph code={weather.daily.weather_code[i]} size={38} isDay />
                    </div>
                    <div className="text-sm font-semibold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                      {max != null && Math.round(max)}°{' / '}
                      {min != null && Math.round(min)}°
                    </div>
                    <div className="text-xs whitespace-nowrap inline-flex items-center gap-1" style={{ color: 'var(--text-muted)' }} title={t('precip')}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                      <span>{precip != null ? `${precip}%` : '—'}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs mt-6 text-center" style={{ color: 'var(--text-muted)' }}>
              {t('updated')}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
