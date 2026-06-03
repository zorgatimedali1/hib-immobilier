import PropertyCard from '@/components/PropertyCard';
import type { Property } from '@/types';
import { useI18n } from '@/context/I18nContext';
import { Home } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const { t } = useI18n();

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Home size={48} className="text-[#CBD5E1] mb-4" />
        <h3 className="text-xl font-semibold text-[#0F172A] mb-2">
          {t('listings.noResults')}
        </h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
