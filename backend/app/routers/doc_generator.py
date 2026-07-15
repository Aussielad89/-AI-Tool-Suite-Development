from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/doc-generator", tags=["doc-generator"])

class DocGenerationRequest(BaseModel):
    owner: str
    repo: str
    file_path: str
    doc_type: str = "readme"

class GeneratedDoc(BaseModel):
    title: str
    content: str
    format: str
    sections: List[str]

class DocResponse(BaseModel):
    owner: str
    repo: str
    file_path: str
    generated_doc: GeneratedDoc

@router.post("/generate", response_model=DocResponse)
async def generate_docs(request: DocGenerationRequest):
    return DocResponse(
        owner=request.owner,
        repo=request.repo,
        file_path=request.file_path,
        generated_doc=GeneratedDoc(
            title=f"{request.repo} Documentation",
            content="# Project Documentation\n\n## Installation\n\n```bash\nnpm install\n```\n\n## Usage\n\n```python\nfrom project import main\nmain()\n```",
            format="markdown",
            sections=["Installation", "Usage", "API Reference", "Examples"]
        )
    )

@router.get("/coverage/{owner}/{repo}")
async def get_doc_coverage(owner: str, repo: str):
    return {
        "total_files": 50,
        "documented_files": 32,
        "coverage_percentage": 64,
        "missing_docs": ["src/legacy.py", "src/internal.py"]
    }
