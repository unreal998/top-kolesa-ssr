import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/header';
import Footer from '@/shared/footer/Footer';
import Container from './components/Container';

async function Home({
  params: { lang, itemDetailId },
}: {
  params: { lang: Locale; itemDetailId: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dictionary={dictionary.project} />
      <Container itemDetailId={itemDetailId} dictionary={dictionary.project} />
      <Footer dictionary={dictionary.project} />
    </>
  );
}

export default Home;
