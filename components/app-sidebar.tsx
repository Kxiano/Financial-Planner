// components/app-sidebar.tsx

'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Calculator,
  PlusCircle,
  BarChart3,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { LanguageToggle } from './laguage-toggle';
import { UserProfile } from './auth/UserProfile';
import { LoginButton } from './auth/LoginButton';
import { LogoutButton } from './auth/LogoutButton';
import { GuestModeButton } from './auth/GuestModeButton';
import { CurrencySelector } from './currency/CurrencySelector';
import { useAuth } from '@/lib/contexts/AuthContext';
import { Separator } from './ui/separator';

export function AppSidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const { t, isLoaded } = useLanguage();
  const { user } = useAuth();

  if (!isLoaded) {
    return null;
  }

  const menuItems = [
    {
      title: t('dashboard'),
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: t('lancamentos'),
      url: '/lancamentos',
      icon: PlusCircle,
    },
    {
      title: t('relatorios'),
      url: '/relatorios',
      icon: BarChart3,
    },
    {
      title: t('calculadora'),
      url: '/investimentos',
      icon: Calculator,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-lg font-semibold">{t('planejador')}</h2>
            <p className="text-xs text-muted-foreground">{t('investimentos')}</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        {/* User Profile Section */}
        {user && (
          <SidebarGroup>
            <SidebarGroupContent>
              <UserProfile />
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Auth Buttons */}
        {!user && (
          <SidebarGroup>
            <SidebarGroupContent className="space-y-2 px-4">
              <LoginButton />
              <GuestModeButton />
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <Separator className="my-2" />

        {/* Currency Selector */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('moeda')}</SidebarGroupLabel>
          <SidebarGroupContent className="px-4">
            <CurrencySelector />
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2" />

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>{t('navegacao')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url} onClick={() => setOpenMobile(false)}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        {/* Logout Button for authenticated users */}
        {user && (
          <div className="mb-3">
            <LogoutButton />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            <p>© 2025 {t('planejador')}</p>
            <p>{t('versao')} 1.0.0</p>
          </div>
          <div className="flex gap-1">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
