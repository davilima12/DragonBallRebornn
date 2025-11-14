import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingDown, AlertCircle } from "lucide-react";

export default function SellPoints() {
  const [points, setPoints] = useState("");
  const availablePoints = 15450;
  const conversionRate = 0.01;

  const calculateValue = () => {
    const pointsNum = parseFloat(points || "0");
    return (pointsNum * conversionRate).toFixed(2);
  };

  const handleSell = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sell points request:", { points, value: calculateValue() });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display font-bold text-primary mb-2">Vender Pontos</h1>
              <p className="text-muted-foreground">Converta seus pontos em dinheiro</p>
            </div>

            <div className="mb-6 p-4 bg-muted rounded-md flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-primary" />
                <span className="text-sm">Pontos Disponíveis:</span>
              </div>
              <Badge className="text-lg font-mono px-4 py-1" data-testid="badge-available-points">
                {availablePoints.toLocaleString()}
              </Badge>
            </div>

            <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-md flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-semibold mb-1">Taxa de conversão atual:</p>
                <p className="text-muted-foreground">
                  1 ponto = R$ {conversionRate.toFixed(2)} • Mínimo de 100 pontos
                </p>
              </div>
            </div>

            <form onSubmit={handleSell} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="points">Quantidade de Pontos</Label>
                <div className="relative">
                  <Input
                    id="points"
                    type="number"
                    placeholder="1000"
                    min="100"
                    max={availablePoints}
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    data-testid="input-points"
                    required
                    className="text-xl font-mono pr-20"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setPoints(availablePoints.toString())}
                    data-testid="button-max"
                  >
                    Máximo
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Você possui {availablePoints.toLocaleString()} pontos disponíveis
                </p>
              </div>

              <div className="p-6 bg-card border border-card-border rounded-md space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pontos a vender:</span>
                  <span className="font-mono font-semibold">{parseFloat(points || "0").toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxa de conversão:</span>
                  <span className="font-mono">R$ {conversionRate.toFixed(2)}/ponto</span>
                </div>
                <div className="pt-3 border-t border-border flex justify-between items-center">
                  <span className="font-semibold">Você receberá:</span>
                  <div className="flex items-center gap-2">
                    <TrendingDown className="w-5 h-5 text-status-online" />
                    <span className="text-2xl font-bold text-status-online font-mono" data-testid="text-total">
                      R$ {calculateValue()}
                    </span>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg" 
                disabled={!points || parseFloat(points) < 100 || parseFloat(points) > availablePoints}
                data-testid="button-submit"
              >
                Confirmar Venda
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
