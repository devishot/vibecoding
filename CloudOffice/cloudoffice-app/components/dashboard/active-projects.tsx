"use client"

import { ArrowRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ActiveProjects() {
  const projects = [
    {
      id: "PRJ-001",
      name: "Marketing Website Redesign",
      client: "TechCorp",
      billableHours: 42,
      totalBudget: 8000,
      spent: 4200,
      progress: 65,
      status: "On Track",
    },
    {
      id: "PRJ-002",
      name: "Mobile App Development",
      client: "InnovateSoft",
      billableHours: 25,
      totalBudget: 25000,
      spent: 8300,
      progress: 30,
      status: "On Track",
    },
    {
      id: "PRJ-003",
      name: "E-commerce Platform Integration",
      client: "ShopSmart",
      billableHours: 95,
      totalBudget: 12000,
      spent: 10500,
      progress: 85,
      status: "At Risk",
    },
    {
      id: "PRJ-004",
      name: "Branding Campaign",
      client: "NewEdge",
      billableHours: 38,
      totalBudget: 6000,
      spent: 3800,
      progress: 55,
      status: "On Track",
    },
    {
      id: "PRJ-005",
      name: "CRM Implementation",
      client: "GlobalServices",
      billableHours: 67,
      totalBudget: 15000,
      spent: 9800,
      progress: 70,
      status: "Delayed",
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
                <Badge
                  variant={
                    project.status === "On Track"
                      ? "default"
                      : project.status === "At Risk"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {project.status}
                </Badge>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Budget</span>
                    <span>
                      ${project.spent.toLocaleString()} / ${project.totalBudget.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={(project.spent / project.totalBudget) * 100} className="h-2" />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm">
                  <span className="text-muted-foreground">Billable Hours: </span>
                  <span>{project.billableHours} hrs</span>
                </div>
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <a href={`/projects/${project.id}`}>
                    View Details
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

