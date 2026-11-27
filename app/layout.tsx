import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Manrope } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/app-shell/app-shell';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import { TransactionProvider } from '@/lib/contexts/TransactionContext';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';

const manrope = Manrope({ subsets: ['latin', 'latin-ext'], variable: '--font-manrope' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'Planner: personal finance tracking by month',
  description:
    'Log income, bills and investments, then see your net worth, cash flow and emergency fund cover in five currencies.',
};

export const viewport: Viewport = {
  themeColor: '#0a0d14',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains.variable}`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <LanguageProvider>
            <AuthProvider>
              <TransactionProvider>
                <AppShell>{children}</AppShell>
                <Toaster />
              </TransactionProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
