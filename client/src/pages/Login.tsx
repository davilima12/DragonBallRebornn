import { useState } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { showLoading } = useLoading();
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const hideLoadingFn = showLoading("Entrando...");
    try {
      await login(email, password);
      setLocation("/dashboard");
    } finally {
      hideLoadingFn();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Entrar</h1>
            <p className="text-muted-foreground">Entre na sua conta Dragon Warriors</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email ou Username</Label>
              <Input
                id="email"
                type="text"
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

            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-primary hover:underline" data-testid="link-forgot-password">
                Esqueceu a senha?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" data-testid="button-login">
              Entrar
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium" data-testid="link-register">
                Cadastre-se
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
