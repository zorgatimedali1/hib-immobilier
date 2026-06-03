import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import SectionHeader from '@/components/SectionHeader';

const socials = [
  { href: 'https://www.facebook.com/profile.php?id=100076288841243', icon: FaFacebook, label: 'Facebook' },
  { href: 'https://www.instagram.com/hibiscusimmobiliere', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://www.tiktok.com/@hibiscusimmobilie', icon: FaTiktok, label: 'TikTok' },
];

export default function FollowUsSection() {
  const ref = useScrollReveal<HTMLDivElement>({ y: 30, stagger: 0.15 });

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="container-main">
        <SectionHeader
          eyebrow="follow.eyebrow"
          title="follow.title"
          subtitle="follow.subtitle"
        />
        <div ref={ref} className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="size-16 md:size-20 rounded-full bg-lightbg flex items-center justify-center group-hover:bg-magenta transition-colors duration-300">
                <Icon className="text-[#475569] group-hover:text-white transition-colors duration-300" size={32} />
              </div>
              <span className="text-sm font-medium text-[#475569] group-hover:text-magenta transition-colors duration-300">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
