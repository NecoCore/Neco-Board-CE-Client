import type { TaskLocal } from "../local";

export interface MyTasksResponse {
  projectName: string;
  projectId: string;
  tasks: TaskLocal[];
}