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
    memberCount: 50,
    totalPower: 45000000,
    description: "A guild mais poderosa do servidor, formada pelos melhores guerreiros.",
    level: 15,
    founded: "01/01/2024",
  };

  const members = [
    { id: "1", name: "Goku Master", level: 150, power: 999999, classType: "Guerreiro Sayajin", role: "leader", isOnline: true },
    { id: "2", name: "VegetaPrince", level: 148, power: 987654, classType: "Príncipe Guerreiro", role: "vice", isOnline: true },
    { id: "3", name: "GohanScholar", level: 145, power: 876543, classType: "Guerreiro Místico", role: "member", isOnline: false },
    { id: "4", name: "PiccoloWise", level: 142, power: 765432, classType: "Namekuseijin", role: "member", isOnline: true },
    { id: "5", name: "TrunksTime", level: 140, power: 654321, classType: "Guerreiro do Futuro", role: "member", isOnline: false },
    { id: "6", name: "GotenKid", level: 135, power: 543210, classType: "Jovem Guerreiro", role: "member", isOnline: true },
    { id: "7", name: "KrillinBrave", level: 130, power: 432109, classType: "Mestre das Artes", role: "member", isOnline: false },
    { id: "8", name: "TienThird", level: 128, power: 321098, classType: "Olho Celestial", role: "member", isOnline: true },
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
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-10 h-10 text-primary" />
                  <div>
                    <h1 className="text-4xl font-display font-bold" data-testid="text-guild-name">
                      {guild.name}
                    </h1>
                    <p className="text-muted-foreground">
                      Fundada em {guild.founded}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground mt-4">{guild.description}</p>
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
                  <span className="text-sm text-muted-foreground">Líder</span>
                </div>
                <p className="text-lg font-bold truncate" data-testid="text-leader">{guild.leader}</p>
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
                <div
                  key={member.id}
                  className="flex items-center gap-4 p-4 rounded-md border border-card-border hover-elevate"
                  data-testid={`member-row-${member.id}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Link href={`/character/${member.id}`}>
                        <span className="font-heading font-bold hover:text-primary transition-colors cursor-pointer" data-testid={`text-member-name-${member.id}`}>
                          {member.name}
                        </span>
                      </Link>
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
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
