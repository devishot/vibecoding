from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import datetime, timedelta
import models
import schemas
import crud
from database import SessionLocal, engine

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Project Management API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Authentication
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# API Routes
@app.post("/token", response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=crud.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = crud.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

# User endpoints
@app.get("/users/", response_model=List[schemas.User])
async def read_users(
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.post("/users/", response_model=schemas.User)
async def create_user(
    user: schemas.UserCreate, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/{user_id}", response_model=schemas.User)
async def read_user(
    user_id: int, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# Client endpoints
@app.get("/clients/", response_model=List[schemas.Client])
async def read_clients(
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    clients = crud.get_clients(db, skip=skip, limit=limit, status=status)
    return clients

@app.post("/clients/", response_model=schemas.Client)
async def create_client(
    client: schemas.ClientCreate, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    return crud.create_client(db=db, client=client)

@app.get("/clients/{client_id}", response_model=schemas.Client)
async def read_client(
    client_id: int, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    db_client = crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return db_client

# Project endpoints
@app.get("/projects/", response_model=List[schemas.Project])
async def read_projects(
    skip: int = 0, 
    limit: int = 100, 
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    projects = crud.get_projects(db, skip=skip, limit=limit, status=status)
    return projects

@app.post("/projects/", response_model=schemas.Project)
async def create_project(
    project: schemas.ProjectCreate, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    return crud.create_project(db=db, project=project)

@app.get("/projects/{project_id}", response_model=schemas.Project)
async def read_project(
    project_id: int, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

# Task endpoints
@app.get("/tasks/", response_model=List[schemas.Task])
async def read_tasks(
    skip: int = 0, 
    limit: int = 100, 
    project_id: Optional[int] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    tasks = crud.get_tasks(db, skip=skip, limit=limit, project_id=project_id, status=status)
    return tasks

@app.post("/tasks/", response_model=schemas.Task)
async def create_task(
    task: schemas.TaskCreate, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    return crud.create_task(db=db, task=task)

@app.get("/tasks/{task_id}", response_model=schemas.Task)
async def read_task(
    task_id: int, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    db_task = crud.get_task(db, task_id=task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return db_task

# Time entry endpoints
@app.get("/time-entries/", response_model=List[schemas.TimeEntry])
async def read_time_entries(
    skip: int = 0, 
    limit: int = 100, 
    user_id: Optional[int] = None,
    project_id: Optional[int] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    time_entries = crud.get_time_entries(
        db, 
        skip=skip, 
        limit=limit, 
        user_id=user_id, 
        project_id=project_id,
        start_date=start_date,
        end_date=end_date
    )
    return time_entries

@app.post("/time-entries/", response_model=schemas.TimeEntry)
async def create_time_entry(
    time_entry: schemas.TimeEntryCreate, 
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    return crud.create_time_entry(db=db, time_entry=time_entry)

# Dashboard endpoints
@app.get("/dashboard/personal", response_model=schemas.PersonalDashboard)
async def get_personal_dashboard(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = crud.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return crud.get_personal_dashboard(db, user_id=current_user.id)

@app.get("/dashboard/company", response_model=schemas.CompanyDashboard)
async def get_company_dashboard(
    db: Session = Depends(get_db),
    token: str = Depends(oauth2_scheme)
):
    current_user = crud.get_current_user(db, token)
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Check if user has admin permissions
    if not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )
    
    return crud.get_company_dashboard(db)

# Run the application with uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

