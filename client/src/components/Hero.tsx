import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import heroBackground from "@assets/generated_images/Hero_background_energy_aura_84c5d6ca.png";

export default function Hero() {
  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center space-y-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black text-foreground">
          <span className="bg-gradient-to-r from-primary via-yellow-500 to-primary bg-clip-text text-transparent">
            DRAGON WARRIORS
          </span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-foreground/80 font-heading max-w-2xl mx-auto">
          Entre no mundo épico de lutas, domine o ranking e torne-se o guerreiro mais poderoso!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register">
            <Button size="lg" variant="default" className="text-lg px-8 py-6" data-testid="button-start-playing">
              Começar a Jogar
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-background/20 backdrop-blur-sm" data-testid="button-download">
            Baixar o Jogo
          </Button>
        </div>
      </div>
    </div>
  );
}
