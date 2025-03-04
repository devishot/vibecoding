import type React from "react"
import { CourseSidebar } from "@/components/course-sidebar"

export default function CourseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <CourseSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  )
}

