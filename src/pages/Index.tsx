import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { ConceptsSection } from "@/components/ConceptsSection";
import { ConnectionDiagram } from "@/components/ConnectionDiagram";
import { LiveDataFeed } from "@/components/LiveDataFeed";
import { ControlPanel } from "@/components/ControlPanel";
import { ComparisonView } from "@/components/ComparisonView";
import { CodeExplanation } from "@/components/CodeExplanation";
import { PollingComparison } from "@/components/PollingComparison";
import { ConceptBox } from "@/components/ConceptBox";

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

      {/* Concepts Section - NEW! */}
      <ConceptsSection />

      {/* Interactive Demo Section */}
      <section ref={interactiveRef} className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              🎮 Prova tu stesso
            </span>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Simulatore Interattivo
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Sperimenta in prima persona come funziona una connessione real-time.
              <strong> Usa i controlli</strong> per simulare connessioni, disconnessioni e errori!
            </p>
          </div>

          {/* Intro box */}
          <div className="max-w-3xl mx-auto mb-8">
            <ConceptBox type="tip" title="🎯 Come usare il simulatore">
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>Osserva i <strong>pacchetti colorati</strong> che viaggiano tra Client e Server</li>
                <li>Prova a premere <strong>"Disconnetti"</strong> per vedere cosa succede</li>
                <li>Clicca <strong>"Simula Errore"</strong> per vedere la riconnessione automatica</li>
                <li>Guarda il <strong>Feed Real-Time</strong> a destra per vedere i dati che arrivano</li>
              </ol>
            </ConceptBox>
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

      {/* Summary Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
              🎓 Riassunto Finale
            </span>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Cosa Hai Imparato
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ConceptBox type="success" title="✅ Concetti Chiave">
              <ul className="space-y-2 mt-2">
                <li>• <strong>Real-time</strong> = dati che arrivano automaticamente</li>
                <li>• <strong>WebSocket</strong> = connessione sempre aperta</li>
                <li>• <strong>Bidirezionale</strong> = entrambi possono inviare</li>
                <li>• <strong>Push</strong> = il server ti "spinge" i dati</li>
                <li>• <strong>Riconnessione</strong> = gestione automatica errori</li>
              </ul>
            </ConceptBox>

            <ConceptBox type="info" title="📚 Per Approfondire">
              <ul className="space-y-2 mt-2">
                <li>• <strong>WebSocket API</strong> - MDN Web Docs</li>
                <li>• <strong>Socket.io</strong> - Libreria per WebSocket</li>
                <li>• <strong>Server-Sent Events</strong> - Alternativa unidirezionale</li>
                <li>• <strong>MQTT</strong> - Per IoT e dispositivi</li>
              </ul>
            </ConceptBox>
          </div>

          <div className="mt-8">
            <ConceptBox type="tip" title="💡 Prossimi Passi">
              Ora che hai capito la teoria, prova a costruire qualcosa! Inizia con una 
              semplice chat tra due browser, poi passa a notifiche in tempo reale, 
              e infine esplora collaborazione live come Google Docs. 
              Ogni progetto ti insegnerà nuove sfide del real-time!
            </ConceptBox>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            🚀 Real-Time Hub
          </h3>
          <p className="text-sm text-muted-foreground">
            Un progetto didattico per comprendere i sistemi real-time.
            <br />
            <span className="text-xs">Tutto è simulato per scopi educativi - nessun backend reale.</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
