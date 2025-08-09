import React from 'react';
import { title, subtitle } from '@/components/primitives';
import { Link } from '@heroui/link';
import { Snippet } from '@heroui/snippet';
import { Code } from '@heroui/code';
import { button as buttonStyles } from '@heroui/theme';
import { siteConfig } from '@/config/site';
import { GithubIcon } from '@/components/icons';
import initTranslations from '@/i18n/server';

interface Props {
  params: { locale: string };
}

export default async function Home({ params }: Props) {
  // Load translations for this page server-side, only the namespaces you need
  const { t } = await initTranslations(params.locale, [
    'common',
    'home',
  ]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl justify-center text-center">
        <span className={title()}>{t('hero.part1')}&nbsp;</span>
        <span className={title({ color: 'violet' })}>
          {t('hero.part2')}&nbsp;
        </span>
        <br />
        <span className={title()}>{t('hero.part3')}</span>
        <div className={subtitle({ class: 'mt-4' })}>
          {t('subtitle')}
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          href="https://your-docs-link.example"
          className={buttonStyles({
            color: 'primary',
            radius: 'full',
            variant: 'shadow',
          })}
        >
          {t('buttons.documentation')}
        </Link>
        <Link
          isExternal
          href={siteConfig.links.github}
          className={buttonStyles({
            variant: 'bordered',
            radius: 'full',
          })}
        >
          <GithubIcon size={20} />
          {t('buttons.github')}
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            {t('home.snippet.text')}{' '}
            <Code color="primary">{t('home.snippet.code')}</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
