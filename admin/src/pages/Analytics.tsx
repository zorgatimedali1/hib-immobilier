import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { MessageCircle, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { t } from '@/lib/i18n';
import api from '@/lib/api';
import type { WhatsappLeadRecord } from '@/types';
import StatCard from '@/components/ui/StatCard';

export default function Analytics() {
  const { lang } = useLanguage();
  const [leads, setLeads] = useState<WhatsappLeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.get('/leads/whatsapp')
      .then(({ data }) => setLeads(data.data ?? []))
      .catch((err) => {
        const msg = err?.response?.data?.error ?? err?.message ?? 'Erreur inconnue';
        setError(msg);
        console.error('Analytics fetch error:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  const byDate: Record<string, number> = {};
  const byLang: Record<string, number> = {};
  leads.forEach((lead) => {
    const day = lead.clicked_at.slice(0, 10);
    byDate[day] = (byDate[day] ?? 0) + 1;
    byLang[lead.detected_lang] = (byLang[lead.detected_lang] ?? 0) + 1;
  });

  const chartData = Object.entries(byDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date: date.slice(5), count }));

  const langLabels: Record<string, string> = { fr: 'Français', ar: 'Arabe' };

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">{t('analytics.title', lang)}</h1>
          <p className="text-sm text-[#64748B] mt-1">{t('analytics.subtitle', lang)}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700 text-sm">
          Erreur de chargement : {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#0F172A]">{t('analytics.title', lang)}</h1>
        <p className="text-sm text-[#64748B] mt-1">{t('analytics.subtitle', lang)}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label={t('analytics.totalClicks', lang)}
          value={leads.length}
          icon={<MessageCircle size={18} />}
        />
        <StatCard
          label={t('analytics.frClicks', lang)}
          value={byLang.fr ?? 0}
          icon={<Globe size={18} />}
        />
        <StatCard
          label={t('analytics.arClicks', lang)}
          value={byLang.ar ?? 0}
          icon={<Globe size={18} />}
        />
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h2 className="text-base font-semibold text-[#0F172A] mb-4">{t('analytics.langDistribution', lang)}</h2>
        {loading ? (
          <p className="text-sm text-[#94A3B8]">{t('datatable.loading', lang)}</p>
        ) : Object.entries(byLang).length === 0 ? (
          <p className="text-sm text-[#94A3B8]">{t('analytics.noData', lang)}</p>
        ) : (
          <div className="flex gap-6">
            {Object.entries(byLang).map(([l, count]) => (
              <div key={l} className="flex items-center gap-3">
                <div className={`size-3 rounded-full ${l === 'fr' ? 'bg-magenta' : 'bg-leaf'}`} />
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">{langLabels[l] ?? l}</p>
                  <p className="text-xs text-[#64748B]">{count} {t('analytics.clicks', lang)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <h2 className="text-base font-semibold text-[#0F172A] mb-4">{t('analytics.dailyClicks', lang)}</h2>
        {loading ? (
          <p className="text-sm text-[#94A3B8]">{t('datatable.loading', lang)}</p>
        ) : chartData.length === 0 ? (
          <p className="text-sm text-[#94A3B8]">{t('analytics.noData', lang)}</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748B' }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 13 }}
                labelStyle={{ fontWeight: 600 }}
              />
              <Bar dataKey="count" fill="#d6007d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
