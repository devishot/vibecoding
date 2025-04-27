from typing import List, Optional
from fastapi import APIRouter, HTTPException

from app.core.logging import logger
from app.core.dependencies import DBSessionDep
from app.schemas.task import TaskDto, TaskCreateDto, TaskUpdateDto
from app.crud.task import TaskCrud

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
    responses={404: {"description": "Not found"}},
)

# Task endpoints
@router.get("/", response_model=List[TaskDto])
async def read_tasks(
    db: DBSessionDep, # type: ignore
    skip: int = 0, 
    limit: int = 100, 
    project_id: Optional[int] = None,
    status: Optional[str] = None,
    # token: str = Depends(oauth2_scheme)
):
    task_crud = TaskCrud(db)
    tasks = await task_crud.get_tasks(skip=skip, limit=limit, project_id=project_id, status=status)
    return tasks

@router.post("/", response_model=TaskDto)
async def create_task(
    task: TaskCreateDto,
    db: DBSessionDep, # type: ignore
    # token: str = Depends(oauth2_scheme)
):
    logger.debug(f"Creating task: {task}")
    task_crud = TaskCrud(db)
    return await task_crud.create_task(task=task)

@router.get("/{task_id}", response_model=TaskDto)
async def read_task(
    task_id: int, 
    db: DBSessionDep, # type: ignore
    # token: str = Depends(oauth2_scheme)
):
    task_crud = TaskCrud(db)
    db_task = await task_crud.get_task(task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

@router.delete("/{task_id}")
async def delete_task(
    task_id: int,
    db: DBSessionDep, # type: ignore
    # token: str = Depends(oauth2_scheme)
):
    task_crud = TaskCrud(db)
    found_result = await task_crud.delete_task(task_id=task_id)
    if not found_result:
        raise HTTPException(status_code=404, detail="Task not found")

@router.put("/{task_id}", response_model=TaskDto)
async def update_task(
    task_id: int,
    task_updates: TaskUpdateDto,
    db: DBSessionDep, # type: ignore
    # token: str = Depends(oauth2_scheme)
):
    task_crud = TaskCrud(db)
    db_task = await task_crud.get_task(task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    updated_task = await task_crud.update_task(task_id=task_id, updates=task_updates)
    return updated_task

