import type { TaskPriority, TaskStatus } from "@/types/enums";

export interface TaskColumnResponse {
  id: string;
  columnId: string;

  name: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
}