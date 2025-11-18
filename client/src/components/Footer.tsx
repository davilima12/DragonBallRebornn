import { Users, Shield } from "lucide-react";

interface FooterProps {
  onlinePlayers?: number;
  activeGuilds?: number;
}

export default function Footer({ onlinePlayers = 0, activeGuilds = 0 }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <span className="text-2xl font-bold text-primary" data-testid="text-footer-online-players">
                  {onlinePlayers}
                </span>
                <span className="text-sm text-muted-foreground ml-2">Jogadores Online</span>
              </div>
            </div>
            
            <div className="h-8 w-px bg-border"></div>
            
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <div>
                <span className="text-2xl font-bold text-primary" data-testid="text-footer-active-guilds">
                  {activeGuilds}
                </span>
                <span className="text-sm text-muted-foreground ml-2">Guilds Ativas</span>
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
