import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { getAuthToken } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import { useAccountPlayers } from "@/hooks/useAccountPlayers";
import { queryClient } from "@/lib/queryClient";
import { CREATE_GUILD_API_URL } from "@/lib/api";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, User, Upload } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreateGuild() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { showLoading } = useLoading();
  const { data: players, isLoading: playersLoading } = useAccountPlayers();
  
  const [name, setName] = useState("");
  const [selectedOwnerId, setSelectedOwnerId] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const createGuildMutation = useMutation({
    mutationFn: async (data: { name: string; ownerId: number; logo_gfx_name: File | null }) => {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error("Token não encontrado");
      }

      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('ownerId', data.ownerId.toString());
      
      if (data.logo_gfx_name) {
        formData.append('logo_gfx_name', data.logo_gfx_name);
      }

      const response = await fetch(CREATE_GUILD_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao criar guild');
      }

      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Guild criada com sucesso!",
        description: "Sua guild foi criada e você é o líder.",
      });
      
      queryClient.invalidateQueries({
        predicate: (query) => 
          Array.isArray(query.queryKey) && 
          query.queryKey[0]?.toString().startsWith('/api/guilds')
      });
      
      navigate("/guilds");
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar guild",
        description: error instanceof Error ? error.message : "Ocorreu um erro ao criar a guild. Tente novamente.",
        variant: "destructive",
      });
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "A logo deve ter no máximo 5MB.",
          variant: "destructive",
        });
        return;
      }
      setLogoFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedOwnerId) {
      toast({
        title: "Selecione um personagem",
        description: "Você precisa selecionar qual personagem será o líder da guild.",
        variant: "destructive",
      });
      return;
    }

    if (name.length < 3) {
      toast({
        title: "Nome muito curto",
        description: "O nome da guild deve ter no mínimo 3 caracteres.",
        variant: "destructive",
      });
      return;
    }

    const hideLoadingFn = showLoading("Criando guild...");
    
    createGuildMutation.mutate(
      {
        name: name.trim(),
        ownerId: parseInt(selectedOwnerId),
        logo_gfx_name: logoFile
      },
      {
        onSettled: () => {
          hideLoadingFn();
        }
      }
    );
  };

  const token = getAuthToken();

  if (!token) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="p-8 text-center">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Login Necessário</h2>
              <p className="text-muted-foreground mb-6">
                Você precisa estar logado para criar uma guild.
              </p>
              <Link href="/login">
                <Button data-testid="button-login">Fazer Login</Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-heading font-bold text-primary mb-2">
                Criar Guild
              </h1>
              <p className="text-muted-foreground">
                Crie sua própria guild e reúna os melhores guerreiros
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="owner">
                  <User className="w-4 h-4 inline mr-2" />
                  Personagem Líder
                </Label>
                {playersLoading ? (
                  <Skeleton className="h-10 w-full" />
                ) : players && players.length > 0 ? (
                  <Select
                    value={selectedOwnerId}
                    onValueChange={setSelectedOwnerId}
                    required
                  >
                    <SelectTrigger data-testid="select-owner">
                      <SelectValue placeholder="Selecione o personagem líder" />
                    </SelectTrigger>
                    <SelectContent>
                      {players.map((player) => (
                        <SelectItem 
                          key={player.id} 
                          value={player.id.toString()}
                          data-testid={`option-player-${player.id}`}
                        >
                          {player.name} - Level {player.level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                    <p className="text-sm text-destructive">
                      Você precisa ter pelo menos um personagem para criar uma guild.
                    </p>
                    <Link href="/characters/create">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        data-testid="button-create-character"
                      >
                        Criar Personagem
                      </Button>
                    </Link>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Este personagem será o líder da guild
                </p>
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
                  minLength={3}
                  maxLength={30}
                  disabled={createGuildMutation.isPending}
                />
                <p className="text-xs text-muted-foreground">
                  Mínimo 3 caracteres, máximo 30 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo">
                  <Upload className="w-4 h-4 inline mr-2" />
                  Logo da Guild
                </Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    data-testid="input-logo"
                    disabled={createGuildMutation.isPending}
                    className="flex-1"
                  />
                  {logoFile && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {logoFile.name}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setLogoFile(null)}
                        data-testid="button-remove-logo"
                      >
                        Remover
                      </Button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Formatos aceitos: PNG, JPG, GIF. Tamanho máximo: 5MB
                </p>
              </div>

              <div className="p-4 bg-primary/5 border border-primary/20 rounded-md">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Informações
                </h3>
                <p className="text-sm text-muted-foreground">
                  O personagem selecionado será automaticamente o líder da guild
                </p>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={createGuildMutation.isPending || !players || players.length === 0}
                data-testid="button-create-guild"
              >
                {createGuildMutation.isPending ? "Criando..." : "Criar Guild"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
