import { useAuthStore } from "@/store/useAuthStore";
import { getBaseUrl } from "@/utils/getBaseUrl";
import axios, { type AxiosInstance } from "axios";
import { API_HTTP_ROUTES } from "../routes.api";

export const useRefreshInterceptor = (apiClient: AxiosInstance) => {
  let isRefreshing = false;
  let failedQueue: Array<{ resolve: (value?: unknown) => void, reject: (reason?: any) => void}> = [];

  const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach(prom => {
      if(error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  }

apiClient.interceptors.response.use((response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && 
      !originalRequest._retry &&
      originalRequest.url !== '/Auth/logout' && 
      originalRequest.url !== '/Auth/refresh'
    ) {
      if(isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        })
        .catch(err => {
          return Promise.reject(err);
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(`${getBaseUrl()}${API_HTTP_ROUTES.AUTH.REFRESH}`, {}, { withCredentials: true });

        localStorage.setItem('token', data.accessToken);
        processQueue(null, data.accessToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
)
}