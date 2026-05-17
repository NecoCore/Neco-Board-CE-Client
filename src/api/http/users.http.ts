import type { UserResponse } from "@/types/models/response/user.response";
import { apiClient } from "../axios.api";
import { API_HTTP_ROUTES } from "../routes.api";

export const usersHttp = {
  getAll: async (): Promise<UserResponse[]> => {
    const response = await apiClient.get(API_HTTP_ROUTES.WORKSPACE_USERS.GET);
    return response.data;
  },
  getAllWorkspace: async (): Promise<UserResponse[]> => {
    const response = await apiClient.get(API_HTTP_ROUTES.WORKSPACE_USERS.GET_ALL);
    return response.data;
  },
  delete: async (userId: string): Promise<void> => {
    await apiClient.delete(API_HTTP_ROUTES.WORKSPACE_USERS.DELETE(userId));
  },
  updateRole: async (userId: string, role: number): Promise<void> => {
    await apiClient.patch(API_HTTP_ROUTES.WORKSPACE_USERS.UPDATE_ROLE(userId), { role });
  },
  updatePassword: async (oldPassword: string, password: string, confirmPassword: string): Promise<void> => {
    await apiClient.patch(API_HTTP_ROUTES.WORKSPACE_USERS.UPDATE_PASSWORD, { oldPassword, password, confirmPassword });
  },
}