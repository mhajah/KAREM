import { ObjectId } from "mongodb";

export interface TestCase {
  input: string;
  output: string;
}

export interface Task {
  id: string;
  _id?: ObjectId;
  name: string;
  description: string;
  difficulty: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  author: string;
  testCases: TestCase[];
  enabled: boolean;
  maxAttempts: number;
  maxTime: number;
  maxMemory: number;
}