// components/ui/Button/Button.tsx
import styled from '@emotion/styled'

interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

const StyledButton = styled.button<ButtonProps>`
  /* Emotion styles here */
`

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>
}