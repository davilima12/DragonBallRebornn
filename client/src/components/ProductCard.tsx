import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  onPurchase?: (id: string) => void;
}

export default function ProductCard({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  category,
  featured = false,
  onPurchase 
}: ProductCardProps) {
  return (
    <Card className={`overflow-hidden hover-elevate hover:scale-105 transition-all duration-200 ${featured ? 'border-primary/50' : ''}`} data-testid={`product-card-${id}`}>
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-yellow-500/20 flex items-center justify-center">
        <img src={image} alt={name} className="w-32 h-32 object-contain" />
        {featured && (
          <Badge className="absolute top-2 right-2 bg-primary" data-testid="badge-featured">
            Destaque
          </Badge>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <Badge variant="secondary" className="text-xs mb-2">
            {category}
          </Badge>
          <h3 className="font-heading font-bold text-lg" data-testid={`text-product-name-${id}`}>
            {name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-card-border">
          <div className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
            R$ {price.toFixed(2)}
          </div>
          <Button 
            size="sm" 
            onClick={() => onPurchase?.(id)}
            data-testid={`button-buy-${id}`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Comprar
          </Button>
        </div>
      </div>
    </Card>
  );
}
