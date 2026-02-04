import type { InputHTMLAttributes } from 'react'
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  isValid?: boolean;
}

export const Input = ({ label, error, isValid, className, ...props }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputWrapper}>
        <input
          className={`
            ${styles.input}  
            ${error ? styles.error : ''}
            ${isValid ? styles.valid : ''} 
            ${className || ''}
          `}
          {...props}
        />
        <span className={styles.errorText}>{error}</span>
      </div>
    </div>
  );
};
