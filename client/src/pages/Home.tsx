import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServerStatus from "@/components/ServerStatus";
import PlayerLeaderboard from "@/components/PlayerLeaderboard";
import GuildCard from "@/components/GuildCard";
import { Card } from "@/components/ui/card";
import { Trophy, Users, Shield, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GuildsPaginatedResponse } from "@/types/guild";
import { PlayersPaginatedResponse } from "@/types/player";
import { Skeleton } from "@/components/ui/skeleton";
import { GUILDS_API_URL, PLAYERS_API_URL } from "@/lib/api";

export default function Home() {
  const { data: playersData, isLoading: isLoadingPlayers } = useQuery<PlayersPaginatedResponse>({
    queryKey: ['/api/players/top10'],
    queryFn: async () => {
      const response = await fetch(`${PLAYERS_API_URL}?limit=10&page=1&orderBy=level`);
      
      if (!response.ok) {
        return { data: [], current_page: 1, total: 0, per_page: 10, last_page: 1 };
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return { data: [], current_page: 1, total: 0, per_page: 10, last_page: 1 };
      }
      
      return response.json();
    },
    retry: false,
  });

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
            {isLoadingPlayers ? (
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
              <PlayerLeaderboard 
                players={playersData?.data.map((player, index) => ({
                  id: player.id.toString(),
                  rank: index + 1,
                  name: player.name,
                  level: player.level,
                  power: player.experience,
                  guild: player.guild?.name,
                  vocation: player.vocation
                })) || []} 
              />
            )}
            
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
