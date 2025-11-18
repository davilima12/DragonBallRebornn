import { useQuery } from "@tanstack/react-query";
import { ACCOUNT_PLAYERS_API_URL } from "@/lib/api";
import { Player } from "@/types/account";
import { getAuthToken } from "@/contexts/AuthContext";

export function useAccountPlayers() {
  return useQuery<Player[]>({
    queryKey: ['/api/account/players'],
    queryFn: async () => {
      const token = getAuthToken();
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(ACCOUNT_PLAYERS_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch account players');
      }

      return response.json();
    },
    enabled: !!getAuthToken(),
  });
}
