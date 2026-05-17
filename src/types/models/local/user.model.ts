import type { RoleWorkspace } from "@/types/enums";

export interface UserLocal {
  id: string;
  name: string;
  login: string;
  avatar: string | null;
  role: RoleWorkspace;
}