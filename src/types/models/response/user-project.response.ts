import type { RoleProject } from "@/types/enums/roles-project";

export interface UserProjectResponse {
  id: string;
  name: string;
  avatar: string | null;
  role: RoleProject;
}