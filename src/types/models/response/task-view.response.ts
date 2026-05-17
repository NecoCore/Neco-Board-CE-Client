import type { TaskPriority, TaskStatus } from "@/types/enums";
import type { UserResponse } from "./user.response";

export interface TaskViewResponse {
  id: string;
  columnId: string;

  ownerId: string;
  owner: UserResponse;

  name: string;
  description: string;
  text: string;
  priority: TaskPriority;
  status: TaskStatus;
}