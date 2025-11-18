import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LOGIN_API_URL, VALIDATE_TOKEN_API_URL, ACCOUNT_API_URL, LOGOUT_API_URL } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Account } from "@/types/account";
import { queryClient } from "@/lib/queryClient";

interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  isVip: boolean;
}

interface AuthContextType {
  user: User | null;
  account: Account | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAccountData = async (token: string) => {
    try {
      const response = await fetch(ACCOUNT_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch account data');
        return null;
      }

      const accountData = await response.json();
      return accountData;
    } catch (error) {
      console.error('Error fetching account data:', error);
      return null;
    }
  };

  const refreshAccount = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const accountData = await fetchAccountData(token);
    if (accountData) {
      setAccount(accountData);
      localStorage.setItem("account", JSON.stringify(accountData));
    }
  };

  useEffect(() => {
    async function validateToken() {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(VALIDATE_TOKEN_API_URL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("user");
          localStorage.removeItem("account");
          setUser(null);
          setAccount(null);
          setIsLoading(false);
          return;
        }

        const userData = await response.json();
        setUser(userData);

        const accountData = await fetchAccountData(token);
        if (accountData) {
          setAccount(accountData);
          localStorage.setItem("account", JSON.stringify(accountData));
        }
      } catch (error) {
        console.error('Token validation error:', error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        localStorage.removeItem("account");
        setUser(null);
        setAccount(null);
      } finally {
        setIsLoading(false);
      }
    }

    validateToken();
  }, []);

  const login = async (loginInput: string, password: string) => {
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: loginInput,
          password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Erro ao fazer login');
      }

      const data = await response.json();
      
      if (!data.token) {
        throw new Error('Token não recebido do servidor');
      }

      localStorage.setItem("authToken", data.token);

      const validateResponse = await fetch(VALIDATE_TOKEN_API_URL, {
        headers: {
          'Authorization': `Bearer ${data.token}`
        }
      });

      if (!validateResponse.ok) {
        throw new Error('Erro ao validar token');
      }

      const userData = await validateResponse.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      const accountData = await fetchAccountData(data.token);
      if (accountData) {
        setAccount(accountData);
        localStorage.setItem("account", JSON.stringify(accountData));
      }

      toast({
        title: "Bem-vindo!",
        description: `Olá, ${accountData?.nickname || userData.username || 'Guerreiro'}!`,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro ao fazer login",
        description: error instanceof Error ? error.message : "Verifique suas credenciais e tente novamente.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("authToken");
    
    try {
      if (token) {
        await fetch(LOGOUT_API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      setUser(null);
      setAccount(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("account");
      
      queryClient.removeQueries({ 
        predicate: (query) => {
          const key = query.queryKey[0];
          return typeof key === 'string' && (
            key.includes('/api/account') || 
            key.includes('/api/player')
          );
        }
      });
      
      toast({
        title: "Até logo!",
        description: "Você saiu da sua conta.",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, account, isAuthenticated: !!user, isLoading, login, logout, refreshAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function getAuthToken(): string | null {
  return localStorage.getItem("authToken");
}
