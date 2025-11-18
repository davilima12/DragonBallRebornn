import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const joinPlayerSchema = z.object({
  player_id: z.number(),
  guild_id: z.number(),
  guild_player_admin: z.number(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Guild invite player endpoint
  app.post('/api/guild/join-player', async (req: Request, res: Response) => {
    try {
      const validation = joinPlayerSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({ 
          message: 'Invalid request body',
          errors: validation.error.errors 
        });
      }

      const { player_id, guild_id, guild_player_admin } = validation.data;

      // Proxy request to external game server
      const externalApiUrl = process.env.EXTERNAL_API_URL || 'http://localhost:8000';
      const response = await fetch(`${externalApiUrl}/api/guild/join-player`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          player_id,
          guild_id,
          guild_player_admin,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json(data);
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error in guild join-player:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
