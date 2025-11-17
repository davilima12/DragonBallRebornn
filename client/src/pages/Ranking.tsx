import Navbar from "@/components/Navbar";
import PlayerLeaderboard from "@/components/PlayerLeaderboard";
import { Trophy, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { PlayersPaginatedResponse } from "@/types/player";
import { Skeleton } from "@/components/ui/skeleton";
import { PLAYERS_API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Ranking() {
  const [playersPage, setPlayersPage] = useState(1);
  const [playersOrderBy, setPlayersOrderBy] = useState<'level' | 'maglevel'>('level');

  const { data: playersData, isLoading: isLoadingPlayers } = useQuery<PlayersPaginatedResponse>({
    queryKey: ['/api/players/ranking', playersPage, playersOrderBy],
    queryFn: async () => {
      const offset = (playersPage - 1) * 15;
      const response = await fetch(`${PLAYERS_API_URL}?limit=15&offset=${offset}&orderBy=${playersOrderBy}`);
      
      if (!response.ok) {
        return { data: [], current_page: 1, total: 0, per_page: 15, last_page: 1 };
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return { data: [], current_page: 1, total: 0, per_page: 15, last_page: 1 };
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
              RANKING DE JOGADORES
            </h1>
            <p className="text-muted-foreground">Veja os melhores jogadores do servidor</p>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            <Button
              variant={playersOrderBy === 'level' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setPlayersOrderBy('level');
                setPlayersPage(1);
              }}
              data-testid="filter-level"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Level
            </Button>
            <Button
              variant={playersOrderBy === 'maglevel' ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setPlayersOrderBy('maglevel');
                setPlayersPage(1);
              }}
              data-testid="filter-maglevel"
            >
              <Zap className="w-4 h-4 mr-2" />
              Magic Level
            </Button>
          </div>

          {isLoadingPlayers ? (
            <div className="space-y-4">
              {[...Array(15)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <>
              <PlayerLeaderboard 
                players={playersData?.data.map((player, index) => ({
                  id: player.id.toString(),
                  rank: (playersPage - 1) * 15 + index + 1,
                  name: player.name,
                  level: player.level,
                  power: player.experience,
                  guild: player.guild?.name,
                  vocation: player.vocation
                })) || []} 
                title="Top Jogadores Mais Fortes" 
              />
              
              {playersData && playersData.last_page > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPlayersPage(p => Math.max(1, p - 1))}
                    disabled={playersPage === 1}
                    data-testid="button-prev-page-players"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </Button>
                  <span className="text-sm text-muted-foreground px-4">
                    Página {playersPage} de {playersData.last_page}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPlayersPage(p => Math.min(playersData.last_page, p + 1))}
                    disabled={playersPage === playersData.last_page}
                    data-testid="button-next-page-players"
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
