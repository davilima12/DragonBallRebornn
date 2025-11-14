import Navbar from "@/components/Navbar";
import GuildCard from "@/components/GuildCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import { useState } from "react";

export default function Guilds() {
  const [searchTerm, setSearchTerm] = useState("");

  const guilds = [
    { rank: 1, name: "Z Fighters", leader: "Goku Master", memberCount: 50, totalPower: 45000000 },
    { rank: 2, name: "Dragon Force", leader: "Vegeta Pro", memberCount: 48, totalPower: 42000000 },
    { rank: 3, name: "Gods Army", leader: "Divine Warrior", memberCount: 45, totalPower: 39000000 },
    { rank: 4, name: "Elite Warriors", leader: "Piccolo King", memberCount: 42, totalPower: 36000000 },
    { rank: 5, name: "Phoenix Squad", leader: "Gohan Hero", memberCount: 40, totalPower: 33000000 },
    { rank: 6, name: "Shadow Clan", leader: "Dark Master", memberCount: 38, totalPower: 30000000 },
    { rank: 7, name: "Thunder Legion", leader: "Storm King", memberCount: 35, totalPower: 27000000 },
    { rank: 8, name: "Fire Dragons", leader: "Blaze Lord", memberCount: 32, totalPower: 24000000 },
    { rank: 9, name: "Ice Warriors", leader: "Frost Queen", memberCount: 30, totalPower: 21000000 },
    { rank: 10, name: "Wind Riders", leader: "Tempest", memberCount: 28, totalPower: 18000000 },
  ];

  const filteredGuilds = guilds.filter(guild => 
    guild.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guild.leader.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
              GUILDS
            </h1>
            <p className="text-muted-foreground mb-8">
              Encontre ou crie uma guild para dominar o ranking
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar guild por nome ou líder..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <Button data-testid="button-create-guild">
                <Plus className="w-4 h-4 mr-2" />
                Criar Guild
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuilds.map((guild) => (
              <GuildCard key={guild.rank} {...guild} />
            ))}
          </div>

          {filteredGuilds.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma guild encontrada com esse critério de busca.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
