import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom"
import { loginSchema, type LoginFormType } from "../schemas";
import { authHttp } from "@/api/http/auth.http";
import { ROUTES } from "@/routes/paths";
import { FormLabel } from "@/components/ui/labels";
import { FormButton } from "@/components/ui/buttons";
import { XCircleIcon } from "lucide-react";

export function LoginForm() {
  const navigate = useNavigate();
  const saveLoginData = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema)
  });

  const loginMutation = useMutation({
    mutationFn: authHttp.login,
    onSuccess: async (data) => {
      await saveLoginData(data.accessToken);
      navigate(ROUTES.PROFILE);
    }
  })

  return <form onSubmit={handleSubmit((data) => loginMutation.mutate(data))} className="space-y-4 p-4 border-4 border-primary w-md">
    <div>
      <FormLabel title="Login" />
      <input
        {...register("login")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
      />
    </div>
    <div>
      <FormLabel title="Password" />
      <input
        {...register("password")}
        className="w-full border-4 border-primary p-2 focus:border-color-info"
        type="password"
      />
    </div>
    {
      loginMutation.isError && (
        <div className="border-4 border-color-danger p-2 flex items-center gap-2 text-color-danger">
          <XCircleIcon/>
          Wrong password or login
        </div>
      )
    }
    <FormButton text={loginMutation.isPending ? "Login..." : "Login"} disabled={loginMutation.isPending} />
  </form>
}
