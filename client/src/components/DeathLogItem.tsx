import { Skull } from "lucide-react";

interface DeathLogItemProps {
  id: string;
  killedBy: string;
  location: string;
  date: string;
  level: number;
}

export default function DeathLogItem({ id, killedBy, location, date, level }: DeathLogItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-md border border-card-border hover-elevate" data-testid={`death-log-${id}`}>
      <div className="w-10 h-10 rounded-md bg-destructive/10 flex items-center justify-center flex-shrink-0">
        <Skull className="w-5 h-5 text-destructive" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm">
          Morto por <strong className="text-foreground" data-testid={`text-killer-${id}`}>{killedBy}</strong>
        </p>
        <p className="text-xs text-muted-foreground">
          {location} • Nível {level}
        </p>
        <p className="text-xs text-muted-foreground" data-testid={`text-date-${id}`}>{date}</p>
      </div>
    </div>
  );
}
