import { useState } from "react"
import Link from "next/link"
import {
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  PencilIcon,
  ArchiveIcon,
  FolderIcon,
  FileIcon,
  ClockIcon,
  FileTextIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Project {
  id: string
  name: string
  client: string
  taskCount: number
  billableHours: number
  invoiceCount: number
  documentCount: number
  progress: number
  budget: number
  spent: number
  status: "active" | "archived" | "completed"
}

const projects: Project[] = [
  {
    id: "PRJ-001",
    name: "Marketing Website Redesign",
    client: "TechCorp",
    taskCount: 12,
    billableHours: 42,
    invoiceCount: 2,
    documentCount: 5,
    progress: 65,
    budget: 8000,
    spent: 4200,
    status: "active",
  },
  {
    id: "PRJ-002",
    name: "Mobile App Development",
    client: "InnovateSoft",
    taskCount: 28,
    billableHours: 125,
    invoiceCount: 3,
    documentCount: 8,
    progress: 30,
    budget: 25000,
    spent: 8300,
    status: "active",
  },
  {
    id: "PRJ-003",
    name: "E-commerce Platform Integration",
    client: "ShopSmart",
    taskCount: 18,
    billableHours: 95,
    invoiceCount: 4,
    documentCount: 6,
    progress: 85,
    budget: 12000,
    spent: 10500,
    status: "active",
  },
  {
    id: "PRJ-004",
    name: "Branding Campaign",
    client: "NewEdge",
    taskCount: 8,
    billableHours: 38,
    invoiceCount: 2,
    documentCount: 4,
    progress: 100,
    budget: 6000,
    spent: 5800,
    status: "completed",
  },
  {
    id: "PRJ-005",
    name: "CRM Implementation",
    client: "GlobalServices",
    taskCount: 22,
    billableHours: 67,
    invoiceCount: 3,
    documentCount: 7,
    progress: 70,
    budget: 15000,
    spent: 9800,
    status: "active",
  },
  {
    id: "PRJ-006",
    name: "Legacy System Migration",
    client: "OldTech",
    taskCount: 15,
    billableHours: 52,
    invoiceCount: 2,
    documentCount: 5,
    progress: 100,
    budget: 9500,
    spent: 9200,
    status: "archived",
  },
]

export default function ProjectsPage() {
  const [sortField, setSortField] = useState<keyof Project>("id")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // Sort by field
  const sortBy = (field: keyof Project) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filter and sort projects
  const activeProjects = [...projects]
    .filter((project) => project.status === "active")
    .sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const archivedProjects = [...projects]
    .filter((project) => project.status === "archived" || project.status === "completed")
    .sort((a, b) => {
      const fieldA = a[sortField]
      const fieldB = b[sortField]

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const ProjectsTable = ({ data }: { data: Project[] }) => (
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
                Project Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <div className="flex items-center cursor-pointer" onClick={() => sortBy("client")}>
                Client
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell w-[100px]">
              <div className="flex items-center cursor-pointer" onClick={() => sortBy("taskCount")}>
                Tasks
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell w-[100px]">
              <div className="flex items-center cursor-pointer" onClick={() => sortBy("billableHours")}>
                Hours
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="hidden xl:table-cell w-[100px]">Progress</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.id}</TableCell>
              <TableCell>
                <div className="font-medium">{project.name}</div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{project.client}</TableCell>
              <TableCell className="hidden lg:table-cell">{project.taskCount}</TableCell>
              <TableCell className="hidden lg:table-cell">{project.billableHours}</TableCell>
              <TableCell className="hidden xl:table-cell">
                <div className="flex items-center gap-2">
                  <Progress value={project.progress} className="h-2 w-[60px]" />
                  <span className="text-xs">{project.progress}%</span>
                </div>
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
                      <Link href={`/projects/${project.id}`} className="cursor-pointer">
                        <FolderIcon className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/projects/${project.id}/edit`} className="cursor-pointer">
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/projects/${project.id}/tasks`} className="cursor-pointer">
                        <FileIcon className="mr-2 h-4 w-4" />
                        Tasks ({project.taskCount})
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/projects/${project.id}/time-entries`} className="cursor-pointer">
                        <ClockIcon className="mr-2 h-4 w-4" />
                        Time Entries ({project.billableHours}h)
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/projects/${project.id}/documents`} className="cursor-pointer">
                        <FileTextIcon className="mr-2 h-4 w-4" />
                        Documents ({project.documentCount})
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <ArchiveIcon className="mr-2 h-4 w-4" />
                      {project.status === "archived" ? "Unarchive" : "Archive"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <Button asChild>
            <Link href="/projects/new">
              <Plus className="mr-2 h-4 w-4" /> Add Project
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {activeProjects.length > 0 ? (
              <ProjectsTable data={activeProjects} />
            ) : (
              <div className="flex justify-center items-center py-12 text-muted-foreground">
                No active projects found
              </div>
            )}
          </TabsContent>

          <TabsContent value="archived">
            {archivedProjects.length > 0 ? (
              <ProjectsTable data={archivedProjects} />
            ) : (
              <div className="flex justify-center items-center py-12 text-muted-foreground">
                No archived projects found
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

