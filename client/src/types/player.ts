export interface Player {
  id: number;
  name: string;
  level: number;
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
