// components/dashboard-layout.tsx

'use client';

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { usePathname } from 'next/navigation';

const pageNames: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/investimentos': 'Calculadora de Investimentos',
  '/lancamentos': 'Lançamentos',
  '/relatorios': 'Relatórios',
};

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageName = pageNames[pathname] || 'Página';

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full">
        <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center gap-4 px-4">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-sm font-medium text-muted-foreground">
                {pageName}
              </h1>
            </div>
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
