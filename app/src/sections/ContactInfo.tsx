import { useI18n } from '@/context/I18nContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { openWhatsapp } from '@/lib/whatsapp';

export default function ContactInfo() {
  const { t } = useI18n();
  const ref = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.1 });

  const infoCards = [
    {
      icon: <Phone size={24} />,
      title: t('contact.info.phone'),
      value: '+216 25 900 448',
      href: 'tel:+21625900448',
    },
    {
      icon: <Mail size={24} />,
      title: t('contact.info.email'),
      value: 'hibiscusimmobiliere@gmail.com',
      href: 'mailto:hibiscusimmobiliere@gmail.com',
    },
    {
      icon: <MapPin size={24} />,
      title: t('contact.info.address'),
      value: 'Av. Mrezga, Hammamet 8050, Tunisie',
      href: '#',
    },
    {
      icon: <Clock size={24} />,
      title: t('contact.info.hours'),
      value: t('contact.info.hoursValue'),
      href: null,
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-lightbg">
      <div className="container-main">
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className="bg-white rounded-xl p-6 shadow-card text-center hover:shadow-card-hover transition-shadow duration-300"
            >
              <div className="size-12 bg-magenta/10 text-magenta rounded-full flex items-center justify-center mx-auto mb-4">
                {card.icon}
              </div>
              <h4 className="text-sm font-semibold text-[#0F172A] mb-1">{card.title}</h4>
              {card.href ? (
                <a
                  href={card.href}
                  className="text-sm text-[#475569] hover:text-magenta transition-colors"
                >
                  {card.value}
                </a>
              ) : (
                <p className="text-sm text-[#475569]">{card.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp Card */}
        <div className="mt-8 bg-whatsapp/10 border border-whatsapp/20 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="size-14 bg-whatsapp text-white rounded-full flex items-center justify-center shrink-0">
              <FaWhatsapp size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A]">{t('contact.whatsapp')}</h3>
              <p className="text-sm text-[#475569]">{t('contact.whatsappDesc')}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => openWhatsapp()}
            className="bg-whatsapp hover:bg-[#20BD5C] text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors duration-200 shrink-0"
          >
            {t('contact.whatsapp')}
          </button>
        </div>
      </div>
    </section>
  );
}
