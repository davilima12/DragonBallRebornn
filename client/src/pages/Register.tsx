import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLoading } from "@/contexts/LoadingContext";
import VocationSelect from "@/components/VocationSelect";
import { VocationWithUrl, Vocation } from "@/types/vocation";
import { VOCATIONS_API_URL, ACCOUNT_API_URL } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [vocationId, setVocationId] = useState<number | null>(null);
  const [vocations, setVocations] = useState<VocationWithUrl[]>([]);
  const [isLoadingVocations, setIsLoadingVocations] = useState(true);
  
  const { showLoading } = useLoading();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    async function fetchVocations() {
      try {
        const response = await fetch(VOCATIONS_API_URL);
        if (!response.ok) throw new Error('Failed to fetch vocations');
        
        const data: Vocation[] = await response.json();
        
        const vocationsWithUrl: VocationWithUrl[] = data.map((vocation: Vocation) => ({
          ...vocation,
          url: `/vocations/${vocation.name}.gif`
        }));
        
        setVocations(vocationsWithUrl);
      } catch (error) {
        console.error('Error fetching vocations:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar as vocations. Tente novamente mais tarde.",
          variant: "destructive"
        });
      } finally {
        setIsLoadingVocations(false);
      }
    }

    fetchVocations();
  }, [toast]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    if (!vocationId) {
      toast({
        title: "Erro",
        description: "Selecione uma vocation.",
        variant: "destructive"
      });
      return;
    }

    const hideLoadingFn = showLoading("Criando conta...");
    
    try {
      const response = await fetch(ACCOUNT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          nickname,
          playerName,
          vocationId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao criar conta');
      }

      toast({
        title: "Sucesso!",
        description: "Conta criada com sucesso! Faça login para continuar.",
      });

      setLocation('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Não foi possível criar a conta. Tente novamente.",
        variant: "destructive"
      });
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

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
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
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="Seu apelido"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                data-testid="input-nickname"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="playerName">Nome do Personagem</Label>
              <Input
                id="playerName"
                type="text"
                placeholder="Nome do seu personagem"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                data-testid="input-player-name"
                required
              />
            </div>

            {isLoadingVocations ? (
              <div className="space-y-2">
                <Label>Vocation</Label>
                <div className="h-10 bg-muted animate-pulse rounded-md"></div>
              </div>
            ) : (
              <VocationSelect
                label="Vocation"
                vocations={vocations}
                onSelect={(vocation) => setVocationId(vocation.id)}
                required
              />
            )}

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

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              data-testid="button-register"
              disabled={isLoadingVocations}
            >
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
