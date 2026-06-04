import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

function decodeJwt(token: string): { sub?: string; email?: string; exp?: number } | null {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('hibiscus_admin_token');
    if (token) {
      const decoded = decodeJwt(token);
      if (decoded && decoded.exp && decoded.exp * 1000 > Date.now()) {
        setUser({ id: decoded.sub ?? '', email: decoded.email ?? '' });
      } else {
        sessionStorage.removeItem('hibiscus_admin_token');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}/api/admin/login`
        : '/api/admin/login';
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { error: data.error ?? 'Erreur de connexion' };
      }

      sessionStorage.setItem('hibiscus_admin_token', data.access_token);
      setUser(data.user);
      return { error: null };
    } catch {
      return { error: 'Impossible de contacter le serveur' };
    }
  };

  const signOut = async () => {
    sessionStorage.removeItem('hibiscus_admin_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
