import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CourseDashboard() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Course Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lectures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Homeworks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8/10</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#5</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Lecture</CardTitle>
            <CardDescription>Next lecture details</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Topic: Advanced Dynamic Programming</p>
            <p>Date: June 15, 2024</p>
            <p>Time: 10:00 AM EST</p>
            <Button className="mt-4" asChild>
              <Link href="/course/lectures">View All Lectures</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Homework</CardTitle>
            <CardDescription>Your next assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Topic: Graph Algorithms</p>
            <p>Due Date: June 20, 2024</p>
            <p>Problems: 5</p>
            <Button className="mt-4" asChild>
              <Link href="/course/homeworks">View Homeworks</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

