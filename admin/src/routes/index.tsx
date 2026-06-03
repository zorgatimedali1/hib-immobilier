import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import { LanguageProvider } from '@/context/LanguageContext';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicRoute from '@/routes/PublicRoute';
import Login from '@/pages/Login';
import DashboardLayout from '@/components/Layout';
import Dashboard from '@/pages/Dashboard';
import Properties from '@/pages/Properties';
import PropertyForm from '@/pages/PropertyForm';
import Analytics from '@/pages/Analytics';

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
        <Routes>
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
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
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
