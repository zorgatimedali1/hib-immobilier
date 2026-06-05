import { useEffect, useState, useMemo } from 'react';
import { useI18n } from '@/context/I18nContext';
import ListingsHero from '@/sections/ListingsHero';
import FilterBar, { type Filters } from '@/sections/FilterBar';
import PropertyGrid from '@/sections/PropertyGrid';
import { useProperties } from '@/lib/hooks';

export default function Listings() {
  const { lang } = useI18n();
  const { data: properties = [], isLoading } = useProperties();
  const [filters, setFilters] = useState<Filters>({
    type: '',
    status: '',
    location: '',
    priceRange: '',
  });

  useEffect(() => {
    document.title = lang === 'fr'
      ? 'Hibiscus Immobiliere | Biens immobiliers'
      : 'هيبيسكوس العقارية | العقارات';
  }, [lang]);

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.type && property.type !== filters.type) return false;
      if (filters.status && property.status !== filters.status) return false;
      if (filters.location && !property.location.fr.includes(filters.location)) return false;
      if (filters.priceRange) {
        if (filters.priceRange === '2000000+') {
          if (property.price < 2000000) return false;
        } else {
          const [min, max] = filters.priceRange.split('-').map(Number);
          if (property.price < min || property.price > max) return false;
        }
      }
      return true;
    });
  }, [filters, properties]);

  return (
    <main>
      <ListingsHero />
      <section className="py-12 md:py-16 bg-lightbg">
        <div className="container-main">
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            resultCount={filteredProperties.length}
          />
          {isLoading ? (
            <div className="text-center py-12 text-[#94A3B8]">{lang === 'fr' ? 'Chargement...' : 'جاري التحميل...'}</div>
          ) : (
            <PropertyGrid properties={filteredProperties} />
          )}
        </div>
      </section>
    </main>
  );
}
