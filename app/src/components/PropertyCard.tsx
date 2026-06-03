import { Link } from 'react-router-dom';
import { MapPin, Ruler, BedDouble, Home, Heart } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useState } from 'react';
import type { Property } from '@/types';
import OptimizedImage from './OptimizedImage';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { t, lang } = useI18n();
  const [isFavorite, setIsFavorite] = useState(false);

  const statusLabel = property.status === 'sale' ? t('card.sale') : t('card.rent');
  const statusColor = property.status === 'sale' ? 'bg-alert' : 'bg-leaf';
  const priceDisplay = property.priceUnit === 'month'
    ? `${property.price.toLocaleString()} ${t('card.currency')}${t('card.month')}`
    : `${property.price.toLocaleString()} ${t('card.currency')}`;

  const typeLabels: Record<string, string> = {
    apartment: t('type.apartment'),
    villa: t('type.villa'),
    commercial: t('type.commercial'),
    land: t('type.land'),
    penthouse: t('type.penthouse'),
    duplex: t('type.duplex'),
  };

  return (
    <div className="group bg-white rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <OptimizedImage
          src={property.images[0]}
          alt={property.title[lang]}
          width={600}
          height={450}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Status Badge */}
        <span className={`absolute top-3 ${lang === 'ar' ? 'right-3' : 'left-3'} ${statusColor} text-white text-xs font-medium px-3 py-1 rounded-full`}>
          {statusLabel}
        </span>
        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 ${lang === 'ar' ? 'left-3' : 'right-3'} size-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110`}
        >
          <Heart
            size={18}
            className={isFavorite ? 'text-magenta fill-magenta' : 'text-[#475569]'}
          />
        </button>
        {/* Featured Badge */}
        {property.featured && (
          <span className={`absolute bottom-3 ${lang === 'ar' ? 'right-3' : 'left-3'} bg-magenta text-white text-xs font-medium px-3 py-1 rounded-full`}>
            {t('card.featured')}
          </span>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[#0F172A] mb-1 line-clamp-1">
          {property.title[lang]}
        </h3>
        <div className="flex items-center gap-1 text-[#64748B] text-sm mb-3">
          <MapPin size={14} />
          <span className="line-clamp-1">{property.location[lang]}</span>
        </div>

        {/* Specs Row */}
        <div className="flex items-center gap-4 text-sm text-[#475569] mb-3">
          <div className="flex items-center gap-1">
            <Ruler size={14} className="text-[#64748B]" />
            <span>{property.surface} {t('card.surface')}</span>
          </div>
          {property.rooms > 0 && (
            <div className="flex items-center gap-1">
              <BedDouble size={14} className="text-[#64748B]" />
              <span>{property.rooms} {t('card.rooms')}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Home size={14} className="text-[#64748B]" />
            <span>{typeLabels[property.type]}</span>
          </div>
        </div>

        {/* Price */}
        <div className="text-xl font-bold text-magenta mb-3">
          {priceDisplay}
        </div>

        {/* CTA */}
        <Link
          to={`/biens/${property.id}`}
          className="inline-flex items-center gap-1 text-magenta text-sm font-medium hover:underline group/link"
        >
          {t('featured.details')}
          <span className="transition-transform duration-200 group-hover/link:translate-x-1">
            {lang === 'ar' ? '←' : '→'}
          </span>
        </Link>
      </div>
    </div>
  );
}
