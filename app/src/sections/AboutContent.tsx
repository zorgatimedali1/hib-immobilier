import { useI18n } from '@/context/I18nContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Building2, Target, Handshake, Award } from 'lucide-react';

const values = [
  { icon: Target, key: 'about.value1' },
  { icon: Handshake, key: 'about.value2' },
  { icon: Award, key: 'about.value3' },
  { icon: Building2, key: 'about.value4' },
] as const;

export default function AboutContent() {
  const { t } = useI18n();
  const ref1 = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.1 });
  const ref2 = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.15 });

  return (
    <>
      {/* History */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container-main" ref={ref1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-magenta text-xs font-semibold uppercase tracking-[0.1em] mb-2 block">
                {t('about.history.eyebrow')}
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#0F172A] leading-tight mb-6">
                {t('about.history.title')}
              </h2>
              <div className="space-y-4 text-[#475569] text-base leading-relaxed">
                <p>{t('about.history.p1')}</p>
                <p>{t('about.history.p2')}</p>
                <p>{t('about.history.p3')}</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hibimmb.jpg"
                alt="Hibiscus Immobiliere"
                className="rounded-2xl w-full h-[400px] object-cover shadow-card"
              />
              <div className="absolute -bottom-6 -end-6 size-32 bg-magenta/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-lightbg">
        <div className="container-main text-center" ref={ref2}>
          <span className="text-magenta text-xs font-semibold uppercase tracking-[0.1em] mb-2 block">
            {t('about.mission.eyebrow')}
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0F172A] leading-tight mb-6">
            {t('about.mission.title')}
          </h2>
          <p className="text-[#475569] text-base md:text-lg max-w-3xl mx-auto leading-relaxed mb-12">
            {t('about.mission.text')}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, key }) => (
              <div key={key} className="bg-white rounded-xl p-6 shadow-card text-center">
                <div className="size-14 mx-auto mb-4 rounded-full bg-magenta/10 flex items-center justify-center">
                  <Icon size={24} className="text-magenta" />
                </div>
                <p className="text-sm font-medium text-[#0F172A]">{t(key)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
