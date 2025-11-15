import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Monitor, Smartphone, Gamepad2 } from "lucide-react";

export default function Downloads() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Downloads
            </h1>
            <p className="text-muted-foreground text-lg">
              Escolha sua plataforma e comece a jogar Dragon Warriors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cliente Old */}
            <Card className="hover-elevate active-elevate-2">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-4">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Cliente Old</CardTitle>
                <CardDescription>
                  Versão clássica para Windows com suporte a sistemas antigos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Windows 7 ou superior</li>
                  <li>✓ Interface clássica</li>
                  <li>✓ Menor consumo de recursos</li>
                  <li>✓ Compatível com PCs antigos</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  data-testid="button-download-old"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Cliente Old
                </Button>
              </CardFooter>
            </Card>

            {/* Cliente OTC */}
            <Card className="hover-elevate active-elevate-2 border-2 border-primary">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-4">
                  <Gamepad2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="flex items-center gap-2">
                  Cliente OTC
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    Recomendado
                  </span>
                </CardTitle>
                <CardDescription>
                  Versão moderna otimizada com melhor desempenho
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Windows 10 ou superior</li>
                  <li>✓ Gráficos melhorados</li>
                  <li>✓ Melhor performance</li>
                  <li>✓ Atualizações automáticas</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  data-testid="button-download-otc"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Cliente OTC
                </Button>
              </CardFooter>
            </Card>

            {/* Mobile */}
            <Card className="hover-elevate active-elevate-2">
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center mb-4">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <CardTitle>Mobile</CardTitle>
                <CardDescription>
                  Jogue Dragon Warriors no seu celular ou tablet
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ Android 8.0 ou superior</li>
                  <li>✓ iOS 13 ou superior</li>
                  <li>✓ Controles touch otimizados</li>
                  <li>✓ Jogue em qualquer lugar</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  data-testid="button-download-mobile"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Mobile
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Requisitos do Sistema */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle>Requisitos do Sistema</CardTitle>
              <CardDescription>
                Requisitos mínimos e recomendados para jogar Dragon Warriors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Requisitos Mínimos</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Sistema:</strong> Windows 7 / macOS 10.12</li>
                    <li><strong>Processador:</strong> Intel Core i3 / AMD equivalent</li>
                    <li><strong>Memória:</strong> 4 GB RAM</li>
                    <li><strong>Gráficos:</strong> Intel HD Graphics 4000</li>
                    <li><strong>Armazenamento:</strong> 2 GB disponível</li>
                    <li><strong>Internet:</strong> Conexão de banda larga</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Requisitos Recomendados</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><strong>Sistema:</strong> Windows 10 / macOS 10.15</li>
                    <li><strong>Processador:</strong> Intel Core i5 / AMD Ryzen 5</li>
                    <li><strong>Memória:</strong> 8 GB RAM</li>
                    <li><strong>Gráficos:</strong> NVIDIA GTX 1050 / AMD RX 560</li>
                    <li><strong>Armazenamento:</strong> 4 GB disponível (SSD)</li>
                    <li><strong>Internet:</strong> Conexão de banda larga estável</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ajuda */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              Problemas com o download ou instalação?
            </p>
            <Button variant="outline" data-testid="button-support">
              Ir para Suporte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
