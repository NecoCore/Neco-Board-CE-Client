import type { UserProjectResponse } from "@/types/models/response"
import { ProjectRoleBadge } from "../badges"
import { AvatarImage } from "../images/AvatarImage"
import { XIcon } from "lucide-react"
import { DangerIconButton } from "../buttons"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { userProjectHttp } from "@/api/http"
import { QUERY_KEYS } from "@/utils/constants/query-keys"
import { toast } from "sonner"
import { useState } from "react"

interface Props {
  user: UserProjectResponse
  isOnline: boolean
  projectId: string
}

const PROJECT_ROLES: { label: string; value: number }[] = [
  { label: "Owner", value: 0 },
  { label: "Moderator", value: 1 },
  { label: "User", value: 2 },
  { label: "Viewer", value: 3 },
]

export function ProjectUserTile({ user, isOnline, projectId }: Props) {
  const queryClient = useQueryClient()
  const [isEditingRole, setIsEditingRole] = useState(false)

  const removeMutation = useMutation({
    mutationFn: () => userProjectHttp.remove(projectId, user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROJECT_LIST, projectId] })
      toast.success(`${user.name} removed from project`)
    },
    onError: () => toast.error("Error removing user"),
  })

  const editRoleMutation = useMutation({
    mutationFn: (role: number) => userProjectHttp.editRole(projectId, user.id, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROJECT_LIST, projectId] })
      toast.success("Role updated")
      setIsEditingRole(false)
    },
    onError: () => toast.error("Error updating role"),
  })

  return (
    <div className="border-4 border-primary p-2 flex gap-4">
      <div className="flex items-center">
        <div className={`w-2 h-12 border-l-4 border-t-4 border-b-4 border-primary ${isOnline ? "bg-color-success" : "bg-neutral"}`} />
        <AvatarImage filePath={user.avatar} className="size-12 border-4 border-primary" />
      </div>
      <div className="flex items-center gap-2 flex-1">
        <h2>{user.name}</h2>
        {isEditingRole ? (
          <select
            defaultValue={PROJECT_ROLES.findIndex(r => r.label.toUpperCase() === user.role)}
            onChange={(e) => editRoleMutation.mutate(Number(e.target.value))}
            disabled={editRoleMutation.isPending}
            className="border-4 border-primary p-1 text-sm"
            autoFocus
            onBlur={() => setIsEditingRole(false)}
          >
            {PROJECT_ROLES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        ) : (
          <button onClick={() => setIsEditingRole(true)} className="cursor-pointer">
            <ProjectRoleBadge role={user.role} />
          </button>
        )}
      </div>
      <div className="flex ml-auto items-center">
        <DangerIconButton
          icon={<XIcon />}
          onClick={() => removeMutation.mutate()}
          disabled={removeMutation.isPending}
        />
      </div>
    </div>
  )
}
