import { columnHttp } from "@/api/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createColumnSchema, type CreateColumnFormType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormLabel } from "@/components/ui/labels";
import { XCircleIcon } from "lucide-react";
import { FormButton } from "@/components/ui/buttons";
import { QUERY_KEYS } from "@/utils/constants/query-keys";

interface Props {
  onCreated: () => void;
  projectId: string;
}

export function CreateColumnForm({projectId, onCreated}: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateColumnFormType>({
    resolver: zodResolver(createColumnSchema)
  });


  const columnMutation = useMutation({
    mutationFn: async (data: CreateColumnFormType) => await columnHttp.create(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.COLUMN_PROJECT, projectId]});
      toast.success("Column created");
      onCreated();
    },
    onError: () => {
      toast.error("Error creating column");
    }
  })

  return <form onSubmit={handleSubmit((data) => columnMutation.mutate(data))} className="space-y-4">
    <div>
      <FormLabel title="Name" />
      <input
        {...register("name")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      />
    </div>
    {
      columnMutation.isError && (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          <XCircleIcon/>
          Error to send data
        </div>
      )
    }
    {
      errors.name ? (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          {errors.name ? (<>{errors.name.message}<br/></>) : null}
        </div>
      ) : null
    }
    <FormButton text={columnMutation.isPending ? "Creating..." : "Create"} disabled={columnMutation.isPending} />
  </form>
}
