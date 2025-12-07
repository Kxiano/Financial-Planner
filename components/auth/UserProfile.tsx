// components/auth/UserProfile.tsx

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { User } from 'lucide-react';

export function UserProfile() {
  const { user, isGuest } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  const initials = user.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.picture} alt={user.name || 'User'} />
            <AvatarFallback>
              {isGuest ? <User className="h-4 w-4" /> : initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {user.name || t('usuarioConvidado')}
            </p>
            {user.email && (
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
      {isGuest && (
        <CardContent className="pt-0">
          <Badge variant="secondary" className="w-full justify-center">
            {t('modoConvidado')}
          </Badge>
        </CardContent>
      )}
    </Card>
  );
}
