from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta
from typing import List, Optional, Dict, Any
import jwt
from passlib.context import CryptContext
import models
import schemas

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "YOUR_SECRET_KEY"  # Change this to a secure key in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# # Helper functions
# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password):
#     return pwd_context.hash(password)

# def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     return encoded_jwt

# def authenticate_user(db: Session, email: str, password: str):
#     user = get_user_by_email(db, email)
#     if not user:
#         return False
#     if not verify_password(password, user.hashed_password):
#         return False
#     return user

# def get_current_user(db: Session, token: str):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         email: str = payload.get("sub")
#         if email is None:
#             return None
#         token_data = schemas.TokenData(email=email)
#     except jwt.PyJWTError:
#         return None
#     user = get_user_by_email(db, email=token_data.email)
#     return user

# # User CRUD operations
# def get_user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()

# def get_user_by_email(db: Session, email: str):
#     return db.query(models.User).filter(models.User.email == email).first()

# def get_users(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.User).offset(skip).limit(limit).all()

# def create_user(db: Session, user: schemas.UserCreate):
#     hashed_password = get_password_hash(user.password)
#     db_user = models.User(
#         email=user.email,
#         name=user.name,
#         name_en=user.name_en,
#         position=user.position,
#         hashed_password=hashed_password,
#         is_admin=user.is_admin
#     )
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user

# def update_user(db: Session, user_id: int, user: schemas.UserCreate):
#     db_user = get_user(db, user_id)
#     if db_user:
#         db_user.email = user.email
#         db_user.name = user.name
#         db_user.name_en = user.name_en
#         db_user.position = user.position
#         db_user.is_admin = user.is_admin
#         if user.password:
#             db_user.hashed_password = get_password_hash(user.password)
#         db.commit()
#         db.refresh(db_user)
#     return db_user

# def delete_user(db: Session, user_id: int):
#     db_user = get_user(db, user_id)
#     if db_user:
#         db.delete(db_user)
#         db.commit()
#         return True
#     return False

# # Client CRUD operations
# def get_client(db: Session, client_id: int):
#     return db.query(models.Client).filter(models.Client.id == client_id).first()

# def get_clients(db: Session, skip: int = 0, limit: int = 100, status: Optional[str] = None):
#     query = db.query(models.Client)
#     if status:
#         query = query.filter(models.Client.status == status)
#     return query.offset(skip).limit(limit).all()

# def create_client(db: Session, client: schemas.ClientCreate):
#     db_client = models.Client(
#         name=client.name,
#         name_en=client.name_en,
#         description=client.description,
#         address=client.address,
#         status=client.status
#     )
#     db.add(db_client)
#     db.commit()
#     db.refresh(db_client)
#     return db_client

# def update_client(db: Session, client_id: int, client: schemas.ClientCreate):
#     db_client = get_client(db, client_id)
#     if db_client:
#         db_client.name = client.name
#         db_client.name_en = client.name_en
#         db_client.description = client.description
#         db_client.address = client.address
#         db_client.status = client.status
#         db.commit()
#         db.refresh(db_client)
#     return db_client

# def delete_client(db: Session, client_id: int):
#     db_client = get_client(db, client_id)
#     if db_client:
#         db.delete(db_client)
#         db.commit()
#         return True
#     return False

# # Project CRUD operations
# def get_project(db: Session, project_id: int):
#     return db.query(models.Project).filter(models.Project.id == project_id).first()

# def get_projects(db: Session, skip: int = 0, limit: int = 100, status: Optional[str] = None):
#     query = db.query(models.Project)
#     if status:
#         query = query.filter(models.Project.status == status)
#     return query.offset(skip).limit(limit).all()

# def create_project(db: Session, project: schemas.ProjectCreate):
#     db_project = models.Project(
#         name=project.name,
#         description=project.description,
#         client_id=project.client_id,
#         budget=project.budget,
#         start_date=project.start_date,
#         end_date=project.end_date,
#         status=project.status
#     )
#     db.add(db_project)
#     db.commit()
#     db.refresh(db_project)
    
#     # Add team members if provided
#     if project.team_member_ids:
#         for user_id in project.team_member_ids:
#             user = get_user(db, user_id)
#             if user:
#                 db_project.team_members.append(user)
#         db.commit()
#         db.refresh(db_project)
    
#     return db_project

