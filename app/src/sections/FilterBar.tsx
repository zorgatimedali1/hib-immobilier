import { useI18n } from '@/context/I18nContext';
import { Filter, X } from 'lucide-react';

export interface Filters {
  type: string;
  status: string;
  location: string;
  priceRange: string;
}

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  resultCount: number;
}

const priceRanges = [
  { value: '', label: 'Tous les prix' },
  { value: '0-500000', label: '0 - 500 000 TND' },
  { value: '500000-1000000', label: '500 000 - 1 000 000 TND' },
  { value: '1000000-2000000', label: '1 000 000 - 2 000 000 TND' },
  { value: '2000000+', label: '2 000 000+ TND' },
];

const locations = [
  { value: '', label: 'Toutes les villes' },
  { value: 'Tunis', label: 'Tunis' },
  { value: 'Ariana', label: 'Ariana' },
  { value: 'La Marsa', label: 'La Marsa' },
  { value: 'Gammarth', label: 'Gammarth' },
  { value: 'Hammamet', label: 'Hammamet' },
  { value: 'Sidi Bou Said', label: 'Sidi Bou Said' },
];

export default function FilterBar({ filters, onFilterChange, resultCount }: FilterBarProps) {
  const { t } = useI18n();

  const hasActiveFilters = filters.type || filters.status || filters.location || filters.priceRange;

  const resetFilters = () => {
    onFilterChange({ type: '', status: '', location: '', priceRange: '' });
  };

  const updateFilter = (key: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-4 md:p-6 mb-8">
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <div className="flex items-center gap-2 text-[#0F172A] font-medium text-sm">
          <Filter size={18} className="text-magenta" />
          <span className="hidden md:inline">{t('listings.filter.type')}</span>
        </div>

        {/* Type Filter */}
        <select
          value={filters.type}
          onChange={(e) => updateFilter('type', e.target.value)}
          className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#475569] bg-white focus:border-magenta focus:ring-2 focus:ring-magenta/10 outline-none transition-all"
        >
          <option value="">{t('listings.filter.all')}</option>
          <option value="apartment">{t('type.apartment')}</option>
          <option value="villa">{t('type.villa')}</option>
          <option value="penthouse">{t('type.penthouse')}</option>
          <option value="duplex">{t('type.duplex')}</option>
          <option value="commercial">{t('type.commercial')}</option>
          <option value="land">{t('type.land')}</option>
        </select>

        {/* Status Filter */}
        <select
          value={filters.status}
          onChange={(e) => updateFilter('status', e.target.value)}
          className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#475569] bg-white focus:border-magenta focus:ring-2 focus:ring-magenta/10 outline-none transition-all"
        >
          <option value="">{t('listings.filter.all')}</option>
          <option value="sale">{t('listings.filter.sale')}</option>
          <option value="rent">{t('listings.filter.rent')}</option>
        </select>

        {/* Location Filter */}
        <select
          value={filters.location}
          onChange={(e) => updateFilter('location', e.target.value)}
          className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#475569] bg-white focus:border-magenta focus:ring-2 focus:ring-magenta/10 outline-none transition-all"
        >
          {locations.map((loc) => (
            <option key={loc.value} value={loc.value}>{loc.label}</option>
          ))}
        </select>

        {/* Price Range */}
        <select
          value={filters.priceRange}
          onChange={(e) => updateFilter('priceRange', e.target.value)}
          className="px-3 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#475569] bg-white focus:border-magenta focus:ring-2 focus:ring-magenta/10 outline-none transition-all"
        >
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>{range.label}</option>
          ))}
        </select>

        {/* Reset & Results */}
        <div className="ms-auto flex items-center gap-3">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 text-sm text-[#64748B] hover:text-magenta transition-colors"
            >
              <X size={16} />
              <span className="hidden md:inline">{t('listings.resetFilters')}</span>
            </button>
          )}
          <span className="text-sm text-[#64748B]">
            {resultCount} {t('listings.results')}
          </span>
        </div>
      </div>
    </div>
  );
}
