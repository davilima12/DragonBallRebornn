import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Shield } from "lucide-react";

export default function CreateGuild() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("🛡️");

  const logoOptions = ["🛡️", "⚔️", "🐉", "⚡", "🔥", "💎", "👑", "🌟", "🦅", "🐺", "🦁", "🐯"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating guild:", { name, description, logo });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/guilds">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>

          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl font-display font-bold text-primary mb-2">Criar Guild</h1>
              <p className="text-muted-foreground">
                Crie sua própria guild e reúna os melhores guerreiros
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo da Guild</Label>
                <div className="grid grid-cols-6 gap-3">
                  {logoOptions.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setLogo(emoji)}
                      className={`p-4 text-3xl rounded-md border-2 transition-all hover-elevate ${
                        logo === emoji
                          ? "border-primary bg-primary/10"
                          : "border-card-border hover:border-primary/50"
                      }`}
                      data-testid={`button-logo-${emoji}`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Nome da Guild</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nome da sua guild"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-guild-name"
                  required
                  maxLength={30}
                />
                <p className="text-xs text-muted-foreground">
                  Mínimo 3 caracteres, máximo 30 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva os objetivos e valores da sua guild..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  data-testid="input-description"
                  required
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground">
                  Máximo 500 caracteres
                </p>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Custo de Criação
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Criar uma guild custa <strong className="text-primary">10.000 pontos</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  Você será automaticamente o líder da guild
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" data-testid="button-create-guild">
                Criar Guild por 10.000 Pontos
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
