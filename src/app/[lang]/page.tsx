import React from 'react';
import styles from './page.module.css';

import { Locale } from '@/i18n-config';
import CardComponent from './cardComponent';
import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/header';
import Footer from '@/shared/footer/footer';
import { GoogleMap } from '@/sections/homePage/GoogleMap';

// Define the Home component
async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  // JSX for the main component
  return (
    <>
      <Header lang={lang} dictionary={dictionary.project} />
      <main className={styles.main}>
        <CardComponent />
      </main>
      <GoogleMap dictionary={dictionary.project} />
      <Footer dictionary={dictionary.project} />
    </>
  );
}

// Export the Home component as the default export
export default Home;
