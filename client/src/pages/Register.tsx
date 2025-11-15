import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLoading } from "@/contexts/LoadingContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showLoading } = useLoading();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const hideLoadingFn = showLoading("Criando conta...");
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Register attempt:", { username, email, password, confirmPassword });
    } finally {
      hideLoadingFn();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Criar Conta</h1>
            <p className="text-muted-foreground">Junte-se aos Dragon Warriors hoje</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="DragonWarrior123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                data-testid="input-username"
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
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="input-password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                data-testid="input-confirm-password"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" data-testid="button-register">
              Criar Conta
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-primary hover:underline font-medium" data-testid="link-login">
                Entrar
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
