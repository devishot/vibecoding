from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.asyncio import AsyncSession
import os
from dotenv import load_dotenv

load_dotenv()

# Get database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL")

# Create async engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create AsyncSession
async_session = sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession
)

# Create Base class
Base = declarative_base()

# Initialize database tables
async def init_db():
    async with engine.begin() as conn:
        # Use run_sync to execute the synchronous create_all method
        await conn.run_sync(Base.metadata.create_all)
   # Call init_db() in your application startup
