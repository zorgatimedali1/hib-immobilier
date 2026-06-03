import { useI18n } from '@/context/I18nContext';
import { Check, Share2, Printer } from 'lucide-react';
import type { Property } from '@/types';
import { toast } from 'sonner';
import { openWhatsapp } from '@/lib/whatsapp';

interface PropertySpecsProps {
  property: Property;
}

async function handleShare() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    toast.success('Lien copie dans le presse-papiers');
  } catch {
    toast.error('Erreur lors de la copie');
  }
}

function handlePrint() {
  window.print();
}

export default function PropertySpecs({ property }: PropertySpecsProps) {
  const { t, lang } = useI18n();

  return (
    <section className="py-12 md:py-16 bg-lightbg">
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Column - Description */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-[#0F172A] mb-4">
              {t('detail.description')}
            </h2>
            <p className="text-[#475569] leading-relaxed whitespace-pre-line">
              {property.description[lang]}
            </p>

            {/* Amenities */}
            <h3 className="text-xl font-semibold text-[#0F172A] mt-8 mb-4">
              {t('detail.amenities')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-2 text-sm text-[#475569]"
                >
                  <Check size={16} className="text-leaf shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Specs Table & Actions */}
          <div>
            <div className="bg-white rounded-xl shadow-card p-6">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-4">
                {t('detail.contact')}
              </h3>
              <p className="text-sm text-[#475569] mb-4">
                {t('detail.whatsapp')}
              </p>
              <button
                type="button"
                onClick={() => openWhatsapp(property.title[lang], property.slug)}
                className="block w-full text-center bg-whatsapp hover:bg-[#20BD5C] text-white font-semibold text-sm py-3.5 rounded-lg transition-colors duration-200 mb-4"
              >
                WhatsApp
              </button>
              <div className="flex gap-3 pt-4 border-t border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#475569] hover:border-magenta hover:text-magenta transition-colors"
                >
                  <Share2 size={16} />
                  {t('detail.share')}
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-[#E2E8F0] rounded-lg text-sm text-[#475569] hover:border-magenta hover:text-magenta transition-colors"
                >
                  <Printer size={16} />
                  {t('detail.print')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
