import { ColumnList } from "@/components/ui/lists/ColumnList";
import { ProjectNotChosenPlaceholder } from "@/components/ui/placeholders/ProjectNotChosenPlaceholder";
import { useParams } from "react-router-dom";

export function ProjectBoardPage() {
  const { projectId } = useParams<{projectId: string}>();

  if(!projectId) return <ProjectNotChosenPlaceholder />;

  return <div className="p-2 overflow-x-auto">
    <ColumnList />
  </div>
}
