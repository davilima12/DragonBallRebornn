import PlayerLeaderboard from '../PlayerLeaderboard';

export default function PlayerLeaderboardExample() {
  const mockPlayers = [
    { rank: 1, name: "SuperSaiyan99", level: 150, power: 999999, guild: "Z Fighters" },
    { rank: 2, name: "KameHameHa", level: 145, power: 887654, guild: "Dragon Force" },
    { rank: 3, name: "UltraInstinct", level: 142, power: 776543, guild: "Gods Army" },
    { rank: 4, name: "FusionWarrior", level: 138, power: 665432 },
    { rank: 5, name: "EnergyBlast", level: 135, power: 554321, guild: "Elite Squad" },
    { rank: 6, name: "PowerUpKing", level: 132, power: 443210 },
    { rank: 7, name: "MysticWarrior", level: 128, power: 332109, guild: "Shadow Clan" },
    { rank: 8, name: "ThunderStrike", level: 125, power: 221098 },
    { rank: 9, name: "PhoenixRise", level: 122, power: 110987, guild: "Phoenix Squad" },
    { rank: 10, name: "DragonFist", level: 120, power: 99876 },
  ];

  return (
    <div className="p-8">
      <PlayerLeaderboard players={mockPlayers} />
    </div>
  );
}
