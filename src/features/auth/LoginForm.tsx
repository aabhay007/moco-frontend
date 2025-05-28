// src/components/features/auth/LoginForm.tsx

import React, { useState } from 'react';
import { LoginFormData, FormErrors } from '@/types/auth';
import { validateLoginForm } from '@/utils/validations';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ButtonContent,
  LoadingSpinner,
  ErrorMessage,
  Message,
} from './auth.styles';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => Promise<void>;
  isLoading: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear message
    if (message) {
      setMessage(null);
    }
  };

  const handleSubmit = async () => {
    // Validate form
    const validationErrors = validateLoginForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
      setMessage({ type: 'success', text: 'Login successful!' });
      
      // Reset form on success
      setFormData({ email: '', password: '' });
      setErrors({});
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Login failed. Please try again.' 
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <>
      {message && (
        <Message type={message.type}>
          {message.text}
        </Message>
      )}
      
      <Form>
        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            hasError={!!errors.email}
            autoComplete="email"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            hasError={!!errors.password}
            autoComplete="current-password"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>

        <Button 
          type="button" 
          onClick={handleSubmit} 
          disabled={isLoading}
          variant="primary"
        >
          <ButtonContent>
            {isLoading && <LoadingSpinner />}
            {isLoading ? 'Signing In...' : 'Sign In'}
          </ButtonContent>
        </Button>
      </Form>
    </>
  );
};