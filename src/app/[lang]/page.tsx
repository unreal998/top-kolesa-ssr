import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/HeaderComponent';
import Footer from '@/shared/footer/FooterComponent';
import { GoogleMap } from '@/sections/homePage/GoogleMap';
import { OurServices } from '@/sections/homePage/OurServices';
import { TiresInput } from '@/sections/homePage/TiresInput';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.project.metaTitleMainPage}`,
    icons: {
      icon: './favicon.ico',
    },
  };
}

async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dictionary={dictionary.project} />
      <TiresInput dictionary={dictionary.project} />
      <OurServices dictionary={dictionary.project} />
      <GoogleMap dictionary={dictionary.project} />
      <Footer lang={lang} dictionary={dictionary.project} />
    </>
  );
}

export default Home;
