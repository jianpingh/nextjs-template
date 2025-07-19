import apiClient from '@/lib/api';
import { LoginRequest, LoginResponse } from '@/types/auth';

export const authService = {
  // 登录
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post('/auth/login', {
      username: credentials.username,
      password: credentials.password,
    });
    return response.data;
  },

  // 注册 (如果API支持)
  async register(userData: { username: string; email: string; password: string }) {
    const response = await apiClient.post('/users/register', userData);
    return response.data;
  },
};
