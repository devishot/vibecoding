from pydantic import BaseModel
from typing import List, Optional, Dict, Any, Union
from datetime import datetime, date
from enum import Enum
from app.core.constants import TaskStatusEnum, TaskPriorityEnum

# Task schemas
class TaskBaseDto(BaseModel):
    title: str
    description: Optional[str] = None
    # project: Project
    # assignee: Optional[User] = None
    # created_by: Optional[User] = None
    estimated_hours: float = 0.0
    is_billable: bool = False
    status: TaskStatusEnum = TaskStatusEnum.to_do
    priority: TaskPriorityEnum = TaskPriorityEnum.not_defined
    deadline: Optional[date] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None

class TaskCreateDto(TaskBaseDto):
    pass

class TaskUpdateDto(BaseModel):
    estimated_hours: Optional[float] = None 
    is_billable: Optional[bool] = None
    status: Optional[TaskStatusEnum] = None
    priority: Optional[TaskPriorityEnum] = None
    deadline: Optional[date] = None

class TaskDto(TaskBaseDto):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    time_spent: Optional[float] = 0.0

    class Config:
        from_attributes = True