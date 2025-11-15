import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServerStatus from "@/components/ServerStatus";
import PlayerLeaderboard from "@/components/PlayerLeaderboard";
import GuildCard from "@/components/GuildCard";
import { Card } from "@/components/ui/card";
import { Trophy, Users, Shield, Zap } from "lucide-react";

export default function Home() {
  const topPlayers = [
    { rank: 1, name: "SuperSaiyan99", level: 150, power: 999999, guild: "Z Fighters" },
    { rank: 2, name: "KameHameHa", level: 145, power: 887654, guild: "Dragon Force" },
    { rank: 3, name: "UltraInstinct", level: 142, power: 776543, guild: "Gods Army" },
    { rank: 4, name: "FusionWarrior", level: 138, power: 665432 },
    { rank: 5, name: "EnergyBlast", level: 135, power: 554321, guild: "Elite Squad" },
    { rank: 6, name: "PowerUpKing", level: 132, power: 443210 },
    { rank: 7, name: "MysticWarrior", level: 128, power: 332109, guild: "Shadow Clan" },
    { rank: 8, name: "ThunderStrike", level: 125, power: 221098 },
    { rank: 9, name: "PhoenixRise", level: 122, power: 110987, guild: "Phoenix Squad" },
    { rank: 10, name: "DragonFist", level: 120, power: 99876 },
  ];

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
              <div className="space-y-4">
                <GuildCard rank={1} name="Z Fighters" leader="Goku Master" memberCount={50} totalPower={45000000} />
                <GuildCard rank={2} name="Dragon Force" leader="Vegeta Pro" memberCount={48} totalPower={42000000} />
                <GuildCard rank={3} name="Gods Army" leader="Divine Warrior" memberCount={45} totalPower={39000000} />
                <GuildCard rank={4} name="Elite Warriors" leader="Piccolo King" memberCount={42} totalPower={36000000} />
                <GuildCard rank={5} name="Phoenix Squad" leader="Gohan Hero" memberCount={40} totalPower={33000000} />
              </div>
            </div>
          </div>
        </div>

        <Hero />
      </div>
    </div>
  );
}
