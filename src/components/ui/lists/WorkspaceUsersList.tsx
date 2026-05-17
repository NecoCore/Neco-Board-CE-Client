import { usersHttp } from "@/api/http";
import { useAppStore } from "@/store/useAppStore";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import { WorkspaceUserTile } from "../tiles/WorkspaceUserTile";

interface Props {
  setUsersCount: React.Dispatch<React.SetStateAction<number>>;
  setUsersOnlineCount: React.Dispatch<React.SetStateAction<number>>;
}

export function WorkspaceUsersList({setUsersCount, setUsersOnlineCount}: Props) {
  const onlineUserIds = useAppStore(state => state.onlineUserIds);

  const { data: users, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.USERS_LIST],
    queryFn: usersHttp.getAll
  });

  useEffect(() => {
    if(!users) return;
    console.log(onlineUserIds);
    const onlineCount = users.filter(u => onlineUserIds.includes(u.id)).length;
    setUsersCount(users.length);
    setUsersOnlineCount(onlineCount);
  }, [users, onlineUserIds]);

  if(isLoading) return <div><Loader2Icon className="animate-spin" /></div>
  if(error) {
    console.error(error);
    toast.error("Error to load workspace users");
    return <div>{error.message}</div>
  }
  if(!users || users.length === 0) {
    return <div>No users found</div>
  }

  return <div className="space-y-2">
    {
      users.map((user, index) => <WorkspaceUserTile key={index} user={user} isOnline={onlineUserIds.includes(user.id)} />)
    }
  </div>
}
