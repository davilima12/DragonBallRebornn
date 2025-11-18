import { useRoute, Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Users, 
  Trophy, 
  Zap, 
  Shield, 
  Heart, 
  Droplet, 
  Swords,
  Skull,
  Clock,
  Activity
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PLAYER_DETAIL_API_URL } from "@/lib/api";
import { PlayerDetail } from "@/types/player";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const SKILL_NAMES: Record<number, { name: string; icon: any }> = {
  0: { name: "Fist Fighting", icon: Swords },
  1: { name: "Club Fighting", icon: Swords },
  2: { name: "Sword Fighting", icon: Swords },
  3: { name: "Axe Fighting", icon: Swords },
  4: { name: "Distance Fighting", icon: Swords },
  5: { name: "Shielding", icon: Shield },
  6: { name: "Fishing", icon: Activity },
};

export default function PlayerProfile() {
  const [, params] = useRoute("/player/:id");
  const playerId = params?.id;

  const { data: player, isLoading } = useQuery<PlayerDetail>({
    queryKey: ['/api/player', playerId],
    queryFn: async () => {
      const response = await fetch(PLAYER_DETAIL_API_URL(playerId!));
      if (!response.ok) throw new Error('Failed to fetch player');
      return response.json();
    },
    enabled: !!playerId,
  });

  const formatDate = (timestamp: number) => {
    try {
      return format(new Date(timestamp * 1000), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  const getKillerName = (death: PlayerDetail['player_death'][0]) => {
    if (death.killer.player_killers.length > 0) {
      const killer = death.killer.player_killers[0];
      return killer.players[0]?.name || 'Jogador Desconhecido';
    }
    if (death.killer.environment_killer.length > 0) {
      return death.killer.environment_killer[0].name;
    }
    return 'Desconhecido';
  };

  const getKillerId = (death: PlayerDetail['player_death'][0]) => {
    if (death.killer.player_killers.length > 0) {
      const killer = death.killer.player_killers[0];
      return killer.players[0]?.id;
    }
    return null;
  };

  const isPlayerKiller = (death: PlayerDetail['player_death'][0]) => {
    return death.killer.player_killers.length > 0;
  };

  const getStaminaInfo = (staminaMs: number) => {
    const hours = staminaMs / (1000 * 60 * 60);
    const maxHours = 42;
    const percentage = Math.min((hours / maxHours) * 100, 100);
    
    let color = 'bg-green-500';
    let textColor = 'text-green-500';
    
    if (hours === 0) {
      color = 'bg-black';
      textColor = 'text-black';
    } else if (hours < 15) {
      color = 'bg-red-500';
      textColor = 'text-red-500';
    } else if (hours < 39.98333) { // Abaixo de 39:59
      color = 'bg-orange-600';
      textColor = 'text-orange-600';
    }
    
    const hoursInt = Math.floor(hours);
    const minutes = Math.floor((hours - hoursInt) * 60);
    
    return {
      hours: hoursInt,
      minutes,
      percentage,
      color,
      textColor,
      formatted: `${hoursInt}:${minutes.toString().padStart(2, '0')}h`
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent h-64" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4" 
            onClick={() => window.history.back()}
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {isLoading ? (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex gap-6">
                  <Skeleton className="w-24 h-24 rounded-full" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-8 w-64" />
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full" />)}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : player ? (
            <>
              <Card className="p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-primary">
                      <AvatarFallback className="bg-primary/20 text-primary text-3xl font-bold">
                        {player.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {player.online === 1 && (
                      <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-background" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h1 className="text-3xl font-heading font-bold" data-testid="text-player-name">
                        {player.name}
                      </h1>
                      {player.online === 1 && (
                        <Badge className="bg-green-500">
                          Online
                        </Badge>
                      )}
                      {typeof player.vocation === 'string' && (
                        <Badge variant="secondary">
                          {player.vocation}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Level</p>
                        <p className="text-xl font-bold text-primary" data-testid="text-player-level">
                          {player.level}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Magic Level</p>
                        <p className="text-xl font-bold" data-testid="text-player-maglevel">
                          {player.maglevel}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Experiência</p>
                        <p className="text-xl font-bold">{player.experience.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-muted-foreground">Stamina</p>
                        <p className={`text-xs font-semibold ${getStaminaInfo(player.stamina).textColor}`}>
                          {getStaminaInfo(player.stamina).formatted} / 42:00h
                        </p>
                      </div>
                      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${getStaminaInfo(player.stamina).color}`}
                          style={{ width: `${getStaminaInfo(player.stamina).percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {player.vocation && (
                    <div className="flex-shrink-0">
                      <img
                        src={`/vocations/${typeof player.vocation === 'number' ? 'Goku' : player.vocation}.gif`}
                        alt={`${player.vocation}`}
                        width={64}
                        height={64}
                        className="pixelated"
                        data-testid="img-player-vocation"
                      />
                    </div>
                  )}
                </div>

                {player.guild && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="text-sm text-muted-foreground">Guild:</span>
                      <Link href={`/guild/${player.guild.name}`}>
                        <Badge variant="outline" className="cursor-pointer hover-elevate" data-testid="badge-guild">
                          <Users className="w-3 h-3 mr-1" />
                          {player.guild.name}
                        </Badge>
                      </Link>
                    </div>
                  </div>
                )}
              </Card>

              <Card className="p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-heading font-bold">Informações Adicionais</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Último Login</p>
                    <p className="text-base font-semibold">{formatDate(player.lastlogin)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Último Logout</p>
                    <p className="text-base font-semibold">{formatDate(player.lastlogout)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="mt-1">
                      <Badge variant={player.online === 1 ? "default" : "secondary"}>
                        {player.online === 1 ? "Online" : "Offline"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-md bg-red-500/10">
                      <Heart className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Health</p>
                      <p className="text-2xl font-bold text-red-500">
                        {player.health.toLocaleString()} / {player.healthmax.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-md bg-blue-500/10">
                      <Droplet className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mana</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {player.mana.toLocaleString()} / {player.manamax.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                  <Swords className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-heading font-bold">Skills</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {player.player_skills.map((skill) => {
                    const skillInfo = SKILL_NAMES[skill.skillid] || { name: `Skill ${skill.skillid}`, icon: Swords };
                    const SkillIcon = skillInfo.icon;
                    
                    return (
                      <Card key={skill.skillid} className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-primary/10">
                            <SkillIcon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-muted-foreground truncate">{skillInfo.name}</p>
                            <p className="text-xl font-bold" data-testid={`skill-${skill.skillid}`}>
                              {skill.value}
                            </p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </Card>

              {player.player_death.length > 0 && (
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Skull className="w-6 h-6 text-destructive" />
                    <h2 className="text-2xl font-heading font-bold">Histórico de Mortes</h2>
                    <Badge variant="secondary">{player.player_death.length} mortes</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {player.player_death.slice(0, 10).map((death) => (
                      <div 
                        key={death.id}
                        className="flex items-start gap-4 p-4 rounded-md bg-card border border-card-border"
                        data-testid={`death-${death.id}`}
                      >
                        <div className="flex-shrink-0">
                          {isPlayerKiller(death) ? (
                            <div className="p-2 rounded-md bg-destructive/10">
                              <Skull className="w-5 h-5 text-destructive" />
                            </div>
                          ) : (
                            <div className="p-2 rounded-md bg-orange-500/10">
                              <Zap className="w-5 h-5 text-orange-500" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="text-sm flex items-center gap-2 flex-wrap">
                            <span className="font-semibold">{player.name}</span>
                            <span>morreu no level</span>
                            <Badge variant="secondary" className="font-mono">
                              {death.level}
                            </Badge>
                            <span>para</span>
                            {isPlayerKiller(death) && getKillerId(death) ? (
                              <Link href={`/player/${getKillerId(death)}`}>
                                <span className="font-semibold text-destructive hover:underline cursor-pointer">
                                  {getKillerName(death)}
                                </span>
                              </Link>
                            ) : (
                              <span className="font-semibold text-orange-500">
                                {getKillerName(death)}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {formatDate(death.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </>
          ) : (
            <Card className="p-12">
              <div className="text-center">
                <Trophy className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-heading font-bold mb-2">Jogador Não Encontrado</h2>
                <p className="text-muted-foreground mb-6">
                  Não foi possível encontrar informações sobre este jogador.
                </p>
                <Button onClick={() => window.history.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
