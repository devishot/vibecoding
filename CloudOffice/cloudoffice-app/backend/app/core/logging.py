import os
import logging
from .settings import settings

def get_log_level(level_str: str) -> int:
    level = getattr(logging, level_str.upper(), logging.INFO)
    return level

class ModuleFormatter(logging.Formatter):
    def format(self, record):
        path_parts = os.path.normpath(record.pathname).split(os.sep)
        if len(path_parts) >= 2:
            record.module_path = f"{path_parts[-2]}/{record.filename}"
        else:
            record.module_path = record.filename
        return super().format(record)

logger = logging.getLogger("app")
logger.setLevel(get_log_level(settings.log_level))

# Optional: Add console handler if not already set
if not logger.handlers:
    handler = logging.StreamHandler()
    formatter = ModuleFormatter(
       fmt= "%(levelname)s: >> [%(module_path)s][%(asctime)s]: %(message)s",
       datefmt='%H:%M:%S'
    )
    handler.setFormatter(formatter)
    logger.addHandler(handler)
