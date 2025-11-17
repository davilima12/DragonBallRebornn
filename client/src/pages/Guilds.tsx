import Navbar from "@/components/Navbar";
import GuildCard from "@/components/GuildCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { GuildsPaginatedResponse } from "@/types/guild";
import { Skeleton } from "@/components/ui/skeleton";
import { GUILDS_API_URL } from "@/lib/api";
import { useDebounce } from "@/hooks/useDebounce";

export default function Guilds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data, isLoading } = useQuery<GuildsPaginatedResponse>({
    queryKey: ['/api/guilds', currentPage, debouncedSearchTerm],
    queryFn: async () => {
      const offset = (currentPage - 1) * 10;
      const params = new URLSearchParams({
        limit: '10',
        offset: offset.toString(),
      });
      
      if (debouncedSearchTerm.trim()) {
        params.append('name', debouncedSearchTerm.trim());
      }
      
      const response = await fetch(`${GUILDS_API_URL}?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch guilds');
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.warn('API retornou HTML ao invés de JSON - backend externo pode não estar rodando');
        return { data: [], current_page: 1, total: 0, per_page: 10 };
      }
      
      return response.json();
    },
    retry: false,
  });

  const filteredGuilds = data?.data || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
              GUILDS
            </h1>
            <p className="text-muted-foreground mb-8">
              Encontre ou crie uma guild para dominar o ranking
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar guild por nome..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
              <Link href="/create-guild">
                <Button data-testid="button-create-guild">
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Guild
                </Button>
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </div>
          ) : data?.data.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Aguardando dados do servidor...</p>
              <p className="text-sm text-muted-foreground mt-2">
                Backend externo (localhost:8000) não está disponível
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuilds.map((guild, index) => (
                  <GuildCard 
                    key={guild.id} 
                    rank={(currentPage - 1) * (data?.per_page || 5) + index + 1}
                    {...guild} 
                  />
                ))}
              </div>

              {filteredGuilds.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Nenhuma guild encontrada com esse critério de busca.</p>
                </div>
              )}

              {data && data.last_page > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    data-testid="button-prev-page"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Anterior
                  </Button>
                  
                  <div className="flex items-center gap-2">
                    {[...Array(data.last_page)].map((_, i) => {
                      const page = i + 1;
                      if (
                        page === 1 ||
                        page === data.last_page ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(page)}
                            data-testid={`button-page-${page}`}
                          >
                            {page}
                          </Button>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="text-muted-foreground">...</span>;
                      }
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(data.last_page, p + 1))}
                    disabled={currentPage === data.last_page}
                    data-testid="button-next-page"
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
