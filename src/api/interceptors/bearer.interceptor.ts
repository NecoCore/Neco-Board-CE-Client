import type { AxiosInstance } from "axios";

export const bearerInterceptor = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})
}