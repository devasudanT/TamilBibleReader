import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from 'fs';
import path from 'path';

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for Bible data
  app.get("/api/bible/verses", async (req, res) => {
    try {
      const filePath = path.resolve(process.cwd(), 'attached_assets/tamilkjv.json');
      const rawData = await fs.promises.readFile(filePath, 'utf-8');
      const bibleData = JSON.parse(rawData);
      
      res.json(bibleData);
    } catch (error) {
      console.error("Error reading Bible data:", error);
      res.status(500).json({ message: "Failed to load Bible data" });
    }
  });

  // Search API endpoint
  app.get("/api/bible/search", async (req, res) => {
    try {
      const { query } = req.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const filePath = path.resolve(process.cwd(), 'attached_assets/tamilkjv.json');
      const rawData = await fs.promises.readFile(filePath, 'utf-8');
      const bibleData = JSON.parse(rawData);
      
      const searchResults = bibleData.filter((verse: any) => 
        verse.text.toLowerCase().includes(query.toLowerCase())
      );
      
      res.json(searchResults);
    } catch (error) {
      console.error("Error searching Bible data:", error);
      res.status(500).json({ message: "Failed to search Bible data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
