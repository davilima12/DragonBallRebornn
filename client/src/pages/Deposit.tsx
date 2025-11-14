import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CreditCard, Smartphone } from "lucide-react";

export default function Deposit() {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("pix");

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Deposit request:", { amount, paymentMethod });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display font-bold text-primary mb-2">Depositar</h1>
              <p className="text-muted-foreground">Adicione saldo à sua conta</p>
            </div>

            <form onSubmit={handleDeposit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Valor (R$)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="50.00"
                  min="10"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  data-testid="input-amount"
                  required
                  className="text-xl font-mono"
                />
                <p className="text-sm text-muted-foreground">Valor mínimo: R$ 10,00</p>
              </div>

              <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="pix" data-testid="tab-pix">
                    <Smartphone className="w-4 h-4 mr-2" />
                    PIX
                  </TabsTrigger>
                  <TabsTrigger value="card" data-testid="tab-card">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Cartão
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="pix" className="space-y-4 mt-6">
                  <div className="p-4 bg-muted rounded-md">
                    <p className="text-sm text-muted-foreground mb-2">Como funciona:</p>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>Digite o valor que deseja depositar</li>
                      <li>Clique em "Gerar QR Code PIX"</li>
                      <li>Escaneie o código com seu aplicativo do banco</li>
                      <li>Confirme o pagamento</li>
                      <li>Seu saldo será adicionado automaticamente</li>
                    </ol>
                  </div>
                </TabsContent>

                <TabsContent value="card" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        data-testid="input-card-number"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Validade</Label>
                        <Input
                          id="expiry"
                          type="text"
                          placeholder="MM/AA"
                          data-testid="input-expiry"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          data-testid="input-cvv"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="p-4 bg-primary/10 rounded-md border border-primary/30">
                <div className="flex justify-between text-sm mb-2">
                  <span>Valor do depósito:</span>
                  <span className="font-mono">R$ {parseFloat(amount || "0").toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total a pagar:</span>
                  <span className="text-primary font-mono" data-testid="text-total">
                    R$ {parseFloat(amount || "0").toFixed(2)}
                  </span>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" data-testid="button-submit">
                {paymentMethod === "pix" ? "Gerar QR Code PIX" : "Processar Pagamento"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
