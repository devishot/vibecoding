import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] gap-6 pb-8 pt-6 md:py-10">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
        Welcome to the Algorithms Course
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground text-center">
        Enhance your problem-solving skills and master algorithms with our comprehensive online course.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/register">Register</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </div>
  )
}

