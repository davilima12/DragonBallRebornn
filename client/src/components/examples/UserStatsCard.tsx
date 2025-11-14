import UserStatsCard from '../UserStatsCard';
import { Coins, Crown, ShoppingBag } from 'lucide-react';

export default function UserStatsCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <UserStatsCard
        title="Saldo de Pontos"
        value="15,450"
        icon={Coins}
        description="Pontos disponíveis"
        highlight={true}
      />
      <UserStatsCard
        title="Status VIP"
        value="Ativo"
        icon={Crown}
        description="Válido até 15/12/2025"
      />
      <UserStatsCard
        title="Compras Totais"
        value="R$ 349,70"
        icon={ShoppingBag}
        description="Últimos 30 dias"
      />
    </div>
  );
}
