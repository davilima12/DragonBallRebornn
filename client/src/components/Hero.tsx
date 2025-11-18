interface HeroProps {
  onlinePlayers?: number;
  totalAccounts?: number;
  activeGuilds?: number;
}

export default function Hero({ onlinePlayers = 0, totalAccounts = 0, activeGuilds = 0 }: HeroProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-primary mb-1" data-testid="text-hero-online-players">
              {onlinePlayers}
            </div>
            <div className="text-sm text-muted-foreground">Jogadores Online</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-primary mb-1" data-testid="text-hero-total-accounts">
              {formatNumber(totalAccounts)}
            </div>
            <div className="text-sm text-muted-foreground">Contas Ativas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-primary mb-1" data-testid="text-hero-active-guilds">
              {activeGuilds}
            </div>
            <div className="text-sm text-muted-foreground">Guilds Ativas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-display font-bold text-primary mb-1" data-testid="text-hero-server-uptime">
              24/7
            </div>
            <div className="text-sm text-muted-foreground">Servidor Online</div>
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-foreground">
          <span className="bg-gradient-to-r from-primary via-yellow-500 to-primary bg-clip-text text-transparent">
            DRAGON WARRIORS
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-foreground/80 font-heading max-w-2xl mx-auto">
          Entre no mundo épico de lutas, domine o ranking e torne-se o guerreiro mais poderoso!
        </p>
      </div>
    </div>
  );
}
