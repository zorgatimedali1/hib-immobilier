import { useEffect } from 'react';
import { useI18n } from '@/context/I18nContext';
import ContactHero from '@/sections/ContactHero';
import ContactInfo from '@/sections/ContactInfo';
import ContactForm from '@/sections/ContactForm';

export default function Contact() {
  const { lang } = useI18n();

  useEffect(() => {
    document.title = lang === 'fr'
      ? 'Hibiscus Immobiliere | Contact'
      : 'هيبيسكوس العقارية | اتصل بنا';
  }, [lang]);

  return (
    <main>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
    </main>
  );
}
