import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, ChevronDown, User, LogOut, Settings, Coins, Users as UsersIcon, Sun, Moon } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, account, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Ranking", path: "/ranking" },
    { label: "Guilds", path: "/guilds" },
    { label: "Downloads", path: "/downloads" },
    { label: "Suporte", path: "/support" },
  ];

  const shopMenuItems = [
    { label: "Shop", path: "/shop" },
    { label: "Depositar", path: "/deposit" },
    { label: "Vender Pontos", path: "/sell-points" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1">
              <div className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
                DRAGON WARRIORS
              </div>
            </Link>
            <a 
              href="https://discord.gg/dragonwarriors"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md hover-elevate transition-colors"
              data-testid="link-discord"
              title="Junte-se ao nosso Discord"
            >
              <SiDiscord className="w-6 h-6 text-[#5865F2]" />
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  location === item.path
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                    shopMenuItems.some(item => location === item.path)
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                  data-testid="dropdown-loja"
                >
                  Loja
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {shopMenuItems.map((item) => (
                  <DropdownMenuItem key={item.label} asChild>
                    <Link href={item.path} className="cursor-pointer" data-testid={`dropdown-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}>
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-md"
              data-testid="button-theme-toggle"
              title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2" data-testid="button-account">
                    <Avatar className="w-6 h-6 border border-primary">
                      <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                        {user?.username?.substring(0, 2).toUpperCase() || "DW"}
                      </AvatarFallback>
                    </Avatar>
                    <span>Minha Conta</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-semibold">{user?.username}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Coins className="w-4 h-4 text-primary" />
                        <span>Pontos</span>
                      </div>
                      <Badge variant="secondary" className="font-mono">
                        {(account?.premium_points ?? 0).toLocaleString()}
                      </Badge>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="w-full cursor-pointer" data-testid="menu-dashboard">
                      <User className="w-4 h-4 mr-2" />
                      Minha Conta
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/account-settings" className="w-full cursor-pointer" data-testid="menu-settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive" data-testid="menu-logout">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" data-testid="button-login">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="default" size="sm" data-testid="button-register">
                    Cadastrar
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                className={`block px-3 py-2 text-base font-medium rounded-md hover-elevate ${
                  location === item.path
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80"
                }`}
                onClick={() => setMobileMenuOpen(false)}
                data-testid={`mobile-link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            ))}
            
            <div className="pt-2 border-t border-border">
              <div className="px-3 py-2 text-sm font-semibold text-muted-foreground">Loja</div>
              {shopMenuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`block px-3 py-2 text-base font-medium rounded-md hover-elevate ${
                    location === item.path
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            <div className="space-y-2 pt-2 border-t border-border mt-2">
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="w-full justify-start"
                data-testid="mobile-button-theme-toggle"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="w-4 h-4 mr-2" />
                    Modo Claro
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 mr-2" />
                    Modo Escuro
                  </>
                )}
              </Button>

              {isAuthenticated ? (
                <>
                  <div className="p-3 bg-muted rounded-md">
                    <p className="text-sm font-semibold mb-1">{account?.nickname || user?.username}</p>
                    <div className="flex items-center gap-2">
                      <Coins className="w-4 h-4 text-primary" />
                      <Badge variant="secondary" className="font-mono">
                        {(account?.premium_points ?? 0).toLocaleString()} pontos
                      </Badge>
                    </div>
                  </div>
                  <Link href="/dashboard" className="block">
                    <Button variant="ghost" className="w-full justify-start" data-testid="mobile-menu-dashboard">
                      <User className="w-4 h-4 mr-2" />
                      Minha Conta
                    </Button>
                  </Link>
                  <Link href="/account-settings" className="block">
                    <Button variant="ghost" className="w-full justify-start" data-testid="mobile-menu-settings">
                      <Settings className="w-4 h-4 mr-2" />
                      Configurações
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-destructive hover:text-destructive"
                    onClick={handleLogout}
                    data-testid="mobile-menu-logout"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Button>
                </>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login" className="flex-1">
                    <Button variant="ghost" className="w-full" data-testid="mobile-button-login">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1">
                    <Button variant="default" className="w-full" data-testid="mobile-button-register">
                      Cadastrar
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
