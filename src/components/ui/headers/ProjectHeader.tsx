import { useProjectStore } from "@/store/useProjectStore";
import { KanbanSquareIcon, Loader2Icon, SettingsIcon, UsersIcon } from "lucide-react";
import { useParams } from "react-router-dom"
import { BoardNavButton } from "../nav/BoardNavButton";
import { ROUTES } from "@/routes/paths";

export function ProjectHeader() {
  const { projectId } = useParams<{projectId: string}>();
  const { project } = useProjectStore();

  if(!projectId) return null;

  if(!project) return <div className="header p-2"><Loader2Icon className="animate-spin"/></div>

  return <div className="header flex justify-between items-center">
    <h3 className="ml-4">{ project.name }</h3>
    <div className="flex">
      <BoardNavButton to={ROUTES.PROJECTS.BOARD(projectId)} title="Board">
        <KanbanSquareIcon />
      </BoardNavButton>
      <BoardNavButton to={ROUTES.PROJECTS.USERS(projectId)} title="Board">
        <UsersIcon />
      </BoardNavButton>
      <BoardNavButton to={ROUTES.PROJECTS.SETTINGS(projectId)} title="Board">
        <SettingsIcon />
      </BoardNavButton>
    </div>
  </div>
}
