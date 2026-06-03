import { useI18n } from '@/context/I18nContext';
import PropertyCard from '@/components/PropertyCard';
import type { Property } from '@/types';
import { properties } from '@/data/properties';

interface SimilarPropertiesProps {
  currentProperty: Property;
}

export default function SimilarProperties({ currentProperty }: SimilarPropertiesProps) {
  const { t } = useI18n();

  const similar = properties
    .filter(
      (p) =>
        p.id !== currentProperty.id &&
        (p.type === currentProperty.type || p.location.fr.includes(currentProperty.location.fr.split(',')[0]))
    )
    .slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-lightalt">
      <div className="container-main">
        <h2 className="text-2xl font-semibold text-[#0F172A] mb-8">
          {t('detail.similar')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {similar.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
