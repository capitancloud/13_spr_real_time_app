import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, WifiOff, Server, Monitor, Zap } from "lucide-react";

type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

interface DataPacket {
  id: number;
  direction: "toServer" | "toClient";
  type: "message" | "event" | "state";
}

interface ConnectionDiagramProps {
  status: ConnectionStatus;
  isPaused: boolean;
}

export const ConnectionDiagram = ({ status, isPaused }: ConnectionDiagramProps) => {
  const [packets, setPackets] = useState<DataPacket[]>([]);
  const [packetId, setPacketId] = useState(0);

  // Simula pacchetti di dati che viaggiano
  useEffect(() => {
    if (status !== "connected" || isPaused) return;

    const interval = setInterval(() => {
      const newPacket: DataPacket = {
        id: packetId,
        direction: Math.random() > 0.3 ? "toClient" : "toServer",
        type: ["message", "event", "state"][Math.floor(Math.random() * 3)] as DataPacket["type"],
      };
      setPackets((prev) => [...prev.slice(-5), newPacket]);
      setPacketId((prev) => prev + 1);
    }, 800);

    return () => clearInterval(interval);
  }, [status, isPaused, packetId]);

  const getStatusColor = () => {
    switch (status) {
      case "connected": return "bg-success";
      case "disconnected": return "bg-destructive";
      case "reconnecting": return "bg-warning";
    }
  };

  const getStatusGlow = () => {
    switch (status) {
      case "connected": return "glow-success";
      case "disconnected": return "glow-destructive";
      case "reconnecting": return "glow-warning";
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto p-8">
      {/* Titolo sezione */}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Connessione Persistente WebSocket
        </h3>
        <p className="text-muted-foreground text-sm">
          {status === "connected" && "La connessione resta aperta per scambi bidirezionali continui"}
          {status === "disconnected" && "Connessione interrotta - nessun flusso di dati"}
          {status === "reconnecting" && "Tentativo di riconnessione in corso..."}
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* Client */}
        <motion.div 
          className={`glass-card p-6 flex flex-col items-center gap-3 ${status === "connected" ? getStatusGlow() : ""}`}
          animate={{ 
            scale: status === "reconnecting" ? [1, 1.02, 1] : 1,
          }}
          transition={{ duration: 1, repeat: status === "reconnecting" ? Infinity : 0 }}
        >
          <Monitor className="w-12 h-12 text-primary" />
          <span className="font-semibold">Client</span>
          <span className="text-xs text-muted-foreground">Browser</span>
        </motion.div>

        {/* Connection Line */}
        <div className="flex-1 relative h-24">
          {/* Linea di connessione */}
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            <div className={`h-full rounded-full ${
              status === "connected" ? "connection-line" : 
              status === "reconnecting" ? "bg-warning/50 animate-reconnect" :
              "connection-line-inactive"
            }`} />
          </div>

          {/* Indicatore stato connessione */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div 
              className={`w-10 h-10 rounded-full ${getStatusColor()} flex items-center justify-center ${getStatusGlow()}`}
              animate={{ 
                scale: status === "connected" ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {status === "connected" ? (
                <Wifi className="w-5 h-5 text-success-foreground" />
              ) : status === "reconnecting" ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Wifi className="w-5 h-5 text-warning-foreground" />
                </motion.div>
              ) : (
                <WifiOff className="w-5 h-5 text-destructive-foreground" />
              )}
            </motion.div>
          </div>

          {/* Pacchetti animati */}
          <AnimatePresence>
            {status === "connected" && !isPaused && packets.map((packet) => (
              <motion.div
                key={packet.id}
                className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${
                  packet.type === "message" ? "bg-primary" :
                  packet.type === "event" ? "bg-data-packet" :
                  "bg-success"
                }`}
                initial={{ 
                  left: packet.direction === "toClient" ? "calc(100% - 24px)" : "0px",
                  opacity: 1,
                  scale: 0.5
                }}
                animate={{ 
                  left: packet.direction === "toClient" ? "0px" : "calc(100% - 24px)",
                  opacity: [1, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <Zap className="w-3 h-3 text-white" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Server */}
        <motion.div 
          className={`glass-card p-6 flex flex-col items-center gap-3 ${status === "connected" ? getStatusGlow() : ""}`}
          animate={{ 
            scale: status === "reconnecting" ? [1, 1.02, 1] : 1,
          }}
          transition={{ duration: 1, repeat: status === "reconnecting" ? Infinity : 0, delay: 0.5 }}
        >
          <Server className="w-12 h-12 text-primary" />
          <span className="font-semibold">Server</span>
          <span className="text-xs text-muted-foreground">WebSocket</span>
        </motion.div>
      </div>

      {/* Legenda */}
      <div className="flex justify-center gap-6 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Messaggi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-data-packet" />
          <span className="text-xs text-muted-foreground">Eventi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Stati</span>
        </div>
      </div>
    </div>
  );
};
