import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownLeft, Check, Clock, X } from "lucide-react";

interface TransactionItemProps {
  id: string;
  type: "deposit" | "purchase" | "sale";
  description: string;
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
}

export default function TransactionItem({ id, type, description, amount, status, date }: TransactionItemProps) {
  const getTypeIcon = () => {
    if (type === "deposit" || type === "sale") return <ArrowUpRight className="w-4 h-4 text-status-online" />;
    return <ArrowDownLeft className="w-4 h-4 text-primary" />;
  };

  const getStatusBadge = () => {
    if (status === "completed") {
      return (
        <Badge variant="secondary" className="bg-status-online/20 text-status-online border-status-online/30">
          <Check className="w-3 h-3 mr-1" />
          Completo
        </Badge>
      );
    }
    if (status === "pending") {
      return (
        <Badge variant="secondary" className="bg-status-away/20 text-status-away border-status-away/30">
          <Clock className="w-3 h-3 mr-1" />
          Pendente
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="bg-status-busy/20 text-status-busy border-status-busy/30">
        <X className="w-3 h-3 mr-1" />
        Falhou
      </Badge>
    );
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-md border border-card-border hover-elevate" data-testid={`transaction-${id}`}>
      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
        {getTypeIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-medium" data-testid={`text-description-${id}`}>{description}</div>
        <div className="text-sm text-muted-foreground" data-testid={`text-date-${id}`}>{date}</div>
      </div>

      <div className="text-right">
        <div className={`font-mono font-semibold ${type === "purchase" ? "text-status-busy" : "text-status-online"}`} data-testid={`text-amount-${id}`}>
          {type === "purchase" ? "-" : "+"} R$ {amount.toFixed(2)}
        </div>
        {getStatusBadge()}
      </div>
    </div>
  );
}
