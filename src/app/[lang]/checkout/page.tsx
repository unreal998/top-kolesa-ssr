import React from 'react';
import { Locale } from '@/i18n-config';

import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/HeaderComponent';
import Footer from '@/shared/footer/FooterComponent';
import { ContainerCheckout } from './components/ContainerCheckout';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.project.metaTitleCheckoutPage}`,
    icons: {
      icon: './favicon.ico',
    },
  };
}

async function Checkout({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <Header lang={lang} dictionary={dictionary.project} />
      <ContainerCheckout dictionary={dictionary.project} />
      <Footer lang={lang} dictionary={dictionary.project} />
    </div>
  );
}

export default Checkout;
