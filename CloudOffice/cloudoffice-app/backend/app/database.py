import contextlib
from typing import AsyncIterator, Any
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.asyncio import (
    AsyncConnection,
    AsyncSession,
    async_sessionmaker, 
    create_async_engine
)
from sqlalchemy.orm import declarative_base

from config import DATABASE_URL

# Create Base class
Base = declarative_base()

# Create Session Manager
class DatabaseSessionManager:
    def __init__(self, host: str, engine_kwargs: dict[str, Any] = {}):
        self._engine = create_async_engine(host, **engine_kwargs)
        self._sessionmaker = async_sessionmaker(autocommit=False, bind=self._engine, expire_on_commit=False)

    async def close(self):
        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")
        await self._engine.dispose()

        self._engine = None
        self._sessionmaker = None

    @contextlib.asynccontextmanager
    async def connect(self) -> AsyncIterator[AsyncConnection]:
        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")

        async with self._engine.begin() as connection:
            try:
                yield connection
            except Exception:
                await connection.rollback()
                raise

    @contextlib.asynccontextmanager
    async def session(self) -> AsyncIterator[AsyncSession]:
        if self._sessionmaker is None:
            raise Exception("DatabaseSessionManager is not initialized")

        session = self._sessionmaker()
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()

sessionmanager = DatabaseSessionManager(DATABASE_URL)

# Create dependency for getting a database session from the request
async def get_db_session():
    async with sessionmanager.session() as session:
        yield session

# Used for testing
async def create_all(connection: AsyncConnection):
    await connection.run_sync(Base.metadata.create_all)

async def drop_all(connection: AsyncConnection):
    await connection.run_sync(Base.metadata.drop_all)