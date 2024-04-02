import React from 'react';
import { Locale } from '@/i18n-config';

import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/header';
import Footer from '@/shared/footer/Footer';
import { ContactPage } from './components/contact';

async function Contact({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  return (
    <div>
      <Header lang={lang} dictionary={dictionary.project} />
      <ContactPage dictionary={dictionary.project} />
      <Footer dictionary={dictionary.project} />
    </div>
  );
}

export default Contact;
