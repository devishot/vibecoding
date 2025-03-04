"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BookOpen, GraduationCap, Calendar, FileText } from "lucide-react"

const sidebarNavItems = [
  {
    title: "Lectures",
    href: "/course/lectures",
    icon: BookOpen,
  },
  {
    title: "Seminars",
    href: "/course/seminars",
    icon: GraduationCap,
  },
  {
    title: "Study Plan",
    href: "/course/study-plan",
    icon: Calendar,
  },
  {
    title: "Homeworks",
    href: "/course/homeworks",
    icon: FileText,
  },
]

export function CourseSidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col w-64 border-r bg-muted/40">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Course Navigation</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-4">
          {sidebarNavItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </nav>
  )
}

