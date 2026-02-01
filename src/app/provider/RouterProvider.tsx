import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuthStore } from '@/features/auth';
import { LoginPage } from '@/pages/login/ui/LoginPage';
import { ProfilePage } from '@/pages/profile/ui/ProfilePage';
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage';
import { ROUTES } from '@/shared/config/routes';

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth: boolean;
}

const ProtectedRoute = ({ children, requireAuth }: ProtectedRouteProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (requireAuth && !isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!requireAuth && isAuthenticated) {
    return <Navigate to={ROUTES.PROFILE} replace />;
  }

  return <>{children}</>;
};

export const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.LOGIN}
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.PROFILE}
          element={
            <ProtectedRoute requireAuth={true}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};