import { toast } from "@/hooks/use-toast";
import api from "./api";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  completedTasks: {
    taslD: string;
    completedAt: Date;
    attempts: number;
    status: "success" | "failure" | "timeout";
  }[];
};

export interface TestCase {
  input: string;
  output: string;
}

export interface Task {
  id: string;
  _id?: string;
  name: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
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

export const getUsers = async () => {
  try {
    const { data } = await api.post<User[]>("/get-all-users-data");
    return data;
  } catch (error) {
    console.error("Nie udało się pobrać użytkowników:", error);
    return [];
  }
};

export const getTasks = async () => {
  try {
    const { data } = await api.post<Task[]>("/get-all-tasks");
    return data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast(
      {
        title: "Błąd",
        description: "Nie udało się pobrać zadań.",
        duration: 2000,
        variant: "destructive",
      }
    );
    return [];
  }
}

export const getTaskById = async (id: string) => {
  try {
    const { data } = await api.post<Task>("/get-task-by-id", { id });
    return data;
  } catch (error) {
    console.error("Nie udało się pobrać zadania:", error);
    return null;
  }
}

export const deleteTaskById = async (id: string) => {
  try {
    const { data } = await api.post("/delete-task-by-id", { id });
    toast({
      title: "Usunięto",
      description: "Zadanie zostało usunięte pomyślnie.",
    });
    return data;
  } catch (error) {
    console.error("Nie udało się usunąć zadania:", error);
    return null;
  }
}