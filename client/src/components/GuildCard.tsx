import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sword, Shield } from "lucide-react";
import { Link } from "wouter";

const LOGO_BASE_URL = "http://localhost:8000/storage/guilds/";

interface GuildCardProps {
  rank: number;
  id: number;
  name: string;
  kills: number;
  logo: string;
  description: string;
}

export default function GuildCard({ rank, id, name, kills, logo, description }: GuildCardProps) {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return { color: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30", icon: "👑" };
    if (rank === 2) return { color: "bg-gray-400/20 text-gray-400 border-gray-400/30", icon: "🥈" };
    if (rank === 3) return { color: "bg-amber-700/20 text-amber-700 border-amber-700/30", icon: "🥉" };
    return { color: "bg-muted text-muted-foreground", icon: "" };
  };

  const badge = getRankBadge(rank);

  return (
    <Link href={`/guild/${encodeURIComponent(name)}`}>
      <Card className="p-6 hover-elevate transition-all duration-200 border-primary/20 cursor-pointer" data-testid={`guild-card-${id}`}>
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className={`w-16 h-16 rounded-md ${badge.color} flex items-center justify-center text-sm font-bold border overflow-hidden`}>
              {logo ? (
                <img 
                  src={`${LOGO_BASE_URL}${logo}`} 
                  alt={`${name} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.textContent = badge.icon || `#${rank}`;
                  }}
                />
              ) : (
                badge.icon || `#${rank}`
              )}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-heading font-bold text-lg truncate" data-testid={`text-guild-name-${id}`}>
                {name}
              </h3>
              <Shield className="w-6 h-6 text-primary/30 flex-shrink-0" />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-card-border">
          <div className="flex items-center gap-2">
            <Sword className="w-4 h-4 text-primary" />
            <Badge variant="secondary" className="font-mono" data-testid={`text-kills-${id}`}>
              {kills} kills
            </Badge>
          </div>
          <Badge className={badge.color} data-testid={`text-rank-${id}`}>
            #{rank}
          </Badge>
        </div>
      </Card>
    </Link>
  );
}
