import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nConfig } from './i18nConfig';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const localeCookie = request.cookies.get('NEXT_LOCALE');
  const preferredLocale = 
    localeCookie?.value || 
    request.headers.get('accept-language')?.split(',')[0].split('-')[0];

  // Check if the default locale is in the pathname
  if (
    i18nConfig.locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )
  ) {
    return NextResponse.next();
  }

  // Redirect to preferred or default locale
  const locale = 
    i18nConfig.locales.includes(preferredLocale as any) 
      ? preferredLocale 
      : i18nConfig.defaultLocale;

  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};