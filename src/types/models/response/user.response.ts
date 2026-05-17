import type { RoleWorkspace } from "@/types/enums";

export interface UserResponse {
  id: string;
  name: string;
  avatar: string | null;
  role: RoleWorkspace;
}