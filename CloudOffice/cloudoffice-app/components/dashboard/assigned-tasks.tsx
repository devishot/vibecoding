"use client"

import { useState } from "react"
import { CheckCircle2, Clock, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Task {
  id: string
  title: string
  project: string
  status: "Not Started" | "In Progress" | "Completed"
  priority: "Low" | "Medium" | "High"
  deadline: string
  assignedBy: {
    name: string
    initials: string
    image?: string
  }
}

const taskData: Task[] = [
  {
    id: "TSK-001",
    title: "Design Homepage Wireframes",
    project: "Marketing Website Redesign",
    status: "In Progress",
    priority: "High",
    deadline: "2023-03-15",
    assignedBy: {
      name: "Alex Johnson",
      initials: "AJ",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "TSK-002",
    title: "Implement User Authentication",
    project: "Mobile App Development",
    status: "Not Started",
    priority: "Medium",
    deadline: "2023-03-20",
    assignedBy: {
      name: "Sarah Williams",
      initials: "SW",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "TSK-003",
    title: "Payment Gateway Integration",
    project: "E-commerce Platform Integration",
    status: "Completed",
    priority: "High",
    deadline: "2023-03-10",
    assignedBy: {
      name: "David Miller",
      initials: "DM",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "TSK-004",
    title: "Create Product Catalog",
    project: "E-commerce Platform Integration",
    status: "In Progress",
    priority: "Medium",
    deadline: "2023-03-25",
    assignedBy: {
      name: "Jennifer Lee",
      initials: "JL",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
  {
    id: "TSK-005",
    title: "SEO Optimization",
    project: "Marketing Website Redesign",
    status: "Not Started",
    priority: "Low",
    deadline: "2023-04-01",
    assignedBy: {
      name: "Michael Brown",
      initials: "MB",
      image: "/placeholder.svg?height=32&width=32",
    },
  },
]

export function AssignedTasks({ filter }: { filter: string }) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  // Filter tasks based on time filter
  const filteredByTime = taskData.filter((task) => {
    const deadline = new Date(task.deadline)
    const today = new Date()

    if (filter === "today") {
      return deadline.toDateString() === today.toDateString()
    } else if (filter === "this-week") {
      const weekStart = new Date(today)
      weekStart.setDate(today.getDate() - today.getDay())
      const weekEnd = new Date(today)
      weekEnd.setDate(weekStart.getDate() + 6)
      return deadline >= weekStart && deadline <= weekEnd
    } else if (filter === "this-month") {
      return deadline.getMonth() === today.getMonth() && deadline.getFullYear() === today.getFullYear()
    }
    return true
  })

  // Filter tasks based on status if a status is selected
  const filteredTasks = selectedStatus
    ? filteredByTime.filter((task) => task.status === selectedStatus)
    : filteredByTime

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 mb-4">
        <Button
          variant={selectedStatus === null ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSelectedStatus(null)}
        >
          All
        </Button>
        <Button
          variant={selectedStatus === "Not Started" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSelectedStatus("Not Started")}
        >
          Not Started
        </Button>
        <Button
          variant={selectedStatus === "In Progress" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSelectedStatus("In Progress")}
        >
          In Progress
        </Button>
        <Button
          variant={selectedStatus === "Completed" ? "secondary" : "outline"}
          size="sm"
          onClick={() => setSelectedStatus("Completed")}
        >
          Completed
        </Button>
      </div>

      <div className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Card key={task.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      {task.status === "Completed" ? (
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      ) : task.status === "In Progress" ? (
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-2 text-gray-500" />
                      )}
                      <h4 className="font-medium">{task.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.project}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        task.priority === "High" ? "destructive" : task.priority === "Medium" ? "default" : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                    <Badge variant="outline">{task.id}</Badge>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <span>Deadline: </span>
                    <span className="ml-1 font-medium">{new Date(task.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground mr-2">Assigned by:</span>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={task.assignedBy.image} alt={task.assignedBy.name} />
                      <AvatarFallback>{task.assignedBy.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex justify-center items-center py-6 text-muted-foreground">
            No tasks found for the selected filters
          </div>
        )}
      </div>
    </div>
  )
}

