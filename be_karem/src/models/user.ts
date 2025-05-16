export interface User {
  id?: any;
  _id?: any;
  name: string;
  password: string;
  salt: string;
  email: string;
  role: string;
  completedTasks?: CompletedTask[];
}

export interface CompletedTask {
  taskId: any;
  completedAt: Date;
  attempts: number;
  status: "success" | "failure" | "timeout";
}
