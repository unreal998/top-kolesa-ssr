import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import Header from '@/shared/header/HeaderComponent';
import Footer from '@/shared/footer/FooterComponent';
import Container from './components/Container';

export async function generateMetadata({
  params: { lang, itemDetailId },
}: {
  params: { lang: Locale; itemDetailId: string };
}) {
  const dictionary = await getDictionary(lang);
  const selectedItemName = itemDetailId.split('-');
  const selectedItemId = selectedItemName[selectedItemName.length - 1];

  return {
    title: `${selectedItemId} ${dictionary.project.metaTitleItemDetailPage1}  ${dictionary.project.metaTitleItemDetailPage2}`,
  };
}

async function Home({
  params: { lang, itemDetailId },
}: {
  params: { lang: Locale; itemDetailId: string };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header lang={lang} dictionary={dictionary.project} />
      <Container
        lang={lang}
        itemDetailId={itemDetailId}
        dictionary={dictionary.project}
      />
      <Footer lang={lang} dictionary={dictionary.project} />
    </>
  );
}

export default Home;
