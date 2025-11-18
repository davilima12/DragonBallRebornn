import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { LOGIN_API_URL, VALIDATE_TOKEN_API_URL } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  points: number;
  isVip: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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
          setUser(null);
          setIsLoading(false);
          return;
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Token validation error:', error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
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

      toast({
        title: "Bem-vindo!",
        description: `Olá, ${userData.username || 'Guerreiro'}!`,
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    toast({
      title: "Até logo!",
      description: "Você saiu da sua conta.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
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
