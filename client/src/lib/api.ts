
export const API_BASE_URL =  '';

export const GUILDS_API_URL = `${API_BASE_URL}/api/guilds`;
export const PLAYERS_API_URL = `${API_BASE_URL}/api/players`;
export const PLAYER_DETAIL_API_URL = (id: string | number) => `${API_BASE_URL}/api/player/${id}`;
export const GUILD_DETAIL_API_URL = (id: string | number) => `${API_BASE_URL}/api/guild/${id}`;
export const VOCATIONS_API_URL = `${API_BASE_URL}/api/vocations`;
export const ACCOUNT_API_URL = `${API_BASE_URL}/api/account`;
export const ACCOUNT_PLAYERS_API_URL = `${API_BASE_URL}/api/account/players`;
export const CREATE_PLAYER_API_URL = `${API_BASE_URL}/api/player`;
export const DELETE_PLAYER_API_URL = (id: string | number) => `${API_BASE_URL}/api/player/${id}`;
export const CREATE_GUILD_API_URL = `${API_BASE_URL}/api/guild`;
export const GUILD_INVITE_PLAYER_API_URL = `${API_BASE_URL}/api/guild/join-player`;
export const LOGIN_API_URL = `${API_BASE_URL}/api/login`;
export const VALIDATE_TOKEN_API_URL = `${API_BASE_URL}/api/account/validate-auth-token`;
export const LOGOUT_API_URL = `${API_BASE_URL}/api/account/logout`;
