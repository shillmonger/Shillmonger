import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="flex px-3 py-10 min-h-screen flex-col items-center justify-center bg-background text-foreground p-6 md:p-10 transition-colors duration-300">
      <div className="w-full max-w-sm md:max-w-3xl overflow-hidden">
        <LoginForm />
      </div>
    </div>
  )
}
