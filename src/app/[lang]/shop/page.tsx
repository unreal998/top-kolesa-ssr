import React from 'react';
import { Locale } from '@/i18n-config';

import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/Header';
import Footer from '@/shared/footer/Footer';
import ContainerPage from './components/containerPage';

async function Shop({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <Header lang={lang} dictionary={dictionary.project} />
      <ContainerPage dictionary={dictionary.project} />
      <Footer dictionary={dictionary.project} />
    </div>
  );
}

export default Shop;