# def update_project(db: Session, project_id: int, project: schemas.ProjectCreate):
#     db_project = get_project(db, project_id)
#     if db_project:
#         db_project.name = project.name
#         db_project.description = project.description
#         db_project.client_id = project.client_id
#         db_project.budget = project.budget
#         db_project.start_date = project.start_date
#         db_project.end_date = project.end_date
#         db_project.status = project.status
        
#         # Update team members if provided
#         if project.team_member_ids is not None:
#             db_project.team_members = []
#             for user_id in project.team_member_ids:
#                 user = get_user(db, user_id)
#                 if user:
#                     db_project.team_members.append(user)
        
#         db.commit()
#         db.refresh(db_project)
#     return db_project

# def delete_project(db: Session, project_id: int):
#     db_project = get_project(db, project_id)
#     if db_project:
#         db.delete(db_project)
#         db.commit()
#         return True
#     return False

# Task CRUD operations
def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()

def get_tasks(db: Session, skip: int = 0, limit: int = 100, project_id: Optional[int] = None, status: Optional[str] = None):
    query = db.query(models.Task)
    if project_id:
        query = query.filter(models.Task.project_id == project_id)
    if status:
        query = query.filter(models.Task.status == status)
    return query.offset(skip).limit(limit).all()

async def create_task(db: AsyncSession, task: schemas.TaskCreate, current_user_id: int):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        project_id=task.project_id,
        assignee_id=task.assignee_id,
        created_by_id=current_user_id,
        estimated_hours=task.estimated_hours,
        is_billable=task.is_billable,
        status=task.status,
        priority=task.priority,
        deadline=task.deadline
    )
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task

def update_task(db: Session, task_id: int, task: schemas.TaskCreate):
    db_task = get_task(db, task_id)
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
        db.commit()
        db.refresh(db_task)
    return db_task

def delete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)
    if db_task:
        db.delete(db_task)
        db.commit()
        return True
    return False

# # Time entry CRUD operations
# def get_time_entry(db: Session, time_entry_id: int):
#     return db.query(models.TimeEntry).filter(models.TimeEntry.id == time_entry_id).first()

# def get_time_entries(
#     db: Session, 
#     skip: int = 0, 
#     limit: int = 100, 
#     user_id: Optional[int] = None, 
#     project_id: Optional[int] = None,
#     task_id: Optional[int] = None,
#     start_date: Optional[datetime] = None,
#     end_date: Optional[datetime] = None
# ):
#     query = db.query(models.TimeEntry)
#     if user_id:
#         query = query.filter(models.TimeEntry.user_id == user_id)
#     if project_id:
#         query = query.filter(models.TimeEntry.project_id == project_id)
#     if task_id:
#         query = query.filter(models.TimeEntry.task_id == task_id)
#     if start_date:
#         query = query.filter(models.TimeEntry.start_time >= start_date)
#     if end_date:
#         query = query.filter(models.TimeEntry.start_time <= end_date)
#     return query.offset(skip).limit(limit).all()

# def create_time_entry(db: Session, time_entry: schemas.TimeEntryCreate):
#     db_time_entry = models.TimeEntry(
#         user_id=time_entry.user_id,
#         project_id=time_entry.project_id,
#         task_id=time_entry.task_id,
#         description=time_entry.description,
#         start_time=time_entry.start_time,
#         end_time=time_entry.end_time,
#         duration=time_entry.duration,
#         is_billable=time_entry.is_billable
#     )
#     db.add(db_time_entry)
#     db.commit()
#     db.refresh(db_time_entry)
#     return db_time_entry

# def update_time_entry(db: Session, time_entry_id: int, time_entry: schemas.TimeEntryCreate):
#     db_time_entry = get_time_entry(db, time_entry_id)
#     if db_time_entry:
#         db_time_entry.user_id = time_entry.user_id
#         db_time_entry.project_id = time_entry.project_id
#         db_time_entry.task_id = time_entry.task_id
#         db_time_entry.description = time_entry.description
#         db_time_entry.start_time = time_entry.start_time
#         db_time_entry.end_time = time_entry.end_time
#         db_time_entry.duration = time_entry.duration
#         db_time_entry.is_billable = time_entry.is_billable
#         db.commit()
#         db.refresh(db_time_entry)
#     return db_time_entry

# def delete_time_entry(db: Session, time_entry_id: int):
#     db_time_entry = get_time_entry(db, time_entry_id)
#     if db_time_entry:
#         db.delete(db_time_entry)
#         db.commit()
#         return True
#     return False

