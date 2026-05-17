import { projectHttp } from "@/api/http";
import { DangerButton } from "@/components/ui/buttons";
import { ROUTES } from "@/routes/paths";
import { useProjectStore } from "@/store/useProjectStore"
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function ProjectSettingsPage() {
  const { project } = useProjectStore();
  const navigation = useNavigate();
  const queryClient = useQueryClient();

  if(!project) return <div className="p-2"><Loader2Icon className="animate-spin"/></div>;

  const deleteMutation = useMutation({
    mutationFn: async () => await projectHttp.delete(project.id),
    onSuccess: () => {
      toast.success(`Project ${project.name} deleted`);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PROJECTS] });
      navigation(ROUTES.PROJECTS.ROOT);
    },
    onError: () => {
      toast.error(`Error deleting project ${project.name}`);
    }
  })

  return <div className="p-2 overflow-y-auto">
    <h2>{project.name}</h2>
    <p>{project.description}</p>
    <p>{project.id}</p>
    <p>Created: {new Date(project.createdAt).toLocaleString()}</p>
    <DangerButton onClick={() => deleteMutation.mutate()} disabled={deleteMutation.isPending} text="Delete project" />
  </div>
}
