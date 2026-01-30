import { motion } from "framer-motion";
import { 
  Wifi, 
  RefreshCw, 
  Zap, 
  Clock, 
  ArrowLeftRight, 
  Server,
  Globe,
  MessageSquare
} from "lucide-react";
import { ConceptBox } from "./ConceptBox";

export const ConceptsSection = () => {
  return (
    <section className="py-20 px-6 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            📚 Fondamenti
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cos'è il Real-Time?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Prima di tutto, capiamo cosa significa "tempo reale" nel contesto delle applicazioni web.
          </p>
        </div>

        {/* Main explanation */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ConceptBox type="question" title="Cosa significa Real-Time?">
            <p className="mb-3">
              <strong>Real-time</strong> significa che i dati arrivano al tuo schermo 
              <em> nel momento stesso in cui vengono creati</em>, senza che tu debba 
              fare nulla.
            </p>
            <p>
              Pensa a WhatsApp: quando qualcuno ti scrive, il messaggio appare subito. 
              Non devi premere "aggiorna" o ricaricare la pagina!
            </p>
          </ConceptBox>

          <ConceptBox type="info" title="Esempi di App Real-Time">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span><strong>Chat:</strong> WhatsApp, Telegram, Slack</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span><strong>Collaborazione:</strong> Google Docs, Figma, Notion</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <span><strong>Trading:</strong> Prezzi azioni, crypto in tempo reale</span>
              </li>
              <li className="flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" />
                <span><strong>Gaming:</strong> Multiplayer online, eSports</span>
              </li>
            </ul>
          </ConceptBox>
        </div>

        {/* Visual comparison */}
        <div className="glass-card p-8 mb-12">
          <h3 className="text-xl font-semibold text-center mb-8">
            La Differenza Fondamentale
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Traditional */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="w-8 h-8 text-muted-foreground" />
              </div>
              <h4 className="font-semibold mb-2">App Tradizionale</h4>
              <p className="text-sm text-muted-foreground mb-4">
                "Ehi server, hai novità?" <br/>
                (Lo chiedi tu, ogni volta)
              </p>
              <div className="flex items-center justify-center gap-2 text-xs bg-secondary/50 p-3 rounded-lg">
                <span>Tu chiedi</span>
                <ArrowLeftRight className="w-4 h-4" />
                <span>Server risponde</span>
              </div>
            </div>

            {/* Real-time */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Wifi className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold mb-2 text-primary">App Real-Time</h4>
              <p className="text-sm text-muted-foreground mb-4">
                "Ti avviso io quando c'è qualcosa" <br/>
                (Il server ti cerca lui)
              </p>
              <div className="flex items-center justify-center gap-2 text-xs bg-primary/10 p-3 rounded-lg border border-primary/20">
                <span>Connessione sempre aperta</span>
                <Zap className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Key concepts grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center mx-auto mb-4">
              <Wifi className="w-6 h-6 text-success" />
            </div>
            <h4 className="font-semibold mb-2">Connessione Persistente</h4>
            <p className="text-sm text-muted-foreground">
              Come una telefonata: una volta connessi, puoi parlare 
              quando vuoi senza ricomporre il numero.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <ArrowLeftRight className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold mb-2">Bidirezionale</h4>
            <p className="text-sm text-muted-foreground">
              Sia tu che il server potete inviare messaggi 
              in qualsiasi momento, senza aspettare.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-warning" />
            </div>
            <h4 className="font-semibold mb-2">Latenza Minima</h4>
            <p className="text-sm text-muted-foreground">
              I dati arrivano in millisecondi, non secondi. 
              Essenziale per chat, giochi e trading.
            </p>
          </motion.div>
        </div>

        {/* Tip box */}
        <div className="mt-12">
          <ConceptBox type="tip" title="💡 Ricorda">
            La differenza chiave non è la velocità della risposta, ma <strong>chi inizia la comunicazione</strong>. 
            Nel real-time, il server può inviarti dati senza che tu li richieda. 
            È come avere un amico che ti chiama quando ha notizie, invece di doverlo chiamare tu ogni 5 minuti per chiedere "Novità?".
          </ConceptBox>
        </div>
      </div>
    </section>
  );
};
