// components/auth/LogoutButton.tsx

'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function LogoutButton() {
  const { logout } = useAuth();
  const { t } = useLanguage();

  return (
    <Button onClick={logout} variant="outline" className="w-full">
      <LogOut className="mr-2 h-4 w-4" />
      {t('sair')}
    </Button>
  );
}
