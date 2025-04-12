from pydantic import BaseModel, EmailStr, Field, validator
from typing import List, Optional, Dict, Any, Union
from datetime import datetime
from enum import Enum

# # Enum classes
# class StatusEnum(str, Enum):
#     active = "active"
#     archived = "archived"
#     completed = "completed"

# class InvoiceStatusEnum(str, Enum):
#     draft = "draft"
#     submitted = "submitted"
#     paid = "paid"
#     overdue = "overdue"

# # Token schemas
# class Token(BaseModel):
#     access_token: str
#     token_type: str

# class TokenData(BaseModel):
#     email: Optional[str] = None

# User schemas
class OAuthAccountBase(BaseModel):
    provider: str
    provider_account_id: str

class OAuthAccountCreate(OAuthAccountBase):
    pass

class OAuthAccount(OAuthAccountBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    name: str
    name_en: str
    position: Optional[str] = None
    is_admin: bool = False

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    oauth_accounts: List[OAuthAccount] = []

    class Config:
        from_attributes = True

# # Client schemas
# class ClientBase(BaseModel):
#     name: str
#     name_en: str
#     description: Optional[str] = None
#     address: Optional[str] = None
#     status: StatusEnum = StatusEnum.active

# class ClientCreate(ClientBase):
#     pass

# class Client(ClientBase):
#     id: int
#     created_at: datetime
#     updated_at: Optional[datetime] = None
#     project_count: Optional[int] = 0

#     class Config:
#         orm_mode = True

# # Project schemas
# class ProjectTagBase(BaseModel):
#     name: str
#     value: str

# class ProjectTagCreate(ProjectTagBase):
#     pass

# class ProjectTag(ProjectTagBase):
#     id: int
#     project_id: int
#     created_at: datetime

#     class Config:
#         orm_mode = True

# class ProjectBase(BaseModel):
#     name: str
#     description: Optional[str] = None
#     client_id: int
#     budget: float = 0.0
#     start_date: datetime
#     end_date: datetime
#     status: StatusEnum = StatusEnum.active

# class ProjectCreate(ProjectBase):
#     team_member_ids: Optional[List[int]] = []

# class Project(ProjectBase):
#     id: int
#     created_at: datetime
#     updated_at: Optional[datetime] = None
#     client: Optional[Client] = None
#     custom_tags: List[ProjectTag] = []
#     progress: Optional[float] = 0.0
#     spent: Optional[float] = 0.0
#     task_count: Optional[int] = 0
#     completed_tasks: Optional[int] = 0
#     billable_hours: Optional[float] = 0.0
#     invoice_count: Optional[int] = 0
#     document_count: Optional[int] = 0

#     class Config:
#         orm_mode = True


# # Time entry schemas
# class TimeEntryBase(BaseModel):
#     user_id: int
#     project_id: int
#     task_id: Optional[int] = None
#     description: str
#     duration: float
#     is_billable: bool = True

# class TimeEntryCreate(TimeEntryBase):
#     pass

# class TimeEntry(TimeEntryBase):
#     id: int
#     created_at: datetime
#     updated_at: Optional[datetime] = None
#     user: Optional[User] = None
#     task: Optional[Task] = None

#     class Config:
#         orm_mode = True

# # Document schemas
# class DocumentBase(BaseModel):
#     name: str
#     file_path: str
#     file_type: str
#     file_size: int
#     project_id: int
#     uploaded_by_id: int

# class DocumentCreate(DocumentBase):
#     pass

# class Document(DocumentBase):
#     id: int
#     uploaded_at: datetime
#     uploaded_by: Optional[User] = None

#     class Config:
#         orm_mode = True

# # Invoice schemas
# class InvoiceBase(BaseModel):
#     project_id: int
#     amount: float
#     description: str
#     status: InvoiceStatusEnum = InvoiceStatusEnum.draft
#     issue_date: datetime
#     due_date: datetime
#     paid_date: Optional[datetime] = None

# class InvoiceCreate(InvoiceBase):
#     pass

# class Invoice(InvoiceBase):
#     id: int
#     created_at: datetime
#     updated_at: Optional[datetime] = None

#     class Config:
#         orm_mode = True

# # Activity schemas
# class ActivityBase(BaseModel):
#     user_id: int
#     action: str
#     entity_type: str
#     entity_id: int
#     description: str

# class ActivityCreate(ActivityBase):
#     pass

# class Activity(ActivityBase):
#     id: int
#     timestamp: datetime
#     user: Optional[User] = None

#     class Config:
#         orm_mode = True

# # Dashboard schemas
# class ProjectSummary(BaseModel):
#     id: int
#     name: str
#     client: str
#     progress: float
#     hours: float
#     total_hours: float
#     team: List[Dict[str, Any]]
#     due_date: str

# class TaskSummary(BaseModel):
#     id: str
#     title: str
#     project: str
#     status: str
#     priority: str
#     deadline: str
#     assignedBy: Dict[str, Any]

# class BillableHoursData(BaseModel):
#     current: float
#     target: float
#     percentage: float
#     data: List[Dict[str, Any]]

# class PersonalDashboard(BaseModel):
#     recent_projects: List[ProjectSummary]
#     assigned_tasks: List[TaskSummary]
#     billable_hours: BillableHoursData

# class ActiveProject(BaseModel):
#     id: str
#     name: str
#     client: str
#     billable_hours: float
#     total_budget: float
#     spent: float
#     progress: float
#     status: str

# class ActiveUser(BaseModel):
#     id: str
#     name: str
#     initials: str
#     image: Optional[str]
#     position: str
#     hours: Dict[str, float]
#     target: Dict[str, float]

# class InvoiceSummary(BaseModel):
#     id: str
#     client: str
#     project: str
#     amount: float
#     status: str
#     date: str

# class CompanyDashboard(BaseModel):
#     active_projects: List[ActiveProject]
#     active_users: List[ActiveUser]
#     invoices: List[InvoiceSummary]
#     revenue_forecast: List[Dict[str, Any]]
