import { useRef, useEffect, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Parallax } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { useI18n } from '@/context/I18nContext';
import type { TranslationKey } from '@/data/translations';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

const slides = [
  { image: '/images/hero-1.jpg', titleKey: 'hero.slide1.title', subtitleKey: 'hero.slide1.subtitle' },
  { image: '/images/hero-2.jpg', titleKey: 'hero.slide2.title', subtitleKey: 'hero.slide2.subtitle' },
  { image: '/images/hero-3.jpg', titleKey: 'hero.slide3.title', subtitleKey: 'hero.slide3.subtitle' },
];

function scrollDown() {
  window.scrollTo({ top: window.innerHeight - 72, behavior: 'smooth' });
}

export default function HeroSlider() {
  const { t, lang } = useI18n();
  const swiperRef = useRef<SwiperType | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const animateText = useCallback(() => {
    const targets = [titleRef.current, subtitleRef.current, ctaRef.current].filter(Boolean);
    if (targets.length === 0) return;
    const tl = gsap.timeline();
    tl.fromTo(
      targets,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
    );
  }, []);

  useEffect(() => {
    animateText();
  }, [animateText]);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
    const targets = [titleRef.current, subtitleRef.current, ctaRef.current].filter(Boolean);
    if (targets.length === 0) return;
    gsap.to(targets, {
      opacity: 0,
      y: -20,
      duration: 0.2,
      onComplete: () => {
        gsap.fromTo(
          targets,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' }
        );
      },
    });
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[1000px] overflow-hidden">
      <Swiper
        modules={[EffectFade, Autoplay, Parallax]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        parallax={true}
        loop={true}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.image}>
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                data-swiper-parallax="30%"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-darkbg/55" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container-main">
          <div className="max-w-3xl">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-bold text-white leading-[1.05] tracking-tight mb-4 md:mb-6"
            >
              {t(slides[activeIndex].titleKey as TranslationKey)}
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl"
            >
              {t(slides[activeIndex].subtitleKey as TranslationKey)}
            </p>
            <div ref={ctaRef}>
              <Link
                to="/biens"
                className="inline-flex items-center gap-2 bg-magenta hover:bg-magenta-light text-white font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {t('hero.cta')}
                <span>{lang === 'ar' ? '←' : '→'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            type="button"
            key={`dot-${index}`}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex
                ? 'w-8 h-2.5 bg-magenta'
                : 'size-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <button
        type="button"
        onClick={scrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/70 hover:text-white transition-colors"
      >
        <span className="text-xs uppercase tracking-wider">{t('hero.scroll')}</span>
        <ChevronDown size={20} className="animate-float-arrow" />
      </button>
    </section>
  );
}
