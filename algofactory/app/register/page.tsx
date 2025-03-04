import { AuthForm } from "@/components/auth-form"

export default function RegisterPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Register for the Algorithms Course
      </h1>
      <AuthForm type="register" />
    </div>
  )
}

