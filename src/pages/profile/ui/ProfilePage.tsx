import { useAuthStore, LogoutButton } from "@/features/auth";
import styles from "./ProfilePage.module.scss";

export const ProfilePage = () => {
  const user = useAuthStore((state) => state.user);

  if (!user) return null;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <span className={styles.title}>Your Profile</span>

        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <span className={styles.name}>Name</span>
            <span className={styles.field}>{user.name}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.email}>Email</span>
            <span className={styles.field}>{user.email}</span>
          </div>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
};
