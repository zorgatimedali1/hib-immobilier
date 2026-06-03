import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, BarChart3, Plus, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';
import api from '@/lib/api';
import type { PropertyRecord, WhatsappLeadRecord } from '@/types';
import StatCard from '@/components/ui/StatCard';

export default function Dashboard() {
  const { lang } = useLanguage();
  const [properties, setProperties] = useState<PropertyRecord[]>([]);
  const [leads, setLeads] = useState<WhatsappLeadRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/properties').then((r) => setProperties(r.data.data ?? [])),
      api.get('/leads/whatsapp').then((r) => setLeads(r.data.data ?? [])).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  const featuredCount = properties.filter((p) => p.is_featured).length;
  const totalValue = properties.reduce((sum, p) => sum + (p.price ?? 0), 0);
  const avgPrice = properties.length > 0 ? Math.round(totalValue / properties.length) : 0;
  const leadCount = leads.length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">{t('dashboard.title', lang)}</h1>
          <p className="text-sm text-[#64748B] mt-1">{t('dashboard.subtitle', lang)}</p>
        </div>
        <Link
          to="/dashboard/properties/new"
          className="inline-flex items-center gap-2 bg-magenta text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-magenta-700 transition-colors"
        >
          <Plus size={16} />
          {t('dashboard.newProperty', lang)}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label={t('dashboard.totalProperties', lang)}
          value={properties.length}
          icon={<Building2 size={18} />}
          trend={properties.length > 0 ? { value: `${properties.length} ${t('dashboard.registered', lang)}`, positive: true } : undefined}
        />
        <StatCard
          label={t('dashboard.featured', lang)}
          value={featuredCount}
          icon={<ArrowUpRight size={18} />}
        />
        <StatCard
          label={t('dashboard.avgPrice', lang)}
          value={`${avgPrice.toLocaleString()} TND`}
          icon={<BarChart3 size={18} />}
        />
        <StatCard
          label={t('dashboard.whatsappClicks', lang)}
          value={leadCount}
          icon={<BarChart3 size={18} />}
        />
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h2 className="text-base font-semibold text-[#0F172A] mb-4">{t('dashboard.recentProperties', lang)}</h2>
        {loading ? (
          <p className="text-sm text-[#94A3B8]">{t('dashboard.loading', lang)}</p>
        ) : (
          <div className="space-y-3">
            {properties.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-4 py-2">
                {p.property_images?.[0] && (
                  <img src={p.property_images[0].image_url} alt="" className="size-10 rounded-lg object-cover" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0F172A] truncate">{p.title_fr}</p>
                  <p className="text-xs text-[#64748B]">{p.location_fr}</p>
                </div>
                <span className="text-sm font-semibold text-[#0F172A]">
                  {p.price ? `${p.price.toLocaleString()} TND` : '-'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
