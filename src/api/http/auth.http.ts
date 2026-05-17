import type { LoginRequest } from "@/types/models/request";
import type { LoginResponse } from "@/types/models/response";
import { apiClient } from "../axios.api";
import type { MeResponse } from "@/types/models/response/me.response";
import { API_HTTP_ROUTES } from "../routes.api";
import type { RegisterRequest } from "@/types/models/request/register.request";

export const authHttp = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(API_HTTP_ROUTES.AUTH.LOGIN, credentials);
    return response.data;
  },
  logout: async (): Promise<void> => {
    await apiClient.post(API_HTTP_ROUTES.AUTH.LOGOUT);
  },
  refresh: async (): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(API_HTTP_ROUTES.AUTH.REFRESH);
    return response.data;
  },
  createUser: async (credentials: RegisterRequest): Promise<void> => {
    await apiClient.post(API_HTTP_ROUTES.AUTH.REGISTER, credentials);
  },
  getMe: async (): Promise<MeResponse> => {
    const response = await apiClient.get<MeResponse>(API_HTTP_ROUTES.AUTH.ME);
    return response.data;
  }
}