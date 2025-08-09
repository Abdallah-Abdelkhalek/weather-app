
'use client';

import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { HeroUIProvider } from '@heroui/system';

import { store } from '../state/store';
import TranslationsProvider from './TranslationsProvider';

type Props = {
  children: ReactNode;
  locale: string;
  resources: Record<string, any>;
  themeProps?: any;
};

export function Providers({
  children,
  locale,
  resources,
  themeProps,
}: Props) {
  const router = useRouter();

  return (
    <ReduxProvider store={store}>
      <TranslationsProvider locale={locale} resources={resources}>
        <HeroUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
      </TranslationsProvider>
    </ReduxProvider>
  );
}
