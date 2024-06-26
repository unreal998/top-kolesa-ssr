import './globals.css';
import { PT_Sans } from 'next/font/google';

import { Providers } from '../../redux/provider';
import { Locale, i18n } from '@/i18n-config';

const ptSans = PT_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ptSans',
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  return (
    <Providers>
      <html lang={params.lang} className={ptSans.className}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <body>
          <main>{children}</main>
        </body>
      </html>
    </Providers>
  );
}
