import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useI18n } from '@/context/I18nContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import HibiscusLogo from './HibiscusLogo';

export default function Footer() {
  const { t } = useI18n();
  const ref = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.1 });

  return (
    <footer className="bg-darkbg text-white">
      <div ref={ref} className="container-main py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <HibiscusLogo className="size-8" monochrome />
              <span className="text-lg font-bold tracking-tight">HIBISCUS IMMOBILIERE</span>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=100076288841243" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-magenta transition-colors duration-200">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.instagram.com/hibiscusimmobiliere" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-magenta transition-colors duration-200">
                <FaInstagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@hibiscusimmobilie" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-magenta transition-colors duration-200">
                <FaTiktok size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200">
                  {t('footer.link.home')}
                </Link>
              </li>
              <li>
                <Link to="/biens" className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200">
                  {t('footer.link.listings')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200">
                  {t('footer.link.contact')}
                </Link>
              </li>
              <li>
                <span className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 cursor-pointer">
                  {t('footer.link.about')}
                </span>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="text-base font-semibold mb-4">{t('footer.propertyTypes')}</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 cursor-pointer">
                  {t('footer.link.apartments')}
                </span>
              </li>
              <li>
                <span className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 cursor-pointer">
                  {t('footer.link.villas')}
                </span>
              </li>
              <li>
                <span className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 cursor-pointer">
                  {t('footer.link.commercial')}
                </span>
              </li>
              <li>
                <span className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200 cursor-pointer">
                  {t('footer.link.land')}
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-[#94A3B8]">
                <Phone size={16} className="text-magenta shrink-0" />
                <span>+216 25 900 448</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-[#94A3B8]">
                <Mail size={16} className="text-magenta shrink-0" />
                <span>hibiscusimmobiliere@gmail.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#94A3B8]">
                <MapPin size={16} className="text-magenta shrink-0 mt-0.5" />
                <span>Av. Mrezga, Hammamet, Tunisie</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-main py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#64748B]">
            {t('footer.copyright')}
          </p>
          <span className="text-xs text-[#64748B] hover:text-white transition-colors cursor-pointer">
            {t('footer.privacy')}
          </span>
        </div>
      </div>
    </footer>
  );
}
