import HeroSlider from '@/sections/HeroSlider';
import ServicesSection from '@/sections/ServicesSection';
import StatsSection from '@/sections/StatsSection';
import FeaturedProperties from '@/sections/FeaturedProperties';
import FollowUsSection from '@/sections/FollowUsSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.title = 'Hibiscus Immobiliere | Accueil';
  }, []);

  return (
    <main>
      <HeroSlider />
      <ServicesSection />
      <StatsSection />
      <FeaturedProperties />
      <FollowUsSection />
      <TestimonialsSection />
    </main>
  );
}
