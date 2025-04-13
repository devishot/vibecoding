"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function TaskFilters() {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    project: "",
    assignee: "",
    startDate: "",
    endDate: "",
    showBillableOnly: false,
  })

  const handleFilterChange = (field: string, value: any) => {
    setFilters({ ...filters, [field]: value })
  }

  const handleReset = () => {
    setFilters({
      status: "",
      priority: "",
      project: "",
      assignee: "",
      startDate: "",
      endDate: "",
      showBillableOnly: false,
    })
  }

  // Status options
  const statusOptions = [
    { value: "to-do", label: "To-do" },
    { value: "in-progress", label: "In progress" },
    { value: "completed", label: "Completed" },
  ]

  // Priority options
  const priorityOptions = [
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ]

  // Projects (sample data)
  const projects = [
    { value: "marketing-website", label: "Marketing Website Redesign" },
    { value: "mobile-app", label: "Mobile App Development" },
    { value: "ecommerce", label: "E-commerce Platform Integration" },
    { value: "project-management", label: "Project Management App" },
  ]

  // Users (sample data)
  const users = [
    { id: "USR-001", name: "David Robinson" },
    { id: "USR-002", name: "Lisa Smith" },
    { id: "USR-003", name: "Daniel Brown" },
    { id: "USR-004", name: "William Johnson" },
    { id: "USR-005", name: "Michael Miller" },
    { id: "USR-006", name: "David Lee" },
  ]

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Filters</h3>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="filter-status">Status</Label>
          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger id="filter-status">
              <SelectValue placeholder="Any status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any status</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="filter-priority">Priority</Label>
          <Select value={filters.priority} onValueChange={(value) => handleFilterChange("priority", value)}>
            <SelectTrigger id="filter-priority">
              <SelectValue placeholder="Any priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any priority</SelectItem>
              {priorityOptions.map((priority) => (
                <SelectItem key={priority.value} value={priority.value}>
                  {priority.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="filter-project">Project</Label>
          <Select value={filters.project} onValueChange={(value) => handleFilterChange("project", value)}>
            <SelectTrigger id="filter-project">
              <SelectValue placeholder="Any project" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any project</SelectItem>
              {projects.map((project) => (
                <SelectItem key={project.value} value={project.value}>
                  {project.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="filter-assignee">Assignee</Label>
          <Select value={filters.assignee} onValueChange={(value) => handleFilterChange("assignee", value)}>
            <SelectTrigger id="filter-assignee">
              <SelectValue placeholder="Any assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any assignee</SelectItem>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="filter-start-date">Start Date</Label>
          <Input
            id="filter-start-date"
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="filter-end-date">End Date</Label>
          <Input
            id="filter-end-date"
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Checkbox
            id="filter-billable"
            checked={filters.showBillableOnly}
            onCheckedChange={(checked) => handleFilterChange("showBillableOnly", checked)}
          />
          <Label htmlFor="filter-billable">Billable tasks only</Label>
        </div>

        <Button variant="outline" className="w-full mt-2" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
