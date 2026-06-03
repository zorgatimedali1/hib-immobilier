import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Calendar, Building2, Users, Home } from 'lucide-react';
import type { Stat } from '@/types';
import { useI18n } from '@/context/I18nContext';

const iconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar size={32} />,
  Building2: <Building2 size={32} />,
  Users: <Users size={32} />,
  Home: <Home size={32} />,
};

interface StatCounterProps {
  stat: Stat;
}

export default function StatCounter({ stat }: StatCounterProps) {
  const { lang } = useI18n();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const colorClass = stat.color === 'magenta' ? 'text-magenta' : 'text-leaf';

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div className={`${colorClass} mb-4`}>
        {iconMap[stat.icon]}
      </div>
      <div className={`text-4xl md:text-5xl font-bold ${colorClass}`}>
        {inView ? (
          <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
        ) : (
          <span>0{stat.suffix}</span>
        )}
      </div>
      <p className="text-sm text-[#475569] mt-2">
        {stat.label[lang]}
      </p>
    </div>
  );
}
