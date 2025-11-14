import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Início", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Depositar", path: "/deposit" },
    { label: "Vender Pontos", path: "/sell-points" },
    { label: "Ranking", path: "/ranking" },
    { label: "Guilds", path: "/guilds" },
    { label: "Discord", path: "https://discord.gg/dragonwarriors", external: true },
    { label: "Suporte", path: "/support" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate rounded-md px-2 py-1">
            <div className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
              DRAGON WARRIORS
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.label}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  data-testid={`link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ) : (
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
              )
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-2">
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
              item.external ? (
                <a
                  key={item.label}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-base font-medium text-foreground/80 hover:text-primary hover-elevate rounded-md"
                  data-testid={`mobile-link-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </a>
              ) : (
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
              )
            ))}
            <div className="flex gap-2 pt-2 border-t border-border mt-2">
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
          </div>
        </div>
      )}
    </nav>
  );
}
