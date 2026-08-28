import { Head } from "vite-react-ssg";
import { useLanguage } from "../../i18n/LanguageProvider";

export function PageHead({ title }: { title: string }) {
  const { t, lang } = useLanguage();
  return (
    <Head>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={t.footer.desc} />
    </Head>
  );
}
