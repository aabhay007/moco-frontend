// src/components/features/auth/auth.styles.ts

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { theme } from '@/styles/theme';

// Animations
export const fadeIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(20px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

export const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Layout Components
export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.sm};
`;

export const AuthCard = styled.div`
  background: ${theme.colors.white};
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadow.lg};
  width: 100%;
  max-width: 400px;
  animation: ${fadeIn} 0.5s ease-out;
`;

// Typography
export const Title = styled.h1`
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.gray[900]};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  font-family: ${theme.typography.fontFamily.sans};
`;

// Form Components
export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

export const Label = styled.label`
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.gray[900]};
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily.sans};
`;

export const Input = styled.input<{ hasError?: boolean }>`
  padding: ${theme.spacing.sm};
  border: 2px solid ${props => props.hasError ? theme.colors.error : theme.colors.gray[300]};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-family: ${theme.typography.fontFamily.sans};
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary[500]};
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: ${theme.colors.gray[400]};
  }

  &:hover {
    border-color: ${props => props.hasError ? theme.colors.error : theme.colors.gray[400]};
  }
`;

export const ErrorMessage = styled.span`
  color: ${theme.colors.error};
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily.sans};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

// Button Components
export const Button = styled.button<{ variant?: 'primary' | 'secondary'; isLoading?: boolean }>`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.base};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-family: ${theme.typography.fontFamily.sans};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  ${props => props.variant === 'secondary' ? `
    background: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[900]};
    
    &:hover:not(:disabled) {
      background: ${theme.colors.gray[200]};
    }
  ` : `
    background: ${theme.colors.primary[500]};
    color: ${theme.colors.white};
    
    &:hover:not(:disabled) {
      background: ${theme.colors.primary[600]};
      transform: translateY(-1px);
      box-shadow: ${theme.shadow.md};
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

// Switch Components
export const SwitchText = styled.p`
  text-align: center;
  color: ${theme.colors.gray[500]};
  margin-top: ${theme.spacing.md};
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily.sans};
`;

export const SwitchLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary[500]};
  cursor: pointer;
  font-weight: ${theme.typography.fontWeight.semibold};
  font-family: ${theme.typography.fontFamily.sans};
  text-decoration: underline;
  
  &:hover {
    color: ${theme.colors.primary[600]};
  }
`;

// Success/Error Messages
export const Message = styled.div<{ type: 'success' | 'error' }>`
  padding: ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSize.sm};
  font-family: ${theme.typography.fontFamily.sans};
  margin-bottom: ${theme.spacing.md};
  
  ${props => props.type === 'success' ? `
    background: rgba(16, 185, 129, 0.1);
    color: ${theme.colors.success};
    border: 1px solid rgba(16, 185, 129, 0.2);
  ` : `
    background: rgba(239, 68, 68, 0.1);
    color: ${theme.colors.error};
    border: 1px solid rgba(239, 68, 68, 0.2);
  `}
`;