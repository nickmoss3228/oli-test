import { useState, useCallback } from 'react';
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input } from '@/shared/ui/Input/Input';
import { Button } from '@/shared/ui/Button/Button';
import { validators } from '@/shared/lib/validators';
import { useAuthStore } from '../../model/useAuthStore';
import { ROUTES } from '@/shared/config/routes';
import styles from './LoginForm.module.scss';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name: string | null;
  email: string | null;
  password: string | null;
}

export const LoginForm = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: null,
    email: null,
    password: null,
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const validateField = useCallback((field: keyof FormData, value: string) => {
    return validators[field](value);
  }, []);

  const handleChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const isFormValid = 
    !validateField('name', formData.name) &&
    !validateField('email', formData.email) &&
    !validateField('password', formData.password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    setIsLoading(true);
    
    // Имитация загрузки
    await new Promise((resolve) => setTimeout(resolve, 2500));
    
    login(formData.name, formData.email);
    navigate(ROUTES.PROFILE);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.title}>Login to Your Account</p>
      
      <Input
        label="Name"
        type="text"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange('name')}
        onBlur={handleBlur('name')}
        error={touched.name ? errors.name : null}
        isValid={touched.name && !errors.name && formData.name.length > 0}
        disabled={isLoading}
      />
      
      <Input
        label="Email"
        type="email"
        placeholder="Enter your Email"
        value={formData.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={touched.email ? errors.email : null}
        isValid={touched.email && !errors.email && formData.email.length > 0}
        disabled={isLoading}
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        error={touched.password ? errors.password : null}
        isValid={touched.password && !errors.password && formData.password.length > 0}
        disabled={isLoading}
      />
      
      <Button type="submit" disabled={!isFormValid} isLoading={isLoading}>
        Login
      </Button>
    </form>
  );
};