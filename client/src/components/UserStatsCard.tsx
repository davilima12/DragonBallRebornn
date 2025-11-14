import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface UserStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  highlight?: boolean;
}

export default function UserStatsCard({ title, value, icon: Icon, description, highlight = false }: UserStatsCardProps) {
  return (
    <Card className={`p-6 ${highlight ? 'border-primary/50 bg-primary/5' : ''}`} data-testid={`stats-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className={`text-3xl font-bold font-mono ${highlight ? 'text-primary' : ''}`} data-testid={`text-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            {value}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-md ${highlight ? 'bg-primary/20' : 'bg-muted'} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${highlight ? 'text-primary' : 'text-muted-foreground'}`} />
        </div>
      </div>
    </Card>
  );
}
