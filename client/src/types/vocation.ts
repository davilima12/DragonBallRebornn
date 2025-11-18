export interface Vocation {
  id: number;
  name: string;
  description?: string;
}

export interface VocationWithUrl extends Vocation {
  url: string;
}
