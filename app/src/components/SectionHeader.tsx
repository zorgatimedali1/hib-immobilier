import { useI18n } from '@/context/I18nContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import type { TranslationKey } from '@/data/translations';

interface SectionHeaderProps {
  eyebrow: TranslationKey;
  title: TranslationKey;
  subtitle: TranslationKey;
  align?: 'center' | 'start';
  light?: boolean;
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', light = false }: SectionHeaderProps) {
  const { t } = useI18n();
  const ref = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.1, duration: 0.6 });

  const alignClass = align === 'center' ? 'text-center items-center' : 'text-start items-start';
  const textColor = light ? 'text-white' : 'text-[#0F172A]';
  const mutedColor = light ? 'text-white/70' : 'text-[#475569]';

  return (
    <div ref={ref} className={`flex flex-col mb-12 md:mb-16 ${alignClass}`}>
      <span className="text-magenta text-xs font-semibold uppercase tracking-[0.1em] mb-2">
        {t(eyebrow)}
      </span>
      <h2 className={`text-3xl md:text-4xl lg:text-[40px] font-semibold ${textColor} leading-tight`}>
        {t(title)}
      </h2>
      <p className={`text-base md:text-lg mt-3 max-w-2xl ${mutedColor}`}>
        {t(subtitle)}
      </p>
      <div className="w-10 h-[3px] bg-magenta mt-4 rounded-full" />
    </div>
  );
}
