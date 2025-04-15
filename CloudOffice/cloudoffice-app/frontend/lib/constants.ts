export const DRAFT_TASK_ID = 0; 
export const DRAFT_TASK_TEMPLATE = {
    id: DRAFT_TASK_ID,
    priority: "not_defined",
    status: "draft"
};

// Task status options
export const TASK_STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "to_do", label: "To-do" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
]

// Task priority options
export const TASK_PRIORITY_OPTIONS = [
  { value: "not_defined", label: "Not defined" },
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
]