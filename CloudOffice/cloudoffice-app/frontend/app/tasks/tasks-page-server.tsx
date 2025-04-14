   // frontend/app/tasks/TasksPageServer.tsx
   import { readTasks } from "@/lib/data-access/tasks";
   import TasksPageClient from "./tasks-page-client";

   export default async function TasksPageServer() {
     const tasks = await readTasks();
     return <TasksPageClient tasks={tasks} />;
   }
   