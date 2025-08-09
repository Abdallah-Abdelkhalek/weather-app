'use client';

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from '@heroui/react';
import { Link } from '@heroui/react';
import { link as linkStyles } from '@heroui/react';
import NextLink from 'next/link';
import clsx from 'clsx';
import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import { GithubIcon, SearchIcon } from '@/components/icons';
import { usePathname, useRouter, useParams } from 'next/navigation';

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentLocale = params?.locale ?? 'en';
  const otherLocale = currentLocale === 'en' ? 'ar' : 'en';

  // Build path with other locale by replacing the locale segment
  const localeSwitchPath = pathname.replace(
    `/${currentLocale}`,
    `/${otherLocale}`,
  );

  return (
    <HeroUINavbar
      maxWidth="xl"
      position="sticky"
      className="bg-background z-50 shadow-sm"
    >
      <NavbarContent
        className="basis-1/5 sm:basis-full"
        justify="start"
      >
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink
            className="text-primary flex items-center justify-start gap-1"
            href={`/${currentLocale}`}
          >
            <p className="text-lg font-extrabold tracking-wide select-none">
              Weather App
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="ml-4 hidden justify-start gap-6 lg:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary hover:text-primary transition-colors duration-200 data-[active=true]:font-semibold',
                )}
                color="foreground"
                href={`/${currentLocale}${item.href}`}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-2/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden items-center gap-4 sm:flex">
          <Link
            isExternal
            aria-label="Github"
            href={siteConfig.links.github}
            className="hover:bg-default-200 rounded-md p-2 transition"
          >
            <GithubIcon className="text-default-500 h-5 w-5" />
          </Link>
          <ThemeSwitch />
          {/* Locale switch button */}
          <button
            className="border-default-300 text-foreground hover:bg-default-200 focus:ring-primary ml-6 rounded-md border bg-transparent px-4 py-1 text-sm font-medium transition focus:ring-2 focus:ring-offset-1 focus:outline-none"
            onClick={() => router.push(localeSwitchPath)}
            aria-label="Switch language"
            title={`Switch to ${otherLocale.toUpperCase()}`}
          >
            {otherLocale.toUpperCase()}
          </button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <Link
          isExternal
          aria-label="Github"
          href={siteConfig.links.github}
          className="hover:bg-default-200 rounded-md p-2 transition"
        >
          <GithubIcon className="text-default-500 h-5 w-5" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-4 flex flex-col gap-3">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                href="#"
                size="lg"
                className="hover:bg-default-200 block w-full rounded-md px-4 py-2 transition"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
