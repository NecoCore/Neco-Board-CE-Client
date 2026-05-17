import type { ColumnResponse } from "@/types/models/response";
import { apiClient } from "../axios.api";
import { API_HTTP_ROUTES } from "../routes.api";
import type { CreateColumnRequest } from "@/types/models/request/create-column.request";

export const columnHttp = {
  getAll: async (projectId: string): Promise<ColumnResponse[]> => {
    const response = await apiClient.get<ColumnResponse[]>(API_HTTP_ROUTES.COLUMNS.GET_ALL(projectId));
    return response.data;
  },
  create: async (projectId: string, request: CreateColumnRequest): Promise<void> => {
    await apiClient.post(API_HTTP_ROUTES.COLUMNS.CREATE(projectId), request);
  },
  update: async (projectId: string, columnId: string, request: CreateColumnRequest): Promise<void> => {
    await apiClient.put(API_HTTP_ROUTES.COLUMNS.UPDATE(projectId, columnId), request);
  },
  delete: async (projectId: string, columnId: string): Promise<void> => {
    await apiClient.delete(API_HTTP_ROUTES.COLUMNS.DELETE(projectId, columnId));
  },
  updateOrder: async (projectId: string, columnId: string, order: number): Promise<void> => {
    await apiClient.put(API_HTTP_ROUTES.COLUMNS.UPDATE_ORDER(projectId, columnId), order);
  },
}