import { getBaseUrl } from '@/utils/getBaseUrl';
import axios from 'axios';
import { bearerInterceptor as useBearerInterceptor } from './interceptors/bearer.interceptor';
import { useRefreshInterceptor } from './interceptors/refresh.interceptor';

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
})

useBearerInterceptor(apiClient);
useRefreshInterceptor(apiClient);