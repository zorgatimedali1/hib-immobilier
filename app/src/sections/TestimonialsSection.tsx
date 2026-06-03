import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Star, Quote } from 'lucide-react';
import { useI18n } from '@/context/I18nContext';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeader from '@/components/SectionHeader';
import OptimizedImage from '@/components/OptimizedImage';
import { testimonials } from '@/data/properties';

import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialsSection() {
  const { lang } = useI18n();
  const ref = useScrollReveal<HTMLDivElement>({ y: 40, stagger: 0.1 });

  return (
    <section className="py-20 md:py-28 bg-lightbg">
      <div className="container-main">
        <SectionHeader
          eyebrow="testimonials.eyebrow"
          title="testimonials.title"
          subtitle="testimonials.subtitle"
        />
        <div ref={ref}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-xl p-6 md:p-8 shadow-card h-full flex flex-col">
                  <Quote size={28} className="text-magenta/30 mb-4" />
                  <p className="text-[#475569] text-sm leading-relaxed flex-1 mb-6">
                    "{testimonial.content[lang]}"
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                    <OptimizedImage
                      src={testimonial.avatar}
                      alt={testimonial.name[lang]}
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="text-sm font-semibold text-[#0F172A]">
                        {testimonial.name[lang]}
                      </h5>
                      <p className="text-xs text-[#64748B]">
                        {testimonial.role[lang]}
                      </p>
                    </div>
                    <div className="ms-auto flex items-center gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={`star-${testimonial.id}-${i}`} size={14} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
