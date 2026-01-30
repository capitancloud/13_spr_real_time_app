import { motion } from "framer-motion";
import { Code, MessageSquare, Wifi, RefreshCw, Zap, BookOpen } from "lucide-react";
import { ConceptBox } from "./ConceptBox";

export const CodeExplanation = () => {
  const codeBlocks = [
    {
      title: "1. Apertura Connessione",
      icon: Wifi,
      subtitle: "Il momento in cui tutto inizia",
      code: `// La connessione WebSocket viene aperta UNA VOLTA
// e resta attiva per tutta la sessione
const socket = new WebSocket('wss://server.com');

// Evento: connessione stabilita
socket.onopen = () => {
  console.log('Connessione persistente attiva!');
  // Da questo momento il canale è bidirezionale
};`,
      explanation: "Questo è il momento magico: la connessione si apre UNA SOLA VOLTA e resta aperta. Non si chiude dopo ogni messaggio come HTTP. È come aprire una telefonata e tenerla attiva.",
      tip: "💡 La 'wss://' significa WebSocket Secure (criptato). È come HTTPS ma per WebSocket."
    },
    {
      title: "2. Ricezione Dati (Push)",
      icon: Zap,
      subtitle: "I dati arrivano da soli!",
      code: `// Il server può inviare dati IN QUALSIASI MOMENTO
// senza che il client li richieda
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  
  // I dati arrivano automaticamente!
  // Nessun polling, nessuna richiesta periodica
  updateUI(data);
};`,
      explanation: "Ecco la vera magia! Il server 'pusha' i dati quando vuole. Tu non devi fare nulla: i nuovi messaggi, notifiche, aggiornamenti arrivano automaticamente.",
      tip: "💡 'onmessage' si attiva ogni volta che arriva qualcosa. Come la suoneria del telefono!"
    },
    {
      title: "3. Invio Dati",
      icon: MessageSquare,
      subtitle: "Mandare messaggi è semplicissimo",
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
      explanation: "Mandare un messaggio è un semplice 'socket.send()'. Niente header HTTP pesanti, niente nuove connessioni. Il messaggio vola sulla connessione già aperta.",
      tip: "💡 Ogni messaggio pesa pochissimo (~6 bytes di overhead). Con HTTP sarebbe ~800 bytes!"
    },
    {
      title: "4. Gestione Riconnessione",
      icon: RefreshCw,
      subtitle: "Cosa succede quando qualcosa va storto",
      code: `// Gestione robusta delle disconnessioni
socket.onclose = (event) => {
  console.log('Connessione persa!');
  
  // Tentativo automatico di riconnessione
  setTimeout(() => {
    reconnect(); // Funzione per ristabilire
  }, 1000); // Aspetta 1 secondo e riprova
};

socket.onerror = (error) => {
  console.error('Errore WebSocket:', error);
  // L'app deve gestire lo stato offline
};`,
      explanation: "Le disconnessioni capitano (WiFi instabile, cambio rete, ecc). Un'app real-time DEVE gestirle automaticamente, riconnettendosi senza che l'utente se ne accorga.",
      tip: "💡 Le migliori app usano 'exponential backoff': aspettano sempre di più tra un tentativo e l'altro (1s, 2s, 4s, 8s...)."
    }
  ];

  return (
    <section className="py-20 px-6 bg-card/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Dietro le Quinte</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Come Funziona il Codice
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ogni blocco mostra un aspetto fondamentale. I commenti nel codice 
            spiegano <strong>cosa fa</strong> e <strong>perché è diverso</strong> dall'approccio tradizionale.
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
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <block.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{block.title}</h3>
                  <p className="text-xs text-muted-foreground">{block.subtitle}</p>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2">
                <div className="p-4 bg-background/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Code className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground font-mono">JavaScript</span>
                  </div>
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
                
                <div className="p-6 bg-secondary/30 flex flex-col justify-center">
                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      📖 Spiegazione Semplice
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {block.explanation}
                    </p>
                  </div>
                  <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                    <p className="text-xs text-warning">
                      {block.tip}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary box */}
        <div className="mt-12">
          <ConceptBox type="success" title="🎓 Riassunto del Codice">
            <div className="grid md:grid-cols-2 gap-4 mt-2">
              <div>
                <strong>Cosa è diverso da HTTP:</strong>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Una sola connessione, sempre aperta</li>
                  <li>• Il server può inviarti dati quando vuole</li>
                  <li>• Overhead minimo per ogni messaggio</li>
                </ul>
              </div>
              <div>
                <strong>Cosa devi ricordare:</strong>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>• Gestisci SEMPRE la riconnessione</li>
                  <li>• onmessage = quando arrivano dati</li>
                  <li>• send() = per mandare dati</li>
                </ul>
              </div>
            </div>
          </ConceptBox>
        </div>
      </div>
    </section>
  );
};
