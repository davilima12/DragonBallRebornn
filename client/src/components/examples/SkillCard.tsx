import SkillCard from '../SkillCard';

export default function SkillCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <SkillCard
        name="Kamehameha"
        level={10}
        maxLevel={10}
        description="Poderosa onda de energia concentrada"
        type="attack"
      />
      <SkillCard
        name="Escudo Energético"
        level={7}
        maxLevel={10}
        description="Cria uma barreira protetora de energia"
        type="defense"
      />
      <SkillCard
        name="Cura Celestial"
        level={5}
        maxLevel={10}
        description="Restaura a vida dos aliados próximos"
        type="support"
      />
      <SkillCard
        name="Golpe Final"
        level={8}
        maxLevel={10}
        description="Ataque devastador com todo o poder"
        type="attack"
      />
    </div>
  );
}
