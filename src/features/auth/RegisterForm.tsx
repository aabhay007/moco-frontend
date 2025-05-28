// src/components/features/auth/RegisterForm.tsx

import React, { useState } from 'react';
import { RegisterFormData, FormErrors } from '@/types/auth';
import { validateRegisterForm } from '@/utils/validations';
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

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    const validationErrors = validateRegisterForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await onSubmit(formData);
      setMessage({ type: 'success', text: 'Account created successfully!' });
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Registration failed. Please try again.' 
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
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            hasError={!!errors.name}
            autoComplete="name"
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            hasError={!!errors.password}
            autoComplete="new-password"
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            hasError={!!errors.confirmPassword}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
          )}
        </FormGroup>

        <Button 
          type="button" 
          onClick={handleSubmit} 
          disabled={isLoading}
          variant="primary"
        >
          <ButtonContent>
            {isLoading && <LoadingSpinner />}
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </ButtonContent>
        </Button>
      </Form>
    </>
  );
};