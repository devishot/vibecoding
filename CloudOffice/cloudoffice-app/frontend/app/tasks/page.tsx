import { Filter, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { TaskTable } from "@/components/tasks/task-table"
import { TaskEditDialog } from "@/components/tasks/task-edit-dialog"
import { TaskFilters } from "@/components/tasks/task-filters"
import { readTasks } from "@/lib/data-access/tasks"


export default async function TasksPage() {
  // const [selectedTask, setSelectedTask] = useState<any | null>(null)
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  // const [showFilters, setShowFilters] = useState(false)
  // const [activeTab, setActiveTab] = useState("my-tasks")
  const selectedTask = null
  const isEditDialogOpen = false
  const showFilters = false
  const activeTab = "my-tasks"
  const setActiveTab = (value: string) => {}
  const setShowFilters = (value: boolean) => {}
  const setIsEditDialogOpen = (value: boolean) => {}
  const setSelectedTask = (value: any) => {}

  const tasks = await readTasks()

  // Filter tasks based on active tab
  const currentUser = { id: "USR-006" } // Simulating current user
  // const filteredTasks = activeTab === "my-tasks" ? tasks.filter((task: any) => task.assignee.id === currentUser.id) : tasks
  const filteredTasks = tasks

  
  const handleEditTask = (task: any) => {
    // setSelectedTask(task)
    // setIsEditDialogOpen(true)
  }

  const handleSaveTask = (updatedTask: any) => {
    console.log("Saving task:", updatedTask)
    // setIsEditDialogOpen(false)
    // setSelectedTask(null)
    // In a real app, you would update the task in your state or database here
  }

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Tasks</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="hidden md:flex">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {showFilters && <X className="ml-2 h-4 w-4" />}
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className={`${showFilters ? "block" : "hidden"} md:block md:w-[250px]`}>
            <Card className="p-4">
              <TaskFilters />
            </Card>
          </div>

          <div className={`flex-1 ${showFilters ? "md:w-[calc(100%-266px)]" : "w-full"}`}>
            <Tabs defaultValue="my-tasks" className="space-y-4" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
                  <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              <TabsContent value="my-tasks" className="space-y-4">
                <TaskTable tasks={filteredTasks} onEditTask={handleEditTask} />
              </TabsContent>

              <TabsContent value="all-tasks" className="space-y-4">
                <TaskTable tasks={filteredTasks} onEditTask={handleEditTask} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <TaskEditDialog
        task={selectedTask}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveTask}
      />
    </div>
  )
}
