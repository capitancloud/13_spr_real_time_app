import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, ArrowDown, RefreshCw, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConceptBox } from "./ConceptBox";

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
      interval = setInterval(() => {
        setRequests(prev => [...prev.slice(-6), { id: requestId, hasData: Math.random() > 0.7 }]);
        setRequestId(prev => prev + 1);
      }, 1000);
    } else if (activeMode === "long-polling") {
      interval = setInterval(() => {
        setRequests(prev => [...prev.slice(-6), { id: requestId, hasData: true }]);
        setRequestId(prev => prev + 1);
      }, 2500);
    } else {
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
      emoji: "🔄",
      description: "Richieste ripetute ogni X secondi",
      analogy: "Come chiedere ogni 5 minuti: 'Ci sono novità?'",
      pros: ["Semplice da implementare", "Funziona ovunque"],
      cons: ["Spreco di risorse", "Alta latenza", "Molte richieste vuote"]
    },
    {
      id: "long-polling" as Mode,
      label: "Long Polling",
      icon: Clock,
      emoji: "⏳",
      description: "Il server tiene la richiesta aperta",
      analogy: "Come restare al telefono: 'Chiamami quando hai notizie'",
      pros: ["Meno richieste vuote", "Latenza migliore"],
      cons: ["Ancora overhead HTTP", "Timeout da gestire", "Non bidirezionale"]
    },
    {
      id: "realtime" as Mode,
      label: "WebSocket",
      icon: Wifi,
      emoji: "⚡",
      description: "Connessione persistente bidirezionale",
      analogy: "Come una telefonata sempre attiva",
      pros: ["Latenza minima", "Bidirezionale", "Overhead minimo"],
      cons: ["Più complesso", "Gestione stati", "Compatibilità browser vecchi"]
    }
  ];

  const currentMode = modes.find(m => m.id === activeMode)!;

  return (
    <section className="py-20 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            🔬 Tecniche a Confronto
          </span>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Polling vs Long Polling vs WebSocket
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Prima del WebSocket, si usavano altre tecniche. Vediamo perché non erano ottimali.
          </p>
        </div>

        {/* Intro box */}
        <div className="mb-8">
          <ConceptBox type="question" title="🤔 Perché esistono 3 approcci diversi?">
            <p>
              I WebSocket sono relativamente nuovi. Prima, per simulare il "real-time" si usavano 
              trucchi come il <strong>polling</strong> (chiedere continuamente) o il <strong>long polling</strong> 
              (tenere la connessione in sospeso). Clicca sui pulsanti per vedere come funzionano!
            </p>
          </ConceptBox>
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
              <span className="mr-2">{mode.emoji}</span>
              {mode.label}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Visualization */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <currentMode.icon className="w-5 h-5 text-primary" />
              {currentMode.emoji} {currentMode.label}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {currentMode.description}
            </p>

            {/* Analogy box */}
            <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-xs text-primary">
                <strong>🎯 Analogia:</strong> {currentMode.analogy}
              </p>
            </div>

            {/* Request visualization */}
            <div className="relative h-64 bg-background/50 rounded-lg p-4 overflow-hidden">
              <div className="absolute top-4 left-4 text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary" />
                Client
              </div>
              <div className="absolute top-4 right-4 text-xs text-muted-foreground flex items-center gap-1">
                Server
                <span className="w-2 h-2 rounded-full bg-success" />
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
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                        req.hasData ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {req.hasData ? "📨" : "∅"}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <span className="text-base">📨</span>
                  <span className="text-muted-foreground">Con dati</span>
                </div>
                {activeMode !== "realtime" && (
                  <div className="flex items-center gap-1">
                    <span className="text-base">∅</span>
                    <span className="text-muted-foreground">Vuota</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-secondary/50 p-2 rounded text-center">
                <span className="text-muted-foreground">Richieste totali</span>
                <span className="block font-bold text-foreground">{requests.length}</span>
              </div>
              <div className="bg-secondary/50 p-2 rounded text-center">
                <span className="text-muted-foreground">Con dati utili</span>
                <span className="block font-bold text-success">
                  {requests.filter(r => r.hasData).length}
                </span>
              </div>
            </div>
          </div>

          {/* Pros/Cons */}
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-6">📊 Pro e Contro di {currentMode.label}</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-success mb-3 flex items-center gap-2">
                  ✅ Vantaggi
                </h4>
                <ul className="space-y-2">
                  {currentMode.pros.map((pro, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm text-muted-foreground flex items-start gap-2 bg-success/5 p-2 rounded"
                    >
                      <ArrowDown className="w-3 h-3 rotate-[-90deg] mt-1 text-success flex-shrink-0" />
                      {pro}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-medium text-destructive mb-3 flex items-center gap-2">
                  ❌ Svantaggi
                </h4>
                <ul className="space-y-2">
                  {currentMode.cons.map((con, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-sm text-muted-foreground flex items-start gap-2 bg-destructive/5 p-2 rounded"
                    >
                      <ArrowDown className="w-3 h-3 rotate-[-90deg] mt-1 text-destructive flex-shrink-0" />
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
                  "🔄 Il polling è semplice ma inefficiente. Guarda quante richieste tornano vuote (∅)! Ogni richiesta ha costi di rete e server."}
                {activeMode === "long-polling" && 
                  "⏳ Long polling migliora le cose: il server risponde SOLO quando ha dati. Ma serve ancora una nuova connessione per ogni risposta."}
                {activeMode === "realtime" && 
                  "⚡ WebSocket è la soluzione migliore: UNA connessione, SEMPRE aperta, dati che fluiscono in entrambe le direzioni. Nessuno spreco!"}
              </p>
            </div>
          </div>
        </div>

        {/* Final tip */}
        <div className="mt-8">
          <ConceptBox type="tip" title="💡 Quando usare cosa?">
            <div className="grid md:grid-cols-3 gap-4 mt-2">
              <div className="text-center">
                <strong className="text-sm">Polling</strong>
                <p className="text-xs mt-1">Dati che cambiano raramente (es. meteo ogni ora)</p>
              </div>
              <div className="text-center">
                <strong className="text-sm">Long Polling</strong>
                <p className="text-xs mt-1">Quando WebSocket non è supportato</p>
              </div>
              <div className="text-center">
                <strong className="text-sm text-primary">WebSocket ⭐</strong>
                <p className="text-xs mt-1">Chat, gaming, collaborazione, trading... tutto il real-time!</p>
              </div>
            </div>
          </ConceptBox>
        </div>
      </div>
    </section>
  );
};
