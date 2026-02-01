import { LoginForm } from '@/features/auth';
import styles from './LoginPage.module.scss';

export const LoginPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <LoginForm />
      </div>
    </div>
  );
};