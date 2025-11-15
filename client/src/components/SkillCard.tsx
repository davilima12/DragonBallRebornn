import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SkillCardProps {
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  type: "attack" | "defense" | "support";
}

export default function SkillCard({ name, level, maxLevel, description, type }: SkillCardProps) {
  const typeColors = {
    attack: "bg-red-500/20 text-red-500 border-red-500/30",
    defense: "bg-blue-500/20 text-blue-500 border-blue-500/30",
    support: "bg-green-500/20 text-green-500 border-green-500/30",
  };

  const typeLabels = {
    attack: "Ataque",
    defense: "Defesa",
    support: "Suporte",
  };

  const percentage = (level / maxLevel) * 100;

  return (
    <Card className="p-4" data-testid={`skill-card-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-heading font-bold mb-1" data-testid={`text-skill-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {name}
          </h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <Badge variant="secondary" className={typeColors[type]}>
          {typeLabels[type]}
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Nível</span>
          <span className="font-mono font-semibold" data-testid={`text-skill-level-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {level}/{maxLevel}
          </span>
        </div>
        <Progress value={percentage} className="h-2" />
      </div>
    </Card>
  );
}
