import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset request for:", email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">Recuperar Senha</h1>
            <p className="text-muted-foreground">
              {submitted 
                ? "Instruções enviadas para seu email" 
                : "Digite seu email para receber instruções"}
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-email"
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg" data-testid="button-submit">
                Enviar Instruções
              </Button>

              <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-back-to-login">
                <ArrowLeft className="w-4 h-4" />
                Voltar para o login
              </Link>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="p-4 bg-status-online/10 border border-status-online/30 rounded-md text-center">
                <p className="text-sm">
                  Se existe uma conta com este email, você receberá as instruções em breve.
                </p>
              </div>

              <Link href="/login" className="block">
                <Button variant="outline" className="w-full" size="lg" data-testid="button-back-to-login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para o login
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
