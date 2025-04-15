from enum import Enum

class TaskStatusEnum(str, Enum):
    draft = "draft"
    to_do = "to_do"
    in_progress = "in_progress"
    completed = "completed"

class TaskPriorityEnum(str, Enum):
    not_defined = "not_defined"
    low = "low"
    medium = "medium"
    high = "high" 