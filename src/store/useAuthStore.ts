import { authHttp } from "@/api/http/auth.http";
import type { UserLocal } from "@/types/interfaces";
import type { AuthState } from "@/types/interfaces/auth-state.interface";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  isAdmin: () => {
    const user = useAuthStore.getState().user as UserLocal | null;
    return user ? user.role === "ADMIN" || user.role === "OWNER": false;
  },
  login: async (token) => {
    localStorage.setItem('token', token);
    const user = await authHttp.getMe();
    set({ user, isAuthenticated: true });
  },
  logout: async () => {
    localStorage.removeItem('token');
    await authHttp.logout();
    set({ user: null, isAuthenticated: false });
  },
  reloadUser: async () => {
    try {
      set({ isInitializing: true });
      const user = await authHttp.getMe();
      set({ user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isInitializing: false }); 
    }
  },
  getMe: async () => {
    const user = await authHttp.getMe();
    if(!user) {
      const reload = useAuthStore.getState().reloadUser;
      reload();
      return;
    }
    set({ user });
  }
}));