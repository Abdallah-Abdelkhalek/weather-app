import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import { Link } from '@heroui/link';
import { notFound } from 'next/navigation';
import { locales, Locale } from '@/i18nConfig';
import { Navbar } from '@/components/navbar';
import { siteConfig } from '@/config/site';
import clsx from 'clsx';
import initTranslations from '@/i18n/server';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/weather-favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

interface Props {
  children: React.ReactNode;
  params: { locale: Locale };
}

export default async function RootLayout({
  children,
  params,
}: Props) {
  const locale = params.locale;

  if (!locales.includes(locale)) notFound();

  // Load translations server-side for 'common' and 'home'
  const { resources } = await initTranslations(locale, [
    'common',
    'home',
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'text-foreground bg-background min-h-screen font-sans antialiased',
          inter.className,
        )}
      >
        {/* Pass locale and resources into your Providers */}
        <Providers
          locale={locale}
          resources={resources}
          themeProps={{ attribute: 'class', defaultTheme: 'dark' }}
        >
          <div className="relative flex h-screen flex-col">
            <Navbar />
            <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">
              {children}
            </main>
            <footer className="flex w-full items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://www.linkedin.com/in/abdallah-abdelkhalek/"
                title="Weather App by Abdallah-Abdelkhalek"
              >
                <span className="text-default-600">Developed by</span>
                <p className="text-primary">Abdallah</p>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
