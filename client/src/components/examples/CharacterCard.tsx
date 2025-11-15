import CharacterCard from '../CharacterCard';

export default function CharacterCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CharacterCard
        id="char1"
        name="SuperWarrior"
        level={150}
        power={999999}
        classType="Guerreiro Sayajin"
        guild="Z Fighters"
        isOnline={true}
      />
      <CharacterCard
        id="char2"
        name="MysticMage"
        level={135}
        power={654321}
        classType="Mago Místico"
        guild="Dragon Force"
        isOnline={false}
      />
      <CharacterCard
        id="char3"
        name="ShadowNinja"
        level={142}
        power={777888}
        classType="Ninja das Sombras"
        isOnline={true}
      />
    </div>
  );
}
