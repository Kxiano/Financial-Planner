'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
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

  // Prevent closing by clicking outside or escape if strictly enforcing choice (optional, but good for welcome)
  // For now, we allow closing implicitly by becoming guest or logging in.
  // Actually, ShadCN Dialog `onOpenChange` handles close. If we want to restart it immediately or force choice:
  // We can just rely on state. If they close it without choosing, they see the auth restricted app likely or just empty state.
  // Ideally force choice:
  const handleOpenChange = (isOpen: boolean) => {
      if (!isOpen && !isAuthenticated && !isGuest) {
          // Prevent closing if no choice made? allow for now, maybe they want to look around (though app might be empty)
          // Better: If they close, maybe default to Guest? Or just let them close.
          // Let's force them to choose for better UX as requested "modal que deverá aparecer... escolher entre..."
          // To force, we just don't allow setting open to false unless triggered by action.
          // setOpen(open); // Do nothing provided actions close it.
      } else {
          setOpen(isOpen);
      }
  };

  if (loading) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] [&>button]:hidden text-center" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4 w-fit">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center">Bem-vindo ao Planejador</DialogTitle>
          <DialogDescription className="text-center pt-2">
            Organize suas finanças de forma simples e eficiente.
            Você pode começar agora mesmo!
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-3 py-4">
          <Button onClick={handleLogin} className="w-full gap-2" size="lg">
            <LogIn className="w-4 h-4" />
            Entrar na minha conta
          </Button>
          
          <Button onClick={handleSignup} variant="outline" className="w-full gap-2">
            <UserPlus className="w-4 h-4" />
            Criar uma conta
          </Button>

          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Ou</span>
            </div>
          </div>

          <Button onClick={handleGuest} variant="ghost" className="w-full gap-2">
            <User className="w-4 h-4" />
            Continuar como Convidado
          </Button>
        </div>
        
        <DialogFooter className="sm:justify-center">
            <p className="text-xs text-muted-foreground text-center">
                Modo convidado salva dados apenas neste dispositivo.
            </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
