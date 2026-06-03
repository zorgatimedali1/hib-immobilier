import { useI18n } from '@/context/I18nContext';

export default function ListingsHero() {
  const { t } = useI18n();

  return (
    <section className="relative h-[40vh] min-h-[280px] max-h-[400px] flex items-center justify-center bg-darksurface overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-darkbg via-darksurface to-magenta/20" />
      <div className="absolute top-0 right-0 size-80 bg-magenta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 size-60 bg-leaf/10 rounded-full blur-3xl" />

      <div className="relative z-10 container-main text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {t('listings.hero.title')}
        </h1>
        <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
          {t('listings.hero.subtitle')}
        </p>
      </div>
    </section>
  );
}
