import DeathLogItem from '../DeathLogItem';

export default function DeathLogItemExample() {
  return (
    <div className="p-8 space-y-3">
      <DeathLogItem
        id="death1"
        killedBy="DarkLord666"
        location="Caverna das Trevas"
        date="14/11/2025 às 15:30"
        level={148}
      />
      <DeathLogItem
        id="death2"
        killedBy="MegaBoss"
        location="Torre do Infinito - Andar 50"
        date="13/11/2025 às 20:15"
        level={147}
      />
      <DeathLogItem
        id="death3"
        killedBy="PvPMaster"
        location="Arena de Batalha"
        date="12/11/2025 às 18:45"
        level={145}
      />
    </div>
  );
}
