from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Text, Enum, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum
from database import Base

# # Association tables for many-to-many relationships
# project_user = Table(
#     "project_user",
#     Base.metadata,
#     Column("project_id", Integer, ForeignKey("projects.id"), primary_key=True),
#     Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
# )

# # Enum for status values
# class StatusEnum(enum.Enum):
#     active = "active"
#     archived = "archived"
#     completed = "completed"

class TaskStatusEnum(enum.Enum):
    not_started = "not_started"
    in_progress = "in_progress"
    completed = "completed"

# class InvoiceStatusEnum(enum.Enum):
#     draft = "draft"
#     submitted = "submitted"
#     paid = "paid"
#     overdue = "overdue"

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True)
#     name = Column(String)
#     name_en = Column(String)
#     hashed_password = Column(String)
#     position = Column(String)
#     is_active = Column(Boolean, default=True)
#     is_admin = Column(Boolean, default=False)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
#     updated_at = Column(DateTime(timezone=True), onupdate=func.now())

#     # Relationships
#     time_entries = relationship("TimeEntry", back_populates="user")
#     assigned_tasks = relationship("Task", back_populates="assignee")
#     created_tasks = relationship("Task", foreign_keys="Task.created_by_id", back_populates="created_by")
#     projects = relationship("Project", secondary=project_user, back_populates="team_members")
#     documents = relationship("Document", back_populates="uploaded_by")
#     oauth_accounts = relationship("OAuthAccount", back_populates="user")

# class OAuthAccount(Base):
#     __tablename__ = "oauth_accounts"

#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     provider = Column(String)
#     provider_account_id = Column(String)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())

#     # Relationships
#     user = relationship("User", back_populates="oauth_accounts")

# class Client(Base):
#     __tablename__ = "clients"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     name_en = Column(String, index=True)
#     description = Column(Text)
#     address = Column(String)
#     status = Column(Enum(StatusEnum), default=StatusEnum.active)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
#     updated_at = Column(DateTime(timezone=True), onupdate=func.now())

#     # Relationships
#     projects = relationship("Project", back_populates="client")

# class Project(Base):
#     __tablename__ = "projects"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     description = Column(Text)
#     client_id = Column(Integer, ForeignKey("clients.id"))
#     budget = Column(Float, default=0.0)
#     start_date = Column(DateTime(timezone=True))
#     end_date = Column(DateTime(timezone=True))
#     status = Column(Enum(StatusEnum), default=StatusEnum.active)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
#     updated_at = Column(DateTime(timezone=True), onupdate=func.now())

#     # Relationships
#     client = relationship("Client", back_populates="projects")
#     tasks = relationship("Task", back_populates="project")
#     time_entries = relationship("TimeEntry", back_populates="project")
#     documents = relationship("Document", back_populates="project")
#     invoices = relationship("Invoice", back_populates="project")
#     team_members = relationship("User", secondary=project_user, back_populates="projects")
#     custom_tags = relationship("ProjectTag", back_populates="project")

# class ProjectTag(Base):
#     __tablename__ = "project_tags"

#     id = Column(Integer, primary_key=True, index=True)
#     project_id = Column(Integer, ForeignKey("projects.id"))
#     name = Column(String)
#     value = Column(String)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())

#     # Relationships
#     project = relationship("Project", back_populates="custom_tags")

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
    deadline = Column(DateTime(timezone=True))
    start_time = Column(DateTime(timezone=True))
    end_time = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # # Relationships
    # project = relationship("Project", back_populates="tasks")
    # assignee = relationship("User", foreign_keys=[assignee_id], back_populates="assigned_tasks")
    # created_by = relationship("User", foreign_keys=[created_by_id], back_populates="created_tasks")
    # time_entries = relationship("TimeEntry", back_populates="task")

# class TimeEntry(Base):
#     __tablename__ = "time_entries"

#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     project_id = Column(Integer, ForeignKey("projects.id"))
#     task_id = Column(Integer, ForeignKey("tasks.id"), nullable=True)
#     description = Column(Text)
#     duration = Column(Float)  # Duration in hours
#     is_billable = Column(Boolean, default=True)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
#     updated_at = Column(DateTime(timezone=True), onupdate=func.now())

#     # Relationships
#     user = relationship("User", back_populates="time_entries")
#     project = relationship("Project", back_populates="time_entries")
#     task = relationship("Task", back_populates="time_entries")

# class Document(Base):
#     __tablename__ = "documents"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     file_path = Column(String)
#     file_type = Column(String)
#     file_size = Column(Integer)  # Size in bytes
#     project_id = Column(Integer, ForeignKey("projects.id"))
#     uploaded_by_id = Column(Integer, ForeignKey("users.id"))
#     uploaded_at = Column(DateTime(timezone=True), server_default=func.now())

#     # Relationships
#     project = relationship("Project", back_populates="documents")
#     uploaded_by = relationship("User", back_populates="documents")

# class Invoice(Base):
#     __tablename__ = "invoices"

#     id = Column(Integer, primary_key=True, index=True)
#     project_id = Column(Integer, ForeignKey("projects.id"))
#     amount = Column(Float)
#     description = Column(Text)
#     status = Column(Enum(InvoiceStatusEnum), default=InvoiceStatusEnum.draft)
#     issue_date = Column(DateTime(timezone=True), server_default=func.now())
#     due_date = Column(DateTime(timezone=True))
#     paid_date = Column(DateTime(timezone=True), nullable=True)
#     created_at = Column(DateTime(timezone=True), server_default=func.now())
#     updated_at = Column(DateTime(timezone=True), onupdate=func.now())

#     # Relationships
#     project = relationship("Project", back_populates="invoices")

# class Activity(Base):
#     __tablename__ = "activities"

#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     action = Column(String)
#     entity_type = Column(String)  # e.g., "project", "task", "client"
#     entity_id = Column(Integer)
#     description = Column(Text)
#     timestamp = Column(DateTime(timezone=True), server_default=func.now())

#     # Relationships
#     user = relationship("User")
