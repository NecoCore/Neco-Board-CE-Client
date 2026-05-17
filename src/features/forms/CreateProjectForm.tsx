import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { createProjectSchema, type CreateProjectFormType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectHttp } from "@/api/http";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { ROUTES } from "@/routes/paths";
import { toast } from "sonner";
import { FormLabel } from "@/components/ui/labels";
import { XCircleIcon } from "lucide-react";
import { FormButton } from "@/components/ui/buttons";

interface Props {
  onCreated: () => void;
}

export function CreateProjectForm({ onCreated }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectFormType>({
    resolver: zodResolver(createProjectSchema)
  });

  const createMutation = useMutation({
    mutationFn: projectHttp.create,
    onSuccess: (data) => {
      toast.success("Project created");
      console.log("Response data:", data);
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.PROJECTS]});
      navigate(ROUTES.PROJECTS.BOARD(data.projectId));
      onCreated();
    },
    onError: (error) => {
      toast.error("Error creating project")
      console.error(error);
    }
  })

  return <form onSubmit={handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
    <div>
      <FormLabel title="Name" />
      <input
        {...register("name")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      />
    </div>
    <div>
      <FormLabel title="Description" />
      <textarea
        {...register("description")}
        className="w-full border-4 border-primary p-2 focus:border-color-info h-40"
      />
    </div>
    {
      createMutation.isError && (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          <XCircleIcon/>
          Error to send data
        </div>
      )
    }
    {
      errors.name || errors.description ? (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          {errors.name ? (<>{errors.name.message}<br/></>) : null}
          {errors.description ? (<>{errors.description.message}<br/></>) : null}
        </div>
      ) : null
    }
    <FormButton text={createMutation.isPending ? "Creating..." : "Create"} disabled={createMutation.isPending} />
  </form>
}
