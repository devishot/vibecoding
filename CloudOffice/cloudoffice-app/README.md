# Project Management Web Application

A modern, full-stack project management web application built with Next.js and FastAPI. This application provides comprehensive tools for managing projects, clients, tasks, time tracking, and more.

![Project Management Dashboard](https://placeholder.svg?height=400&width=800)

## Features

- **Dark-themed Modern UI**: Clean, responsive interface with dark theme support
- **Dashboard**: Personal and company-wide dashboards with analytics
- **Project Management**: Create, track, and manage projects with detailed views
- **Task Management**: Assign, track, and update tasks within projects
- **Time Tracking**: Log and monitor time spent on tasks and projects
- **Client Management**: Maintain client information and project associations
- **User Management**: Manage users, roles, and permissions
- **Document Management**: Upload, store, and organize project documents
- **Invoicing**: Generate and track invoices based on billable hours
- **Reporting**: Visualize project progress, time allocation, and financial metrics

## Tech Stack

### Frontend
- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: High-quality UI components built with Radix UI and Tailwind
- **Recharts**: Composable charting library for data visualization
- **Lucide Icons**: Beautiful, consistent icon set

### Backend
- **FastAPI**: Modern, fast web framework for building APIs with Python
- **SQLAlchemy**: SQL toolkit and Object-Relational Mapping (ORM)
- **Pydantic**: Data validation and settings management
- **JWT Authentication**: Secure authentication with JSON Web Tokens

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- Python (v3.12 or later)
- Next.js (v15.2 or later)
- npm or yarn
- pip
- Postgresql (v17.4 or later)
- Alembic (Postgresql migrations)

### Contribution
See useful commands in [Makefile](./Makefile)

### Setup backend manually
```bash
> pip install 'sqlalchemy[asyncio]'
> pip install asyncpg
> pip install alembic
> pip install mypy
```

### To get started manually:

1. Install the frontend dependencies with `npm install`
2. Run the frontend with `npm run dev`
3. Set up the Python virtual environment for the backend
4. Install the backend dependencies with `pip install -r requirements.txt`
5. Run the backend with `uvicorn main:app --reload`
6. Run the database using `docker compose up -d`, where `-d` flag runs the containers in detached mode

### Folder structure
```
app/
├── main.py                # FastAPI app entrypoint
├── core/                 # Core configs (e.g., settings, DB)
│   ├── config.py         # Pydantic settings (env vars)
│   └── database.py       # Async SQLAlchemy setup
├── models/               # SQLAlchemy models
│   └── user.py
├── schemas/              # Pydantic schemas (DTOs)
│   └── user.py
├── crud/                 # DB operations (CRUD logic)
│   └── user.py
├── api/                  # API routers
│   ├── deps.py           # Common dependencies
│   └── routes/
│       └── user.py       # User API endpoints
├── services/             # Business logic layer
│   └── user_service.py
├── tests/                # Unit + integration tests
│   └── test_user.py
```
