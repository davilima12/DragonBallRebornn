import Navbar from "@/components/Navbar";
import UserStatsCard from "@/components/UserStatsCard";
import TransactionItem from "@/components/TransactionItem";
import CharacterCard from "@/components/CharacterCard";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Coins, Crown, ShoppingBag, Zap, Users, Settings, TrendingUp, Mail } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
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

  const characters = [
    { id: "char1", name: "SuperWarrior", level: 150, power: 999999, classType: "Guerreiro Sayajin", guild: "Z Fighters", isOnline: true },
    { id: "char2", name: "MysticMage", level: 135, power: 654321, classType: "Mago Místico", guild: "Dragon Force", isOnline: false },
  ];

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
                    SW
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-heading font-bold" data-testid="text-username">
                      SuperWarrior99
                    </h1>
                    <Badge className="bg-primary">
                      <Crown className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      user@example.com
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
              title="Saldo de Pontos"
              value="15,450"
              icon={Coins}
              description="Pontos disponíveis"
              highlight={true}
            />
            <UserStatsCard
              title="Status VIP"
              value="Ativo"
              icon={Crown}
              description="Válido até 15/12/2025"
            />
            <UserStatsCard
              title="Compras Totais"
              value="R$ 349,70"
              icon={ShoppingBag}
              description="Últimos 30 dias"
            />
          </div>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-heading font-bold">Meus Personagens</h2>
              <Link href="/characters">
                <Button variant="outline" size="sm" data-testid="button-view-all-characters">
                  <Users className="w-4 h-4 mr-2" />
                  Ver Todos
                </Button>
              </Link>
            </div>
            
            {characters.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Você ainda não tem personagens</p>
                <Link href="/characters">
                  <Button data-testid="button-create-character-dashboard">
                    Criar Personagem
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {characters.map((character) => (
                  <CharacterCard key={character.id} {...character} />
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
