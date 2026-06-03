import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useNavbarScroll } from '@/hooks/useNavbarScroll';
import { navLinks } from '@/data/properties';
import HibiscusLogo from './HibiscusLogo';
import { FaWhatsapp } from 'react-icons/fa';
import { openWhatsapp } from '@/lib/whatsapp';

export default function Navbar() {
  const { t, lang, dir, toggleLanguage } = useI18n();
  const location = useLocation();
  const isScrolled = useNavbarScroll(50);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu on route change
  const pathname = location.pathname;
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  const activeLink = location.pathname;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] md:h-[72px] flex items-center transition-all duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isTransparent
            ? 'bg-darkbg/15 backdrop-blur-md'
            : 'bg-darksurface shadow-[0_2px_20px_rgba(0,0,0,0.1)]'
        }`}
      >
        <div className="container-main w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-10">
            <HibiscusLogo className="size-10" monochrome />
            <div className="flex flex-col leading-tight">
              <span className={`text-lg font-bold tracking-tight ${isTransparent ? 'text-white' : 'text-white'}`}>
                HIBISCUS
              </span>
              <span className={`text-[10px] font-medium tracking-[0.2em] uppercase opacity-70 ${isTransparent ? 'text-white/70' : 'text-white/70'}`}>
                {t('nav.tagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? activeLink === '/'
                  : activeLink.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label[lang]}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 size-1.5 bg-magenta rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center rounded-full bg-white/15 border border-white/30 overflow-hidden transition-all duration-200 hover:bg-white/25"
            >
              <span
                className={`px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                  lang === 'fr' ? 'bg-magenta text-white' : 'text-white/80'
                }`}
              >
                FR
              </span>
              <span
                className={`px-3 py-1.5 text-xs font-semibold transition-colors duration-200 ${
                  lang === 'ar' ? 'bg-magenta text-white' : 'text-white/80'
                }`}
              >
                عربي
              </span>
            </button>

            {/* WhatsApp Quick CTA */}
            <button
              type="button"
              onClick={() => openWhatsapp()}
              className="size-10 bg-whatsapp text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              <FaWhatsapp size={18} />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white p-2 z-10"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          role="button"
          tabIndex={0}
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setMobileOpen(false); }}
        />
        {/* Drawer */}
        <div
          className={`absolute top-0 ${dir === 'rtl' ? 'left-0' : 'right-0'} w-[280px] h-full bg-darksurface shadow-dropdown transition-transform duration-300 ${
            mobileOpen
              ? 'translate-x-0'
              : dir === 'rtl'
              ? '-translate-x-full'
              : 'translate-x-full'
          }`}
        >
          <div className="pt-20 px-6 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? activeLink === '/'
                  : activeLink.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-magenta/20 text-magenta'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label[lang]}
                </Link>
              );
            })}

            <div className="mt-6 pt-6 border-t border-white/10">
              {/* Language Toggle Mobile */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="flex items-center rounded-full bg-white/15 border border-white/30 overflow-hidden w-fit"
              >
                <span
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${
                    lang === 'fr' ? 'bg-magenta text-white' : 'text-white/80'
                  }`}
                >
                  FR
                </span>
                <span
                  className={`px-4 py-2 text-sm font-semibold transition-colors ${
                    lang === 'ar' ? 'bg-magenta text-white' : 'text-white/80'
                  }`}
                >
                  عربي
                </span>
              </button>

              {/* WhatsApp Mobile */}
              <button
                type="button"
                onClick={() => openWhatsapp()}
                className="mt-4 flex items-center gap-2 text-whatsapp font-medium"
              >
                <FaWhatsapp size={20} />
                {t('nav.whatsapp')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
