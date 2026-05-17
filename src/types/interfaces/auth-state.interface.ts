import type { UserLocal } from "../models/local/user.model";

export interface AuthState {
  user: UserLocal | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isAdmin: () => boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
  getMe: () => Promise<void>;
}