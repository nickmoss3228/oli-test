import { Link } from "react-router-dom";
import { useAuthStore } from "@/features/auth";
import { ROUTES } from "@/shared/config/routes";
import styles from "./NotFoundPage.module.scss";
import styles2 from "@/shared/ui/Button/Button.module.scss";

export const NotFoundPage = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className={styles.page}>
      <div className={styles.code}>404</div>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.subtitle}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button className={styles2.button}>
        <Link to={isAuthenticated ? ROUTES.PROFILE : ROUTES.LOGIN}>
          Go to Login
        </Link>
      </button>
    </div>
  );
};
