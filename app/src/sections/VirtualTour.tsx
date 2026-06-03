import { useI18n } from '@/context/I18nContext';
import { ExternalLink, Play } from 'lucide-react';

interface VirtualTourProps {
  tourUrl?: string;
}

export default function VirtualTour({ tourUrl }: VirtualTourProps) {
  const { t } = useI18n();

  if (!tourUrl) return null;

  return (
    <section className="py-12 md:py-16 bg-darkbg relative overflow-hidden">
      <div className="absolute top-0 right-0 size-96 bg-magenta/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 size-72 bg-leaf/10 rounded-full blur-3xl" />

      <div className="container-main relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
            {t('detail.virtualTour')}
          </h2>
          <p className="text-white/70">
            {t('detail.virtualTourDesc')}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden aspect-video bg-darksurface shadow-card group">
          <img
            src="/images/hero-1.jpg"
            alt="Virtual Tour Preview"
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => window.open(tourUrl, '_blank')}
              className="size-20 bg-magenta hover:bg-magenta-light text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 mb-4"
            >
              <Play size={32} className="ms-1" />
            </button>
            <button
              type="button"
              onClick={() => window.open(tourUrl, '_blank')}
              className="inline-flex items-center gap-2 text-white font-medium hover:underline"
            >
              {t('detail.launchTour')}
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
