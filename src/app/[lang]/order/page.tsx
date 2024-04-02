import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/Header';
import Footer from '@/shared/footer/Footer';
import { Container } from './components/container';

async function Home({
  params: { lang },
}: {
  params: { lang: Locale; itemDetailId: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dictionary={dictionary.project} />
      <Container dictionary={dictionary.project} />
      <Footer dictionary={dictionary.project} />
    </>
  );
}

export default Home;
