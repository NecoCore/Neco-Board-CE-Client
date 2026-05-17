import { profileHttp } from "@/api/http";
import { ROUTES } from "@/routes/paths";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { TaskCard } from "../cards";
import { QUERY_KEYS } from "@/utils/constants/query-keys";

export function MyTasksList() {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.MY_TASKS],
    queryFn: profileHttp.getMyTasks,
  });

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!projects || projects?.length === 0) return <div>No tasks found</div>

  return <div className="space-y-4">
    {
      projects.map((project, index) => (
        <div key={index}>
          <Link to={ROUTES.PROJECTS.BOARD(project.projectId)} className="group w-full flex justify-between items-center p-2 mb-2">
            <h3>{project.projectName}</h3>
            <ArrowUpRightIcon className="group-hover:rotate-45 transition"/>
          </Link>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {
              project.tasks.map((task, index) => <TaskCard key={index} task={task} index={index}/>)
            }
          </div>
        </div>
      ))
    }
  </div>
}
