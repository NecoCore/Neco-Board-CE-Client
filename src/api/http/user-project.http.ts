import type { UserProjectResponse } from "@/types/models/response";
import { apiClient } from "../axios.api";
import { API_HTTP_ROUTES } from "../routes.api";

export const userProjectHttp = {
  getAll: async (projectId: string): Promise<UserProjectResponse[]> => {
    const response = await apiClient.get<UserProjectResponse[]>(API_HTTP_ROUTES.PROJECT_USERS.GET_ALL(projectId));
    return response.data;
  },
  add: async (projectId: string, userId: string, role: number): Promise<void> => {
    await apiClient.post(API_HTTP_ROUTES.PROJECT_USERS.ADD(projectId), { id: userId, role });
  },
  editRole: async (projectId: string, userId: string, role: number): Promise<void> => {
    await apiClient.patch(API_HTTP_ROUTES.PROJECT_USERS.EDIT_ROLE(projectId, userId), { role });
  },
  remove: async (projectId: string, userId: string): Promise<void> => {
    await apiClient.delete(API_HTTP_ROUTES.PROJECT_USERS.REMOVE(projectId, userId));
  },
}