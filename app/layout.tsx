// app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DashboardLayout } from '@/components/dashboard-layout';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { CurrencyProvider } from '@/lib/contexts/CurrencyContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Planejador de Investimentos',
  description: 'Gerencie suas finanças e investimentos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <CurrencyProvider>
              <DashboardLayout>{children}</DashboardLayout>
            </CurrencyProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
