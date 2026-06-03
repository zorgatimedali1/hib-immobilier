interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
}

export default function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">{label}</span>
        <div className="size-9 rounded-lg bg-magenta/10 flex items-center justify-center text-magenta">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-[#0F172A]">{value}</div>
      {trend && (
        <div className={`mt-1 text-xs font-medium flex items-center gap-1 ${trend.positive ? 'text-leaf' : 'text-red-500'}`}>
          <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trend.positive ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'} />
          </svg>
          {trend.value}
        </div>
      )}
    </div>
  );
}
