import React from 'react';
import { Locale } from '@/i18n-config';

import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/HeaderComponent';
import Footer from '@/shared/footer/FooterComponent';
import AboutPage from './components/about';

import Head from 'next/head';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.project.metaTitleAboutPage}`,
    icons: {
      icon: './favicon.ico',
    },
  };
}

async function About({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <Header lang={lang} dictionary={dictionary.project} />
      <AboutPage dictionary={dictionary.project} />
      <Footer lang={lang} dictionary={dictionary.project} />
    </div>
  );
}

export default About;
