import Navbar from "@/components/Navbar";
import PlayerLeaderboard from "@/components/PlayerLeaderboard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Trophy, Users, Zap } from "lucide-react";

export default function Ranking() {
  const topPlayers = [
    { id: "player1", rank: 1, name: "SuperSaiyan99", level: 150, power: 999999, guild: "Z Fighters" },
    { id: "player2", rank: 2, name: "KameHameHa", level: 145, power: 887654, guild: "Dragon Force" },
    { id: "player3", rank: 3, name: "UltraInstinct", level: 142, power: 776543, guild: "Gods Army" },
    { id: "player4", rank: 4, name: "FusionWarrior", level: 138, power: 665432 },
    { id: "player5", rank: 5, name: "EnergyBlast", level: 135, power: 554321, guild: "Elite Squad" },
    { id: "player6", rank: 6, name: "PowerUpKing", level: 132, power: 443210 },
    { id: "player7", rank: 7, name: "MysticWarrior", level: 128, power: 332109, guild: "Shadow Clan" },
    { id: "player8", rank: 8, name: "ThunderStrike", level: 125, power: 221098 },
    { id: "player9", rank: 9, name: "PhoenixRise", level: 122, power: 110987, guild: "Phoenix Squad" },
    { id: "player10", rank: 10, name: "DragonFist", level: 120, power: 99876 },
    { id: "player11", rank: 11, name: "SpiritBomb", level: 118, power: 88765 },
    { id: "player12", rank: 12, name: "FinalFlash", level: 115, power: 77654 },
    { id: "player13", rank: 13, name: "GalickGun", level: 112, power: 66543 },
    { id: "player14", rank: 14, name: "SpecialBeam", level: 110, power: 55432 },
    { id: "player15", rank: 15, name: "DestructoDisk", level: 108, power: 44321 },
  ];

  const topGuilds = [
    { rank: 1, name: "Z Fighters", leader: "Goku Master", members: 50, power: 45000000 },
    { rank: 2, name: "Dragon Force", leader: "Vegeta Pro", members: 48, power: 42000000 },
    { rank: 3, name: "Gods Army", leader: "Divine Warrior", members: 45, power: 39000000 },
    { rank: 4, name: "Elite Warriors", leader: "Piccolo King", members: 42, power: 36000000 },
    { rank: 5, name: "Phoenix Squad", leader: "Gohan Hero", members: 40, power: 33000000 },
    { rank: 6, name: "Shadow Clan", leader: "Dark Master", members: 38, power: 30000000 },
    { rank: 7, name: "Thunder Legion", leader: "Storm King", members: 35, power: 27000000 },
    { rank: 8, name: "Fire Dragons", leader: "Blaze Lord", members: 32, power: 24000000 },
    { rank: 9, name: "Ice Warriors", leader: "Frost Queen", members: 30, power: 21000000 },
    { rank: 10, name: "Wind Riders", leader: "Tempest", members: 28, power: 18000000 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
              RANKING
            </h1>
            <p className="text-muted-foreground">Veja os melhores jogadores e guilds do servidor</p>
          </div>

          <Tabs defaultValue="players" className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="players" data-testid="tab-players">
                <Trophy className="w-4 h-4 mr-2" />
                Jogadores
              </TabsTrigger>
              <TabsTrigger value="guilds" data-testid="tab-guilds">
                <Users className="w-4 h-4 mr-2" />
                Guilds
              </TabsTrigger>
            </TabsList>

            <TabsContent value="players">
              <PlayerLeaderboard players={topPlayers} title="Top 15 Jogadores Mais Fortes" />
            </TabsContent>

            <TabsContent value="guilds">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-heading font-bold">Top 10 Guilds</h2>
                </div>

                <div className="space-y-3">
                  {topGuilds.map((guild) => (
                    <div
                      key={guild.rank}
                      className="flex items-center gap-4 p-4 rounded-md hover-elevate border border-card-border"
                      data-testid={`guild-row-${guild.rank}`}
                    >
                      <div className={`w-12 text-center font-display font-bold text-lg ${
                        guild.rank === 1 ? 'text-yellow-500' :
                        guild.rank === 2 ? 'text-gray-400' :
                        guild.rank === 3 ? 'text-amber-700' :
                        'text-muted-foreground'
                      }`}>
                        {guild.rank === 1 ? '👑' : `#${guild.rank}`}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="font-heading font-bold text-lg" data-testid={`text-guild-name-${guild.rank}`}>
                          {guild.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Líder: <span className="text-foreground">{guild.leader}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span data-testid={`text-members-${guild.rank}`}>{guild.members}</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-semibold">
                          <Zap className="w-4 h-4" />
                          <span data-testid={`text-power-${guild.rank}`}>{guild.power.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
