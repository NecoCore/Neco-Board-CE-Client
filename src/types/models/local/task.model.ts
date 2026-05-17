import type { TaskPriority, TaskStatus } from "@/types/enums";
import type { UserLocal } from "@/types/interfaces";

export interface TaskLocal {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
  columnId: string;
}

export interface TaskFullLocal {
  id: string;
  columnId: string;
  owner: UserLocal;
  name: string;
  description: string;
  text: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: Date;
}