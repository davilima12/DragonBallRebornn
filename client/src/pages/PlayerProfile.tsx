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

  const playerData: Record<string, any> = {
    player1: {
      id: "player1",
      username: "SuperSaiyan99",
      level: 150,
      totalPower: 999999,
      rank: 1,
      guild: "Z Fighters",
      isVip: true,
      joinDate: "01/01/2024",
      battles: 1234,
      victories: 987,
      characters: [
        { id: "char1", name: "GokuWarrior", level: 150, power: 500000, classType: "Guerreiro Sayajin", guild: "Z Fighters", isOnline: true },
        { id: "char2", name: "VegetaPrince", level: 148, power: 499999, classType: "Príncipe Sayajin", guild: "Z Fighters", isOnline: false },
      ],
    },
    player2: {
      id: "player2",
      username: "KameHameHa",
      level: 145,
      totalPower: 887654,
      rank: 2,
      guild: "Dragon Force",
      isVip: false,
      joinDate: "15/02/2024",
      battles: 980,
      victories: 745,
      characters: [
        { id: "char3", name: "EnergyBlaster", level: 145, power: 450000, classType: "Mestre de Energia", guild: "Dragon Force", isOnline: false },
      ],
    },
    player3: { id: "player3", username: "UltraInstinct", level: 142, totalPower: 776543, rank: 3, guild: "Gods Army", isVip: true, joinDate: "20/02/2024", battles: 890, victories: 678, characters: [] },
    player4: { id: "player4", username: "FusionWarrior", level: 138, totalPower: 665432, rank: 4, isVip: false, joinDate: "25/02/2024", battles: 750, victories: 550, characters: [] },
    player5: { id: "player5", username: "EnergyBlast", level: 135, totalPower: 554321, rank: 5, guild: "Elite Squad", isVip: false, joinDate: "01/03/2024", battles: 680, victories: 480, characters: [] },
    player6: { id: "player6", username: "PowerUpKing", level: 132, totalPower: 443210, rank: 6, isVip: true, joinDate: "05/03/2024", battles: 620, victories: 420, characters: [] },
    player7: { id: "player7", username: "MysticWarrior", level: 128, totalPower: 332109, rank: 7, guild: "Shadow Clan", isVip: false, joinDate: "10/03/2024", battles: 560, victories: 360, characters: [] },
    player8: { id: "player8", username: "ThunderStrike", level: 125, totalPower: 221098, rank: 8, isVip: false, joinDate: "15/03/2024", battles: 500, victories: 300, characters: [] },
    player9: { id: "player9", username: "PhoenixRise", level: 122, totalPower: 110987, rank: 9, guild: "Phoenix Squad", isVip: true, joinDate: "20/03/2024", battles: 450, victories: 250, characters: [] },
    player10: { id: "player10", username: "DragonFist", level: 120, totalPower: 99876, rank: 10, isVip: false, joinDate: "25/03/2024", battles: 400, victories: 200, characters: [] },
    player11: { id: "player11", username: "SpiritBomb", level: 118, totalPower: 88765, rank: 11, isVip: false, joinDate: "30/03/2024", battles: 380, victories: 190, characters: [] },
    player12: { id: "player12", username: "FinalFlash", level: 115, totalPower: 77654, rank: 12, isVip: false, joinDate: "05/04/2024", battles: 360, victories: 180, characters: [] },
    player13: { id: "player13", username: "GalickGun", level: 112, totalPower: 66543, rank: 13, isVip: false, joinDate: "10/04/2024", battles: 340, victories: 170, characters: [] },
    player14: { id: "player14", username: "SpecialBeam", level: 110, totalPower: 55432, rank: 14, isVip: false, joinDate: "15/04/2024", battles: 320, victories: 160, characters: [] },
    player15: { id: "player15", username: "DestructoDisk", level: 108, totalPower: 44321, rank: 15, isVip: false, joinDate: "20/04/2024", battles: 300, victories: 150, characters: [] },
  };

  const player = playerData[playerId as string] || {
    id: playerId,
    username: "Jogador Desconhecido",
    level: 1,
    totalPower: 0,
    rank: 999,
    isVip: false,
    joinDate: "01/01/2025",
    battles: 0,
    victories: 0,
    characters: [],
  };

  const [characters] = useState(player.characters);

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
                {characters.map((character: any) => (
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
