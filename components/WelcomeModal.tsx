'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useLanguage } from '@/lib/hooks/useLanguage';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Rocket, LogIn, UserPlus, User } from 'lucide-react';

export function WelcomeModal() {
  const { isAuthenticated, isGuest, loading, continueAsGuest, login } = useAuth();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Show modal if not loading, not authenticated, and not a guest
    if (!loading && !isAuthenticated && !isGuest) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [loading, isAuthenticated, isGuest]);

  const handleLogin = () => {
    login();
  };

  const handleSignup = () => {
    window.location.href = '/api/auth/login?screen_hint=signup';
  };

  const handleGuest = () => {
    continueAsGuest();
    setOpen(false);
  };

  if (loading) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] [&>button]:hidden text-center" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4 w-fit">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">{t('welcomeToPlanner')}</DialogTitle>
          <DialogDescription className="text-center pt-2">
            {t('organizeFinances')} {t('startNow')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-3 py-4">
          <Button onClick={handleLogin} className="w-full gap-2" size="lg">
            <LogIn className="w-4 h-4" />
            {t('loginToAccount')}
          </Button>
          
          <Button onClick={handleSignup} variant="outline" className="w-full gap-2">
            <UserPlus className="w-4 h-4" />
            {t('createAccountButton')}
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">{t('orSeparator')}</span>
            </div>
          </div>

          <Button onClick={handleGuest} variant="ghost" className="w-full gap-2">
            <User className="w-4 h-4" />
            {t('continueAsGuest')}
          </Button>
        </div>
        
        <DialogFooter className="sm:justify-center">
            <p className="text-xs text-muted-foreground text-center">
                {t('guestDataInfo')}
            </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

