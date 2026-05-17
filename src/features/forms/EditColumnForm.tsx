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
  columnId: string;
  defaultName: string;
}

export function EditColumnForm({ projectId, columnId, defaultName, onCreated }: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateColumnFormType>({
    resolver: zodResolver(createColumnSchema),
    defaultValues: { name: defaultName },
  });

  const mutation = useMutation({
    mutationFn: async (data: CreateColumnFormType) => await columnHttp.update(projectId, columnId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COLUMN_PROJECT, projectId] });
      toast.success("Column updated");
      onCreated();
    },
    onError: () => {
      toast.error("Error updating column");
    },
  });

  return <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
    <div>
      <FormLabel title="Name" />
      <input
        {...register("name")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      />
      {errors.name && (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          <XCircleIcon />
          {errors.name.message}
        </div>
      )}
    </div>
    {mutation.isError && (
      <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
        <XCircleIcon />
        Error to send data
      </div>
    )}
    <FormButton text={mutation.isPending ? "Saving..." : "Save"} disabled={mutation.isPending} />
  </form>
}
