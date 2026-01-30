import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Info, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

type BoxType = "info" | "tip" | "warning" | "success" | "question";

interface ConceptBoxProps {
  type: BoxType;
  title: string;
  children: ReactNode;
  className?: string;
}

export const ConceptBox = ({ type, title, children, className = "" }: ConceptBoxProps) => {
  const config = {
    info: {
      icon: Info,
      bg: "bg-primary/10",
      border: "border-primary/30",
      iconColor: "text-primary",
      titleColor: "text-primary"
    },
    tip: {
      icon: Lightbulb,
      bg: "bg-warning/10",
      border: "border-warning/30",
      iconColor: "text-warning",
      titleColor: "text-warning"
    },
    warning: {
      icon: AlertTriangle,
      bg: "bg-destructive/10",
      border: "border-destructive/30",
      iconColor: "text-destructive",
      titleColor: "text-destructive"
    },
    success: {
      icon: CheckCircle,
      bg: "bg-success/10",
      border: "border-success/30",
      iconColor: "text-success",
      titleColor: "text-success"
    },
    question: {
      icon: HelpCircle,
      bg: "bg-data-packet/10",
      border: "border-data-packet/30",
      iconColor: "text-data-packet",
      titleColor: "text-data-packet"
    }
  };

  const { icon: Icon, bg, border, iconColor, titleColor } = config[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`${bg} ${border} border rounded-xl p-5 ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className={`${iconColor} mt-0.5`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${titleColor} mb-2`}>{title}</h4>
          <div className="text-sm text-muted-foreground leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
