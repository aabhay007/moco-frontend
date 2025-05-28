// src/app/layout.tsx

import { Inter } from 'next/font/google';
// import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CKP - Authentication System',
  description: 'Modern authentication system built with Next.js and Emotion',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}