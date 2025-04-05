"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Activity,
  Clock,
  FileClock,
  FileText,
  Folder,
  Home,
  LayoutDashboard,
  ListChecks,
  PieChart,
  Receipt,
  Users,
  User,
  ChevronRight,
  Menu,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
  },
  {
    title: "Clients",
    href: "/clients",
    icon: User,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: Folder,
  },
  {
    title: "Tasks",
    href: "/tasks",
    icon: ListChecks,
  },
  {
    title: "Time Entries",
    href: "/time-entries",
    icon: Clock,
  },
  {
    title: "Expense Entries",
    href: "/expense-entries",
    icon: Receipt,
  },
  {
    title: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: FileClock,
  },
  {
    title: "Activities",
    href: "/activities",
    icon: Activity,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: PieChart,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground absolute left-3 top-3 z-50">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <MobileSidebar pathname={pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <aside className="hidden border-r bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block lg:w-[240px] xl:w-[280px] relative">
        <div className="flex flex-col h-full">
          <div className="flex h-14 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Home className="h-5 w-5" />
              <span>ProjectHub</span>
            </Link>
          </div>
          <ScrollArea className="flex-1">
            <nav className="grid gap-1 px-2 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
                </Link>
              ))}
            </nav>
          </ScrollArea>
        </div>
      </aside>
    </>
  )
}

interface MobileSidebarProps {
  pathname: string
  setOpen: (open: boolean) => void
}

function MobileSidebar({ pathname, setOpen }: MobileSidebarProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2 font-bold" onClick={() => setOpen(false)}>
          <Home className="h-5 w-5" />
          <span>ProjectHub</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 px-2 py-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
              {pathname === item.href && <ChevronRight className="ml-auto h-4 w-4" />}
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </div>
  )
}

