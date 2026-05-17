import { apiClient } from "../axios.api"
import { API_HTTP_ROUTES } from "../routes.api"
import type { CreateProjectRequest } from "@/types/models/request"
import type { CreateProjectResponse, ProjectResponse } from "@/types/models/response"

export const projectHttp = {
  getAll: async (): Promise<ProjectResponse[]> => {
    const response = await apiClient.get<ProjectResponse[]>(API_HTTP_ROUTES.PROJECTS.GET_ALL)
    return response.data
  },
  getMy: async (): Promise<ProjectResponse[]> => {
    const response = await apiClient.get<ProjectResponse[]>(API_HTTP_ROUTES.PROJECTS.GET_MY)
    return response.data
  },
  getById: async (id: string): Promise<ProjectResponse> => {
    const response = await apiClient.get<ProjectResponse>(API_HTTP_ROUTES.PROJECTS.GET_BY_ID(id))
    return response.data
  },
  create: async (request: CreateProjectRequest): Promise<CreateProjectResponse> => {
    const response = await apiClient.post<CreateProjectResponse>(API_HTTP_ROUTES.PROJECTS.CREATE, request)
    return response.data
  },
  update: async (request: Partial<CreateProjectRequest>, id: string) => {
    await apiClient.put(API_HTTP_ROUTES.PROJECTS.UPDATE(id), request)
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(API_HTTP_ROUTES.PROJECTS.DELETE(id))
  }
}