# # Document CRUD operations
# def get_document(db: Session, document_id: int):
#     return db.query(models.Document).filter(models.Document.id == document_id).first()

# def get_documents(db: Session, skip: int = 0, limit: int = 100, project_id: Optional[int] = None):
#     query = db.query(models.Document)
#     if project_id:
#         query = query.filter(models.Document.project_id == project_id)
#     return query.offset(skip).limit(limit).all()

# def create_document(db: Session, document: schemas.DocumentCreate):
#     db_document = models.Document(
#         name=document.name,
#         file_path=document.file_path,
#         file_type=document.file_type,
#         file_size=document.file_size,
#         project_id=document.project_id,
#         uploaded_by_id=document.uploaded_by_id
#     )
#     db.add(db_document)
#     db.commit()
#     db.refresh(db_document)
#     return db_document

# def delete_document(db: Session, document_id: int):
#     db_document = get_document(db, document_id)
#     if db_document:
#         db.delete(db_document)
#         db.commit()
#         return True
#     return False

# # Invoice CRUD operations
# def get_invoice(db: Session, invoice_id: int):
#     return db.query(models.Invoice).filter(models.Invoice.id == invoice_id).first()

# def get_invoices(db: Session, skip: int = 0, limit: int = 100, project_id: Optional[int] = None, status: Optional[str] = None):
#     query = db.query(models.Invoice)
#     if project_id:
#         query = query.filter(models.Invoice.project_id == project_id)
#     if status:
#         query = query.filter(models.Invoice.status == status)
#     return query.offset(skip).limit(limit).all()

# def create_invoice(db: Session, invoice: schemas.InvoiceCreate):
#     db_invoice = models.Invoice(
#         project_id=invoice.project_id,
#         amount=invoice.amount,
#         description=invoice.description,
#         status=invoice.status,
#         issue_date=invoice.issue_date,
#         due_date=invoice.due_date,
#         paid_date=invoice.paid_date
#     )
#     db.add(db_invoice)
#     db.commit()
#     db.refresh(db_invoice)
#     return db_invoice

# def update_invoice(db: Session, invoice_id: int, invoice: schemas.InvoiceCreate):
#     db_invoice = get_invoice(db, invoice_id)
#     if db_invoice:
#         db_invoice.project_id = invoice.project_id
#         db_invoice.amount = invoice.amount
#         db_invoice.description = invoice.description
#         db_invoice.status = invoice.status
#         db_invoice.issue_date = invoice.issue_date
#         db_invoice.due_date = invoice.due_date
#         db_invoice.paid_date = invoice.paid_date
#         db.commit()
#         db.refresh(db_invoice)
#     return db_invoice

# def delete_invoice(db: Session, invoice_id: int):
#     db_invoice = get_invoice(db, invoice_id)
#     if db_invoice:
#         db.delete(db_invoice)
#         db.commit()
#         return True
#     return False

# # Activity CRUD operations
# def create_activity(db: Session, activity: schemas.ActivityCreate):
#     db_activity = models.Activity(
#         user_id=activity.user_id,
#         action=activity.action,
#         entity_type=activity.entity_type,
#         entity_id=activity.entity_id,
#         description=activity.description
#     )
#     db.add(db_activity)
#     db.commit()
#     db.refresh(db_activity)
#     return db_activity

# def get_activities(db: Session, skip: int = 0, limit: int = 100, user_id: Optional[int] = None, entity_type: Optional[str] = None, entity_id: Optional[int] = None):
#     query = db.query(models.Activity)
#     if user_id:
#         query = query.filter(models.Activity.user_id == user_id)
#     if entity_type:
#         query = query.filter(models.Activity.entity_type == entity_type)
#     if entity_id:
#         query = query.filter(models.Activity.entity_id == entity_id)
#     return query.order_by(models.Activity.timestamp.desc()).offset(skip).limit(limit).all()

# # Dashboard operations
# def get_personal_dashboard(db: Session, user_id: int):
#     # Get recent projects for the user
#     recent_projects = []
#     user_projects = db.query(models.Project)\
#         .join(models.project_user)\
#         .filter(models.project_user.c.user_id == user_id)\
#         .filter(models.Project.status == models.StatusEnum.active)\
#         .order_by(models.Project.updated_at.desc())\
#         .limit(3)\
#         .all()
    
#     for project in user_projects:
#         # Calculate progress
#         total_tasks = db.query(func.count(models.Task.id))\
#             .filter(models.Task.project_id == project.id)\
#             .scalar() or 0
        
