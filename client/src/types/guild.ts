export interface Guild {
  id: number;
  name: string;
  kills: number;
  total_players: number;
  logo: string;
  description: string;
}

export interface GuildsPaginatedResponse {
  current_page: number;
  data: Guild[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface GuildMemberPlayer {
  id: number;
  name: string;
  level: number;
  maglevel: number;
  vocation: string | number;
  experience: number;
  online: number;
  status: string;
  rank_id: number;
}

export interface GuildRank {
  id: number;
  guild_id: number;
  name: string;
  level: number;
  player: GuildMemberPlayer[];
}

export interface GuildDetail {
  id: number;
  world_id: number;
  name: string;
  ownerid: number;
  creationdata: number;
  checkdata: number;
  motd: string;
  balance: number;
  description: string;
  logo_gfx_name: string;
  invited_to: number;
  invited_by: number;
  in_war_with: number;
  kills: number;
  show: number;
  war_time: number;
  castle_war: number;
  guild_rank: GuildRank[];
}
