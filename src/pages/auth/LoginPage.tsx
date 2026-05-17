import { LoginForm } from "@/features/forms/LoginForm";

export function LoginPage() {
  return <div className="flex items-center justify-center gap-2 flex-col h-screen">
    <h1>Welcome to Neco Board CE</h1>
    <p className="mb-4">Please login to connect in workspace</p>
    <LoginForm />
  </div>
}
