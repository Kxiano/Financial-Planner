'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeftRight, Calculator, FileText, LayoutDashboard, Menu, type LucideIcon } from 'lucide-react';
import { Account } from '@/components/app-shell/account';
import { Logo } from '@/components/app-shell/logo';
import { Preferences } from '@/components/app-shell/preferences';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import type { TranslationKey } from '@/lib/i18n/translations';
import { cn } from '@/lib/utils';

const NAV: { href: string; label: TranslationKey; icon: LucideIcon }[] = [
  { href: '/dashboard', label: 'visaoGeral', icon: LayoutDashboard },
  { href: '/lancamentos', label: 'lancamentos', icon: ArrowLeftRight },
  { href: '/relatorios', label: 'relatorios', icon: FileText },
  { href: '/investimentos', label: 'calculadora', icon: Calculator },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <div className="flex h-full flex-col">
      <Link href="/dashboard" onClick={onNavigate} className="flex h-16 shrink-0 items-center px-5">
        <Logo name={t('planejador')} />
      </Link>

      <nav aria-label={t('navegacao')} className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="grid gap-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors duration-150',
                    active
                      ? 'bg-secondary text-foreground before:absolute before:inset-y-2 before:left-0 before:w-0.5 before:rounded-full before:bg-brand'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground',
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {t(label)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="grid gap-5 border-t p-4">
        <Preferences />
        <Account />
      </div>
    </div>
  );
}

/**
 * The frame around every screen of the app: a fixed sidebar on desktop, a
 * top bar with a drawer on phones. The welcome page ("/") renders bare, and
 * the app's own pages send visitors there until they sign in or pick guest mode.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAuth();
  const { t, isLoaded } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  const isWelcome = pathname === '/';
  const ready = isLoaded && !loading;

  useEffect(() => {
    if (ready && !user && !isWelcome) router.replace('/');
  }, [ready, user, isWelcome, router]);

  if (isWelcome) return <>{children}</>;
  if (!ready || !user) return <div className="min-h-dvh" aria-busy="true" />;

  return (
    <div className="min-h-dvh lg:pl-64">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-card lg:block">
        <SidebarContent />
      </aside>

      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 lg:hidden">
        <Link href="/dashboard">
          <Logo name={t('planejador')} />
        </Link>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label={t('abrirMenu')}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 gap-0 bg-card p-0">
            <SheetTitle className="sr-only">{t('navegacao')}</SheetTitle>
            <SheetDescription className="sr-only">{t('preferencias')}</SheetDescription>
            <SidebarContent onNavigate={() => setMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>

      <main>{children}</main>
    </div>
  );
}
