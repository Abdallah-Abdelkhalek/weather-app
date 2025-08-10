import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nConfig } from './i18nConfig';

type Locale = (typeof i18nConfig.locales)[number];

export function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const pathname = nextUrl.pathname;

  // 0. Skip Next internals, API and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  // 1. If path already contains locale (e.g. /ar/...), respect it and set cookie if needed
  const pathLocale = pathname.split('/')[1] as Locale | undefined;
  if (pathLocale && i18nConfig.locales.includes(pathLocale)) {
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale !== pathLocale) {
      const res = NextResponse.next();
      res.cookies.set('NEXT_LOCALE', pathLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      });
      return res;
    }
    return NextResponse.next();
  }

  // 2. Otherwise fall back to cookie -> Accept-Language -> default
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const headerLocale = request.headers
    .get('accept-language')
    ?.split(',')[0]
    ?.split('-')[0];
  const preferred = cookieLocale || headerLocale;
  const safeLocale: Locale =
    (i18nConfig.locales.find((l) => l === preferred) as Locale) ??
    i18nConfig.defaultLocale;

  // Redirect to the prefixed path, preserving existing search params
  const redirectUrl = new URL(request.url);
  redirectUrl.pathname = `/${safeLocale}${pathname}`;
  const res = NextResponse.redirect(redirectUrl);
  // Also set cookie so subsequent requests remember it
  res.cookies.set('NEXT_LOCALE', safeLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api|favicon.ico).*)'],
};
