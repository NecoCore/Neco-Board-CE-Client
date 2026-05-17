import { apiClient } from "../axios.api";
import { API_FILES_ROUTES } from "../routes.api";

export const avatarsFiles = {
  getAvatar: async (path: string) => {
    const response = await apiClient.get(API_FILES_ROUTES.AVATARS.GET(path), {
      responseType: 'blob',
    });
    return response.data;
  }
}