#         completed_tasks = db.query(func.count(models.Task.id))\
#             .filter(models.Task.project_id == project.id)\
#             .filter(models.Task.status == models.TaskStatusEnum.completed)\
#             .scalar() or 0
        
#         progress = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
        
#         # Get billable hours
#         hours = db.query(func.sum(models.TimeEntry.duration))\
#             .filter(models.TimeEntry.project_id == project.id)\
#             .filter(models.TimeEntry.is_billable == True)\
#             .scalar() or 0
        
#         # Estimate total hours from tasks
#         total_hours = db.query(func.sum(models.Task.estimated_hours))\
#             .filter(models.Task.project_id == project.id)\
#             .scalar() or 0
        
#         # Get team members
#         team = []
#         for member in project.team_members:
#             team.append({
#                 "name": member.name,
#                 "initials": member.name_en.split()[0][0] + member.name_en.split()[-1][0] if len(member.name_en.split()) > 1 else member.name_en[0:2],
#                 "image": None  # Add image URL if available
#             })
        
#         recent_projects.append({
#             "id": project.id,
#             "name": project.name,
#             "client": project.client.name if project.client else "",
#             "progress": progress,
#             "hours": hours,
#             "total_hours": total_hours,
#             "team": team,
#             "due_date": project.end_date.strftime("%Y-%m-%d")
#         })
    
#     # Get assigned tasks
#     assigned_tasks = []
#     user_tasks = db.query(models.Task)\
#         .filter(models.Task.assignee_id == user_id)\
#         .order_by(models.Task.deadline)\
#         .limit(5)\
#         .all()
    
#     for task in user_tasks:
#         created_by = db.query(models.User).filter(models.User.id == task.created_by_id).first()
        
#         assigned_tasks.append({
#             "id": f"TSK-{task.id:03d}",
#             "title": task.title,
#             "project": task.project.name if task.project else "",
#             "status": task.status.value,
#             "priority": task.priority or "Medium",
#             "deadline": task.deadline.strftime("%Y-%m-%d") if task.deadline else "",
#             "assignedBy": {
#                 "name": created_by.name if created_by else "",
#                 "initials": created_by.name_en.split()[0][0] + created_by.name_en.split()[-1][0] if created_by and len(created_by.name_en.split()) > 1 else (created_by.name_en[0:2] if created_by else ""),
#                 "image": None  # Add image URL if available
#             }
#         })
    
#     # Get billable hours data
#     today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
#     week_start = today - timedelta(days=today.weekday())
#     month_start = today.replace(day=1)
    
#     # Today's hours
#     today_hours = db.query(func.sum(models.TimeEntry.duration))\
#         .filter(models.TimeEntry.user_id == user_id)\
#         .filter(models.TimeEntry.is_billable == True)\
#         .filter(models.TimeEntry.start_time >= today)\
#         .scalar() or 0
    
#     # This week's hours
#     week_hours = db.query(func.sum(models.TimeEntry.duration))\
#         .filter(models.TimeEntry.user_id == user_id)\
#         .filter(models.TimeEntry.is_billable == True)\
#         .filter(models.TimeEntry.start_time >= week_start)\
#         .scalar() or 0
    
#     # This month's hours
#     month_hours = db.query(func.sum(models.TimeEntry.duration))\
#         .filter(models.TimeEntry.user_id == user_id)\
#         .filter(models.TimeEntry.is_billable == True)\
#         .filter(models.TimeEntry.start_time >= month_start)\
#         .scalar() or 0
    
#     # Target hours
#     daily_target = 8
#     weekly_target = 40
#     monthly_target = 160
    
#     # Sample data for charts
#     billable_hours_data = {
#         "current": week_hours,
#         "target": weekly_target,
#         "percentage": (week_hours / weekly_target * 100) if weekly_target > 0 else 0,
#         "data": [
#             {"time": "Mon", "current": 6.5, "target": 8},
#             {"time": "Tue", "current": 7.2, "target": 16},
#             {"time": "Wed", "current": 6.8, "target": 24},
#             {"time": "Thu", "current": 8.0, "target": 32},
#             {"time": "Fri", "current": 0, "target": 40}
#         ]
#     }
    
#     return {
#         "recent_projects": recent_projects,
#         "assigned_tasks": assigned_tasks,
#         "billable_hours": billable_hours_data
#     }

