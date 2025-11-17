// API configuration
const isReplit = import.meta.env.VITE_REPLIT === 'true' || window.location.hostname.includes('replit');

export const API_BASE_URL = isReplit ? '' : 'http://localhost:8000';

export const GUILDS_API_URL = `${API_BASE_URL}/api/guilds`;
