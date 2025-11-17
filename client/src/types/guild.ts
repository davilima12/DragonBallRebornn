export interface Guild {
  id: number;
  name: string;
  kills: number;
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
