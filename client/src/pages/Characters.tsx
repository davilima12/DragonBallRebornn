import Navbar from "@/components/Navbar";
import PlayerLeaderboard from "@/components/PlayerLeaderboard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Users } from "lucide-react";
import { Link } from "wouter";
import { useAccountPlayers } from "@/hooks/useAccountPlayers";

export default function Characters() {
  return (
    <ProtectedRoute>
      <CharactersPage />
    </ProtectedRoute>
  );
}

function CharactersPage() {
  const { data: players, isLoading } = useAccountPlayers();
  const maxCharacters = 5;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2 bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
                MEUS PERSONAGENS
              </h1>
              <p className="text-muted-foreground">
                Gerencie seus personagens e veja suas estatísticas
              </p>
            </div>

            {!isLoading && (players?.length ?? 0) < maxCharacters && (
              <Link href="/characters/create">
                <Button data-testid="button-create-character">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Personagem
                </Button>
              </Link>
            )}
          </div>

          <Card className="p-4 mb-8 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">
                  Slots de Personagens: <span className="text-primary font-bold">
                    {isLoading ? '-' : `${players?.length ?? 0}/${maxCharacters}`}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Você pode ter até {maxCharacters} personagens ativos
                </p>
              </div>
            </div>
          </Card>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : (players?.length ?? 0) === 0 ? (
            <Card className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-heading font-bold mb-2">Nenhum Personagem</h3>
              <p className="text-muted-foreground mb-6">
                Você ainda não criou nenhum personagem. Crie seu primeiro personagem agora!
              </p>
              <Link href="/characters/create">
                <Button data-testid="button-create-first-character">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Personagem
                </Button>
              </Link>
            </Card>
          ) : (
            <PlayerLeaderboard 
              players={players?.map((player, index) => ({
                id: player.id.toString(),
                rank: index + 1,
                name: player.name,
                level: player.level,
                maglevel: player.maglevel,
                power: player.experience,
                guild: player.guild?.name,
                vocation: player.vocation
              })) || []} 
              title="Seus Personagens"
              showMagLevel={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}
