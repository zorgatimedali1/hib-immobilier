import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { loginSchema } from '@/lib/validators';
import { toast } from 'sonner';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { LogIn } from 'lucide-react';
import { t, getDir } from '@/lib/i18n';

export default function Login() {
  const { signIn } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dir = getDir(lang);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast.error(error);
    } else {
      toast.success(t('login.connected', lang));
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-darkbg flex items-center justify-center p-4" dir={dir}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="size-14 rounded-xl bg-magenta flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
            H
          </div>
          <h1 className="text-2xl font-bold text-white">{t('login.title', lang)}</h1>
          <p className="text-sm text-white/50 mt-1">{t('login.subtitle', lang)}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-darksurface rounded-xl p-6 space-y-4 shadow-lg">
          <Input
            id="email"
            type="email"
            label={t('login.email', lang)}
            placeholder="admin@hibiscus.tn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input
            id="password"
            type="password"
            label={t('login.password', lang)}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <Button type="submit" loading={loading} className="w-full" size="lg">
            <LogIn size={16} />
            {t('login.submit', lang)}
          </Button>
        </form>
      </div>
    </div>
  );
}
