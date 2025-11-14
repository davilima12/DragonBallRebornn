import QuickActionCard from '../QuickActionCard';
import { UserPlus, ShoppingBag, Trophy, MessageCircle, Download } from 'lucide-react';

export default function QuickActionCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <QuickActionCard
        title="Criar Conta"
        description="Cadastre-se e comece a jogar"
        icon={UserPlus}
        href="/register"
      />
      <QuickActionCard
        title="Shop"
        description="Compre itens e VIP"
        icon={ShoppingBag}
        href="/shop"
      />
      <QuickActionCard
        title="Ranking"
        description="Veja os melhores jogadores"
        icon={Trophy}
        href="/ranking"
      />
      <QuickActionCard
        title="Discord"
        description="Junte-se à comunidade"
        icon={MessageCircle}
        href="/support"
      />
      <QuickActionCard
        title="Baixar"
        description="Download do jogo"
        icon={Download}
        href="/"
      />
    </div>
  );
}
