import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, Key, User, Mail } from "lucide-react";

export default function AccountSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("user@example.com");
  const [username, setUsername] = useState("SuperWarrior99");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Changing password");
  };

  const handleEmailChange = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Changing email to:", email);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>

          <h1 className="text-4xl font-display font-bold mb-8 bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
            CONFIGURAÇÕES DA CONTA
          </h1>

          <Tabs defaultValue="password" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="password" data-testid="tab-password">
                <Key className="w-4 h-4 mr-2" />
                Senha
              </TabsTrigger>
              <TabsTrigger value="account" data-testid="tab-account">
                <User className="w-4 h-4 mr-2" />
                Conta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <Card className="p-8">
                <h2 className="text-2xl font-heading font-bold mb-6">Alterar Senha</h2>
                
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Senha Atual</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="Digite sua senha atual"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      data-testid="input-current-password"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Digite sua nova senha"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      data-testid="input-new-password"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Mínimo 8 caracteres, incluindo letras e números
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirme sua nova senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      data-testid="input-confirm-password"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" data-testid="button-change-password">
                    Alterar Senha
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-heading font-bold mb-6">Informações da Conta</h2>
                  
                  <form onSubmit={handleEmailChange} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="username">Nome de Usuário</Label>
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        disabled
                        className="opacity-50"
                        data-testid="input-username"
                      />
                      <p className="text-xs text-muted-foreground">
                        O nome de usuário não pode ser alterado
                      </p>
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

                    <Button type="submit" className="w-full" size="lg" data-testid="button-update-email">
                      Atualizar Email
                    </Button>
                  </form>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="text-lg font-semibold mb-4 text-destructive">Zona de Perigo</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ao deletar sua conta, você perderá todos os seus dados permanentemente.
                  </p>
                  <Button variant="destructive" className="w-full" data-testid="button-delete-account">
                    Deletar Conta Permanentemente
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
