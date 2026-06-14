import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { locales } from './shared/constants';
import { ActiveLanguage, Locale } from './shared/types';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const supportedLocale = locales.includes(locale as Locale) ? locale : ActiveLanguage.UA;

  if (!supportedLocale) {
    notFound();
  }

  return {
    locale: supportedLocale,
    messages: (await import(`./messages/${supportedLocale}.json`)).default,
  };
});
