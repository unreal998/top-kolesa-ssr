'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { i18n, type Locale } from '../../i18n-config';
import { I18nDictionary } from '@/shared/types';

export default async function LocaleSwitcher({
    params: { dictionary },
  }: {
    params: { dictionary: I18nDictionary };
  }) {
  const pathName = usePathname();
  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div>
      <p>{dictionary['locale-switcher'].switcher}</p>
      <ul>
        {i18n.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={redirectedPathName(locale)}>{locale}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
