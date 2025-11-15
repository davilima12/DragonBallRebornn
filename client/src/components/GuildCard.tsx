import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Zap, Shield } from "lucide-react";
import { Link } from "wouter";

interface GuildCardProps {
  rank: number;
  name: string;
  leader: string;
  memberCount: number;
  totalPower: number;
}

export default function GuildCard({ rank, name, leader, memberCount, totalPower }: GuildCardProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return { color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30", icon: "👑" };
    if (rank === 2) return { color: "bg-gray-400/20 text-gray-400 border-gray-400/30", icon: "🥈" };
    if (rank === 3) return { color: "bg-amber-700/20 text-amber-700 border-amber-700/30", icon: "🥉" };
    return { color: "bg-muted text-muted-foreground", icon: "" };
  };

  const badge = getRankBadge(rank);

  return (
    <Link href={`/guild/${encodeURIComponent(name)}`}>
      <Card className="p-6 hover-elevate transition-all duration-200 border-primary/20 cursor-pointer" data-testid={`guild-card-${rank}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-md ${badge.color} flex items-center justify-center text-xl font-bold border`}>
              {badge.icon || `#${rank}`}
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg" data-testid={`text-guild-name-${rank}`}>
                {name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Líder: <span className="text-foreground" data-testid={`text-leader-${rank}`}>{leader}</span>
              </p>
            </div>
          </div>
          <Shield className="w-8 h-8 text-primary/30" />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-card-border">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm" data-testid={`text-members-${rank}`}>
              {memberCount} membros
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <Badge variant="secondary" className="font-mono" data-testid={`text-power-${rank}`}>
              {totalPower.toLocaleString()}
            </Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}
