
from sqlalchemy import func, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional, Dict, Any

from app.models.task import Task
from app.schemas.task import TaskCreateDto


# Task CRUD operations
class TaskCrud:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_task(self, task_id: int) -> Task:
        result = await self.db.execute(
            select(Task).where(Task.id == task_id)
        )
        return result.scalar_one_or_none()

    async def get_tasks(self, skip: int = 0, limit: int = 100, project_id: Optional[int] = None, status: Optional[str] = None) -> List[Task]:
        query = select(Task)
        if project_id:
            query = query.where(Task.project_id == project_id)
        if status:
            query = query.where(Task.status == status)
        result = await self.db.execute(
            query.offset(skip).limit(limit)
        )
        return result.scalars().all()

    # TODO: Add current_user_id:int to the task
    async def create_task(self, task: TaskCreateDto) -> Task:
        db_task = Task(
            title=task.title,
            description=task.description,
            # project_id=task.project_id,
            # assignee_id=task.assignee_id,
            # created_by_id=current_user_id,
            estimated_hours=task.estimated_hours,
            is_billable=task.is_billable,
            status=task.status,
            priority=task.priority,
            deadline=task.deadline
        )
        self.db.add(db_task)
        await self.db.commit()
        await self.db.refresh(db_task)
        return db_task

    async def update_task(self, task_id: int, task: TaskCreateDto) -> Task:
        db_task = await self.get_task(task_id)
        if db_task:
            db_task.title = task.title
            db_task.description = task.description
            db_task.project_id = task.project_id
            db_task.assignee_id = task.assignee_id
            db_task.estimated_hours = task.estimated_hours
            db_task.is_billable = task.is_billable
            db_task.status = task.status
            db_task.priority = task.priority
            db_task.deadline = task.deadline
            await self.db.commit()
            await self.db.refresh(db_task)
        return db_task

    async def delete_task(self, task_id: int) -> bool:
        db_task = await self.get_task(task_id)
        if db_task:
            await self.db.delete(db_task)
            await self.db.commit()
            return True
        return False