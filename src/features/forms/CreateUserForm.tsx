import { useForm } from "react-hook-form"
import { CreateUserSchema, type CreateUserFormType } from "../schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authHttp } from "@/api/http";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/utils/constants/query-keys";
import { FormButton } from "@/components/ui/buttons";
import { XCircleIcon } from "lucide-react";
import { FormLabel } from "@/components/ui/labels";

interface Props {
  onCreated: () => void;
}

export function CreateUserForm({ onCreated }: Props) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<CreateUserFormType>({
    resolver: zodResolver(CreateUserSchema)
  });

  const createUserMutation = useMutation({
    mutationFn: authHttp.createUser,
    onSuccess: () => {
      toast.success(`User "${getValues('name')}" created`);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS_LIST] });
      onCreated();
    }
  })

  return <form onSubmit={handleSubmit(data => createUserMutation.mutate(data))} className="space-y-4">
    <div>
      <FormLabel title="Name" />
      <input
        {...register("name")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      />
      {
        errors.name && (
          <div className="border-4 border-color-danger px-2 py-1 gap-2 text-color-danger mt-2">
            {errors.name.message}
          </div>
        )
      }
    </div>
    <div>
      <FormLabel title="Login" />
      <input
        {...register("login")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      />
      {
        errors.login && (
          <div className="border-4 border-color-danger px-2 py-1 gap-2 text-color-danger mt-2">
            {errors.login.message}
          </div>
        )
      }
    </div>
    <div>
      <FormLabel title="Password" />
      <input
        {...register("password")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
        type="password"
      />
      {
        errors.password && (
          <div className="border-4 border-color-danger px-2 py-1 gap-2 text-color-danger mt-2">
            {errors.password.message}
          </div>
        )
      }
    </div>
    <div>
      <FormLabel title="Confirm password" />
      <input
        {...register("confirmPassword")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
        type="password"
      />
      {
        errors.confirmPassword && (
          <div className="border-4 border-color-danger px-2 py-1 gap-2 text-color-danger mt-2">
            {errors.confirmPassword.message}
          </div>
        )
      }
    </div>
    {
      createUserMutation.isError && (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          <XCircleIcon/>
          Wrong password or login
        </div>
      )
    }
    <FormButton text={createUserMutation.isPending ? "Creating..." : "Create"} disabled={createUserMutation.isPending} />
  </form>
}
