import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, FileText, Pencil, Receipt, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState({
    id: params.id,
    name: "Marketing Website Redesign",
    client: "TechCorp",
    description:
      "Redesign of the main marketing website with focus on user experience and conversion optimization. The project includes creating new wireframes, design mockups, and implementing a responsive design.",
    taskCount: 12,
    completedTasks: 6,
    billableHours: 42,
    invoiceCount: 2,
    documentCount: 5,
    progress: 65,
    budget: 8000,
    spent: 4200,
    status: "active",
    startDate: "2023-01-15",
    endDate: "2023-04-15",
  })

  const clients = [
    { id: "CLT-001", name: "TechCorp" },
    { id: "CLT-002", name: "InnovateSoft" },
    { id: "CLT-003", name: "ShopSmart" },
    { id: "CLT-004", name: "NewEdge" },
    { id: "CLT-005", name: "GlobalServices" },
  ]

  const customTags = [
    { id: 1, name: "Project Type", value: "Website" },
    { id: 2, name: "Priority", value: "High" },
    { id: 3, name: "Platform", value: "WordPress" },
  ]

  const tasks = [
    {
      id: "TSK-001",
      title: "Design Homepage Wireframes",
      estimatedTime: 8,
      timeSpent: 7.5,
      type: "billable",
      assignee: {
        name: "Sarah Williams",
        initials: "SW",
        image: "/placeholder.svg?height=32&width=32",
      },
      status: "completed",
    },
    {
      id: "TSK-002",
      title: "Create Style Guide",
      estimatedTime: 6,
      timeSpent: 8,
      type: "billable",
      assignee: {
        name: "Alex Johnson",
        initials: "AJ",
        image: "/placeholder.svg?height=32&width=32",
      },
      status: "completed",
    },
    {
      id: "TSK-003",
      title: "Implement Homepage",
      estimatedTime: 16,
      timeSpent: 12,
      type: "billable",
      assignee: {
        name: "David Miller",
        initials: "DM",
        image: "/placeholder.svg?height=32&width=32",
      },
      status: "in-progress",
    },
    {
      id: "TSK-004",
      title: "Setup Analytics",
      estimatedTime: 4,
      timeSpent: 0,
      type: "non-billable",
      assignee: {
        name: "Emily Chen",
        initials: "EC",
        image: "/placeholder.svg?height=32&width=32",
      },
      status: "not-started",
    },
    {
      id: "TSK-005",
      title: "Content Migration",
      estimatedTime: 8,
      timeSpent: 2,
      type: "billable",
      assignee: {
        name: "Michael Brown",
        initials: "MB",
        image: "/placeholder.svg?height=32&width=32",
      },
      status: "in-progress",
    },
  ]

  const timeEntries = [
    {
      id: "TE-001",
      date: "2023-02-10",
      hours: 4.5,
      description: "Homepage design implementation",
      task: "Design Homepage Wireframes",
      user: {
        name: "Sarah Williams",
        initials: "SW",
        image: "/placeholder.svg?height=32&width=32",
      },
      billable: true,
    },
    {
      id: "TE-002",
      date: "2023-02-11",
      hours: 3.0,
      description: "Finalized homepage wireframes",
      task: "Design Homepage Wireframes",
      user: {
        name: "Sarah Williams",
        initials: "SW",
        image: "/placeholder.svg?height=32&width=32",
      },
      billable: true,
    },
    {
      id: "TE-003",
      date: "2023-02-14",
      hours: 6.0,
      description: "Created initial style guide drafts",
      task: "Create Style Guide",
      user: {
        name: "Alex Johnson",
        initials: "AJ",
        image: "/placeholder.svg?height=32&width=32",
      },
      billable: true,
    },
    {
      id: "TE-004",
      date: "2023-02-15",
      hours: 2.0,
      description: "Style guide revisions based on feedback",
      task: "Create Style Guide",
      user: {
        name: "Alex Johnson",
        initials: "AJ",
        image: "/placeholder.svg?height=32&width=32",
      },
      billable: true,
    },
    {
      id: "TE-005",
      date: "2023-02-18",
      hours: 7.0,
      description: "Started homepage implementation",
      task: "Implement Homepage",
      user: {
        name: "David Miller",
        initials: "DM",
        image: "/placeholder.svg?height=32&width=32",
      },
      billable: true,
    },
    {
      id: "TE-006",
      date: "2023-02-21",
      hours: 5.0,
      description: "Homepage implementation continued",
      task: "Implement Homepage",
      user: {
        name: "David Miller",
        initials: "DM",
        image: "/placeholder.svg?height=32&width=32",
      },
      billable: true,
    },
    {
      id: "TE-007",
      date: "2023-02-22",
      hours: 2.0,
      description: "Started content migration",
      task: "Content Migration",
      user: {
        name: "Michael Brown",
        initials: "MB",
        image: "/placeholder.svg?height=32&width=32",
      },
      billable: true,
    },
  ]

  const documents = [
    {
      id: "DOC-001",
      name: "Project Brief.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: {
        name: "David Miller",
        initials: "DM",
        image: "/placeholder.svg?height=32&width=32",
      },
      uploadedAt: "2023-01-15",
    },
    {
      id: "DOC-002",
      name: "Homepage Wireframes.sketch",
      type: "Sketch",
      size: "8.7 MB",
      uploadedBy: {
        name: "Sarah Williams",
        initials: "SW",
        image: "/placeholder.svg?height=32&width=32",
      },
      uploadedAt: "2023-02-03",
    },
    {
      id: "DOC-003",
      name: "Style Guide.pdf",
      type: "PDF",
      size: "4.2 MB",
      uploadedBy: {
        name: "Alex Johnson",
        initials: "AJ",
        image: "/placeholder.svg?height=32&width=32",
      },
      uploadedAt: "2023-02-14",
    },
    {
      id: "DOC-004",
      name: "Content Inventory.xlsx",
      type: "Excel",
      size: "1.8 MB",
      uploadedBy: {
        name: "Michael Brown",
        initials: "MB",
        image: "/placeholder.svg?height=32&width=32",
      },
      uploadedAt: "2023-02-18",
    },
    {
      id: "DOC-005",
      name: "Client Feedback.docx",
      type: "Word",
      size: "1.2 MB",
      uploadedBy: {
        name: "Emily Chen",
        initials: "EC",
        image: "/placeholder.svg?height=32&width=32",
      },
      uploadedAt: "2023-02-25",
    },
  ]

  const invoices = [
    {
      id: "INV-001",
      date: "2023-02-15",
      amount: 2500,
      status: "paid",
      description: "Initial payment for Marketing Website Redesign",
    },
    {
      id: "INV-002",
      date: "2023-03-15",
      amount: 1700,
      status: "pending",
      description: "Second milestone payment for Marketing Website Redesign",
    },
  ]

  const [newTask, setNewTask] = useState({
    title: "",
    estimatedTime: 0,
    type: "billable",
    assignee: "",
  })

  const users = [
    { id: "USR-001", name: "Alex Johnson", initials: "AJ" },
    { id: "USR-002", name: "Sarah Williams", initials: "SW" },
    { id: "USR-003", name: "David Miller", initials: "DM" },
    { id: "USR-004", name: "Emily Chen", initials: "EC" },
    { id: "USR-005", name: "Michael Brown", initials: "MB" },
  ]

  const [newTag, setNewTag] = useState({
    name: "",
    value: "",
  })

  const predefinedTags = ["Project Type", "Priority", "Platform", "Department", "Language", "Framework", "Budget Code"]

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" asChild>
              <Link href="/projects">
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href={`/projects/${project.id}/edit`}>
                <Pencil className="mr-2 h-4 w-4" /> Edit
              </Link>
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${project.budget.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                ${project.spent.toLocaleString()} spent ({Math.round((project.spent / project.budget) * 100)}%)
              </div>
              <Progress value={(project.spent / project.budget) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.taskCount}</div>
              <div className="text-xs text-muted-foreground">
                {project.completedTasks} completed ({Math.round((project.completedTasks / project.taskCount) * 100)}%)
              </div>
              <Progress value={(project.completedTasks / project.taskCount) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Billable Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.billableHours}</div>
              <div className="text-xs text-muted-foreground">Hours logged across {timeEntries.length} time entries</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{project.progress}%</div>
              <div className="text-xs text-muted-foreground">
                {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
              </div>
              <Progress value={project.progress} className="h-2 mt-2" />
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="details" className="space-y-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="time-entries">Time Entries</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>View and edit the project details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      value={project.name}
                      onChange={(e) => setProject({ ...project, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="client">Client</Label>
                    <Select value={project.client} onValueChange={(value) => setProject({ ...project, client: value })}>
                      <SelectTrigger id="client">
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.name}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={project.description}
                      onChange={(e) => setProject({ ...project, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={project.startDate}
                      onChange={(e) => setProject({ ...project, startDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={project.endDate}
                      onChange={(e) => setProject({ ...project, endDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={project.budget}
                      onChange={(e) => setProject({ ...project, budget: Number(e.target.value) })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Tags</CardTitle>
                <CardDescription>Add and manage custom tags for this project.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {customTags.map((tag) => (
                    <Badge key={tag.id} variant="outline" className="text-sm px-2 py-1">
                      <span className="font-medium">{tag.name}:</span> {tag.value}
                    </Badge>
                  ))}
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="tagName">Tag Name</Label>
                    <Select value={newTag.name} onValueChange={(value) => setNewTag({ ...newTag, name: value })}>
                      <SelectTrigger id="tagName">
                        <SelectValue placeholder="Select or enter tag name" />
                      </SelectTrigger>
                      <SelectContent>
                        {predefinedTags.map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagValue">Tag Value</Label>
                    <Input
                      id="tagValue"
                      value={newTag.value}
                      onChange={(e) => setNewTag({ ...newTag, value: e.target.value })}
                    />
                  </div>

                  <div className="flex items-end">
                    <Button className="w-full" disabled={!newTag.name || !newTag.value}>
                      Add Tag
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Tasks</CardTitle>
                <CardDescription>Manage and track all tasks for this project.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="space-y-2">
                      <Label htmlFor="taskTitle">Task Title</Label>
                      <Input
                        id="taskTitle"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estimatedTime">Estimated Time (hours)</Label>
                      <Input
                        id="estimatedTime"
                        type="number"
                        value={newTask.estimatedTime}
                        onChange={(e) => setNewTask({ ...newTask, estimatedTime: Number(e.target.value) })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="taskType">Type</Label>
                      <Select value={newTask.type} onValueChange={(value) => setNewTask({ ...newTask, type: value })}>
                        <SelectTrigger id="taskType">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="billable">Billable</SelectItem>
                          <SelectItem value="non-billable">Non-billable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="assignee">Assignee</Label>
                      <Select
                        value={newTask.assignee}
                        onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}
                      >
                        <SelectTrigger id="assignee">
                          <SelectValue placeholder="Select assignee" />
                        </SelectTrigger>
                        <SelectContent>
                          {users.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button disabled={!newTask.title || !newTask.estimatedTime || !newTask.assignee}>Add Task</Button>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead className="hidden md:table-cell">Assignee</TableHead>
                          <TableHead className="hidden lg:table-cell w-[120px]">Est. Time</TableHead>
                          <TableHead className="hidden lg:table-cell w-[120px]">Time Spent</TableHead>
                          <TableHead className="w-[120px]">Status</TableHead>
                          <TableHead className="w-[100px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell className="font-medium">{task.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{task.title}</div>
                              <div className="hidden md:block lg:hidden text-xs text-muted-foreground">
                                Assigned to: {task.assignee.name}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-7 w-7">
                                  <AvatarImage src={task.assignee.image} alt={task.assignee.name} />
                                  <AvatarFallback>{task.assignee.initials}</AvatarFallback>
                                </Avatar>
                                {task.assignee.name}
                              </div>
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">{task.estimatedTime}h</TableCell>
                            <TableCell className="hidden lg:table-cell">{task.timeSpent}h</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  task.status === "completed"
                                    ? "default"
                                    : task.status === "in-progress"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {task.status === "completed"
                                  ? "Completed"
                                  : task.status === "in-progress"
                                    ? "In Progress"
                                    : "Not Started"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Clock className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="time-entries" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Time Entries</CardTitle>
                <CardDescription>Track and manage time spent on the project.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead className="hidden md:table-cell">User</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="hidden lg:table-cell">Task</TableHead>
                        <TableHead className="w-[80px]">Hours</TableHead>
                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeEntries.map((entry) => (
                        <TableRow key={entry.id}>
                          <TableCell className="font-medium">{entry.id}</TableCell>
                          <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src={entry.user.image} alt={entry.user.name} />
                                <AvatarFallback>{entry.user.initials}</AvatarFallback>
                              </Avatar>
                              <span className="hidden lg:inline">{entry.user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {entry.description}
                            <div className="md:hidden text-xs text-muted-foreground">By: {entry.user.name}</div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{entry.task}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {entry.hours}h
                              {entry.billable && (
                                <Badge className="ml-2" variant="outline">
                                  Billable
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
                <CardDescription>View and manage all project-related documents.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Type</TableHead>
                        <TableHead className="hidden md:table-cell">Size</TableHead>
                        <TableHead className="hidden lg:table-cell">Uploaded By</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {documents.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{doc.name}</div>
                            <div className="md:hidden text-xs text-muted-foreground">
                              {doc.type} • {doc.size}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{doc.type}</TableCell>
                          <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src={doc.uploadedBy.image} alt={doc.uploadedBy.name} />
                                <AvatarFallback>{doc.uploadedBy.initials}</AvatarFallback>
                              </Avatar>
                              {doc.uploadedBy.name}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(doc.uploadedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <a href="#" download>
                                <FileText className="h-4 w-4" />
                              </a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invoices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Invoices</CardTitle>
                <CardDescription>Manage invoices related to this project.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead className="w-[120px]">Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="w-[120px]">Amount</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                        <TableHead className="w-[100px] text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {invoices.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium">{invoice.id}</TableCell>
                          <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                          <TableCell>{invoice.description}</TableCell>
                          <TableCell>${invoice.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                invoice.status === "paid"
                                  ? "default"
                                  : invoice.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon" asChild>
                              <a href="#" download>
                                <Receipt className="h-4 w-4" />
                              </a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

