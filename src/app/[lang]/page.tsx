import React from 'react';

import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/header';
import Footer from '@/shared/footer/footer';
import { GoogleMap } from '@/sections/homePage/GoogleMap';
import { OurServices } from '@/sections/homePage/OurServices';
import { TiresInput } from '@/sections/homePage/TiresInput';

// Define the Home component
async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  // JSX for the main component
  return (
    <>
      <Header lang={lang} dictionary={dictionary.project} />
      <TiresInput dictionary={dictionary.project} />
      <OurServices dictionary={dictionary.project} />
      <GoogleMap dictionary={dictionary.project} />
      <Footer dictionary={dictionary.project} />
    </>
  );
}

// Export the Home component as the default export
export default Home;
