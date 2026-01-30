import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, ArrowDown, RefreshCw, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";

type Mode = "polling" | "long-polling" | "realtime";

export const PollingComparison = () => {
  const [activeMode, setActiveMode] = useState<Mode>("polling");
  const [requests, setRequests] = useState<{ id: number; hasData: boolean }[]>([]);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    setRequests([]);
    setRequestId(0);
  }, [activeMode]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (activeMode === "polling") {
      // Polling: richieste frequenti, la maggior parte vuote
      interval = setInterval(() => {
        setRequests(prev => [...prev.slice(-6), { id: requestId, hasData: Math.random() > 0.7 }]);
        setRequestId(prev => prev + 1);
      }, 1000);
    } else if (activeMode === "long-polling") {
      // Long polling: richieste meno frequenti, tutte con dati
      interval = setInterval(() => {
        setRequests(prev => [...prev.slice(-6), { id: requestId, hasData: true }]);
        setRequestId(prev => prev + 1);
      }, 2500);
    } else {
      // Real-time: flusso continuo
      interval = setInterval(() => {
        setRequests(prev => [...prev.slice(-6), { id: requestId, hasData: true }]);
        setRequestId(prev => prev + 1);
      }, 800);
    }

    return () => clearInterval(interval);
  }, [activeMode, requestId]);

  const modes = [
    {
      id: "polling" as Mode,
      label: "Polling",
      icon: RefreshCw,
      description: "Richieste ripetute ogni X secondi",
      pros: ["Semplice da implementare", "Funziona ovunque"],
      cons: ["Spreco di risorse", "Alta latenza", "Molte richieste vuote"]
    },
    {
      id: "long-polling" as Mode,
      label: "Long Polling",
      icon: Clock,
      description: "Il server tiene la richiesta aperta",
      pros: ["Meno richieste vuote", "Latenza migliore"],
      cons: ["Ancora overhead HTTP", "Timeout da gestire", "Non bidirezionale"]
    },
    {
      id: "realtime" as Mode,
      label: "WebSocket",
      icon: Wifi,
      description: "Connessione persistente bidirezionale",
      pros: ["Latenza minima", "Bidirezionale", "Overhead minimo"],
      cons: ["Più complesso", "Gestione stati", "Compatibilità browser vecchi"]
    }
  ];

  const currentMode = modes.find(m => m.id === activeMode)!;

  return (
    <section className="py-20 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Polling vs Long Polling vs WebSocket
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tre approcci diversi per ottenere dati dal server. Osserva le differenze 
            nel numero di richieste e nella qualità dei dati ricevuti.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {modes.map((mode) => (
            <Button
              key={mode.id}
              variant={activeMode === mode.id ? "default" : "outline"}
              className={`px-6 py-3 ${activeMode === mode.id ? "glow-primary" : ""}`}
              onClick={() => setActiveMode(mode.id)}
            >
              <mode.icon className="w-4 h-4 mr-2" />
              {mode.label}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visualization */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <currentMode.icon className="w-5 h-5 text-primary" />
              {currentMode.label}: {currentMode.description}
            </h3>

            {/* Request visualization */}
            <div className="relative h-64 bg-background/50 rounded-lg p-4 overflow-hidden">
              <div className="absolute top-4 left-4 text-xs text-muted-foreground">
                Client
              </div>
              <div className="absolute top-4 right-4 text-xs text-muted-foreground">
                Server
              </div>
              
              <div className="absolute top-12 left-0 right-0 h-[1px] bg-border/50" />
              
              <div className="mt-16 space-y-2">
                <AnimatePresence mode="popLayout">
                  {requests.map((req) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex items-center gap-2"
                    >
                      <div className="flex-1 flex items-center">
                        <motion.div
                          className={`h-1 rounded-full ${
                            activeMode === "realtime" 
                              ? "bg-primary" 
                              : req.hasData ? "bg-success" : "bg-muted-foreground/30"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        req.hasData ? "bg-success/20" : "bg-muted"
                      }`}>
                        {req.hasData ? (
                          <Zap className="w-3 h-3 text-success" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-muted-foreground">Con dati</span>
                </div>
                {activeMode !== "realtime" && (
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                    <span className="text-muted-foreground">Vuota</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pros/Cons */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-6">Pro e Contro</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-success mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  Vantaggi
                </h4>
                <ul className="space-y-2">
                  {currentMode.pros.map((pro, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <ArrowDown className="w-3 h-3 rotate-[-90deg] mt-1 text-success" />
                      {pro}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-destructive mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-destructive" />
                  Svantaggi
                </h4>
                <ul className="space-y-2">
                  {currentMode.cons.map((con, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <ArrowDown className="w-3 h-3 rotate-[-90deg] mt-1 text-destructive" />
                      {con}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Summary */}
            <div className={`mt-6 p-4 rounded-lg ${
              activeMode === "realtime" 
                ? "bg-primary/10 border border-primary/20" 
                : "bg-secondary"
            }`}>
              <p className="text-sm text-muted-foreground">
                {activeMode === "polling" && 
                  "Il polling è semplice ma inefficiente. Ogni richiesta ha overhead HTTP completo e la maggior parte torna vuota."}
                {activeMode === "long-polling" && 
                  "Long polling migliora la latenza tenendo la connessione aperta, ma richiede ancora nuove connessioni per ogni risposta."}
                {activeMode === "realtime" && 
                  "WebSocket è la soluzione ottimale: una connessione persistente, bidirezionale, con overhead minimo per ogni messaggio."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
