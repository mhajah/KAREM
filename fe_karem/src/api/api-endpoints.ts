/**
 * API endpoints and data types for the KAREM frontend.
 * Defines TypeScript interfaces and React Query hooks for API interactions.
 * 
 * Data Types:
 * - User: User profile and authentication data
 * - Task: Programming task with test cases and constraints
 * - Class: School class information
 * - TestCase: Input/output pairs for task validation
 * 
 * Features:
 * - Type-safe API calls using React Query
 * - Automatic cache invalidation
 * - Error handling with toast notifications
 * - Optimistic updates for better UX
 * 
 * Hooks:
 * - useUsers: Fetch all users (admin only)
 * - useTasks: Fetch all tasks
 * - useTask: Fetch single task by ID
 * - useDeleteTask: Delete task with cache update
 * - useClasses: Fetch all classes
 * 
 * Note: All API calls are authenticated via the api.ts interceptor
 */

import { toast } from "@/hooks/use-toast";
import api from "./api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  taskId: string;
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

export interface CompletedTask {
  taskId: string;
  completedAt: Date;
  attempts: number;
  status: "success" | "failure" | "timeout";
}

export interface Class {
  _id: string;
  name: string;
  year: number;
}

export function useUsers() {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: () =>
      api.post<User[]>("/get-all-users-data").then((res) => res.data),
  });
}

export const useTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: () => api.post<Task[]>("/get-all-tasks").then((res) => res.data),
  });
}


export function useTask(id: string | undefined) {
  return useQuery<Task, Error>({
    queryKey: ["task", id],
    queryFn: () =>
      api.post<Task>("/get-task-by-id", { id }).then((res) => res.data),
    enabled: Boolean(id),
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (taskId: string) =>
      api.post("/delete-task-by-id", { id: taskId }).then(() => {}),
    onSuccess: () => {
      toast({
        title: "Usunięto",
        description: "Zadanie zostało usunięte pomyślnie.",
      });
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      toast({
        title: "Błąd",
        description: `Nie udało się usunąć zadania: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useClasses() {
  return useQuery<Class[], Error>({
    queryKey: ["classes"],
    queryFn: () => api.post<Class[]>("/get-all-classes").then((res) => res.data),
  });
}
