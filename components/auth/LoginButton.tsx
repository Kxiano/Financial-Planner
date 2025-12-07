// components/auth/LoginButton.tsx

'use client';

import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function LoginButton() {
  const { login } = useAuth();
  const { t } = useLanguage();

  return (
    <Button onClick={login} variant="default" className="w-full">
      <LogIn className="mr-2 h-4 w-4" />
      {t('fazerLogin')}
    </Button>
  );
}
