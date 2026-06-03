import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useI18n } from '@/context/I18nContext';
import { MapPin, Ruler, BedDouble, Bath, Calendar } from 'lucide-react';
import type { Property } from '@/types';
import type { TranslationKey } from '@/data/translations';

import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

interface DetailHeroProps {
  property: Property;
}

export default function DetailHero({ property }: DetailHeroProps) {
  const { t, lang } = useI18n();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const statusLabel = property.status === 'sale' ? t('card.sale') : t('card.rent');
  const statusColor = property.status === 'sale' ? 'bg-alert' : 'bg-leaf';
  const priceDisplay = property.priceUnit === 'month'
    ? `${property.price.toLocaleString()} ${t('card.currency')}${t('card.month')}`
    : `${property.price.toLocaleString()} ${t('card.currency')}`;

  return (
    <section className="pt-[72px]">
      {/* Gallery */}
      <div className="bg-darkbg">
        <div className="container-main py-6 md:py-8">
          {/* Main Image Swiper */}
          <Swiper
            modules={[Thumbs, FreeMode, Navigation]}
            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
            navigation
            spaceBetween={10}
            className="rounded-xl overflow-hidden mb-4 aspect-[16/9] max-h-[600px]"
          >
            {property.images.map((image, index) => (
              <SwiperSlide key={image}>
                <img
                  src={image}
                  alt={`${property.title[lang]} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnail Swiper */}
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Navigation, Thumbs]}
            spaceBetween={8}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            breakpoints={{
              640: { slidesPerView: 5 },
              1024: { slidesPerView: 6 },
            }}
            className="overflow-hidden"
          >
            {property.images.map((image, index) => (
              <SwiperSlide key={`thumb-${image}`} className="cursor-pointer">
                <div className="rounded-lg overflow-hidden aspect-[4/3] border-2 border-transparent hover:border-magenta transition-colors duration-200 swiper-slide-thumb-active:border-magenta">
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Property Title & Quick Info */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="container-main py-6 md:py-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`${statusColor} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                  {statusLabel}
                </span>
                <span className="bg-darksurface text-white text-xs font-medium px-3 py-1 rounded-full">
                  {t(`type.${property.type}` as TranslationKey)}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-2">
                {property.title[lang]}
              </h1>
              <div className="flex items-center gap-1.5 text-[#64748B]">
                <MapPin size={16} />
                <span className="text-sm">{property.location[lang]}</span>
              </div>
            </div>
            <div className="text-start md:text-end">
              <p className="text-2xl md:text-3xl font-bold text-magenta">
                {priceDisplay}
              </p>
              <p className="text-xs text-[#64748B] mt-1">
                {t('detail.reference')}: {property.id.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="flex flex-wrap gap-4 md:gap-6 mt-6 pt-6 border-t border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Ruler size={18} className="text-magenta" />
              <span className="text-sm text-[#475569]">{property.surface} {t('detail.surface')}</span>
            </div>
            {property.rooms > 0 && (
              <div className="flex items-center gap-2">
                <BedDouble size={18} className="text-magenta" />
                <span className="text-sm text-[#475569]">{property.rooms} {t('detail.rooms')}</span>
              </div>
            )}
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-2">
                <BedDouble size={18} className="text-magenta" />
                <span className="text-sm text-[#475569]">{property.bedrooms} {t('detail.bedrooms')}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-2">
                <Bath size={18} className="text-magenta" />
                <span className="text-sm text-[#475569]">{property.bathrooms} {t('detail.bathrooms')}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-magenta" />
              <span className="text-sm text-[#475569]">{t('detail.createdAt')}: {new Date(property.createdAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'ar-TN')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
