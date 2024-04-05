import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/HeaderComponent';
import Footer from '@/shared/footer/FooterComponent';
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
      <Footer lang={lang} dictionary={dictionary.project} />
    </>
  );
}

export default Home;
