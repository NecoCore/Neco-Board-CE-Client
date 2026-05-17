import { userProjectHttp, usersHttp } from "@/api/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addUserToProjectSchema, type AddUserToProjectFormType } from "../schemas";
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

export function AddUserToProjectForm({ projectId, onCreated }: Props) {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USERS_ALL],
    queryFn: usersHttp.getAllWorkspace,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddUserToProjectFormType>({
    resolver: zodResolver(addUserToProjectSchema),
    defaultValues: { role: 2 },
  });

  const mutation = useMutation({
    mutationFn: async (data: AddUserToProjectFormType) =>
      await userProjectHttp.add(projectId, data.userId, data.role ?? 2),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_PROJECT_LIST, projectId] });
      toast.success("User added to project");
      onCreated();
    },
    onError: () => {
      toast.error("Error adding user");
    },
  });

  return <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
    <div>
      <FormLabel title="User" />
      <select
        {...register("userId")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      >
        <option value="">Select user...</option>
        {isLoading && <option disabled>Loading...</option>}
        {users?.map((u) => (
          <option key={u.id} value={u.id}>{u.name}</option>
        ))}
      </select>
      {errors.userId && (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          <XCircleIcon />
          {errors.userId.message}
        </div>
      )}
    </div>
    <div>
      <FormLabel title="Role" />
      <select
        {...register("role", { valueAsNumber: true })}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      >
        <option value={0}>Owner</option>
        <option value={1}>Moderator</option>
        <option value={2}>User</option>
        <option value={3}>Viewer</option>
      </select>
    </div>
    {mutation.isError && (
      <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
        <XCircleIcon />
        Error to send data
      </div>
    )}
    <FormButton text={mutation.isPending ? "Adding..." : "Add"} disabled={mutation.isPending} />
  </form>
}
