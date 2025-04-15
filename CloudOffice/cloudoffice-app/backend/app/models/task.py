from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Date,Text, Enum, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.constants import TaskStatusEnum, TaskPriorityEnum
from app.core.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    # project_id = Column(Integer, ForeignKey("projects.id"), index=True)
    # assignee_id = Column(Integer, ForeignKey("users.id"), index=True)
    # created_by_id = Column(Integer, ForeignKey("users.id"))
    estimated_hours = Column(Float, default=0.0)
    is_billable = Column(Boolean, default=True)
    status = Column(Enum(TaskStatusEnum), default=TaskStatusEnum.draft)
    priority = Column(Enum(TaskPriorityEnum), default=TaskPriorityEnum.not_defined)
    deadline = Column(Date, nullable=True)
    start_time = Column(DateTime(timezone=True), nullable=True)
    end_time = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # # Relationships
    # project = relationship("Project", back_populates="tasks")
    # assignee = relationship("User", foreign_keys=[assignee_id], back_populates="assigned_tasks")
    # created_by = relationship("User", foreign_keys=[created_by_id], back_populates="created_tasks")
    # time_entries = relationship("TimeEntry", back_populates="task")