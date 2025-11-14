import GuildCard from '../GuildCard';

export default function GuildCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <GuildCard rank={1} name="Z Fighters" leader="Goku Master" memberCount={50} totalPower={45000000} />
      <GuildCard rank={2} name="Dragon Force" leader="Vegeta Pro" memberCount={48} totalPower={42000000} />
      <GuildCard rank={3} name="Gods Army" leader="Divine Warrior" memberCount={45} totalPower={39000000} />
    </div>
  );
}
