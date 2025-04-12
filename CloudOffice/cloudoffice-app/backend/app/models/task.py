from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Text, Enum, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from app.core.database import Base

class TaskStatusEnum(enum.Enum):
    not_started = "not_started"
    in_progress = "in_progress"
    completed = "completed"


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
    status = Column(Enum(TaskStatusEnum), default=TaskStatusEnum.not_started)
    priority = Column(String)
    deadline = Column(DateTime(timezone=True), nullable=True)
    start_time = Column(DateTime(timezone=True), nullable=True)
    end_time = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # # Relationships
    # project = relationship("Project", back_populates="tasks")
    # assignee = relationship("User", foreign_keys=[assignee_id], back_populates="assigned_tasks")
    # created_by = relationship("User", foreign_keys=[created_by_id], back_populates="created_tasks")
    # time_entries = relationship("TimeEntry", back_populates="task")