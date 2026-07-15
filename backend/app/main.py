from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(
    title="GitHub AI Toolkit API",
    description="Unified API for GitHub AI-powered tools",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.routers import pr_reviewer, issue_analyzer, code_assistant, doc_generator, security_scanner, test_generator

app.include_router(pr_reviewer.router)
app.include_router(issue_analyzer.router)
app.include_router(code_assistant.router)
app.include_router(doc_generator.router)
app.include_router(security_scanner.router)
app.include_router(test_generator.router)

@app.get("/health")
async def health_check():
    return {"status": "healthy", "tools": ["pr-reviewer", "issue-analyzer", "code-assistant", "doc-generator", "security-scanner", "test-generator"]}

@app.get("/")
async def root():
    return {"message": "GitHub AI Toolkit API", "docs": "/docs"}
