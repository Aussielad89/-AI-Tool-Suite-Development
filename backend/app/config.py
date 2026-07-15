import os

class Settings:
    def __init__(self):
        self.DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./github_ai_toolkit.db")
        self.REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
        self.GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
        self.OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
        self.SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")

settings = Settings()
