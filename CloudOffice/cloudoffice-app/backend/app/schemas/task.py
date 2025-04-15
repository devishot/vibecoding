from pydantic import BaseModel
from typing import List, Optional, Dict, Any, Union
from datetime import datetime, date
from enum import Enum
from app.core.constants import TaskStatusEnum, TaskPriorityEnum

# Task schemas
class TaskBaseDto(BaseModel):
    title: str
    description: Optional[str] = None
    # project_id: int
    # assignee_id: Optional[int] = None
    estimated_hours: float = 0.0
    is_billable: bool = False
    status: TaskStatusEnum = TaskStatusEnum.to_do
    priority: TaskPriorityEnum = TaskPriorityEnum.not_defined
    deadline: Optional[date] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class TaskCreateDto(TaskBaseDto):
    pass

class TaskDto(TaskBaseDto):
    id: int
    # created_by_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    time_spent: Optional[float] = 0.0
    # assignee: Optional[User] = None
    # created_by: Optional[User] = None

    class Config:
        from_attributes = True