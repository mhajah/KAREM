export interface User {
  id?: any;
  _id?: any;
  name: string;
  password: string;
  salt: string;
  email: string;
  role: string;
  completedTasks?: {
    taskId: any;
    completedAt: Date;
    attempts: number;
    status: "success" | "failure" | "timeout";
  }[];
}
