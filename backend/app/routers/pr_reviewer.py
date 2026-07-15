from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter(prefix="/pr-reviewer", tags=["pr-reviewer"])

class PRReviewRequest(BaseModel):
    owner: str
    repo: str
    pr_number: int
    review_type: str = "comprehensive"

class ReviewComment(BaseModel):
    file: str
    line: int
    severity: str
    comment: str
    suggestion: Optional[str] = None

class ReviewResponse(BaseModel):
    owner: str
    repo: str
    pr_number: int
    overall_score: int
    summary: str
    comments: List[ReviewComment]
    approved: bool

@router.post("/review", response_model=ReviewResponse)
async def review_pr(request: PRReviewRequest):
    comments = [
        ReviewComment(
            file="src/main.py",
            line=42,
            severity="medium",
            comment="Consider adding type hints for better code documentation",
            suggestion="def process_data(data: List[Dict[str, Any]]) -> None:"
        ),
        ReviewComment(
            file="src/utils.py",
            line=15,
            severity="low",
            comment="Variable name could be more descriptive",
            suggestion="Renaming 'x' to 'user_input'"
        ),
    ]
    return ReviewResponse(
        owner=request.owner,
        repo=request.repo,
        pr_number=request.pr_number,
        overall_score=85,
        summary="Good PR with minor improvements needed",
        comments=comments,
        approved=True
    )

@router.get("/history/{owner}/{repo}")
async def get_review_history(owner: str, repo: str):
    return {
        "total_reviews": 12,
        "average_score": 82,
        "recent_reviews": [
            {"pr": 101, "score": 90, "approved": True},
            {"pr": 100, "score": 75, "approved": True},
        ]
    }
