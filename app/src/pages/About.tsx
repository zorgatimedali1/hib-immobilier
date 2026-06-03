import { useEffect } from 'react';
import { useI18n } from '@/context/I18nContext';
import AboutHero from '@/sections/AboutHero';
import AboutContent from '@/sections/AboutContent';

export default function About() {
  const { lang } = useI18n();

  useEffect(() => {
    document.title = lang === 'fr'
      ? 'Hibiscus Immobiliere | A propos'
      : 'هيبيسكوس العقارية | من نحن';
  }, [lang]);

  return (
    <main>
      <AboutHero />
      <AboutContent />
    </main>
  );
}
