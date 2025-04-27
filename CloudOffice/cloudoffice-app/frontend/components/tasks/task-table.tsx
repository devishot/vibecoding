"use client"

import { useState } from "react"
import { ArrowUpDown, Clock, MoreHorizontal, PencilIcon, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DRAFT_TASK_ID, TASK_STATUS_OPTIONS, TASK_PRIORITY_OPTIONS } from "@/lib/constants"
import { deleteTask, revalidateTasks, updateTask } from "@/lib/data-access/tasks"

interface TaskTableProps {
  tasks: any[]
  onEditTask: (task: any) => void
}

export function TaskTable({ tasks, onEditTask }: TaskTableProps) {
  const [sortField, setSortField] = useState<string>("id")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [localTasks, setLocalTasks] = useState(tasks)

  const handleTaskChange = async (taskId: number, field: string, value: any) => {
    // Update local state immediately for responsive UI
    setLocalTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, [field]: value } : task
      )
    )

    // Update backend
    try {
      await updateTask(taskId, { [field]: value }, false)
    } catch (error) {
      // Reload tasks to revert local state
      revalidateTasks()
      console.error('Failed to update task:', error)
    }
  }

  // Sort tasks
  const sortedTasks = [...localTasks].sort((a, b) => {
    if (a.id === DRAFT_TASK_ID) return 1;
    if (b.id === DRAFT_TASK_ID) return -1;
    const fieldA = a[sortField]
    const fieldB = b[sortField]

    if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
    if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Sort by field
  const sortBy = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Projects (sample data)
  const projects = [
    { value: "marketing-website", label: "Marketing Website Redesign" },
    { value: "mobile-app", label: "Mobile App Development" },
    { value: "ecommerce", label: "E-commerce Platform Integration" },
    { value: "project-management", label: "Project Management App" },
  ]

  // Users (sample data)
  const users = [
    { id: "USR-001", name: "David Robinson", initials: "DR" },
    { id: "USR-002", name: "Lisa Smith", initials: "LS" },
    { id: "USR-003", name: "Daniel Brown", initials: "DB" },
    { id: "USR-004", name: "William Johnson", initials: "WJ" },
    { id: "USR-005", name: "Michael Miller", initials: "MM" },
    { id: "USR-006", name: "David Lee", initials: "DL" },
  ]

  // Get status badge variant
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "to-do":
        return "outline"
      case "in-progress":
        return "secondary"
      case "completed":
        return "default"
      default:
        return "outline"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "to-do":
        return "⭘"
      case "in-progress":
        return "⟳"
      case "completed":
        return "✓"
      default:
        return "⭘"
    }
  }

  // Get priority badge variant
  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "low":
        return "outline"
      case "medium":
        return "secondary"
      case "high":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">
              <div className="flex items-center cursor-pointer" onClick={() => sortBy("id")}>
                ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center cursor-pointer" onClick={() => sortBy("title")}>
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            {/* <TableHead className="hidden md:table-cell">Project</TableHead> */}
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[100px]">Priority</TableHead>
            {/* <TableHead className="hidden lg:table-cell">Assignee</TableHead> */}
            <TableHead className="hidden lg:table-cell">Deadline</TableHead>
            <TableHead className="hidden xl:table-cell w-[120px]">Est. Hours</TableHead>
            <TableHead className="hidden xl:table-cell w-[100px]">Billable</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{task.title}</div>
                  {/* <div className="hidden md:flex lg:hidden mt-1 space-x-1">
                    {task.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div> */}
                </div>
              </TableCell>
              {/* <TableCell className="hidden md:table-cell">
                <Select defaultValue={task.project}>
                  <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.value} value={project.value}>
                        {project.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell> */}
              <TableCell>
                <Select defaultValue={task.status} onValueChange={(value) => handleTaskChange(task.id, 'status', value)}>
                  <SelectTrigger className="h-8 w-[130px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <div className="flex items-center">
                          <span className="mr-2">{getStatusIcon(status.value)}</span>
                          {status.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select defaultValue={task.priority} onValueChange={(value) => handleTaskChange(task.id, 'priority', value)}>
                  <SelectTrigger className="h-8 w-[110px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {TASK_PRIORITY_OPTIONS.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        {priority.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
             {/* <TableCell className="hidden lg:table-cell">
                <Select defaultValue={task.assignee.id}>
                  <SelectTrigger className="h-8 w-[150px]">
                    <SelectValue placeholder="Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" alt={user.name} />
                            <AvatarFallback>{user.initials}</AvatarFallback>
                          </Avatar>
                          {user.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select> 
              </TableCell>*/}
              <TableCell className="hidden lg:table-cell">
                <Input type="date" defaultValue={task.deadline} className="h-8 w-[140px]" onChange={(e) => handleTaskChange(task.id, 'deadline', e.target.value)} />
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                <Input type="number" defaultValue={task.estimatedHours} className="h-8 w-[80px]" onChange={(e) => handleTaskChange(task.id, 'estimatedHours', parseFloat(e.target.value))} />
              </TableCell>
              <TableCell className="hidden xl:table-cell">
                <Checkbox checked={task.isBillable} className="mx-auto block" onCheckedChange={(checked) => handleTaskChange(task.id, 'isBillable', checked)} />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-1">
                  {/* <Button variant="ghost" size="icon" title="Log time">
                    <Clock className="h-4 w-4" />
                  </Button> */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditTask(task)}>
                        <PencilIcon className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="mr-2 h-4 w-4" />
                        Log Time
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive" onClick={() => deleteTask(task.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
