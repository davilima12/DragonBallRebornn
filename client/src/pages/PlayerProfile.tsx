import { useRoute } from "wouter";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import CharacterCard from "@/components/CharacterCard";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Trophy, Zap, Crown, Shield } from "lucide-react";
import { Link } from "wouter";

export default function PlayerProfile() {
  const [, params] = useRoute("/player/:id");
  const playerId = params?.id;

  const player = {
    id: playerId,
    username: "SuperWarrior99",
    level: 250,
    totalPower: 2500000,
    rank: 1,
    guild: "Z Fighters",
    isVip: true,
    joinDate: "01/01/2024",
    battles: 1234,
    victories: 987,
  };

  const [characters] = useState([
    { id: "char1", name: "SuperWarrior", level: 150, power: 999999, classType: "Guerreiro Sayajin", guild: "Z Fighters", isOnline: true },
    { id: "char2", name: "MysticMage", level: 135, power: 654321, classType: "Mago Místico", guild: "Z Fighters", isOnline: false },
    { id: "char3", name: "ShadowNinja", level: 142, power: 777888, classType: "Ninja das Sombras", isOnline: false },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent h-64" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/ranking">
            <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>

          <Card className="p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="w-24 h-24 border-4 border-primary">
                <AvatarFallback className="bg-primary/20 text-primary text-3xl font-bold">
                  {player.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-heading font-bold" data-testid="text-player-username">
                    {player.username}
                  </h1>
                  {player.isVip && (
                    <Badge className="bg-primary">
                      <Crown className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                  <Badge variant="secondary">
                    <Trophy className="w-3 h-3 mr-1" />
                    Rank #{player.rank}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nível</p>
                    <p className="text-xl font-bold text-primary" data-testid="text-player-level">{player.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Poder Total</p>
                    <p className="text-xl font-bold" data-testid="text-player-power">{player.totalPower.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Batalhas</p>
                    <p className="text-xl font-bold">{player.battles}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Vitórias</p>
                    <p className="text-xl font-bold text-green-500">{player.victories}</p>
                  </div>
                </div>
              </div>
            </div>

            {player.guild && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Guild:</span>
                  <Link href={`/guild/${player.guild}`}>
                    <Badge variant="outline" className="cursor-pointer hover-elevate" data-testid="badge-guild">
                      <Users className="w-3 h-3 mr-1" />
                      {player.guild}
                    </Badge>
                  </Link>
                </div>
              </div>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-primary/10">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Personagens</p>
                  <p className="text-2xl font-bold">{characters.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-green-500/10">
                  <Trophy className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Vitória</p>
                  <p className="text-2xl font-bold text-green-500">
                    {Math.round((player.victories / player.battles) * 100)}%
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-md bg-blue-500/10">
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Membro desde</p>
                  <p className="text-lg font-bold">{player.joinDate}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold">Personagens</h2>
              <Badge variant="secondary">{characters.length} personagens</Badge>
            </div>
            
            {characters.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Este jogador ainda não tem personagens</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character) => (
                  <CharacterCard key={character.id} {...character} />
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
