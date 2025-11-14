import ProductCard from '../ProductCard';
import energySphere from '@assets/generated_images/Energy_sphere_product_icon_ef77582b.png';
import vipCrown from '@assets/generated_images/VIP_crown_badge_381df785.png';
import crystal from '@assets/generated_images/Crystal_item_icon_3a1ef924.png';

export default function ProductCardExample() {
  const handlePurchase = (id: string) => {
    console.log('Purchase triggered for product:', id);
  };

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        id="points-1000"
        name="1000 Pontos"
        description="Pacote básico de pontos para começar suas compras no jogo"
        price={10.00}
        image={energySphere}
        category="Pontos"
        onPurchase={handlePurchase}
      />
      <ProductCard
        id="vip-30days"
        name="VIP 30 Dias"
        description="Benefícios exclusivos VIP por 30 dias completos"
        price={29.90}
        image={vipCrown}
        category="VIP"
        featured={true}
        onPurchase={handlePurchase}
      />
      <ProductCard
        id="crystal-rare"
        name="Cristal Raro"
        description="Item especial que aumenta seu poder em 50%"
        price={49.90}
        image={crystal}
        category="Itens"
        onPurchase={handlePurchase}
      />
    </div>
  );
}
