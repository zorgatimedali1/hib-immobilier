import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useI18n } from '@/context/I18nContext';
import { openWhatsapp } from '@/lib/whatsapp';

interface WhatsAppButtonProps {
  propertyName?: string;
}

export default function WhatsAppButton({ propertyName }: WhatsAppButtonProps = {}) {
  const { t, lang } = useI18n();
  const [showTooltip, setShowTooltip] = useState(false);

  const positionClass = lang === 'ar'
    ? 'left-6 md:left-8'
    : 'right-6 md:right-8';

  return (
    <div className={`fixed bottom-6 md:bottom-8 ${positionClass} z-50`}>
      <div
        className={`absolute bottom-full mb-2 ${lang === 'ar' ? 'left-0' : 'right-0'} whitespace-nowrap bg-[#0F172A] text-white text-xs px-3 py-2 rounded-lg shadow-lg transition-all duration-200 ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
        {t('whatsapp.tooltip')}
        <div className={`absolute bottom-0 translate-y-1/2 rotate-45 size-2 bg-[#0F172A] ${lang === 'ar' ? 'left-4' : 'right-4'}`} />
      </div>

      <button
        type="button"
        onClick={() => openWhatsapp(propertyName)}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center size-[60px] bg-whatsapp text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-200 animate-pulse-ring"
        aria-label={t('whatsapp.tooltip')}
      >
        <FaWhatsapp size={28} />
      </button>
    </div>
  );
}
