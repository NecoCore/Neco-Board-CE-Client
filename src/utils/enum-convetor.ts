import type { RoleProject, RoleWorkspace, TaskPriority, TaskStatus } from "@/types/enums"

export function convertTypeRW(type: RoleWorkspace): number {
  switch(type) {
    case 'OWNER': return 0;
    case 'ADMIN': return 1;
    case 'USER': return 2;
    default: return 0;
  }
}

export function convertTypeRP(type: RoleProject): number {
  switch(type) {
    case 'OWNER': return 0;
    case 'MODERATOR': return 1;
    case 'USER': return 2;
    case 'VIEWER': return 3;
    default: return 0;
  }
}

export function convertTypeTS(type: TaskStatus): number {
  switch(type) {
    case 'NOT_STARTED': return 0;
    case 'IN_PROGRESS': return 1;
    case 'COMPLETED': return 2;
    case 'ON_HOLD': return 3;
    default: return 0;
  }
}

export function convertTypeTP(type: TaskPriority): number {
  switch(type) {
    case 'LOW': return 0;
    case 'MEDIUM': return 1;
    case 'HIGH': return 2;
    case 'URGENT': return 3;
    default: return 0;
  }
}