import { useRoute, Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Zap, Shield, Crown, Swords } from "lucide-react";

export default function GuildDetail() {
  const [, params] = useRoute("/guild/:name");
  
  const guild = {
    name: params?.name || "Z Fighters",
    leader: "Goku Master",
    viceLeader: "VegetaPrince",
    memberCount: 50,
    totalPower: 45000000,
    description: "A guild mais poderosa do servidor, formada pelos melhores guerreiros. Nosso objetivo é dominar o ranking e ajudar todos os membros a evoluírem juntos.",
    level: 15,
    founded: "01/01/2024",
    logo: "🛡️",
  };

  const members = [
    { id: "player1", name: "SuperSaiyan99", level: 150, power: 999999, classType: "Guerreiro Sayajin", role: "leader", isOnline: true },
    { id: "player2", name: "KameHameHa", level: 148, power: 887654, classType: "Príncipe Guerreiro", role: "vice", isOnline: true },
    { id: "player3", name: "UltraInstinct", level: 145, power: 776543, classType: "Guerreiro Místico", role: "member", isOnline: false },
    { id: "player4", name: "FusionWarrior", level: 142, power: 665432, classType: "Namekuseijin", role: "member", isOnline: true },
    { id: "player5", name: "EnergyBlast", level: 140, power: 554321, classType: "Guerreiro do Futuro", role: "member", isOnline: false },
    { id: "player6", name: "PowerUpKing", level: 135, power: 443210, classType: "Jovem Guerreiro", role: "member", isOnline: true },
    { id: "player7", name: "MysticWarrior", level: 130, power: 332109, classType: "Mestre das Artes", role: "member", isOnline: false },
    { id: "player8", name: "ThunderStrike", level: 128, power: 221098, classType: "Olho Celestial", role: "member", isOnline: true },
  ];

  const getRoleBadge = (role: string) => {
    if (role === "leader") return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30"><Crown className="w-3 h-3 mr-1" />Líder</Badge>;
    if (role === "vice") return <Badge className="bg-primary/20 text-primary border-primary/30">Vice-Líder</Badge>;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex items-center gap-4">
            <Link href="/guilds">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>

          <Card className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center text-4xl border-2 border-primary/30">
                    {guild.logo}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-4xl font-display font-bold mb-1" data-testid="text-guild-name">
                      {guild.name}
                    </h1>
                    <p className="text-muted-foreground">
                      Fundada em {guild.founded}
                    </p>
                  </div>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <h3 className="font-semibold mb-2">Descrição da Guild</h3>
                  <p className="text-sm text-muted-foreground">{guild.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-xs text-muted-foreground mb-1">Líder</p>
                    <p className="font-semibold" data-testid="text-leader">{guild.leader}</p>
                  </div>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-xs text-muted-foreground mb-1">Vice-Líder</p>
                    <p className="font-semibold" data-testid="text-vice-leader">{guild.viceLeader}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Membros</span>
                </div>
                <p className="text-2xl font-bold" data-testid="text-member-count">{guild.memberCount}</p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Poder Total</span>
                </div>
                <p className="text-2xl font-bold text-primary" data-testid="text-total-power">
                  {guild.totalPower.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Nível da Guild</span>
                </div>
                <p className="text-2xl font-bold text-green-500">{guild.level}</p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Fundação</span>
                </div>
                <p className="text-lg font-bold">{guild.founded}</p>
              </div>
            </div>

            <Button className="w-full md:w-auto" data-testid="button-join-guild">
              Solicitar Entrada
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-heading font-bold mb-6">Membros da Guild</h2>
            
            <div className="space-y-3">
              {members.map((member) => (
                <Link
                  key={member.id}
                  href={`/player/${member.id}`}
                >
                  <div
                    className="flex items-center gap-4 p-4 rounded-md border border-card-border hover-elevate active-elevate-2 cursor-pointer transition-all"
                    data-testid={`member-row-${member.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-heading font-bold" data-testid={`text-member-name-${member.id}`}>
                          {member.name}
                        </span>
                        {member.isOnline && (
                          <div className="w-2 h-2 rounded-full bg-status-online animate-pulse"></div>
                        )}
                        {getRoleBadge(member.role)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Swords className="w-3 h-3" />
                          {member.classType}
                        </span>
                        <span>Nv. {member.level}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <Zap className="w-4 h-4" />
                      <span className="font-mono" data-testid={`text-member-power-${member.id}`}>
                        {member.power.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
