export interface Player {
  id: number;
  name: string;
  level: number;
  maglevel: number;
  vocation: string | number;
  health: number;
  healthmax: number;
  experience: number;
  status: string;
  rank: number;
  guild: {
    id: number;
    name: string;
  } | null;
}

export interface PlayersPaginatedResponse {
  current_page: number;
  data: Player[];
  first_page_url?: string;
  from?: number;
  last_page: number;
  last_page_url?: string;
  next_page_url?: string | null;
  path?: string;
  per_page: number;
  prev_page_url?: string | null;
  to?: number;
  total: number;
}

export interface PlayerSkill {
  player_id: number;
  skillid: number;
  value: number;
  count: number;
}

export interface PlayerDeath {
  id: number;
  player_id: number;
  date: number;
  level: number;
  killer: {
    id: number;
    death_id: number;
    final_hit: number;
    unjustified: number;
    war: number;
    player_killers: Array<{
      kill_id: number;
      player_id: number;
      players: Array<{
        name: string;
        id: number;
      }>;
    }>;
    environment_killer: Array<{
      kill_id: number;
      name: string;
    }>;
  };
}

export interface PlayerDetailGuild {
  id: number;
  world_id: number;
  name: string;
  ownerid: number;
  creationdata: number;
  motd: string;
  balance: number;
  description: string;
  logo_gfx_name: string;
}

export interface PlayerDetail {
  id: number;
  name: string;
  level: number;
  maglevel: number;
  vocation: string | number;
  health: number;
  healthmax: number;
  mana: number;
  manamax: number;
  experience: number;
  soul: number;
  cap: number;
  stamina: number;
  online: number;
  lastlogin: number;
  lastlogout: number;
  guild: PlayerDetailGuild | null;
  player_skills: PlayerSkill[];
  player_death: PlayerDeath[];
}
