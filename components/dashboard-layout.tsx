// components/dashboard-layout.tsx

'use client';

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import { Separator } from "./ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./laguage-toggle"
import { usePathname } from "next/navigation"
import { useLanguage } from '@/lib/hooks/useLanguage';
import { Toaster } from "@/components/ui/toaster"
import { GuestWarning } from "./GuestWarning"
import { WelcomeModal } from "./WelcomeModal"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t } = useLanguage();

  const getBreadcrumb = () => {
    switch (pathname) {
      case '/': return t('dashboard');
      case '/investimentos': return t('investimentos');
      case '/relatorios': return t('relatorios');
      case '/calculadora': return t('calculadora');
      case '/configuracoes': return t('configuracoes');
      default: return 'Dashboard';
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full h-full">
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 sticky top-0 bg-background z-10">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    App
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{getBreadcrumb()}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-auto">
             <WelcomeModal />
             <GuestWarning />
             {children}
        </main>
        <Toaster />
      </div>
    </SidebarProvider>
  )
}
