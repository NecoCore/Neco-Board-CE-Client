import type { UserResponse } from "@/types/models/response/user.response"
import { AvatarImage } from "../images/AvatarImage"
import { DangerIconButton, SecondaryIconButton } from "../buttons"
import { Edit3Icon, Trash2Icon } from "lucide-react"
import { WorkspaceRoleBadge } from "../badges/WorkspaceRoleBadge"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { usersHttp } from "@/api/http"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/utils/constants/query-keys"

interface Props {
  user: UserResponse
  isOnline: boolean
}

export function WorkspaceUserTile({isOnline, user}: Props) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => await usersHttp.delete(user.id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.USERS_LIST]});
      toast.success(`User ${user.name} has been deleted`);
    },
    onError: () => {
      toast.error(`Failed to delete user ${user.name}`);
    }
  })

  return <div className="border-4 border-primary p-2 flex gap-4">
    <div className="flex items-center">
      <div className={`w-2 h-12 border-l-4 border-t-4 border-b-4 border-primary ${isOnline ? "bg-color-success" : "bg-neutral"}`} />
      <AvatarImage filePath={user.avatar} className="size-12 border-4 border-primary"/>
    </div>
    <div className="flex items-center gap-2">
      <h2>{user.name}</h2>
      <WorkspaceRoleBadge role={user.role} />
    </div>
    <div className="flex ml-auto">
      <SecondaryIconButton icon={<Edit3Icon />} disabled={deleteMutation.isPending}/>
      <DangerIconButton icon={<Trash2Icon />} disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate()} />
    </div>
  </div>
}
