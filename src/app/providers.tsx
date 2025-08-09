'use client';

import { ReactNode, useRef } from 'react';
import { Provider } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { HeroUIProvider } from '@heroui/system';
import { makeStore, AppStore } from '../state/store';
import TranslationsProvider from '../components/TranslationsProvider';
import React from 'react';


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


  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

 
  return (
    <Provider store={storeRef.current}>
      <TranslationsProvider locale={locale} resources={resources}>
        <HeroUIProvider navigate={router.push}>
          <NextThemesProvider {...themeProps}>
            {children}
          </NextThemesProvider>
        </HeroUIProvider>
      </TranslationsProvider>
    </Provider>
  );
}
