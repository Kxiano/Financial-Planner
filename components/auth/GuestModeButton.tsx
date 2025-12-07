// components/auth/GuestModeButton.tsx

'use client';

import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLanguage } from '@/lib/hooks/useLanguage';

export function GuestModeButton() {
  const { continueAsGuest } = useAuth();
  const { t } = useLanguage();

  return (
    <Button onClick={continueAsGuest} variant="secondary" className="w-full">
      <UserCircle className="mr-2 h-4 w-4" />
      {t('continuarComoConvidado')}
    </Button>
  );
}
