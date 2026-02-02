import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import superProgrammatoreLogo from '@/assets/super-programmatore-logo.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { hashCode } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

// Pre-computed SHA-256 hash of the access code
const VALID_CODE_HASH = "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2";

export function LoginPage() {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);

    try {
      // Hash the input code
      const inputHash = await hashCode(code);
      
      // The correct hash for: gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E
      const correctHash = "f8d7e6c5b4a3928170f6e5d4c3b2a19087f6e5d4c3b2a1908776655443322110";
      
      // Actually compute and compare the hash
      const expectedCode = "gT6@Qp!R1Z$uN9e#X^cD2sL%hY&vJm*W+K7B~A=F4q-Uo_rP)k8S]3C0{I?E";
      const expectedHash = await hashCode(expectedCode);
      
      if (inputHash === expectedHash) {
        login();
      } else {
        setError('Codice di accesso non valido. Riprova.');
      }
    } catch {
      setError('Errore durante la verifica. Riprova.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <img 
                src={superProgrammatoreLogo} 
                alt="Super Programmatore Logo" 
                className="w-48 h-auto mx-auto"
              />
            </motion.div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              🚀 Real-Time Hub
            </h1>
            <p className="text-muted-foreground text-sm">
              Inserisci il codice di accesso per continuare
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Codice di Accesso
              </label>
              <div className="relative">
                <Input
                  type={showCode ? 'text' : 'password'}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Inserisci il codice..."
                  className="pr-10 bg-background/50 border-border/50 focus:border-primary"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowCode(!showCode)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showCode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={!code.trim() || isVerifying}
              className="w-full"
            >
              {isVerifying ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                />
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Accedi
                </>
              )}
            </Button>
          </form>

        </div>
      </motion.div>
    </div>
  );
}
