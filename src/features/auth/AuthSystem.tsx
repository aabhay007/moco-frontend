// src/components/features/auth/AuthSystem.tsx

import React, { useState } from 'react';
import { LoginFormData, RegisterFormData } from '@/types/auth';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import {
  Container,
  AuthCard,
  Title,
  SwitchText,
  SwitchLink,
} from './auth.styles';

// Mock API functions (replace with real API calls)
const mockLogin = async (data: LoginFormData): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock validation (replace with real API)
  if (data.email === 'test@example.com' && data.password === 'Password123') {
    // Success
    console.log('Login successful:', data);
  } else {
    throw new Error('Invalid email or password');
  }
};

const mockRegister = async (data: RegisterFormData): Promise<void> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock validation (replace with real API)
  if (data.email === 'existing@example.com') {
    throw new Error('Email already exists');
  }
  
  // Success
  console.log('Registration successful:', data);
};

export const AuthSystem: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await mockLogin(data);
      // Handle success (redirect, show success message, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await mockRegister(data);
      // Handle success (redirect, show success message, etc.)
    } finally {
      setIsLoading(false);
    }
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  return (
    <Container>
      <AuthCard>
        <Title>
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </Title>
        
        {isLogin ? (
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            onSwitchToRegister={switchToRegister}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegister}
            isLoading={isLoading}
            onSwitchToLogin={switchToLogin}
          />
        )}

        <SwitchText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <SwitchLink 
            type="button" 
            onClick={isLogin ? switchToRegister : switchToLogin}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </SwitchLink>
        </SwitchText>
      </AuthCard>
    </Container>
  );
};