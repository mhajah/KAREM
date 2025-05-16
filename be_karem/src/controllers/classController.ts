import { classCollection } from "../config/db";
import { Request, Response } from 'express';

export const addClass = async (req: Request, res: Response) => {
  const { name, year } = req.body;
  const classInfo = await classCollection.insertOne({ name, year });
  res.json(classInfo);
}

export const getClasses = async (req: any, res: Response) => {
  try {
      const tasks = await classCollection.find().toArray();
      res.json(tasks);
  } catch (err) {
      res.status(500).json({ error: (err as Error).message });
  }
};