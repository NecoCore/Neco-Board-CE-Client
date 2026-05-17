import { projectHttp } from "@/api/http"
import { useAuthStore } from "@/store/useAuthStore"
import { useQuery } from "@tanstack/react-query"
import { ROUTES } from "@/routes/paths"
import { QUERY_KEYS } from "@/utils/constants/query-keys"
import { ProjectNavButton } from "../nav"

export function ProjectLists() {
  const { isAdmin } = useAuthStore()
  const { data: projects, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.PROJECTS],
    queryFn: isAdmin() ? projectHttp.getAll : projectHttp.getMy,
  })

  if(isLoading) return <div>Loading...</div>
  if(error) return <div>Error: {error.message}</div>
  if(!projects || projects?.length === 0) return <div>No projects found</div>

  return <div className="space-y-2 w-full">
    {
      projects.map((project, index) => <ProjectNavButton key={index} title={project.name} to={ROUTES.PROJECTS.BOARD(project.id)} />)
    }
  </div>
}
