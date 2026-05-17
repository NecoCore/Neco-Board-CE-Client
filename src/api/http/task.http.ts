import type { TaskColumnResponse, UserResponse } from "@/types/models/response";
import { apiClient } from "../axios.api";
import { API_HTTP_ROUTES } from "../routes.api";
import type { CreateTaskRequest } from "@/types/models/request/create-task.request";
import type { TaskViewResponse } from "@/types/models/response/task-view.response";

export const taskHttp = {
  getAll: async (projectId: string, columnId: string): Promise<TaskColumnResponse[]> => {
    const response = await apiClient.get<TaskColumnResponse[]>(API_HTTP_ROUTES.TASKS.GET_ALL(projectId, columnId));
    return response.data;
  },
  create: async (projectId: string, columnId: string, request: CreateTaskRequest): Promise<void> => {
    await apiClient.post(API_HTTP_ROUTES.TASKS.CREATE(projectId, columnId), request);
  },
  edit: async (projectId: string, columnId: string, taskId: string, request: Partial<CreateTaskRequest>): Promise<void> => {
    await apiClient.put(API_HTTP_ROUTES.TASKS.UPDATE(projectId, columnId, taskId), request);
  },
  getById: async (projectId: string, columnId: string, taskId: string): Promise<TaskViewResponse> => {
    const response = await apiClient.get<TaskViewResponse>(API_HTTP_ROUTES.TASKS.GET_BY_ID(projectId, columnId, taskId));
    return response.data;
  },
  getTaskUsers: async (projectId: string, columnId: string, taskId: string): Promise<UserResponse[]> => {
    const response = await apiClient.get<UserResponse[]>(API_HTTP_ROUTES.TASKS.GET_TASK_USERS(projectId, columnId, taskId));
    return response.data;
  },
  editTaskColumn: async (projectId: string, columnId: string, taskId: string, newColumnId: string): Promise<void> => {
    await apiClient.patch(API_HTTP_ROUTES.TASKS.EDIT_TASK_COLUMN(projectId, columnId, taskId), { columnId: newColumnId });
  },
  editTaskPriority: async (projectId: string, columnId: string, taskId: string, priority: number): Promise<void> => {
    await apiClient.patch(API_HTTP_ROUTES.TASKS.EDIT_TASK_PRIORITY(projectId, columnId, taskId), { priority });
  },
  editTaskStatus: async (projectId: string, columnId: string, taskId: string, status: number): Promise<void> => {
    await apiClient.patch(API_HTTP_ROUTES.TASKS.EDIT_TASK_STATUS(projectId, columnId, taskId), { status });
  },
  delete: async (projectId: string, columnId: string, taskId: string): Promise<void> => {
    await apiClient.delete(API_HTTP_ROUTES.TASKS.DELETE(projectId, columnId, taskId));
  },
  addUser: async (projectId: string, columnId: string, taskId: string, userId: string): Promise<void> => {
    await apiClient.post(API_HTTP_ROUTES.TASKS.ADD_TASK_USER(projectId, columnId, taskId), { userId });
  },
  removeUser: async (projectId: string, columnId: string, taskId: string, userId: string): Promise<void> => {
    await apiClient.delete(API_HTTP_ROUTES.TASKS.REMOVE_TASK_USER(projectId, columnId, taskId), { data: userId });
  },
}