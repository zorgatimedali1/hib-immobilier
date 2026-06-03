import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/ui/Sidebar';
import { useLanguage } from '@/context/LanguageContext';
import { getDir } from '@/lib/i18n';

export default function Layout() {
  const { lang } = useLanguage();
  const dir = getDir(lang);

  return (
    <div className="flex min-h-screen bg-lightbg" dir={dir}>
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
