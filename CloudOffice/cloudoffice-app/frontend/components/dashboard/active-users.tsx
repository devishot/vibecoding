"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ActiveUsers({ filter }: { filter: string }) {
  const users = [
    {
      id: "USR-001",
      name: "Alex Johnson",
      initials: "AJ",
      image: "/placeholder.svg?height=32&width=32",
      position: "Senior Developer",
      hours: {
        today: 4.5,
        thisWeek: 22.5,
        thisMonth: 85.0,
      },
      target: {
        today: 8,
        thisWeek: 40,
        thisMonth: 160,
      },
    },
    {
      id: "USR-002",
      name: "Sarah Williams",
      initials: "SW",
      image: "/placeholder.svg?height=32&width=32",
      position: "UI/UX Designer",
      hours: {
        today: 6.2,
        thisWeek: 28.0,
        thisMonth: 110.5,
      },
      target: {
        today: 8,
        thisWeek: 40,
        thisMonth: 160,
      },
    },
    {
      id: "USR-003",
      name: "David Miller",
      initials: "DM",
      image: "/placeholder.svg?height=32&width=32",
      position: "Project Manager",
      hours: {
        today: 5.8,
        thisWeek: 32.4,
        thisMonth: 128.5,
      },
      target: {
        today: 8,
        thisWeek: 40,
        thisMonth: 160,
      },
    },
    {
      id: "USR-004",
      name: "Emily Chen",
      initials: "EC",
      image: "/placeholder.svg?height=32&width=32",
      position: "Backend Developer",
      hours: {
        today: 7.5,
        thisWeek: 36.8,
        thisMonth: 142.0,
      },
      target: {
        today: 8,
        thisWeek: 40,
        thisMonth: 160,
      },
    },
  ]

  return (
    <div className="space-y-3">
      {users.map((user) => {
        const currentHours =
          user.hours[filter === "today" ? "today" : filter === "this-week" ? "thisWeek" : "thisMonth"]
        const targetHours =
          user.target[filter === "today" ? "today" : filter === "this-week" ? "thisWeek" : "thisMonth"]
        const percentage = Math.round((currentHours / targetHours) * 100)

        return (
          <Card key={user.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.position}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Billable Hours</span>
                  <span>
                    {currentHours} / {targetHours} hrs
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Utilization</span>
                  <span>{percentage}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

