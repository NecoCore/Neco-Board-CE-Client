import type { RoleWorkspace } from "@/types/enums";

export interface MeResponse {
  id: string,
  login: string,
  role: RoleWorkspace,
  name: string,
  avatar: string | null,
}