import { useState } from "react";
import { useRoute, Link } from "wouter";
import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import DeathLogItem from "@/components/DeathLogItem";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Zap, Shield, Heart, Swords, Trash2, Users } from "lucide-react";

export default function CharacterDetail() {
  const [, params] = useRoute("/character/:id");
  
  const character = {
    id: params?.id || "char1",
    name: "SuperWarrior",
    level: 150,
    power: 999999,
    classType: "Guerreiro Sayajin",
    guild: "Z Fighters",
    hp: 15000,
    maxHp: 15000,
    mp: 8000,
    maxMp: 8000,
    defense: 5000,
    attack: 12000,
  };

  const skills = [
    { name: "Kamehameha", level: 10, maxLevel: 10, description: "Poderosa onda de energia concentrada", type: "attack" as const },
    { name: "Escudo Energético", level: 7, maxLevel: 10, description: "Cria uma barreira protetora de energia", type: "defense" as const },
    { name: "Cura Celestial", level: 5, maxLevel: 10, description: "Restaura a vida dos aliados próximos", type: "support" as const },
    { name: "Golpe Final", level: 8, maxLevel: 10, description: "Ataque devastador com todo o poder", type: "attack" as const },
    { name: "Velocidade Extrema", level: 6, maxLevel: 10, description: "Aumenta drasticamente a velocidade", type: "support" as const },
    { name: "Barreira Absoluta", level: 9, maxLevel: 10, description: "Defesa impenetrável por curto tempo", type: "defense" as const },
  ];

  const deaths = [
    { id: "death1", killedBy: "DarkLord666", location: "Caverna das Trevas", date: "14/11/2025 às 15:30", level: 148 },
    { id: "death2", killedBy: "MegaBoss", location: "Torre do Infinito - Andar 50", date: "13/11/2025 às 20:15", level: 147 },
    { id: "death3", killedBy: "PvPMaster", location: "Arena de Batalha", date: "12/11/2025 às 18:45", level: 145 },
    { id: "death4", killedBy: "DragonBoss", location: "Ninho do Dragão", date: "10/11/2025 às 10:20", level: 143 },
    { id: "death5", killedBy: "ShadowAssassin", location: "Floresta Sombria", date: "08/11/2025 às 22:10", level: 140 },
  ];

  const handleDeleteCharacter = () => {
    console.log("Deleting character:", character.id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex items-center gap-4">
            <Link href="/characters">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>

          <Card className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-display font-bold" data-testid="text-character-name">
                    {character.name}
                  </h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    Nv. {character.level}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Swords className="w-4 h-4" />
                    {character.classType}
                  </span>
                  {character.guild && (
                    <Link href={`/guild/${character.guild}`}>
                      <span className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer" data-testid="link-guild">
                        <Users className="w-4 h-4" />
                        [{character.guild}]
                      </span>
                    </Link>
                  )}
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" data-testid="button-delete-character">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Deletar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Deletar Personagem</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja deletar <strong>{character.name}</strong>? Esta ação não pode ser desfeita.
                      Você perderá todo o progresso, itens e conquistas deste personagem.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel data-testid="button-cancel-delete">Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteCharacter} className="bg-destructive hover:bg-destructive/90" data-testid="button-confirm-delete">
                      Deletar Permanentemente
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-muted-foreground">HP</span>
                </div>
                <p className="text-lg font-bold font-mono" data-testid="text-hp">
                  {character.hp.toLocaleString()}/{character.maxHp.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-muted-foreground">MP</span>
                </div>
                <p className="text-lg font-bold font-mono" data-testid="text-mp">
                  {character.mp.toLocaleString()}/{character.maxMp.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Swords className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Ataque</span>
                </div>
                <p className="text-lg font-bold font-mono text-primary" data-testid="text-attack">
                  {character.attack.toLocaleString()}
                </p>
              </div>

              <div className="p-4 bg-muted rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-muted-foreground">Defesa</span>
                </div>
                <p className="text-lg font-bold font-mono text-green-500" data-testid="text-defense">
                  {character.defense.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="skills" className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="skills" data-testid="tab-skills">Skills</TabsTrigger>
              <TabsTrigger value="deaths" data-testid="tab-deaths">Histórico de Mortes</TabsTrigger>
            </TabsList>

            <TabsContent value="skills">
              <Card className="p-6">
                <h2 className="text-2xl font-heading font-bold mb-6">Skills do Personagem</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill) => (
                    <SkillCard key={skill.name} {...skill} />
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="deaths">
              <Card className="p-6">
                <h2 className="text-2xl font-heading font-bold mb-6">Últimas Mortes</h2>
                {deaths.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Nenhuma morte registrada. Continue vivo!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {deaths.map((death) => (
                      <DeathLogItem key={death.id} {...death} />
                    ))}
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
