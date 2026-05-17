import { usersHttp } from "@/api/http";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { editPasswordSchema, type EditPasswordFormType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormLabel } from "@/components/ui/labels";
import { XCircleIcon } from "lucide-react";
import { FormButton } from "@/components/ui/buttons";

interface Props {
  onCreated: () => void;
}

export function EditPasswordForm({ onCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditPasswordFormType>({
    resolver: zodResolver(editPasswordSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: EditPasswordFormType) =>
      await usersHttp.updatePassword(data.oldPassword, data.password, data.confirmPassword),
    onSuccess: () => {
      toast.success("Password updated");
      onCreated();
    },
    onError: () => {
      toast.error("Error updating password");
    },
  });

  return <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
    <div>
      <FormLabel title="Old password" />
      <input
        {...register("oldPassword")}
        type="password"
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      />
      {errors.oldPassword && (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          <XCircleIcon />
          {errors.oldPassword.message}
        </div>
      )}
    </div>
    <div>
      <FormLabel title="New password" />
      <input
        {...register("password")}
        type="password"
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      />
      {errors.password && (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          <XCircleIcon />
          {errors.password.message}
        </div>
      )}
    </div>
    <div>
      <FormLabel title="Confirm new password" />
      <input
        {...register("confirmPassword")}
        type="password"
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      />
      {errors.confirmPassword && (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          <XCircleIcon />
          {errors.confirmPassword.message}
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
