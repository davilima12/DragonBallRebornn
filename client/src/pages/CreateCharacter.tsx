import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useLoading } from "@/contexts/LoadingContext";
import VocationSelect from "@/components/VocationSelect";
import { VocationWithUrl, Vocation } from "@/types/vocation";
import { VOCATIONS_API_URL, CREATE_PLAYER_API_URL } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { getAuthToken } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";

export default function CreateCharacter() {
  return (
    <ProtectedRoute>
      <CreateCharacterPage />
    </ProtectedRoute>
  );
}

function CreateCharacterPage() {
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

  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      toast({
        title: "Erro",
        description: "Digite o nome do personagem.",
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

    const hideLoadingFn = showLoading("Criando personagem...");
    
    try {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('Token não encontrado');
      }

      const response = await fetch(CREATE_PLAYER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          playerName: playerName.trim(),
          vocationId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao criar personagem');
      }

      toast({
        title: "Sucesso!",
        description: "Personagem criado com sucesso!",
      });

      setLocation('/dashboard');
    } catch (error) {
      console.error('Create character error:', error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Não foi possível criar o personagem. Tente novamente.",
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
          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Criar Personagem</h1>
            <p className="text-muted-foreground">Crie seu guerreiro e comece sua jornada</p>
          </div>

          <form onSubmit={handleCreateCharacter} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="playerName">Nome do Personagem</Label>
              <Input
                id="playerName"
                type="text"
                placeholder="Digite o nome do personagem"
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

            <Button 
              type="submit" 
              className="w-full" 
              size="lg" 
              data-testid="button-create-character"
              disabled={isLoadingVocations}
            >
              Criar Personagem
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
