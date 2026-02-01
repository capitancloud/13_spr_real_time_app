import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={logout}
      className="gap-2 border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
    >
      <LogOut className="w-4 h-4" />
      Esci
    </Button>
  );
}
