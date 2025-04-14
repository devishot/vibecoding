"use client"

import { useState, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DRAFT_TASK_ID } from "@/lib/constants"

interface TaskEditDialogProps {
  task: any | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: any) => void
}

export function TaskEditDialog({ task, open, onOpenChange, onSave }: TaskEditDialogProps) {
  const [editedTask, setEditedTask] = useState<any | null>(null)
  const [newTag, setNewTag] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task })
      setSelectedTags(task.tags || [])
    }
  }, [task])

  if (!editedTask) return null

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
    { id: "USR-001", name: "David Robinson", initials: "DR" },
    { id: "USR-002", name: "Lisa Smith", initials: "LS" },
    { id: "USR-003", name: "Daniel Brown", initials: "DB" },
    { id: "USR-004", name: "William Johnson", initials: "WJ" },
    { id: "USR-005", name: "Michael Miller", initials: "MM" },
    { id: "USR-006", name: "David Lee", initials: "DL" },
  ]

  // Common tags
  const commonTags = [
    "UX research",
    "prototyping",
    "test",
    "design",
    "frontend",
    "backend",
    "bug fix",
    "code review",
    "QA",
  ]

  // Handle input changes
  const handleChange = (field: string, value: any) => {
    setEditedTask({ ...editedTask, [field]: value })
  }

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  // Add new tag
  const handleAddTag = () => {
    if (newTag && !selectedTags.includes(newTag)) {
      setSelectedTags([...selectedTags, newTag])
      setNewTag("")
    }
  }

  // Remove tag
  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  // Handle save
  const handleSave = () => {
    const updatedTask = {
      ...editedTask,
      tags: selectedTags,
    }
    onSave(updatedTask)
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {editedTask.id === DRAFT_TASK_ID && !editedTask.title ? "New task" : editedTask.title}
          </DialogTitle>
          {editedTask.id !== DRAFT_TASK_ID && (
            <DialogDescription>Task ID: {editedTask.id}</DialogDescription>
          )}
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={editedTask.status} onValueChange={(value) => handleChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <div className="space-y-2">
              <Label htmlFor="assignee">Assignee</Label>
              <Select
                value={editedTask.assignee.id}
                onValueChange={(value) => {
                  const user = users.find((u) => u.id === value)
                  if (user) {
                    handleChange("assignee", {
                      id: user.id,
                      name: user.name,
                      initials: user.initials,
                      image: "/placeholder.svg?height=32&width=32",
                    })
                  }
                }}
              >
                <SelectTrigger id="assignee">
                  <SelectValue placeholder="Select assignee" />
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
            </div> */}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={editedTask.title} onChange={(e) => handleChange("title", e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="project">Project</Label>
              <Select value={editedTask.project} onValueChange={(value) => handleChange("project", value)}>
                <SelectTrigger id="project">
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
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={editedTask.priority} onValueChange={(value) => handleChange("priority", value)}>
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                id="newTag"
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={handleAddTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2">
              <Label className="text-sm">Common Tags</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {commonTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagSelect(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div> */}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={editedTask.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedHours">Estimated Hours</Label>
              <Input
                id="estimatedHours"
                type="number"
                value={editedTask.estimatedHours}
                onChange={(e) => handleChange("estimatedHours", Number.parseFloat(e.target.value))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={editedTask.startTime || ""}
                onChange={(e) => handleChange("startTime", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={editedTask.endTime || ""}
                onChange={(e) => handleChange("endTime", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isBillable"
                checked={editedTask.isBillable}
                onCheckedChange={(checked) => handleChange("isBillable", checked)}
              />
              <Label htmlFor="isBillable">Billable</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={5}
              value={editedTask.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Created:</span> {formatDate(editedTask.createdAt)}
            </div>
            <div>
              <span className="font-medium">Updated:</span> {formatDate(editedTask.updatedAt)}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
