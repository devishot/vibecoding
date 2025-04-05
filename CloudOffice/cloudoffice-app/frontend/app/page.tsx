"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { RecentProjects } from "@/components/dashboard/recent-projects"
import { AssignedTasks } from "@/components/dashboard/assigned-tasks"
import { BillableHoursChart } from "@/components/dashboard/billable-hours-chart"
import { ActiveProjects } from "@/components/dashboard/active-projects"
import { InvoicesList } from "@/components/dashboard/invoices-list"
import { ActiveUsers } from "@/components/dashboard/active-users"

export default function Dashboard() {
  const [personalTimeFilter, setPersonalTimeFilter] = useState("this-week")
  const [companyTimeFilter, setCompanyTimeFilter] = useState("this-week")
  const [invoicesFilter, setInvoicesFilter] = useState("draft")

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Dashboard</TabsTrigger>
            <TabsTrigger value="company">Company Dashboard</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Recent Active Projects</CardTitle>
                  <CardDescription>Projects you're currently working on</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentProjects />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>Billable Hours</CardTitle>
                    <CardDescription>Current vs Target</CardDescription>
                  </div>
                  <Tabs value={personalTimeFilter} onValueChange={setPersonalTimeFilter} className="w-[260px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="today">Today</TabsTrigger>
                      <TabsTrigger value="this-week">This Week</TabsTrigger>
                      <TabsTrigger value="this-month">This Month</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <BillableHoursChart filter={personalTimeFilter} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>Assigned Tasks</CardTitle>
                    <CardDescription>Tasks assigned to you</CardDescription>
                  </div>
                  <Tabs value={personalTimeFilter} onValueChange={setPersonalTimeFilter} className="w-[260px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="today">Today</TabsTrigger>
                      <TabsTrigger value="this-week">This Week</TabsTrigger>
                      <TabsTrigger value="this-month">This Month</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <AssignedTasks filter={personalTimeFilter} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="company" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Current company projects with billable hours and budget</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActiveProjects />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>Active Users</CardTitle>
                    <CardDescription>User billable hours</CardDescription>
                  </div>
                  <Tabs value={companyTimeFilter} onValueChange={setCompanyTimeFilter} className="w-[260px]">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="today">Today</TabsTrigger>
                      <TabsTrigger value="this-week">This Week</TabsTrigger>
                      <TabsTrigger value="this-month">This Month</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <ActiveUsers filter={companyTimeFilter} />
                </CardContent>
              </Card>
              <Card className="col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle>Invoices</CardTitle>
                    <CardDescription>Recent invoices and status</CardDescription>
                  </div>
                  <Tabs value={invoicesFilter} onValueChange={setInvoicesFilter} className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="draft">Draft</TabsTrigger>
                      <TabsTrigger value="submitted">Submitted</TabsTrigger>
                      <TabsTrigger value="paid">Paid</TabsTrigger>
                      <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <InvoicesList filter={invoicesFilter} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Forecast</CardTitle>
                  <CardDescription>Projected revenue for the quarter</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { name: "Jan", actual: 4000, projected: 5000 },
                        { name: "Feb", actual: 5500, projected: 6000 },
                        { name: "Mar", actual: 0, projected: 7500 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="actual" fill="#8884d8" name="Actual" />
                      <Bar dataKey="projected" fill="#82ca9d" name="Projected" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

