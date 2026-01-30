import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeftRight, Clock, Zap, RefreshCw } from "lucide-react";
import { ConceptBox } from "./ConceptBox";

export const ComparisonView = () => {
  const [traditionalStep, setTraditionalStep] = useState(0);
  const [realtimeActive, setRealtimeActive] = useState(true);
  const [realtimeData, setRealtimeData] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTraditionalStep((prev) => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!realtimeActive) return;
    const interval = setInterval(() => {
      setRealtimeData((prev) => [...prev.slice(-5), Date.now()]);
    }, 800);
    return () => clearInterval(interval);
  }, [realtimeActive]);

  const traditionalSteps = [
    { label: "1️⃣ Client invia richiesta", icon: ArrowRight, active: true },
    { label: "2️⃣ Server elabora...", icon: Clock, active: false },
    { label: "3️⃣ Server risponde", icon: ArrowRight, active: true },
    { label: "4️⃣ Client aspetta... poi ricomincia", icon: RefreshCw, active: false },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          ⚔️ Confronto
        </span>
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Tradizionale vs Real-Time
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Osserva fianco a fianco come funzionano i due approcci. 
          La differenza è <strong>evidente</strong>!
        </p>
      </div>

      {/* Intro explanation */}
      <div className="mb-8">
        <ConceptBox type="info" title="🎯 Cosa stiamo confrontando">
          <p>
            A sinistra vedi come funziona una normale pagina web: chiedi → aspetti → ricevi → ripeti.
            A destra vedi il real-time: la connessione resta aperta e i dati arrivano 
            <strong> automaticamente</strong> quando disponibili.
          </p>
        </ConceptBox>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Traditional Request/Response */}
        <div className="glass-card p-6 border-2 border-muted">
          <div className="flex items-center gap-2 mb-6">
            <RefreshCw className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold text-foreground">HTTP Tradizionale</h3>
            <span className="ml-auto text-xs bg-muted px-2 py-1 rounded">Vecchio modo</span>
          </div>

          <div className="relative">
            {/* Diagram */}
            <div className="flex justify-between items-center mb-8">
              <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center flex-col">
                <span className="text-xs font-medium">Client</span>
                <span className="text-[10px] text-muted-foreground">(Tu)</span>
              </div>
              
              <div className="flex-1 mx-4 h-2 bg-secondary rounded-full relative overflow-hidden">
                <motion.div
                  className="absolute h-full bg-muted-foreground/50 rounded-full"
                  animate={{
                    left: traditionalStep % 2 === 0 ? "0%" : "auto",
                    right: traditionalStep % 2 === 1 ? "0%" : "auto",
                    width: "30%",
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center flex-col">
                <span className="text-xs font-medium">Server</span>
                <span className="text-[10px] text-muted-foreground">(Dati)</span>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3">
              {traditionalSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className={`p-3 rounded-lg border transition-all ${
                    index === traditionalStep 
                      ? "bg-muted-foreground/10 border-muted-foreground/30" 
                      : "bg-secondary/30 border-border/30"
                  }`}
                  animate={{ scale: index === traditionalStep ? 1.02 : 1 }}
                >
                  <div className="flex items-center gap-3">
                    <step.icon className={`w-4 h-4 ${
                      index === traditionalStep ? "text-foreground" : "text-muted-foreground"
                    }`} />
                    <span className={`text-sm ${
                      index === traditionalStep ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info box */}
            <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">
                <strong>❌ Problema:</strong> Il client deve sempre chiedere. 
                Se c'è un nuovo messaggio, non lo sai finché non fai refresh!
              </p>
            </div>
          </div>
        </div>

        {/* Real-Time */}
        <div className="glass-card p-6 glow-primary border-2 border-primary/30">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">WebSocket Real-Time</h3>
            <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded">Nuovo modo ✨</span>
          </div>

          <div className="relative">
            {/* Diagram */}
            <div className="flex justify-between items-center mb-8">
              <div className="w-20 h-20 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-col">
                <span className="text-xs font-medium text-primary">Client</span>
                <span className="text-[10px] text-primary/70">(Tu)</span>
              </div>
              
              <div className="flex-1 mx-4 relative">
                <div className="h-2 bg-primary/30 rounded-full relative overflow-hidden">
                  <motion.div
                    className="absolute h-full w-8 bg-primary rounded-full"
                    animate={{ x: [0, 100, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <ArrowLeftRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary bg-background p-1 rounded-full" />
              </div>

              <div className="w-20 h-20 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-col">
                <span className="text-xs font-medium text-primary">Server</span>
                <span className="text-[10px] text-primary/70">(Dati)</span>
              </div>
            </div>

            {/* Live data stream */}
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg min-h-[180px]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs text-muted-foreground">🔗 Connessione sempre attiva</span>
              </div>
              
              <div className="space-y-2">
                <AnimatePresence mode="popLayout">
                  {realtimeData.slice(-4).map((timestamp, index) => (
                    <motion.div
                      key={timestamp}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="flex items-center gap-2 text-xs"
                    >
                      <Zap className="w-3 h-3 text-primary" />
                      <span className="text-muted-foreground">
                        📨 Dato arrivato: {new Date(timestamp).toLocaleTimeString()}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Info box */}
            <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-sm text-success">
                <strong>✅ Vantaggio:</strong> Il server ti manda i dati appena disponibili. 
                Non devi chiedere nulla, arrivano da soli!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Differences */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-center mb-6">
          📊 Le 3 Differenze Chiave
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <Clock className="w-8 h-8 text-destructive mx-auto mb-3" />
            <h4 className="font-semibold mb-2">⏱️ Latenza</h4>
            <p className="text-sm text-muted-foreground mb-3">
              HTTP richiede round-trip per ogni dato. WebSocket mantiene la connessione aperta.
            </p>
            <div className="text-xs space-y-1">
              <div className="flex justify-between bg-secondary/50 p-2 rounded">
                <span>HTTP</span>
                <span className="text-destructive">100-500ms per richiesta</span>
              </div>
              <div className="flex justify-between bg-primary/10 p-2 rounded">
                <span>WebSocket</span>
                <span className="text-success">~20ms continui</span>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 text-center">
            <RefreshCw className="w-8 h-8 text-warning mx-auto mb-3" />
            <h4 className="font-semibold mb-2">📦 Overhead</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Ogni richiesta HTTP ha header pesanti. WebSocket usa frame leggeri.
            </p>
            <div className="text-xs space-y-1">
              <div className="flex justify-between bg-secondary/50 p-2 rounded">
                <span>HTTP Headers</span>
                <span className="text-destructive">~800 bytes ogni volta</span>
              </div>
              <div className="flex justify-between bg-primary/10 p-2 rounded">
                <span>WS Frame</span>
                <span className="text-success">~6 bytes</span>
              </div>
            </div>
          </div>
          <div className="glass-card p-6 text-center">
            <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-semibold mb-2">⚡ Reattività</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Real-time reagisce istantaneamente. HTTP necessita polling continuo.
            </p>
            <div className="text-xs space-y-1">
              <div className="flex justify-between bg-secondary/50 p-2 rounded">
                <span>Polling</span>
                <span className="text-destructive">Tu chiedi ogni 5 sec</span>
              </div>
              <div className="flex justify-between bg-primary/10 p-2 rounded">
                <span>Real-time</span>
                <span className="text-success">Server ti avvisa subito</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
