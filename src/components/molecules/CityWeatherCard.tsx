import initTranslations from '@/i18n/server';
import { SimplifiedWeather } from '@/types/weather';

export default async function CityWeatherCard({
  weather,
  locale,
}: {
  weather: SimplifiedWeather;
  locale: string;
}) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`; // bigger icon for retina screens
  const { t } = await initTranslations(locale, ['common']);
  return (
    <div className="mx-auto rounded-3xl bg-gradient-to-tr from-sky-700 via-indigo-800 to-purple-900 p-6 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur-md transition-transform duration-300 ease-in-out hover:scale-[1.03]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <img
          src={iconUrl}
          alt={weather.description}
          width={120}
          height={120}
          className="mx-auto sm:mx-0"
          loading="lazy"
          draggable={false}
        />
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-3xl font-extrabold tracking-wide drop-shadow-md">
            {weather.name}
            {weather.country ? `, ${weather.country}` : ''}
          </h2>
          <p className="mt-1 text-base font-semibold capitalize opacity-90 drop-shadow-sm">
            {weather.description}
          </p>
          <div className="mt-3 text-6xl font-extrabold tracking-tight drop-shadow-lg">
            {weather.tempC}°C
          </div>
        </div>
      </div>
      <div className="mt-5 text-center font-mono text-xs opacity-70 select-none sm:text-right">
        {t('updated')}: {new Date(weather.timestamp).toLocaleString()}
      </div>
    </div>
  );
}
