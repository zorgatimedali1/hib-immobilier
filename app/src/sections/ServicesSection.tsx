import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/data/properties';

export default function ServicesSection() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-lightbg">
      <div className="container-main">
        <SectionHeader
          eyebrow="services.eyebrow"
          title="services.title"
          subtitle="services.subtitle"
        />
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
