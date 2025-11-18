
export const API_BASE_URL =  'http://localhost:8000';

export const GUILDS_API_URL = `${API_BASE_URL}/api/guilds`;
export const PLAYERS_API_URL = `${API_BASE_URL}/api/players`;
export const PLAYER_DETAIL_API_URL = (id: string | number) => `${API_BASE_URL}/api/player/${id}`;
export const GUILD_DETAIL_API_URL = (id: string | number) => `${API_BASE_URL}/api/guild/${id}`;
