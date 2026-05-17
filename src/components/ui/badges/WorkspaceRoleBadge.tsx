import type { RoleWorkspace } from "@/types/enums";

interface Props {
  role: RoleWorkspace;
}

export function WorkspaceRoleBadge({role}: Props) {
  switch(role) {
    case 'OWNER':
      return <p className="px-2 py-1 text-sm bg-color-success/50 text-background w-fit">Owner</p>
    case 'ADMIN':
      return <p className="px-2 py-1 text-sm bg-color-info/50 text-background w-fit">Admin</p>
    case 'USER':
      return <p className="px-2 py-1 text-sm bg-neutral w-fit">User</p>
    default:
      return <p className="px-2 py-1 text-sm bg-neutral w-fit">User</p>
  }
}
