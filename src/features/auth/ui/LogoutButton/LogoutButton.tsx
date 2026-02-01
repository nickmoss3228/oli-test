import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/ui/Button/Button';
import { useAuthStore } from '../../model/useAuthStore';
import { ROUTES } from '@/shared/config/routes';

export const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};