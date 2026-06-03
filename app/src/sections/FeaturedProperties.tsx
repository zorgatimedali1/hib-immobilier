import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import PropertyCard from '@/components/PropertyCard';
import { properties } from '@/data/properties';

export default function FeaturedProperties() {
  const { t, lang } = useI18n();
  const ref = useScrollReveal<HTMLDivElement>({ y: 50, stagger: 0.15 });

  const featuredProperties = properties.filter((p) => p.featured);

  return (
    <section className="py-20 md:py-28 bg-lightalt">
      <div className="container-main">
        <SectionHeader
          eyebrow="featured.eyebrow"
          title="featured.title"
          subtitle="featured.subtitle"
        />
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/biens"
            className="inline-flex items-center gap-2 bg-magenta hover:bg-magenta-light text-white font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            {t('featured.viewAll')}
            <ArrowRight size={16} className={`transition-transform duration-200 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}
