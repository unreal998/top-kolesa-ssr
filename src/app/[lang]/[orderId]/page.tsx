import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/Header';
import Footer from '@/shared/footer/Footer';

async function Home({
  params: { lang, orderId },
}: {
  params: { lang: Locale; itemDetailId: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dictionary={dictionary.project} />
      <p>{orderId}</p>
      <Footer dictionary={dictionary.project} />
    </>
  );
}

export default Home;
