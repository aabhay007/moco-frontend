// src/app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import SessionProviderWrapper from '@/components/SessionProviderWrapper';
// import { ThemeProvider } from '@/context/ThemeContext'; // Remove our custom ThemeProvider
import { ThemeProvider } from 'next-themes'; // Import ThemeProvider from next-themes

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Moco',
  description: 'Your all-in-one platform for seamless collaboration and productivity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SessionProviderWrapper>
            {children}
          </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}