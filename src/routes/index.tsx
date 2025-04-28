import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import NotFound from '../pages/NotFound';
import { useAuth } from '../context/AuthContext';

// Lazy-loaded components
const Login = lazy(() => import('../components/admin/Login'));
const AdminLayout = lazy(() => import('../components/admin/AdminLayout'));
const Dashboard = lazy(() => import('../components/admin/Dashboard'));
const HeroEditor = lazy(() => import('../components/admin/sections/HeroEditor'));
const AboutEditor = lazy(() => import('../components/admin/sections/AboutEditor'));
const ProjectsEditor = lazy(() => import('../components/admin/sections/ProjectsEditor'));
const SkillsEditor = lazy(() => import('../components/admin/sections/SkillsEditor'));
const ExperienceEditor = lazy(() => import('../components/admin/sections/ExperienceEditor'));
const ContactEditor = lazy(() => import('../components/admin/sections/ContactEditor'));
const SettingsEditor = lazy(() => import('../components/admin/sections/SettingsEditor'));

// Loading component for lazy-loaded routes
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      <p className="mt-4 text-gray-700 dark:text-gray-300">Loading...</p>
    </div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

// Create router
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/admin/login',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<LoadingFallback />}>
          <AdminLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'hero',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HeroEditor />
          </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AboutEditor />
          </Suspense>
        ),
      },
      {
        path: 'projects',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ProjectsEditor />
          </Suspense>
        ),
      },
      {
        path: 'skills',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SkillsEditor />
          </Suspense>
        ),
      },
      {
        path: 'experience',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ExperienceEditor />
          </Suspense>
        ),
      },
      {
        path: 'contact',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ContactEditor />
          </Suspense>
        ),
      },
      {
        path: 'settings',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <SettingsEditor />
          </Suspense>
        ),
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />,
  }
]); 