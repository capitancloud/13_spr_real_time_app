import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { ConnectionDiagram } from "@/components/ConnectionDiagram";
import { LiveDataFeed } from "@/components/LiveDataFeed";
import { ControlPanel } from "@/components/ControlPanel";
import { ComparisonView } from "@/components/ComparisonView";
import { CodeExplanation } from "@/components/CodeExplanation";
import { PollingComparison } from "@/components/PollingComparison";

type ConnectionStatus = "connected" | "disconnected" | "reconnecting";

const Index = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connected");
  const [isPaused, setIsPaused] = useState(false);
  const interactiveRef = useRef<HTMLDivElement>(null);

  const handleConnect = () => {
    setConnectionStatus("connected");
    setIsPaused(false);
  };

  const handleDisconnect = () => {
    setConnectionStatus("disconnected");
  };

  const handleSimulateError = () => {
    setConnectionStatus("disconnected");
    // Simula riconnessione automatica
    setTimeout(() => {
      setConnectionStatus("reconnecting");
    }, 1000);
    setTimeout(() => {
      setConnectionStatus("connected");
    }, 3000);
  };

  const handleExplore = () => {
    interactiveRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero onExplore={handleExplore} />

      {/* Interactive Demo Section */}
      <section ref={interactiveRef} className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Simulatore Interattivo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sperimenta in prima persona come funziona una connessione real-time.
              Usa i controlli per simulare diversi scenari.
            </p>
          </div>

          {/* Connection Diagram */}
          <ConnectionDiagram status={connectionStatus} isPaused={isPaused} />

          {/* Controls and Feed */}
          <div className="mt-12 flex flex-col lg:flex-row items-start justify-center gap-8">
            <ControlPanel
              status={connectionStatus}
              isPaused={isPaused}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
              onSimulateError={handleSimulateError}
              onTogglePause={() => setIsPaused(!isPaused)}
            />
            <LiveDataFeed status={connectionStatus} isPaused={isPaused} />
          </div>
        </motion.div>
      </section>

      {/* Polling Comparison */}
      <PollingComparison />

      {/* Traditional vs Real-time Comparison */}
      <section className="py-20 px-6">
        <ComparisonView />
      </section>

      {/* Code Explanation */}
      <CodeExplanation />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Real-Time Hub
          </h3>
          <p className="text-sm text-muted-foreground">
            Un progetto didattico per comprendere i sistemi real-time.
            Tutto è simulato per scopi educativi.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
