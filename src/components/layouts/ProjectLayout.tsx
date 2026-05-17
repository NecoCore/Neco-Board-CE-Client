import { Outlet, useParams } from "react-router-dom";
import { ProjectHeader } from "@/components/ui/headers";
import { ProjectsSidebar } from "@/components/ui/sidebars";
import { useProjectStore } from "@/store/useProjectStore";
import { useEffect } from "react";
import { useProjectSockets } from "@/api/socket/project.events";

export function ProjectLayout() {
  const { projectId } = useParams<{projectId: string}>();
  
  const connectToProject = useProjectStore((state) => state.connectToProject);
  const disconnectFromProject = useProjectStore((state) => state.disconnectFromProject);
  const isConnected = useProjectStore((state) => state.isConnected);

  useEffect(() => {
    if(!projectId) return;
    connectToProject(projectId);
  }, [projectId, connectToProject])

  useEffect(() => {
    return () => {
      disconnectFromProject();
    }
  }, [disconnectFromProject])

  useProjectSockets(isConnected);

  return (
    <div className="grid h-full grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-hidden">
      <ProjectHeader />
      <ProjectsSidebar />
      <Outlet />
    </div>
  )
}
