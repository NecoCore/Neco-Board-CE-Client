import { taskHttp } from "@/api/http";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { TaskCard } from "../cards";
import { useTaskEvent } from "@/api/socket/task.event";

interface Props {
  projectId: string;
  columnId: string;
}

export function TaskColumnList({projectId, columnId}: Props) {
  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.TASK_COLUMN, columnId],
    queryFn: async () => await taskHttp.getAll(projectId, columnId),
    enabled: !!columnId && !!projectId,
  })
  useTaskEvent(columnId);

  if(isLoading) return <p>Loading...</p>
  if(error) {
    toast.error("Error to load tasks");
    return <p>Error: {error.message}</p>
  }


  return (
    <div className="space-y-2">
      {
        data?.map((task, index) => <TaskCard key={index} task={task} index={index}/>)
      }
    </div>
  )
}
