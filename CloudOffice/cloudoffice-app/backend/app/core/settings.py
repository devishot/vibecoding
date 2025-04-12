from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # read connection string from environment variable `DATABASE_URL`
    database_url: str
    log_level: str = "INFO"

settings = Settings()  # type: ignore
