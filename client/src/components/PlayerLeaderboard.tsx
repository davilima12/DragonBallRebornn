import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap } from "lucide-react";

interface Player {
  rank: number;
  name: string;
  level: number;
  power: number;
  guild?: string;
}

interface PlayerLeaderboardProps {
  players: Player[];
  title?: string;
}

export default function PlayerLeaderboard({ players, title = "Top 10 Jogadores" }: PlayerLeaderboardProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-700";
    return "text-muted-foreground";
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-primary" />
        <h2 className="text-2xl font-heading font-bold">{title}</h2>
      </div>

      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.rank}
            className="flex items-center gap-4 p-3 rounded-md hover-elevate border border-card-border"
            data-testid={`player-row-${player.rank}`}
          >
            <div className={`w-8 text-center font-display font-bold text-lg ${getRankColor(player.rank)}`}>
              {player.rank === 1 && <Trophy className="w-6 h-6 inline" />}
              {player.rank > 1 && `#${player.rank}`}
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-heading font-semibold text-foreground" data-testid={`text-player-name-${player.rank}`}>
                {player.name}
              </div>
              {player.guild && (
                <div className="text-xs text-muted-foreground" data-testid={`text-guild-${player.rank}`}>
                  [{player.guild}]
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm">
              <Badge variant="secondary" className="font-mono">
                Nv. {player.level}
              </Badge>
              <div className="flex items-center gap-1 text-primary font-semibold">
                <Zap className="w-4 h-4" />
                <span data-testid={`text-power-${player.rank}`}>{player.power.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
