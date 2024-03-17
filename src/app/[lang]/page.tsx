import React from 'react';
import styles from './page.module.css';

import LocaleSwitcher from './localeSwitcher';
import { Locale } from '@/i18n-config';
import CardComponent from './cardComponent';
import { getDictionary } from '@/get-dictionary';

// Define the Home component
async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  // JSX for the main component
  return (
    <main className={styles.main}>
      <LocaleSwitcher params={{dictionary}}/>
      <CardComponent />
    </main>
  );
};

// Export the Home component as the default export
export default Home;
