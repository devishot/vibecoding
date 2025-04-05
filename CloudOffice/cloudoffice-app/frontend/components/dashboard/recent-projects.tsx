"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function RecentProjects() {
  const projects = [
    {
      id: "PRJ-001",
      name: "Marketing Website Redesign",
      client: "TechCorp",
      progress: 65,
      hours: 42,
      totalHours: 80,
      team: [
        { name: "Alex Johnson", initials: "AJ", image: "/placeholder.svg?height=32&width=32" },
        { name: "Sarah Williams", initials: "SW", image: "/placeholder.svg?height=32&width=32" },
      ],
      dueDate: "2023-04-15",
    },
    {
      id: "PRJ-002",
      name: "Mobile App Development",
      client: "InnovateSoft",
      progress: 30,
      hours: 25,
      totalHours: 120,
      team: [
        { name: "David Miller", initials: "DM", image: "/placeholder.svg?height=32&width=32" },
        { name: "Emily Chen", initials: "EC", image: "/placeholder.svg?height=32&width=32" },
        { name: "Robert Kim", initials: "RK", image: "/placeholder.svg?height=32&width=32" },
      ],
      dueDate: "2023-05-30",
    },
    {
      id: "PRJ-003",
      name: "E-commerce Platform Integration",
      client: "ShopSmart",
      progress: 85,
      hours: 95,
      totalHours: 110,
      team: [
        { name: "Jennifer Lee", initials: "JL", image: "/placeholder.svg?height=32&width=32" },
        { name: "Michael Brown", initials: "MB", image: "/placeholder.svg?height=32&width=32" },
      ],
      dueDate: "2023-03-20",
    },
  ]

  return (
    <div className="space-y-4">
      {projects.map((project) => (
        <Card key={project.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <Badge variant="outline">{project.id}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>
                    Hours: {project.hours}/{project.totalHours}
                  </span>
                  <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="border-t p-4 bg-secondary/50">
              <div className="flex items-center justify-between">
                <div className="flex -space-x-2">
                  {project.team.map((member, i) => (
                    <Avatar key={i} className="border-2 border-background h-8 w-8">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.initials}</AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="text-sm">
                  <a href={`/projects/${project.id}`} className="text-primary hover:underline">
                    View Project
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

