import { userProjectHttp } from "@/api/http/user-project.http";
import { useProjectStore } from "@/store/useProjectStore"
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { ProjectUserTile } from "../tiles/ProjectUserTile";
import { useAppStore } from "@/store/useAppStore";
import { useEffect } from "react";

interface Props {
  setUsersCount: React.Dispatch<React.SetStateAction<number>>;
  setUsersOnlineCount: React.Dispatch<React.SetStateAction<number>>;
}

export function ProjectUserList({setUsersCount, setUsersOnlineCount}: Props) {
  const onlineUserIds = useAppStore(state => state.onlineUserIds);
  const projectId = useProjectStore((state) => state.projectId);

  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER_PROJECT_LIST, projectId!],
    queryFn: async () => await userProjectHttp.getAll(projectId!),
    enabled: !!projectId,
  })

  useEffect(() => {
      if(!data) return;
      console.log(onlineUserIds);
      const onlineCount = data.filter(u => onlineUserIds.includes(u.id)).length;
      setUsersCount(data.length);
      setUsersOnlineCount(onlineCount);
    }, [data, onlineUserIds]);

  if(!projectId) return <p>404</p>;

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>Error: {error.message}</p>
  if(!data) return <p>No data</p>

  return <div className="space-y-2">
    {
      data.map((user, index) => <ProjectUserTile key={index} user={user} isOnline={onlineUserIds.includes(user.id)} projectId={projectId} />)
    }
  </div>
}
