import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'sonner';
import { I18nProvider } from '@/context/I18nContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ErrorBoundary from '@/components/ErrorBoundary';

const Home = lazy(() => import('@/pages/Home'));
const Listings = lazy(() => import('@/pages/Listings'));
const ListingDetail = lazy(() => import('@/pages/ListingDetail'));
const Contact = lazy(() => import('@/pages/Contact'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lightbg">
      <div className="size-10 border-3 border-magenta/20 border-t-magenta rounded-full animate-spin" />
    </div>
  );
}

const About = lazy(() => import('@/pages/About'));

export default function App() {
  return (
    <I18nProvider>
      <ErrorBoundary>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/biens" element={<Listings />} />
            <Route path="/biens/:id" element={<ListingDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        <Footer />
        <WhatsAppButton />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontFamily: '"Plus Jakarta Sans", Inter, system-ui, sans-serif',
            },
          }}
        />
      </ErrorBoundary>
    </I18nProvider>
  );
}
