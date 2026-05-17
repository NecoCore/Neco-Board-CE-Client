import type { MyTasksResponse } from "@/types/models/response";
import { apiClient } from "../axios.api";
import { API_HTTP_ROUTES } from "../routes.api";

export const profileHttp = {
  getMyTasks: async (): Promise<MyTasksResponse[]> => {
    const response = await apiClient.get<MyTasksResponse[]>(API_HTTP_ROUTES.WORKSPACE_USERS.MY_TASKS);
    return response.data;
  }
}