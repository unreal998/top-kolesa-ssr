import React from 'react';
import { Locale } from '@/i18n-config';

import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/Header';
import Footer from '@/shared/footer/Footer';
import { ContainerCheckout } from './components/ContainerCheckout';

async function Checkout({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <Header lang={lang} dictionary={dictionary.project} />
      <ContainerCheckout dictionary={dictionary.project} />
      <Footer dictionary={dictionary.project} />
    </div>
  );
}

export default Checkout;
