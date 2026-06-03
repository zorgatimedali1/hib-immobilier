import { useParams, Link, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { properties } from '@/data/properties';
import DetailHero from '@/sections/DetailHero';
import PropertySpecs from '@/sections/PropertySpecs';
import VirtualTour from '@/sections/VirtualTour';
import SimilarProperties from '@/sections/SimilarProperties';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { t, lang } = useI18n();

  const property = properties.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (property) {
      document.title = `${property.title[lang]} | Hibiscus Immobiliere`;
    }
  }, [property, lang]);

  if (!property) {
    return <Navigate to="/biens" replace />;
  }

  return (
    <main>
      {/* Back Link */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="container-main py-3">
          <Link
            to="/biens"
            className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-magenta transition-colors"
          >
            <ArrowLeft size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
            {t('detail.back')}
          </Link>
        </div>
      </div>

      <DetailHero property={property} />
      <PropertySpecs property={property} />
      <VirtualTour tourUrl={property.virtualTourUrl} />
      <SimilarProperties currentProperty={property} />
      <WhatsAppButton propertyName={property.title[lang]} />
    </main>
  );
}
