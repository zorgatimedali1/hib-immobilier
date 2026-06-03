import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import StatCounter from '@/components/StatCounter';
import { stats } from '@/data/properties';

export default function StatsSection() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-darkbg relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 size-40 bg-magenta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 size-60 bg-leaf/10 rounded-full blur-3xl" />

      <div className="container-main relative z-10">
        <SectionHeader
          eyebrow="stats.eyebrow"
          title="stats.title"
          subtitle="stats.subtitle"
          light
        />
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <StatCounter key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
