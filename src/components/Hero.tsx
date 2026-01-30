import { motion } from "framer-motion";
import { Zap, Radio, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onExplore: () => void;
}

export const Hero = ({ onExplore }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
        
        {/* Flowing lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <motion.path
            d="M0,200 Q400,100 800,200 T1600,200"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Radio className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-primary font-medium">
              Piattaforma Didattica Interattiva
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-foreground">Real-Time</span>
            <br />
            <span className="gradient-text">Hub</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-2xl mx-auto">
            Scopri come funzionano le applicazioni in tempo reale
          </p>

          <p className="text-base text-muted-foreground/70 mb-12 max-w-xl mx-auto">
            Un'esperienza interattiva per comprendere la differenza tra 
            comunicazione tradizionale request/response e flussi real-time persistenti.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="group px-8 py-6 text-lg glow-primary"
              onClick={onExplore}
            >
              <Zap className="w-5 h-5 mr-2" />
              Esplora il Real-Time
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* Feature highlights */}
        <motion.div 
          className="mt-20 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {[
            { 
              title: "Connessione Persistente", 
              desc: "Scopri come WebSocket mantiene un canale sempre aperto" 
            },
            { 
              title: "Flusso Bidirezionale", 
              desc: "Visualizza lo scambio continuo di dati client-server" 
            },
            { 
              title: "Gestione Errori", 
              desc: "Simula disconnessioni e riconnessioni automatiche" 
            },
          ].map((feature, i) => (
            <div 
              key={i} 
              className="glass-card p-6 text-left hover:border-primary/30 transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
