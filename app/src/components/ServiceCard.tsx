import { useI18n } from '@/context/I18nContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Search, FileCheck, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';
import type { Service } from '@/types';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search size={32} />,
  FileCheck: <FileCheck size={32} />,
  TrendingUp: <TrendingUp size={32} />,
  ShieldCheck: <ShieldCheck size={32} />,
};

interface ServiceCardProps {
  service: Service;
  index: number;
}

export default function ServiceCard({ service, index }: ServiceCardProps) {
  const { t, lang } = useI18n();
  const ref = useScrollReveal<HTMLDivElement>({ y: 40, delay: index * 0.1 });

  return (
    <div
      ref={ref}
      className="group bg-white rounded-xl p-8 shadow-card border-t-[3px] border-magenta hover:border-leaf hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300"
    >
      <div className="text-magenta group-hover:text-leaf transition-colors duration-300">
        {iconMap[service.icon]}
      </div>
      <h4 className="text-xl font-semibold text-[#0F172A] mt-4 mb-2">
        {service.title[lang]}
      </h4>
      <p className="text-sm text-[#475569] leading-relaxed mb-4">
        {service.description[lang]}
      </p>
      <span className="inline-flex items-center gap-1 text-magenta text-xs font-medium uppercase tracking-wider group-hover:gap-2 transition-all duration-200">
        {t('services.learnMore')}
        <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </div>
  );
}
