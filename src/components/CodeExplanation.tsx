import { motion } from "framer-motion";
import { Code, MessageSquare, Wifi, RefreshCw, Zap } from "lucide-react";

export const CodeExplanation = () => {
  const codeBlocks = [
    {
      title: "1. Apertura Connessione",
      icon: Wifi,
      code: `// La connessione WebSocket viene aperta UNA VOLTA
// e resta attiva per tutta la sessione
const socket = new WebSocket('wss://server.com');

// Evento: connessione stabilita
socket.onopen = () => {
  console.log('Connessione persistente attiva!');
  // Da questo momento il canale è bidirezionale
};`,
      explanation: "A differenza di HTTP, la connessione non si chiude dopo ogni richiesta. Resta aperta permettendo comunicazione continua."
    },
    {
      title: "2. Ricezione Dati (Push)",
      icon: Zap,
      code: `// Il server può inviare dati IN QUALSIASI MOMENTO
// senza che il client li richieda
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  // I dati arrivano automaticamente!
  // Nessun polling, nessuna richiesta periodica
  updateUI(data);
};`,
      explanation: "Il server 'pusha' i dati quando disponibili. Il client li riceve istantaneamente senza dover fare polling."
    },
    {
      title: "3. Invio Dati",
      icon: MessageSquare,
      code: `// Il client può inviare dati in qualsiasi momento
// sulla stessa connessione già aperta
function sendMessage(message) {
  // Nessun overhead HTTP, solo il payload
  socket.send(JSON.stringify({
    type: 'message',
    content: message,
    timestamp: Date.now()
  }));
}`,
      explanation: "Invio leggero senza header HTTP. Il messaggio viaggia sulla connessione già stabilita."
    },
    {
      title: "4. Gestione Riconnessione",
      icon: RefreshCw,
      code: `// Gestione robusta delle disconnessioni
socket.onclose = (event) => {
  console.log('Connessione persa, riconnessione...');
  
  // Tentativo automatico di riconnessione
  setTimeout(() => {
    reconnect(); // Funzione per ristabilire
  }, 1000); // Backoff exponential consigliato
};

socket.onerror = (error) => {
  console.error('Errore WebSocket:', error);
  // L'app deve gestire lo stato offline
};`,
      explanation: "Le app real-time devono gestire attivamente le disconnessioni. È fondamentale implementare retry automatici con backoff."
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Dietro le Quinte</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Come Funziona il Codice
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ogni blocco di codice mostra un aspetto fondamentale della comunicazione real-time.
            I commenti spiegano cosa succede e perché è diverso dall'approccio tradizionale.
          </p>
        </div>

        <div className="space-y-8">
          {codeBlocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <div className="p-4 border-b border-border/50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <block.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{block.title}</h3>
              </div>
              
              <div className="grid md:grid-cols-2">
                <div className="p-4 bg-background/50">
                  <pre className="text-sm font-mono overflow-x-auto">
                    <code className="text-muted-foreground">
                      {block.code.split('\n').map((line, i) => (
                        <div key={i} className="leading-relaxed">
                          {line.startsWith('//') ? (
                            <span className="text-success/70">{line}</span>
                          ) : (
                            <span>{line}</span>
                          )}
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
                
                <div className="p-6 bg-secondary/30 flex items-center">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Spiegazione</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {block.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
