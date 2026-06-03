import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, BarChart3, LogOut, Languages } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { t, getDir } from '@/lib/i18n';

const links = [
  { to: '/dashboard', labelKey: 'sidebar.dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/properties', labelKey: 'sidebar.properties', icon: Building2 },
  { to: '/dashboard/analytics', labelKey: 'sidebar.analytics', icon: BarChart3 },
];

export default function Sidebar() {
  const { signOut } = useAuth();
  const { lang, toggleLang } = useLanguage();
  const dir = getDir(lang);

  return (
    <aside className="w-64 min-h-screen bg-darksurface text-white flex flex-col shrink-0" dir={dir}>
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-magenta flex items-center justify-center text-white font-bold text-sm">H</div>
          <div>
            <p className="text-sm font-bold tracking-tight">{t('sidebar.title', lang)}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">{t('sidebar.subtitle', lang)}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-magenta/20 text-magenta' : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <link.icon size={18} />
            {t(link.labelKey, lang)}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <button
          onClick={toggleLang}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors w-full"
        >
          <Languages size={18} />
          {lang === 'fr' ? 'العربية' : 'Français'}
        </button>
        <button
          onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors w-full"
        >
          <LogOut size={18} />
          {t('sidebar.logout', lang)}
        </button>
      </div>
    </aside>
  );
}