# def get_company_dashboard(db: Session):
#     # Get active projects
#     active_projects = []
#     projects = db.query(models.Project)\
#         .filter(models.Project.status == models.StatusEnum.active)\
#         .order_by(models.Project.updated_at.desc())\
#         .limit(5)\
#         .all()
    
#     for project in projects:
#         # Calculate progress
#         total_tasks = db.query(func.count(models.Task.id))\
#             .filter(models.Task.project_id == project.id)\
#             .scalar() or 0
        
#         completed_tasks = db.query(func.count(models.Task.id))\
#             .filter(models.Task.project_id == project.id)\
#             .filter(models.Task.status == models.TaskStatusEnum.completed)\
#             .scalar() or 0
        
#         progress = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
        
#         # Get billable hours
#         billable_hours = db.query(func.sum(models.TimeEntry.duration))\
#             .filter(models.TimeEntry.project_id == project.id)\
#             .filter(models.TimeEntry.is_billable == True)\
#             .scalar() or 0
        
#         # Calculate spent amount
#         spent = billable_hours * 100  # Assuming $100 per hour
        
#         active_projects.append({
#             "id": f"PRJ-{project.id:03d}",
#             "name": project.name,
#             "client": project.client.name if project.client else "",
#             "billable_hours": billable_hours,
#             "total_budget": project.budget,
#             "spent": spent,
#             "progress": progress,
#             "status": "On Track" if spent <= project.budget else "At Risk"
#         })
    
#     # Get active users
#     active_users = []
#     users = db.query(models.User)\
#         .filter(models.User.is_active == True)\
#         .limit(4)\
#         .all()
    
#     today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
#     week_start = today - timedelta(days=today.weekday())
#     month_start = today.replace(day=1)
    
#     for user in users:
#         # Today's hours
#         today_hours = db.query(func.sum(models.TimeEntry.duration))\
#             .filter(models.TimeEntry.user_id == user.id)\
#             .filter(models.TimeEntry.is_billable == True)\
#             .filter(models.TimeEntry.start_time >= today)\
#             .scalar() or 0
        
#         # This week's hours
#         week_hours = db.query(func.sum(models.TimeEntry.duration))\
#             .filter(models.TimeEntry.user_id == user.id)\
#             .filter(models.TimeEntry.is_billable == True)\
#             .filter(models.TimeEntry.start_time >= week_start)\
#             .scalar() or 0
        
#         # This month's hours
#         month_hours = db.query(func.sum(models.TimeEntry.duration))\
#             .filter(models.TimeEntry.user_id == user.id)\
#             .filter(models.TimeEntry.is_billable == True)\
#             .filter(models.TimeEntry.start_time >= month_start)\
#             .scalar() or 0
        
#         active_users.append({
#             "id": f"USR-{user.id:03d}",
#             "name": user.name,
#             "initials": user.name_en.split()[0][0] + user.name_en.split()[-1][0] if len(user.name_en.split()) > 1 else user.name_en[0:2],
#             "image": None,  # Add image URL if available
#             "position": user.position or "",
#             "hours": {
#                 "today": today_hours,
#                 "thisWeek": week_hours,
#                 "thisMonth": month_hours
#             },
#             "target": {
#                 "today": 8,
#                 "thisWeek": 40,
#                 "thisMonth": 160
#             }
#         })
    
#     # Get invoices
#     invoices_list = []
#     invoices = db.query(models.Invoice)\
#         .order_by(models.Invoice.issue_date.desc())\
#         .limit(6)\
#         .all()
    
#     for invoice in invoices:
#         project = db.query(models.Project).filter(models.Project.id == invoice.project_id).first()
#         client_name = project.client.name if project and project.client else ""
        
#         invoices_list.append({
#             "id": f"INV-{invoice.id:03d}",
#             "client": client_name,
#             "project": project.name if project else "",
#             "amount": invoice.amount,
#             "status": invoice.status.value,
#             "date": invoice.issue_date.strftime("%Y-%m-%d")
#         })
    
#     # Sample revenue forecast data
#     revenue_forecast = [
#         {"name": "Jan", "actual": 4000, "projected": 5000},
#         {"name": "Feb", "actual": 5500, "projected": 6000},
#         {"name": "Mar", "actual": 0, "projected": 7500},
#     ]
    
#     return {
#         "active_projects": active_projects,
#         "active_users": active_users,
#         "invoices": invoices_list,
#         "revenue_forecast": revenue_forecast
#     }

