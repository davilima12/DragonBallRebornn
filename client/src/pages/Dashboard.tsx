import Navbar from "@/components/Navbar";
import UserStatsCard from "@/components/UserStatsCard";
import TransactionItem from "@/components/TransactionItem";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { Coins, Crown, ShoppingBag, Zap, Users, Settings, TrendingUp, Mail, Plus, Trophy, Trash2 } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
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

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}

function DashboardPage() {
  const { user, account } = useAuth();
  const { data: players, isLoading: isLoadingPlayers } = useAccountPlayers();
  const [deletePlayerId, setDeletePlayerId] = useState<number | null>(null);
  const { toast } = useToast();
  const { showLoading } = useLoading();

  const allTransactions = [
    { id: "tx1", type: "deposit" as const, description: "Depósito via PIX", amount: 50.00, status: "completed" as const, date: "14/11/2025 às 10:30" },
    { id: "tx2", type: "purchase" as const, description: "Compra de VIP 30 Dias", amount: 29.90, status: "completed" as const, date: "14/11/2025 às 10:35" },
    { id: "tx3", type: "sale" as const, description: "Venda de 500 Pontos", amount: 5.00, status: "pending" as const, date: "14/11/2025 às 11:00" },
    { id: "tx4", type: "deposit" as const, description: "Depósito via Cartão", amount: 100.00, status: "failed" as const, date: "13/11/2025 às 15:20" },
    { id: "tx5", type: "purchase" as const, description: "Compra de 1000 Pontos", amount: 10.00, status: "completed" as const, date: "13/11/2025 às 14:00" },
    { id: "tx6", type: "deposit" as const, description: "Depósito via PIX", amount: 100.00, status: "completed" as const, date: "12/11/2025 às 09:15" },
    { id: "tx7", type: "purchase" as const, description: "Compra de Cristal Raro", amount: 49.90, status: "completed" as const, date: "11/11/2025 às 16:20" },
    { id: "tx8", type: "deposit" as const, description: "Depósito via Boleto", amount: 200.00, status: "completed" as const, date: "10/11/2025 às 14:00" },
  ];

  const deposits = allTransactions.filter(t => t.type === "deposit");
  const purchases = allTransactions.filter(t => t.type === "purchase" || t.type === "sale");

  const isVip = account?.vip_time && account.vip_time > Date.now() / 1000;
  const vipEndDate = account?.vip_time ? new Date(account.vip_time * 1000).toLocaleDateString('pt-BR') : null;

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-500";
    if (rank === 2) return "text-gray-400";
    if (rank === 3) return "text-amber-700";
    return "text-muted-foreground";
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20 border-2 border-primary">
                  <AvatarFallback className="bg-primary/20 text-primary text-2xl font-bold">
                    {account?.nickname?.substring(0, 2).toUpperCase() || user?.username?.substring(0, 2).toUpperCase() || "DW"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-heading font-bold" data-testid="text-username">
                      {account?.nickname || user?.username || "Guerreiro"}
                    </h1>
                    {isVip && (
                      <Badge className="bg-primary">
                        <Crown className="w-3 h-3 mr-1" />
                        VIP
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {account?.email || user?.email || "user@example.com"}
                    </span>
                  </div>
                </div>
              </div>
              <Link href="/account-settings">
                <Button variant="outline" size="sm" data-testid="button-settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurações
                </Button>
              </Link>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UserStatsCard
              title="Pontos Premium"
              value={account?.premium_points?.toLocaleString() || "0"}
              icon={Coins}
              description="Pontos disponíveis"
              highlight={true}
            />
            <UserStatsCard
              title="Status VIP"
              value={isVip ? "Ativo" : "Inativo"}
              icon={Crown}
              description={isVip && vipEndDate ? `Válido até ${vipEndDate}` : "Sem VIP ativo"}
            />
            <UserStatsCard
              title="Personagens"
              value={players?.length.toString() || "0"}
              icon={Users}
              description={`${players?.filter(p => p.online).length || 0} online`}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold">Meus Personagens</h2>
              <Link href="/characters/create">
                <Button variant="outline" size="sm" data-testid="button-create-character">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Personagem
                </Button>
              </Link>
            </div>
            
            {isLoadingPlayers ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : !players || players.length === 0 ? (
              <Card className="p-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-heading font-bold mb-2">Nenhum Personagem</h3>
                <p className="text-muted-foreground mb-6">
                  Você ainda não criou nenhum personagem. Crie seu primeiro personagem agora!
                </p>
                <Link href="/characters/create">
                  <Button data-testid="button-create-character-empty">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Personagem
                  </Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-3">
                {players.slice(0, 6).map((player, index) => {
                  const maxStamina = 151200; // 42 horas em segundos
                  const staminaInMinutes = Math.floor(player.stamina / 60);
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
                                {Math.floor(staminaInMinutes / 60)}h {staminaInMinutes % 60}m / 42h
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

          <Card className="p-6">
            <h2 className="text-2xl font-heading font-bold mb-6">Histórico Financeiro</h2>
            
            <Tabs defaultValue="all" className="space-y-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all" data-testid="tab-all-transactions">Todas</TabsTrigger>
                <TabsTrigger value="deposits" data-testid="tab-deposits">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Depósitos
                </TabsTrigger>
                <TabsTrigger value="purchases" data-testid="tab-purchases">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Compras
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {allTransactions.map((transaction) => (
                  <TransactionItem key={transaction.id} {...transaction} />
                ))}
              </TabsContent>

              <TabsContent value="deposits" className="space-y-3">
                {deposits.length > 0 ? (
                  deposits.map((transaction) => (
                    <TransactionItem key={transaction.id} {...transaction} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhum depósito encontrado</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="purchases" className="space-y-3">
                {purchases.length > 0 ? (
                  purchases.map((transaction) => (
                    <TransactionItem key={transaction.id} {...transaction} />
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Nenhuma compra encontrada</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>

      <AlertDialog open={deletePlayerId !== null} onOpenChange={(open) => !open && setDeletePlayerId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O personagem será permanentemente deletado.
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
