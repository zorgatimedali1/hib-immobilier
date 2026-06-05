import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicRoute from '@/routes/PublicRoute';

const Login = lazy(() => import('@/pages/Login'));
const DashboardLayout = lazy(() => import('@/components/Layout'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Properties = lazy(() => import('@/pages/Properties'));
const PropertyForm = lazy(() => import('@/pages/PropertyForm'));
const Analytics = lazy(() => import('@/pages/Analytics'));

function AdminFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="size-8 border-3 border-magenta/20 border-t-magenta rounded-full animate-spin" />
    </div>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { fontFamily: '"Inter", system-ui, sans-serif' },
          }}
        />
        <Suspense fallback={<AdminFallback />}>
          <Routes>
            <Route path="/admin" element={<PublicRoute><Login /></PublicRoute>} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
            >
              <Route index element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="properties/new" element={<PropertyForm />} />
              <Route path="properties/:id/edit" element={<PropertyForm />} />
              <Route path="analytics" element={<Analytics />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
