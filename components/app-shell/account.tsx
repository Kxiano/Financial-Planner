'use client';

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

function initialsOf(name?: string) {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

/** Who is using the app. Guests are told where their data lives and how to keep it. */
export function Account() {
  const { user, isGuest, login, logout } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  const name = isGuest ? t('usuarioConvidado') : user.name || user.email || t('minhaConta');

  return (
    <div className="grid gap-3">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-md bg-secondary text-[13px] font-medium"
        >
          {isGuest ? 'G' : initialsOf(user.name || user.email)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{name}</p>
          <p className="truncate text-[13px] text-muted-foreground">{isGuest ? t('modoConvidado') : user.email}</p>
        </div>
        <Button variant="ghost" size="icon-sm" onClick={logout} aria-label={t('sair')} title={t('sair')}>
          <LogOut />
        </Button>
      </div>

      {isGuest && (
        <div className="grid gap-2 rounded-md border p-3">
          <p className="text-[13px] leading-snug text-muted-foreground">{t('guestWarningDescription')}</p>
          <Button variant="outline" size="sm" onClick={login}>
            {t('createAccountButton')}
          </Button>
        </div>
      )}
    </div>
  );
}
