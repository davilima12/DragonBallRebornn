import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PLAYERS_API_URL } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface Player {
  id: number;
  name: string;
  level: number;
  vocation: string;
}

interface PlayerSearchSelectProps {
  value?: number;
  onValueChange: (playerId: number) => void;
  placeholder?: string;
}

export function PlayerSearchSelect({ value, onValueChange, placeholder = "Buscar jogador..." }: PlayerSearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [hasShownError, setHasShownError] = useState(false);

  const { data, isLoading, isError, error } = useQuery<{ data: Player[] }>({
    queryKey: ['/api/players', searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('limit', '100');
      if (searchQuery) {
        params.append('name', searchQuery);
      }
      
      const response = await fetch(`${PLAYERS_API_URL}?${params}`);
      if (!response.ok) throw new Error('Failed to fetch players');
      
      return response.json();
    },
    enabled: open,
    staleTime: 30000,
    retry: 1,
  });

  if (isError && !hasShownError && open) {
    setHasShownError(true);
    toast({
      title: "Erro ao Buscar Jogadores",
      description: "Não foi possível carregar a lista de jogadores. Tente novamente.",
      variant: "destructive",
    });
  }

  if (!open && hasShownError) {
    setHasShownError(false);
  }

  const players = data?.data || [];
  const selectedPlayer = players.find((p) => p.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          data-testid="button-player-search"
        >
          {selectedPlayer ? (
            <span className="flex items-center gap-2">
              <span className="font-semibold">{selectedPlayer.name}</span>
              <span className="text-xs text-muted-foreground">Nv. {selectedPlayer.level}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Filtrar por nome..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
            data-testid="input-player-search"
          />
          <CommandList>
            <CommandEmpty>
              {isLoading ? "Carregando..." : "Nenhum jogador encontrado."}
            </CommandEmpty>
            <CommandGroup>
              {players.map((player) => (
                <CommandItem
                  key={player.id}
                  value={player.name}
                  onSelect={() => {
                    onValueChange(player.id);
                    setOpen(false);
                  }}
                  data-testid={`option-player-${player.id}`}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === player.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="font-semibold">{player.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Nv. {player.level}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {player.vocation}
                      </span>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
