import { SimplifiedWeather } from '@/types/weather';
import { fetchWeatherByCity } from '@/lib/api/serverWeather';
import CityWeatherCard from '@/components/molecules/CityWeatherCard';
import SearchForm from '@/components/molecules/SearchForm';
import initTranslations from '@/i18n/server';
import { Locale } from '@/i18nConfig';
import { FloatingBlob } from '@/components/atoms/icons';

interface WeatherPageProps {
  searchParams: { city?: string };
  params: { locale: Locale };
}

export default async function WeatherPage({
  searchParams,
  params,
}: WeatherPageProps) {
  const city = searchParams?.city || '';
  const locale = params?.locale || 'en';
  let weather: SimplifiedWeather | null = null;
  let error: string | null = null;

  if (city && locale) {
    try {
      weather = await fetchWeatherByCity(city, locale);
    } catch (err: any) {
      error = err?.message || 'Failed to fetch';
    }
  }

  const { t } = await initTranslations(locale, ['common']);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-yellow-50 via-sky-100 to-white p-6 text-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-slate-100">
      <div className="float-1 pointer-events-none absolute -top-12 -left-8">
        <FloatingBlob />
      </div>

      <div className="float-2 pointer-events-none absolute right-6 bottom-6">
        <FloatingBlob />
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm dark:bg-slate-900/80">
        <h1 className="mb-6 text-center text-3xl font-extrabold">
          {t('search_city_weather')}
        </h1>

        {/* client SearchForm */}
        <SearchForm defaultQuery={city} />

        <section className="mt-6">
          {city && error && (
            <div className="rounded-md bg-red-50 px-4 py-3 text-red-700 shadow-sm dark:bg-red-900/40 dark:text-red-200">
              <span className="ml-2">{error}</span>
            </div>
          )}

          {city && weather && (
            <div className="mt-6">
              <CityWeatherCard weather={weather} locale={locale} />
            </div>
          )}

          {!city && (
            <p className="mt-6 text-center text-slate-600 dark:text-slate-300">
              {t('type_city')}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
