import { useState } from "react";
import Navbar from "@/components/Navbar";
import CharacterCard from "@/components/CharacterCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Users } from "lucide-react";

export default function Characters() {
  const [characters] = useState([
    { id: "char1", name: "SuperWarrior", level: 150, power: 999999, classType: "Guerreiro Sayajin", guild: "Z Fighters", isOnline: true },
    { id: "char2", name: "MysticMage", level: 135, power: 654321, classType: "Mago Místico", guild: "Dragon Force", isOnline: false },
    { id: "char3", name: "ShadowNinja", level: 142, power: 777888, classType: "Ninja das Sombras", isOnline: false },
  ]);

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

            {characters.length < maxCharacters && (
              <Button data-testid="button-create-character">
                <Plus className="w-4 h-4 mr-2" />
                Criar Personagem
              </Button>
            )}
          </div>

          <Card className="p-4 mb-8 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">
                  Slots de Personagens: <span className="text-primary font-bold">{characters.length}/{maxCharacters}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Você pode ter até {maxCharacters} personagens ativos
                </p>
              </div>
            </div>
          </Card>

          {characters.length === 0 ? (
            <Card className="p-12 text-center">
              <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-heading font-bold mb-2">Nenhum Personagem</h3>
              <p className="text-muted-foreground mb-6">
                Você ainda não criou nenhum personagem. Crie seu primeiro personagem agora!
              </p>
              <Button data-testid="button-create-first-character">
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Personagem
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {characters.map((character) => (
                <CharacterCard key={character.id} {...character} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
