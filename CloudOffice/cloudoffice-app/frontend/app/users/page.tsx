"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpDown, MoreHorizontal, Plus, PencilIcon, ArchiveIcon, UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface User {
  id: string
  name: string
  nameEn: string
  email: string
  position: string
  status: "active" | "archived" | "pending"
  avatar?: string
  initials: string
  oauthProviders: string[]
}

const users: User[] = [
  {
    id: "USR-001",
    name: "Алексей Иванов",
    nameEn: "Alexei Ivanov",
    email: "alexei@example.com",
    position: "Senior Developer",
    status: "active",
    initials: "АИ",
    oauthProviders: ["Google", "GitHub"],
  },
  {
    id: "USR-002",
    name: "Мария Петрова",
    nameEn: "Maria Petrova",
    email: "maria@example.com",
    position: "UI/UX Designer",
    status: "active",
    initials: "МП",
    oauthProviders: ["Google"],
  },
  {
    id: "USR-003",
    name: "Дмитрий Смирнов",
    nameEn: "Dmitri Smirnov",
    email: "dmitri@example.com",
    position: "Project Manager",
    status: "active",
    initials: "ДС",
    oauthProviders: ["Microsoft"],
  },
  {
    id: "USR-004",
    name: "Елена Соколова",
    nameEn: "Elena Sokolova",
    email: "elena@example.com",
    position: "Backend Developer",
    status: "archived",
    initials: "ЕС",
    oauthProviders: ["GitHub"],
  },
  {
    id: "USR-005",
    name: "Николай Морозов",
    nameEn: "Nikolai Morozov",
    email: "nikolai@example.com",
    position: "QA Engineer",
    status: "pending",
    initials: "НМ",
    oauthProviders: [],
  },
]

export default function UsersPage() {
  const [sortField, setSortField] = useState<keyof User>("id")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Sort users
  const sortedUsers = [...users].sort((a, b) => {
    const fieldA = a[sortField]
    const fieldB = b[sortField]

    if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
    if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Sort by field
  const sortBy = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <Button asChild>
            <Link href="/users/new">
              <Plus className="mr-2 h-4 w-4" /> Add User
            </Link>
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">
                  <div className="flex items-center cursor-pointer" onClick={() => sortBy("id")}>
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center cursor-pointer" onClick={() => sortBy("name")}>
                    Full Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <div className="flex items-center cursor-pointer" onClick={() => sortBy("position")}>
                    Position
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  <div className="flex items-center cursor-pointer" onClick={() => sortBy("email")}>
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="hidden xl:table-cell">OAuth Providers</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.nameEn}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{user.position}</TableCell>
                  <TableCell className="hidden lg:table-cell">{user.email}</TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {user.oauthProviders.length > 0 ? (
                      <div className="flex gap-1">
                        {user.oauthProviders.map((provider) => (
                          <span
                            key={provider}
                            className="bg-secondary text-secondary-foreground text-xs py-0.5 px-2 rounded-full"
                          >
                            {provider}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">None</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/users/${user.id}`} className="cursor-pointer">
                            <UserIcon className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/users/${user.id}/edit`} className="cursor-pointer">
                            <PencilIcon className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <ArchiveIcon className="mr-2 h-4 w-4" />
                          {user.status === "archived" ? "Unarchive" : "Archive"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

