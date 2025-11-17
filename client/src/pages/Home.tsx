import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServerStatus from "@/components/ServerStatus";
import PlayerLeaderboard from "@/components/PlayerLeaderboard";
import GuildCard from "@/components/GuildCard";
import { Card } from "@/components/ui/card";
import { Trophy, Users, Shield, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GuildsPaginatedResponse } from "@/types/guild";
import { Skeleton } from "@/components/ui/skeleton";
import { GUILDS_API_URL } from "@/lib/api";

export default function Home() {
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
  ];

  const { data: guildsData, isLoading: isLoadingGuilds, error: guildsError } = useQuery<GuildsPaginatedResponse>({
    queryKey: ['/api/guilds/top5'],
    queryFn: async () => {
      const response = await fetch(`${GUILDS_API_URL}?limit=5&page=1`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch guilds');
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('API retornou HTML ao invés de JSON - backend externo pode não estar rodando');
        return { data: [], current_page: 1, total: 0, per_page: 5 };
      }
      
      return response.json();
    },
    retry: false,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          <div className="max-w-2xl mx-auto">
            <ServerStatus online={true} playerCount={247} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">Sistema de Ranking</h3>
              <p className="text-sm text-muted-foreground">Compete e mostre sua força</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">Guilds Poderosas</h3>
              <p className="text-sm text-muted-foreground">Una-se aos melhores guerreiros</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">Itens Exclusivos</h3>
              <p className="text-sm text-muted-foreground">Adquira poder e VIP</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-1">Batalhas Épicas</h3>
              <p className="text-sm text-muted-foreground">Lute e evolua constantemente</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PlayerLeaderboard players={topPlayers} />
            
            <div>
              <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                <span>Top 5 Guilds</span>
              </h2>
              {isLoadingGuilds ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : guildsData?.data.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">
                    Aguardando dados do servidor...
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Backend externo (localhost:8000) não está disponível
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {guildsData?.data.slice(0, 5).map((guild, index) => (
                    <GuildCard
                      key={guild.id}
                      rank={index + 1}
                      {...guild}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <Hero />
      </div>
    </div>
  );
}
