import Navbar from "@/components/Navbar";
import PlayerLeaderboard from "@/components/PlayerLeaderboard";
import GuildCard from "@/components/GuildCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Trophy, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GuildsPaginatedResponse } from "@/types/guild";
import { Skeleton } from "@/components/ui/skeleton";
import { GUILDS_API_URL } from "@/lib/api";

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

  const { data: guildsData, isLoading: isLoadingGuilds } = useQuery<GuildsPaginatedResponse>({
    queryKey: ['/api/guilds/ranking'],
    queryFn: async () => {
      const response = await fetch(`${GUILDS_API_URL}?limit=10&offset=0`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch guilds');
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('API retornou HTML ao invés de JSON - backend externo pode não estar rodando');
        return { data: [], current_page: 1, total: 0, per_page: 10 };
      }
      
      return response.json();
    },
    retry: false,
  });

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
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Users className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-heading font-bold">Top 10 Guilds</h2>
                </div>

                {isLoadingGuilds ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(6)].map((_, i) => (
                      <Skeleton key={i} className="h-40 w-full" />
                    ))}
                  </div>
                ) : guildsData?.data.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Aguardando dados do servidor...
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Backend externo (localhost:8000) não está disponível
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {guildsData?.data.map((guild, index) => (
                      <GuildCard
                        key={guild.id}
                        rank={index + 1}
                        {...guild}
                      />
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
