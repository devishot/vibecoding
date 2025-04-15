"use client";

import { useState } from "react";
import { Filter, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { TaskTable } from "@/components/tasks/task-table";
import { TaskForm } from "@/app/tasks/task-form";
import Header from "@/components/tasks/header";
import FilterSection from "@/components/tasks/filter-section";
import { DRAFT_TASK_ID, DRAFT_TASK_TEMPLATE } from "../../lib/constants";

export default function TasksPageClient({ tasks }: { tasks: any[] }) {
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  // const [showFilters, setShowFilters] = useState(false);
  const showFilters = false;
  const [activeTab, setActiveTab] = useState("my-tasks");

  const currentUser = { id: "USR-006" }; // Simulating current user
  const filteredTasks = tasks;
  
  const handleEditTask = (task: any) => {
    setSelectedTask(task);
    setIsEditFormOpen(true);
  };

  const handleTaskSaved = (updatedTask: any) => {
    console.log("Saving task:", updatedTask);
    setIsEditFormOpen(false);
    setSelectedTask(null);
  };

  const handleAddTask = () => {
    const existingDraft = filteredTasks.find(task => task.id === DRAFT_TASK_ID);
    const newDraft = existingDraft || DRAFT_TASK_TEMPLATE;
    if (!existingDraft) {
      filteredTasks.push(newDraft);
    }
    setSelectedTask(newDraft);
    setIsEditFormOpen(true);
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* <Header showFilters={showFilters} setShowFilters={setShowFilters} /> */}

        <div className="flex flex-col md:flex-row gap-4">
          {/* <FilterSection showFilters={showFilters} /> */}

          <div className={`flex-1 ${showFilters ? "md:w-[calc(100%-266px)]" : "w-full"}`}>
            <Tabs defaultValue="my-tasks" className="space-y-4" onValueChange={setActiveTab}>
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="my-tasks">My Tasks</TabsTrigger>
                  <TabsTrigger value="all-tasks">All Tasks</TabsTrigger>
                </TabsList>
                {/* <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div> */}
              </div>

              <TabsContent value="my-tasks" className="space-y-4">
                <TaskTable tasks={filteredTasks} onEditTask={handleEditTask} />
                <Button variant="outline" size="sm" onClick={() => handleAddTask()} className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </TabsContent>

              <TabsContent value="all-tasks" className="space-y-4">
                <TaskTable tasks={filteredTasks} onEditTask={handleEditTask} />
                <Button variant="outline" size="sm" onClick={() => handleAddTask()} className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Task
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <TaskForm
        task={selectedTask}
        open={isEditFormOpen}
        onOpenChange={setIsEditFormOpen}
        onSaved={handleTaskSaved}
      />
    </div>
  );
}
