import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import AppLayout from './components/layout/AppLayout';

// Lazy load pages
const Login = lazy(() => import('./pages/Auth/Login'));
const Signup = lazy(() => import('./pages/Auth/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard/Index'));
const Establishments = lazy(() => import('./pages/Establishments/Index'));
const Students = lazy(() => import('./pages/Students/Index'));
const Classes = lazy(() => import('./pages/Classes/Index'));

// Fallback components
const LoadingScreen = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

// Placeholder pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
    <p className="text-muted-foreground">Cette page est en cours de développement.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private routes */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="establishments" element={<Establishments />} />
              <Route path="students" element={<Students />} />
              <Route path="classes" element={<Classes />} />
              <Route path="grades" element={<PlaceholderPage title="Notes" />} />
              <Route path="finance" element={<PlaceholderPage title="Finance" />} />
              <Route path="admin" element={<PlaceholderPage title="Administration" />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster position="top-right" closeButton richColors />
    </AuthProvider>
  );
}

export default App;
