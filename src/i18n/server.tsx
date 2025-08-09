'use server';

import { createInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { i18nConfig } from '@/i18nConfig';

export default async function initTranslations(
  locale: string,
  namespaces: string[],
) {
  const i18n = createInstance();

  i18n.use(
    resourcesToBackend(async (lng: string, ns: string) => {
      try {
        const mod = await import(`../locales/${lng}/${ns}.json`);
        return mod.default;
      } catch {
        return {};
      }
    }),
  );

  await i18n.init({
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    ns: namespaces,
    interpolation: { escapeValue: false },
  });

  return {
    t: i18n.t,
    resources: i18n.services.resourceStore.data,
  };
}
