'use client';

import { Button } from '@heroui/react';
import { Input } from '@heroui/react';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initFromStorage } from '@/state/slices/weatherSlice';
import { motion } from 'framer-motion';
import { FloatingBlob } from '@/components/atoms/icons';
import { useTranslation } from 'react-i18next';
import { Locale } from '@/i18nConfig';
import { usePathname } from 'next/navigation';

const CurrentLocationWeather = dynamic(
  () => import('@/components/organisms/CurrentLocationWeather'),
  { ssr: false },
);

export default function Home() {
  const [city, setCity] = useState('');
  const [lang, setLang] = useState<Locale>('en');
  const pathname = usePathname();

  useEffect(() => {
    const pathLang = pathname.split('/')[1];
    setLang((pathLang as Locale) || 'en');
  }, [pathname]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initFromStorage());
  }, [dispatch]);

  const { t } = useTranslation('common');

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-cyan-300 via-blue-400 to-indigo-500 px-6 py-16 dark:from-indigo-900 dark:via-indigo-800 dark:to-indigo-900">
      {/* Floating SVG blobs */}
      <FloatingBlob />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex w-full max-w-lg flex-col gap-8 rounded-3xl bg-white p-10 shadow-2xl dark:bg-gray-900"
      >
        <h1 className="text-center text-4xl font-extrabold text-gray-900 select-none dark:text-white">
          {t('weather_dashboard')}
        </h1>

        <section className="rounded-2xl bg-gray-100 p-6 shadow-inner shadow-gray-300 transition-colors duration-300 dark:bg-gray-800 dark:shadow-black/50">
          <CurrentLocationWeather language={lang} />
        </section>

        <form
          action={`/weather?city=${encodeURIComponent(city)}&lang=${lang}`}
          method="get"
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            if (!city) e.preventDefault();
          }}
        >
          <label htmlFor="city" className="sr-only">
            {t('search_city')}
          </label>
          <Input
            id="city"
            name="city"
            placeholder={t('search_placeholder')}
            value={city}
            onValueChange={setCity}
            className="rounded-xl border border-gray-300 bg-gray-200 p-4 text-lg text-gray-900 placeholder-gray-500 caret-blue-600 transition focus:ring-4 focus:ring-blue-400 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:caret-blue-400 dark:focus:ring-blue-600"
          />

          <Button
            type="submit"
            disabled={!city}
            className="rounded-xl bg-blue-500 py-4 font-semibold text-white shadow-md transition duration-300 select-none hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {t('search_city')}
          </Button>
        </form>
      </motion.div>
    </main>
  );
}
