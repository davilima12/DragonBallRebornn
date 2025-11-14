import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Users } from "lucide-react";
import { useState } from "react";
import { SiDiscord } from "react-icons/si";

export default function Support() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Support request:", { name, email, message });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
              SUPORTE
            </h1>
            <p className="text-muted-foreground">Estamos aqui para ajudar você</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center hover-elevate transition-all cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <SiDiscord className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Discord</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Junte-se à nossa comunidade no Discord
              </p>
              <Button variant="outline" className="w-full" data-testid="button-discord">
                Entrar no Discord
              </Button>
            </Card>

            <Card className="p-6 text-center hover-elevate transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-4">
                suporte@dragonwarriors.com
              </p>
              <p className="text-xs text-muted-foreground">
                Resposta em até 24h
              </p>
            </Card>

            <Card className="p-6 text-center hover-elevate transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Comunidade</h3>
              <p className="text-sm text-muted-foreground mb-4">
                +5.000 jogadores ativos
              </p>
              <p className="text-xs text-muted-foreground">
                Suporte entre jogadores
              </p>
            </Card>
          </div>

          <Card className="p-8 max-w-2xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-heading font-bold">Enviar Mensagem</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-email"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Como podemos ajudar você?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  data-testid="input-message"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" data-testid="button-submit">
                Enviar Mensagem
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
