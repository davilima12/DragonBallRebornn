import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Swords } from "lucide-react";
import { Link } from "wouter";

interface CharacterCardProps {
  id: string;
  name: string;
  level: number;
  power: number;
  classType: string;
  guild?: string;
  isOnline?: boolean;
}

export default function CharacterCard({ 
  id, 
  name, 
  level, 
  power, 
  classType, 
  guild,
  isOnline = false 
}: CharacterCardProps) {
  return (
    <Card className="p-6 hover-elevate transition-all" data-testid={`character-card-${id}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading font-bold text-xl" data-testid={`text-character-name-${id}`}>
              {name}
            </h3>
            {isOnline && (
              <div className="w-2 h-2 rounded-full bg-status-online animate-pulse"></div>
            )}
          </div>
          {guild && (
            <p className="text-sm text-muted-foreground" data-testid={`text-guild-${id}`}>
              [{guild}]
            </p>
          )}
        </div>
        <Badge variant="secondary" className="font-mono">
          Nv. {level}
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Swords className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Classe:</span>
          </div>
          <span className="font-semibold" data-testid={`text-class-${id}`}>{classType}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">Poder:</span>
          </div>
          <span className="font-semibold text-primary" data-testid={`text-power-${id}`}>
            {power.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-card-border">
        <Link href={`/character/${id}`}>
          <Button variant="outline" className="w-full" data-testid={`button-view-character-${id}`}>
            Ver Detalhes
          </Button>
        </Link>
      </div>
    </Card>
  );
}
