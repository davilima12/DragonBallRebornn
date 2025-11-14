import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServerStatus from "@/components/ServerStatus";
import PlayerLeaderboard from "@/components/PlayerLeaderboard";
import GuildCard from "@/components/GuildCard";
import QuickActionCard from "@/components/QuickActionCard";
import { UserPlus, ShoppingBag, Trophy, MessageCircle, Download } from "lucide-react";

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
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          <div className="flex justify-center">
            <ServerStatus online={true} playerCount={247} />
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

          <div>
            <h2 className="text-3xl font-heading font-bold mb-8 text-center">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <QuickActionCard
                title="Criar Conta"
                description="Cadastre-se e comece a jogar"
                icon={UserPlus}
                href="/register"
              />
              <QuickActionCard
                title="Shop"
                description="Compre itens e VIP"
                icon={ShoppingBag}
                href="/shop"
              />
              <QuickActionCard
                title="Ranking"
                description="Veja os melhores jogadores"
                icon={Trophy}
                href="/ranking"
              />
              <QuickActionCard
                title="Discord"
                description="Junte-se à comunidade"
                icon={MessageCircle}
                href="https://discord.gg/dragonwarriors"
              />
              <QuickActionCard
                title="Baixar"
                description="Download do jogo"
                icon={Download}
                href="/"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
