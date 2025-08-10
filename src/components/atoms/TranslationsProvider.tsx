
'use client';

import { I18nextProvider } from 'react-i18next';
import { ReactNode } from 'react';
import i18n from '@/i18n/client';

type Props = {
  children: ReactNode;
  locale: string;
  resources: Record<string, any>;
};

export default function TranslationsProvider({
  children,
  locale,
  resources,
}: Props) {
  // Add resources dynamically for current locale
  Object.entries(resources).forEach(([lng, namespaces]) => {
    Object.entries(namespaces).forEach(([ns, resource]) => {
      if (!i18n.hasResourceBundle(lng, ns)) {
        i18n.addResourceBundle(lng, ns, resource, true, true);
      }
    });
  });

  i18n.changeLanguage(locale);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
