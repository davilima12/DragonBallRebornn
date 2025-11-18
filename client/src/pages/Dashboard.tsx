import Navbar from "@/components/Navbar";
import UserStatsCard from "@/components/UserStatsCard";
import TransactionItem from "@/components/TransactionItem";
import CharacterCard from "@/components/CharacterCard";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Coins, Crown, ShoppingBag, Zap, Users, Settings, TrendingUp, Mail, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { useAccountPlayers } from "@/hooks/useAccountPlayers";

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

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold">Meus Personagens</h2>
              <Link href="/characters/create">
                <Button variant="outline" size="sm" data-testid="button-create-character">
                  <Users className="w-4 h-4 mr-2" />
                  Criar Personagem
                </Button>
              </Link>
            </div>
            
            {isLoadingPlayers ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : !players || players.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Você ainda não tem personagens</p>
                <Link href="/characters/create">
                  <Button data-testid="button-create-character-empty">
                    Criar Personagem
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {players.slice(0, 6).map((player) => (
                  <Card key={player.id} className="p-4 hover-elevate" data-testid={`card-character-${player.id}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1" data-testid={`text-character-name-${player.id}`}>
                          {player.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {player.vocation}
                        </p>
                      </div>
                      {player.online === 1 && (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Online
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Level:</span>
                        <span className="font-semibold">{player.level}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Experiência:</span>
                        <span className="font-semibold">{player.experience.toLocaleString()}</span>
                      </div>
                      {player.rank_id > 0 && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Guild:</span>
                          <Badge variant="outline" className="text-xs">
                            Membro
                          </Badge>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </Card>

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
    </div>
  );
}
