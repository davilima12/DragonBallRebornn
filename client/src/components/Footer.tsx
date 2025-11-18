import { Users, Shield } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber } from "@/lib/formatNumber";

interface FooterProps {
  onlinePlayers?: number;
  activeGuilds?: number;
  isLoading?: boolean;
}

export default function Footer({ onlinePlayers = 0, activeGuilds = 0, isLoading = false }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <span className="text-2xl font-bold text-primary" data-testid="text-footer-online-players">
                    {formatNumber(onlinePlayers)}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">Jogadores Online</span>
              </div>
            </div>
            
            <div className="h-8 w-px bg-border"></div>
            
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <div className="flex items-center gap-2">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : (
                  <span className="text-2xl font-bold text-primary" data-testid="text-footer-active-guilds">
                    {formatNumber(activeGuilds)}
                  </span>
                )}
                <span className="text-sm text-muted-foreground">Guilds Ativas</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>© 2024 Dragon Warriors. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
