import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Bell, RefreshCw, User, Clock } from "lucide-react";

type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

interface DataItem {
  id: number;
  type: "message" | "event" | "state";
  content: string;
  timestamp: Date;
  user?: string;
}

interface LiveDataFeedProps {
  status: ConnectionStatus;
  isPaused: boolean;
}

const sampleMessages = [
  "Nuovo utente online",
  "Documento aggiornato",
  "Notifica push ricevuta",
  "Sincronizzazione completata",
  "Modifica in tempo reale",
  "Stato sessione aggiornato",
  "Evento broadcast ricevuto",
  "Presenza utente rilevata",
];

const sampleUsers = ["Marco", "Giulia", "Alessandro", "Sofia", "Andrea"];

export const LiveDataFeed = ({ status, isPaused }: LiveDataFeedProps) => {
  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [itemId, setItemId] = useState(0);

  useEffect(() => {
    if (status !== "connected" || isPaused) return;

    const interval = setInterval(() => {
      const newItem: DataItem = {
        id: itemId,
        type: ["message", "event", "state"][Math.floor(Math.random() * 3)] as DataItem["type"],
        content: sampleMessages[Math.floor(Math.random() * sampleMessages.length)],
        timestamp: new Date(),
        user: sampleUsers[Math.floor(Math.random() * sampleUsers.length)],
      };
      
      setDataItems((prev) => [newItem, ...prev].slice(0, 8));
      setItemId((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [status, isPaused, itemId]);

  const getTypeIcon = (type: DataItem["type"]) => {
    switch (type) {
      case "message": return <MessageSquare className="w-4 h-4" />;
      case "event": return <Bell className="w-4 h-4" />;
      case "state": return <RefreshCw className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: DataItem["type"]) => {
    switch (type) {
      case "message": return "bg-primary/20 text-primary border-primary/30";
      case "event": return "bg-data-packet/20 text-data-packet border-data-packet/30";
      case "state": return "bg-success/20 text-success border-success/30";
    }
  };

  return (
    <div className="glass-card p-6 max-w-md w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Feed Real-Time</h3>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
          status === "connected" ? "bg-success/20 text-success" :
          status === "reconnecting" ? "bg-warning/20 text-warning" :
          "bg-destructive/20 text-destructive"
        }`}>
          <span className={`w-2 h-2 rounded-full ${
            status === "connected" ? "bg-success animate-pulse" :
            status === "reconnecting" ? "bg-warning animate-pulse" :
            "bg-destructive"
          }`} />
          {status === "connected" ? "Live" : status === "reconnecting" ? "Reconnecting..." : "Offline"}
        </div>
      </div>

      <div className="space-y-3 min-h-[320px]">
        <AnimatePresence mode="popLayout">
          {dataItems.length === 0 ? (
            <motion.div 
              className="text-center text-muted-foreground py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {status === "connected" ? (
                isPaused ? "Feed in pausa" : "In attesa di dati..."
              ) : (
                "Connessione non attiva"
              )}
            </motion.div>
          ) : (
            dataItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`p-3 rounded-lg border ${getTypeColor(item.type)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getTypeIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium">
                      {item.content}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      {item.user && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {item.user}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
