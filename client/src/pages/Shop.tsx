import { useState } from "react";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import energySphere from "@assets/generated_images/Energy_sphere_product_icon_ef77582b.png";
import vipCrown from "@assets/generated_images/VIP_crown_badge_381df785.png";
import crystal from "@assets/generated_images/Crystal_item_icon_3a1ef924.png";

export default function Shop() {
  const [category, setCategory] = useState("all");

  const products = [
    { id: "vip-30", name: "VIP 30 Dias", description: "Benefícios exclusivos VIP por 30 dias completos", price: 29.90, image: vipCrown, category: "VIP", featured: true },
    { id: "points-1000", name: "1000 Pontos", description: "Pacote básico de pontos para começar suas compras", price: 10.00, image: energySphere, category: "Pontos" },
    { id: "points-5000", name: "5000 Pontos", description: "Pacote médio de pontos com bônus de 10%", price: 45.00, image: energySphere, category: "Pontos" },
    { id: "points-10000", name: "10000 Pontos", description: "Pacote grande com bônus de 20%", price: 80.00, image: energySphere, category: "Pontos", featured: true },
    { id: "vip-90", name: "VIP 90 Dias", description: "3 meses de VIP com desconto especial", price: 79.90, image: vipCrown, category: "VIP" },
    { id: "crystal-rare", name: "Cristal Raro", description: "Item especial que aumenta seu poder em 50%", price: 49.90, image: crystal, category: "Itens" },
    { id: "crystal-epic", name: "Cristal Épico", description: "Item lendário que dobra seu poder", price: 99.90, image: crystal, category: "Itens", featured: true },
    { id: "vip-365", name: "VIP 1 Ano", description: "Assinatura anual VIP com máximo desconto", price: 249.90, image: vipCrown, category: "VIP" },
  ];

  const filteredProducts = category === "all" 
    ? products 
    : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  const handlePurchase = (id: string) => {
    console.log("Purchase triggered for:", id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold mb-4 text-center bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
              SHOP
            </h1>
            <p className="text-center text-muted-foreground mb-8">
              Compre pontos, VIP e itens especiais para melhorar sua experiência
            </p>

            <Tabs value={category} onValueChange={setCategory} className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
                <TabsTrigger value="all" data-testid="tab-all">Todos</TabsTrigger>
                <TabsTrigger value="pontos" data-testid="tab-points">Pontos</TabsTrigger>
                <TabsTrigger value="vip" data-testid="tab-vip">VIP</TabsTrigger>
                <TabsTrigger value="itens" data-testid="tab-items">Itens</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} onPurchase={handlePurchase} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
