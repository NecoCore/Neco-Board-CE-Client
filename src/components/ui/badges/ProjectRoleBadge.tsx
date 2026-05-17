import type { RoleProject } from "@/types/enums/roles-project";

interface Props {
  role: RoleProject;
}

export function ProjectRoleBadge({role}: Props) {
  switch(role) {
    case 'OWNER':
      return <p className="px-2 py-1 text-sm bg-color-success/50 text-background w-fit">Owner</p>
    case "MODERATOR":
      return <p className="px-2 py-1 text-sm bg-color-info/50 text-background w-fit">Moderator</p>
    case 'USER':
      return <p className="px-2 py-1 text-sm bg-color-warning/50 text-background w-fit">User</p>
    case 'VIEWER':
      return <p className="px-2 py-1 text-sm bg-neutral w-fit">Viewer</p>
    default:
      return <p className="px-2 py-1 text-sm bg-neutral w-fit">Viewer</p>
  }
}
