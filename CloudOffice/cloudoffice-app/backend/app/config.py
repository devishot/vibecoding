import os
from dotenv import load_dotenv


load_dotenv()

# Get database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL")