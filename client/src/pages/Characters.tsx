import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Users, ArrowLeft, Trash2, Trophy } from "lucide-react";
import { Link } from "wouter";
import { useAccountPlayers } from "@/hooks/useAccountPlayers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { DELETE_PLAYER_API_URL } from "@/lib/api";
import { getAuthToken } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { useLoading } from "@/contexts/LoadingContext";

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
  const [deletePlayerId, setDeletePlayerId] = useState<number | null>(null);
  const { toast } = useToast();
  const { showLoading } = useLoading();

  const handleDeletePlayer = async () => {
    if (!deletePlayerId) return;

    const hideLoadingFn = showLoading("Deletando personagem...");

    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await fetch(DELETE_PLAYER_API_URL(deletePlayerId), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao deletar personagem');
      }

      toast({
        title: "Sucesso!",
        description: "Personagem deletado com sucesso!",
      });

      await queryClient.invalidateQueries({ queryKey: ['/api/account/players'] });
      setDeletePlayerId(null);
    } catch (error) {
      console.error('Delete player error:', error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Não foi possível deletar o personagem. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      hideLoadingFn();
    }
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-700";
    return "text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back-dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar para Minha Conta
              </Button>
            </Link>
          </div>

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
            <div className="space-y-3">
              {players?.map((player, index) => {
                const maxStamina = 2520; // 42 horas * 60 minutos
                const staminaPercentage = (player.stamina / maxStamina) * 100;
                const isOnline = player.online === 1;

                return (
                  <Card key={player.id} className="p-4" data-testid={`player-card-${index + 1}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-8 text-center font-display font-bold text-lg flex-shrink-0 ${getRankColor(index + 1)}`}>
                        {index + 1 === 1 && <Trophy className="w-6 h-6 inline" />}
                        {index + 1 > 1 && `#${index + 1}`}
                      </div>

                      <Link 
                        href={`/player/${player.id}`}
                        className="flex-1 min-w-0 hover-elevate active-elevate-2 rounded-md p-2 -m-2"
                      >
                        <div className="flex items-center justify-between gap-4 mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-heading font-semibold text-lg" data-testid={`text-player-name-${index + 1}`}>
                                {player.name}
                              </h3>
                              <Badge 
                                variant="secondary" 
                                className={isOnline 
                                  ? "bg-green-500/10 text-green-500 border-green-500/20" 
                                  : "bg-muted text-muted-foreground"
                                }
                                data-testid={`badge-status-${index + 1}`}
                              >
                                {isOnline ? "Online" : "Offline"}
                              </Badge>
                            </div>
                            {player.guild?.name && (
                              <div className="text-xs text-muted-foreground" data-testid={`text-guild-${index + 1}`}>
                                [{player.guild.name}]
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            <Badge variant="secondary" className="font-mono">
                              Nv. {player.level}
                            </Badge>
                            <div className="flex flex-col items-center gap-1 flex-shrink-0">
                              <img
                                src={`/vocations/${typeof player.vocation === 'number' ? 'Goku' : player.vocation || 'Goku'}.gif`}
                                alt={`${player.vocation || 'Goku'}`}
                                width={32}
                                height={32}
                                className="pixelated"
                                data-testid={`img-vocation-${index + 1}`}
                              />
                              <span className="text-xs text-muted-foreground font-medium">
                                {typeof player.vocation === 'string' ? player.vocation : 'Goku'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Stamina</span>
                            <span className="font-mono text-muted-foreground">
                              {Math.floor(player.stamina / 60)}h {player.stamina % 60}m / {Math.floor(maxStamina / 60)}h
                            </span>
                          </div>
                          <Progress 
                            value={staminaPercentage} 
                            className="h-2"
                            data-testid={`progress-stamina-${index + 1}`}
                          />
                        </div>
                      </Link>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                        onClick={() => setDeletePlayerId(player.id)}
                        data-testid={`button-delete-${player.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={deletePlayerId !== null} onOpenChange={(open) => !open && setDeletePlayerId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar Personagem</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar este personagem? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePlayer}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-testid="button-confirm-delete"
            >
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
