export interface CreateTaskRequest {
  name: string;
  description?: string;
  text?: string;
  priority: number;
  status: number;
}