import { useRoute, Link } from "wouter";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Users, Shield, Crown, UserPlus, Mail, Check } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { GUILD_DETAIL_API_URL, GUILD_INVITE_PLAYER_API_URL, GUILD_ACCEPT_INVITE_API_URL } from "@/lib/api";
import { GuildDetail as GuildDetailType } from "@/types/guild";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getAuthToken, useAuth } from "@/contexts/AuthContext";
import { PlayerSearchSelect } from "@/components/PlayerSearchSelect";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { useLoading } from "@/contexts/LoadingContext";
import { useAccountPlayers } from "@/hooks/useAccountPlayers";

export default function GuildDetail() {
  const [, params] = useRoute("/guild/:name");
  const guildName = params?.name;
  const { isAuthenticated } = useAuth();
  const { data: accountPlayers, isLoading: isLoadingPlayers } = useAccountPlayers();
  const { toast } = useToast();
  const { showLoading } = useLoading();
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>();

  useEffect(() => {
    if (!isAuthenticated) {
      setSelectedPlayerId(undefined);
    }
  }, [isAuthenticated]);

  const { data: guild, isLoading } = useQuery<GuildDetailType>({
    queryKey: ['/api/guild', guildName],
    queryFn: async () => {
      const guildsListResponse = await fetch(`http://localhost:8000/api/guilds?limit=1000`);
      if (!guildsListResponse.ok) throw new Error('Failed to fetch guilds');
      const guildsData = await guildsListResponse.json();
      
      const targetGuild = guildsData.data.find((g: any) => g.name === guildName);
      if (!targetGuild) throw new Error('Guild not found');
      
      const response = await fetch(GUILD_DETAIL_API_URL(targetGuild.id));
      if (!response.ok) throw new Error('Failed to fetch guild details');
      return response.json();
    },
    enabled: !!guildName,
  });

  const formatDate = (timestamp: number) => {
    try {
      return format(new Date(timestamp * 1000), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return 'Data inválida';
    }
  };

  const getRankBadge = (rankLevel: number) => {
    if (rankLevel === 3) return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30"><Crown className="w-3 h-3 mr-1" />Líder</Badge>;
    if (rankLevel === 2) return <Badge className="bg-primary/20 text-primary border-primary/30">Vice-Líder</Badge>;
    return null;
  };

  const getTotalMembers = () => {
    if (!guild) return 0;
    return guild.guild_rank.reduce((total, rank) => total + rank.player.length, 0);
  };

  const getAllMembers = () => {
    if (!guild) return [];
    return guild.guild_rank
      .flatMap(rank => 
        rank.player.map(player => ({
          ...player,
          rankName: rank.name,
          rankLevel: rank.level
        }))
      )
      .sort((a, b) => b.level - a.level);
  };

  const getTopMember = () => {
    const members = getAllMembers();
    return members.length > 0 ? members[0] : null;
  };

  const getLeaderName = () => {
    if (!guild) return '-';
    const leaderRank = guild.guild_rank.find(r => r.level === 3);
    return leaderRank?.player[0]?.name || '-';
  };

  const getViceLeaderName = () => {
    if (!guild) return '-';
    const viceRank = guild.guild_rank.find(r => r.level === 2);
    return viceRank?.player[0]?.name || '-';
  };

  const getCurrentUserGuildRole = () => {
    if (!guild || !accountPlayers || accountPlayers.length === 0) return null;
    
    const accountPlayerIds = accountPlayers.map((p) => p.id);
    
    for (const rank of guild.guild_rank) {
      for (const player of rank.player) {
        if (accountPlayerIds.includes(player.id)) {
          return {
            playerId: player.id,
            rankLevel: rank.level,
            isAdmin: rank.level >= 2
          };
        }
      }
    }
    
    return null;
  };

  const handleInvitePlayer = async () => {
    if (!selectedPlayerId || !guild) return;
    
    const userRole = getCurrentUserGuildRole();
    if (!userRole || !userRole.isAdmin) {
      toast({
        title: "Acesso Negado",
        description: "Você precisa ser Líder ou Vice-Líder para convidar jogadores.",
        variant: "destructive",
      });
      return;
    }

    const hideLoadingFn = showLoading("Enviando convite...");
    try {
      const token = getAuthToken();
      const response = await fetch(GUILD_INVITE_PLAYER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          player_id: selectedPlayerId,
          guild_id: guild.id,
          guild_player_admin: userRole.playerId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao convidar jogador');
      }

      toast({
        title: "Convite Enviado!",
        description: "O jogador foi convidado para a guild com sucesso.",
      });

      await queryClient.invalidateQueries({ 
        predicate: (query) => {
          const key = query.queryKey[0];
          return typeof key === 'string' && key.startsWith('/api/guild');
        }
      });

      setSelectedPlayerId(undefined);
    } catch (error) {
      console.error('Error inviting player:', error);
      toast({
        title: "Erro ao Convidar",
        description: error instanceof Error ? error.message : "Não foi possível enviar o convite.",
        variant: "destructive",
      });
    } finally {
      hideLoadingFn();
    }
  };

  const handleAcceptInvite = async (playerId: number, guildId: number) => {
    const hideLoadingFn = showLoading("Aceitando convite...");
    try {
      const token = getAuthToken();
      const response = await fetch(GUILD_ACCEPT_INVITE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          player_id: playerId,
          guild_id: guildId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao aceitar convite');
      }

      toast({
        title: "Convite Aceito!",
        description: "Você agora faz parte da guild!",
      });

      await queryClient.invalidateQueries({ 
        predicate: (query) => {
          const key = query.queryKey[0];
          return typeof key === 'string' && key.startsWith('/api/guild');
        }
      });
    } catch (error) {
      console.error('Error accepting invite:', error);
      toast({
        title: "Erro ao Aceitar Convite",
        description: error instanceof Error ? error.message : "Não foi possível aceitar o convite.",
        variant: "destructive",
      });
    } finally {
      hideLoadingFn();
    }
  };

  const isPlayerOwnedByUser = (playerId: number) => {
    if (!accountPlayers || accountPlayers.length === 0) return false;
    return accountPlayers.some(p => p.id === playerId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          <div className="flex items-center gap-4">
            <Link href="/guilds">
              <Button variant="ghost" size="sm" data-testid="button-back">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-6">
              <Card className="p-8">
                <div className="flex gap-6 mb-6">
                  <Skeleton className="w-20 h-20 rounded-xl" />
                  <div className="flex-1 space-y-4">
                    <Skeleton className="h-10 w-64" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
                <Skeleton className="h-24 w-full mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-20 w-full" />)}
                </div>
              </Card>
            </div>
          ) : guild ? (
            <>
              <Card className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center border-2 border-primary/30 overflow-hidden">
                        {guild.logo_gfx_name ? (
                          <img 
                            src={`http://localhost:8000/storage/guilds/${guild.logo_gfx_name}`} 
                            alt={guild.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Shield className="w-10 h-10 text-primary" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h1 className="text-4xl font-display font-bold mb-1" data-testid="text-guild-name">
                          {guild.name}
                        </h1>
                        <p className="text-muted-foreground">
                          Fundada em {formatDate(guild.creationdata)}
                        </p>
                      </div>
                    </div>
                    
                    {guild.motd && guild.motd !== "New guild. Leader must edit this text :)" && (
                      <div className="bg-primary/5 border border-primary/20 p-3 rounded-md mb-4">
                        <p className="text-sm font-semibold text-primary">{guild.motd}</p>
                      </div>
                    )}
                    
                    <div className="bg-muted p-4 rounded-md mb-4">
                      <h3 className="font-semibold mb-2">Descrição da Guild</h3>
                      <p className="text-sm text-muted-foreground">{guild.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground mb-1">Líder</p>
                        <p className="font-semibold" data-testid="text-leader">{getLeaderName()}</p>
                      </div>
                      <div className="p-3 bg-muted rounded-md">
                        <p className="text-xs text-muted-foreground mb-1">Vice-Líder</p>
                        <p className="font-semibold" data-testid="text-vice-leader">{getViceLeaderName()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {getTopMember() ? (
                    <div className="p-4 bg-muted rounded-md">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Membro de Maior Nível</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 flex-shrink-0">
                          <img 
                            src={`/vocations/${typeof getTopMember()!.vocation === 'number' ? 'Goku' : getTopMember()!.vocation}.gif`}
                            alt={`${getTopMember()!.vocation}`}
                            width={64}
                            height={64}
                            className="pixelated"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-lg truncate" data-testid="text-top-member-name">
                            {getTopMember()!.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Level {getTopMember()!.level}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-muted rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Membros</span>
                      </div>
                      <p className="text-2xl font-bold" data-testid="text-member-count">0</p>
                    </div>
                  )}

                  <div className="p-4 bg-muted rounded-md">
                    <div className="flex items-center gap-2 mb-1">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">Fundação</span>
                    </div>
                    <p className="text-lg font-bold">{formatDate(guild.creationdata)}</p>
                  </div>
                </div>
              </Card>

              {isAuthenticated && !isLoadingPlayers && accountPlayers && getCurrentUserGuildRole() === null && (
                <Card className="p-6">
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">Você não é membro desta guild</h3>
                    <p className="text-sm text-muted-foreground">
                      Apenas membros com cargo de Líder ou Vice-Líder podem convidar jogadores.
                    </p>
                  </div>
                </Card>
              )}

              {isAuthenticated && !isLoadingPlayers && getCurrentUserGuildRole()?.isAdmin && (
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <UserPlus className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-heading font-bold">Convidar Jogador</h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Como {getCurrentUserGuildRole()?.rankLevel === 3 ? 'Líder' : 'Vice-Líder'}, você pode convidar jogadores para entrar na guild.
                  </p>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <PlayerSearchSelect
                        value={selectedPlayerId}
                        onValueChange={setSelectedPlayerId}
                        placeholder="Selecione um jogador para convidar..."
                      />
                    </div>
                    <Button
                      onClick={handleInvitePlayer}
                      disabled={!selectedPlayerId || isLoadingPlayers}
                      data-testid="button-send-invite"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Enviar Convite
                    </Button>
                  </div>
                </Card>
              )}

              {guild.guild_invite && guild.guild_invite.length > 0 && (
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-heading font-bold">Convites Pendentes</h2>
                  </div>
                  <div className="space-y-3">
                    {guild.guild_invite.map((invite) => {
                      const invitedPlayer = invite.player[0];
                      if (!invitedPlayer) return null;
                      
                      const isMyPlayer = isAuthenticated && isPlayerOwnedByUser(invitedPlayer.id);
                      
                      return (
                        <div
                          key={invitedPlayer.id}
                          className="flex items-center gap-4 p-3 rounded-md border border-card-border"
                          data-testid={`invite-row-${invitedPlayer.id}`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-heading font-semibold" data-testid={`text-invite-player-name-${invitedPlayer.id}`}>
                                {invitedPlayer.name}
                              </span>
                              {invitedPlayer.online === 1 && (
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                              )}
                              <Badge variant="outline" className="bg-primary/10 border-primary/30">
                                Convidado
                              </Badge>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="secondary" className="font-mono">
                              Nv. {invitedPlayer.level}
                            </Badge>
                            <div className="flex flex-col items-center gap-1 flex-shrink-0">
                              <img
                                src={`/vocations/${typeof invitedPlayer.vocation === 'number' ? 'Goku' : invitedPlayer.vocation || 'Goku'}.gif`}
                                alt={`${invitedPlayer.vocation || 'Goku'}`}
                                width={32}
                                height={32}
                                className="pixelated"
                              />
                              <span className="text-xs text-muted-foreground font-medium">
                                {typeof invitedPlayer.vocation === 'string' ? invitedPlayer.vocation : 'Goku'}
                              </span>
                            </div>
                            
                            {isMyPlayer && (
                              <Button
                                onClick={() => handleAcceptInvite(invitedPlayer.id, guild.id)}
                                size="sm"
                                data-testid={`button-accept-invite-${invitedPlayer.id}`}
                              >
                                <Check className="w-4 h-4 mr-2" />
                                Aceitar Convite
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              )}

              <Card className="p-6">
                <h2 className="text-2xl font-heading font-bold mb-6">Membros da Guild</h2>
                
                {getTotalMembers() === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Esta guild ainda não tem membros</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {getAllMembers().map((member, index) => (
                      <Link
                        key={member.id}
                        href={`/player/${member.id}`}
                      >
                        <div
                          className="flex items-center gap-4 p-3 rounded-md border border-card-border hover-elevate active-elevate-2 cursor-pointer transition-all"
                          data-testid={`member-row-${member.id}`}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-heading font-semibold" data-testid={`text-member-name-${member.id}`}>
                                {member.name}
                              </span>
                              {member.online === 1 && (
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                              )}
                              {getRankBadge(member.rankLevel)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {guild.name && `[${guild.name}]`}
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="secondary" className="font-mono">
                              Nv. {member.level}
                            </Badge>
                            <div className="flex flex-col items-center gap-1 flex-shrink-0">
                              <img
                                src={`/vocations/${typeof member.vocation === 'number' ? 'Goku' : member.vocation || 'Goku'}.gif`}
                                alt={`${member.vocation || 'Goku'}`}
                                width={32}
                                height={32}
                                className="pixelated"
                                data-testid={`img-vocation-${member.id}`}
                              />
                              <span className="text-xs text-muted-foreground font-medium">
                                {typeof member.vocation === 'string' ? member.vocation : 'Goku'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </Card>
            </>
          ) : (
            <Card className="p-12">
              <div className="text-center">
                <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-heading font-bold mb-2">Guild Não Encontrada</h2>
                <p className="text-muted-foreground mb-6">
                  Não foi possível encontrar informações sobre esta guild.
                </p>
                <Link href="/guilds">
                  <Button>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar para Guilds
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
