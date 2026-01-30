import { Button } from "@/components/ui/button";
import { 
  Play, 
  Pause, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  Zap,
  AlertTriangle
} from "lucide-react";

type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

interface ControlPanelProps {
  status: ConnectionStatus;
  isPaused: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onSimulateError: () => void;
  onTogglePause: () => void;
}

export const ControlPanel = ({
  status,
  isPaused,
  onConnect,
  onDisconnect,
  onSimulateError,
  onTogglePause,
}: ControlPanelProps) => {
  return (
    <div className="glass-card p-6 max-w-md w-full">
      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
        <Zap className="w-5 h-5 text-primary" />
        Pannello di Controllo
      </h3>

      <p className="text-sm text-muted-foreground mb-6">
        Simula diversi scenari per capire come un'app real-time gestisce la connessione.
      </p>

      <div className="space-y-3">
        {/* Connection controls */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={status === "connected" ? "default" : "outline"}
            className="w-full"
            onClick={onConnect}
            disabled={status === "connected"}
          >
            <Wifi className="w-4 h-4 mr-2" />
            Connetti
          </Button>
          <Button
            variant={status === "disconnected" ? "destructive" : "outline"}
            className="w-full"
            onClick={onDisconnect}
            disabled={status === "disconnected"}
          >
            <WifiOff className="w-4 h-4 mr-2" />
            Disconnetti
          </Button>
        </div>

        {/* Pause/Resume */}
        <Button
          variant="outline"
          className="w-full"
          onClick={onTogglePause}
          disabled={status !== "connected"}
        >
          {isPaused ? (
            <>
              <Play className="w-4 h-4 mr-2" />
              Riprendi Flusso
            </>
          ) : (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pausa Flusso
            </>
          )}
        </Button>

        {/* Simulate Error */}
        <Button
          variant="outline"
          className="w-full border-warning/50 text-warning hover:bg-warning/10"
          onClick={onSimulateError}
          disabled={status !== "connected"}
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Simula Errore di Rete
        </Button>
      </div>

      {/* Status explanation */}
      <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${status === "reconnecting" ? "animate-spin" : ""}`} />
          Stato Attuale
        </h4>
        <p className="text-xs text-muted-foreground">
          {status === "connected" && !isPaused && 
            "La connessione WebSocket è attiva. I dati fluiscono in tempo reale tra client e server."}
          {status === "connected" && isPaused && 
            "Connessione attiva ma flusso in pausa. I dati non vengono elaborati temporaneamente."}
          {status === "disconnected" && 
            "Connessione chiusa. Il client non riceve aggiornamenti. Nelle app reali, si tenterebbe la riconnessione."}
          {status === "reconnecting" && 
            "Tentativo di riconnessione in corso. L'app sta cercando di ristabilire la connessione."}
        </p>
      </div>
    </div>
  );
};
