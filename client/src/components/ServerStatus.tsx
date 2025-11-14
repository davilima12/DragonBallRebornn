import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

interface ServerStatusProps {
  online?: boolean;
  playerCount?: number;
}

export default function ServerStatus({ online = true, playerCount = 247 }: ServerStatusProps) {
  return (
    <Card className="p-6 border-primary/30">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className={`w-4 h-4 rounded-full ${online ? 'bg-status-online' : 'bg-status-busy'}`}>
            {online && (
              <div className="absolute inset-0 rounded-full bg-status-online animate-ping opacity-75"></div>
            )}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold" data-testid="text-server-status">
            Servidor {online ? 'Online' : 'Offline'}
          </h3>
          {online && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span data-testid="text-player-count">{playerCount} jogadores online</span>
            </div>
          )}
        </div>

        <div className={`px-3 py-1 rounded-md text-xs font-semibold ${
          online ? 'bg-status-online/20 text-status-online' : 'bg-status-busy/20 text-status-busy'
        }`}>
          {online ? 'ATIVO' : 'MANUTENÇÃO'}
        </div>
      </div>
    </Card>
  );
}
