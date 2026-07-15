import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

class TestPRReviewer:
    def test_review_pr(self):
        response = client.post("/pr-reviewer/review", json={
            "owner": "test",
            "repo": "repo",
            "pr_number": 1,
            "review_type": "comprehensive"
        })
        assert response.status_code == 200
        data = response.json()
        assert "overall_score" in data
        assert "comments" in data

    def test_review_history(self):
        response = client.get("/pr-reviewer/history/test/repo")
        assert response.status_code == 200
        assert "total_reviews" in response.json()

class TestIssueAnalyzer:
    def test_analyze_issue(self):
        response = client.post("/issue-analyzer/analyze", json={
            "owner": "test",
            "repo": "repo",
            "issue_number": 1
        })
        assert response.status_code == 200
        data = response.json()
        assert "analysis" in data
        assert "confidence" in data

    def test_suggestions(self):
        response = client.get("/issue-analyzer/suggestions/test/repo")
        assert response.status_code == 200
        assert "suggestions" in response.json()

class TestCodeAssistant:
    def test_suggest_code(self):
        response = client.post("/code-assistant/suggest", json={
            "owner": "test",
            "repo": "repo",
            "prompt": "Add error handling",
            "language": "python"
        })
        assert response.status_code == 200
        data = response.json()
        assert "suggestion" in data

    def test_patterns(self):
        response = client.get("/code-assistant/patterns/test/repo")
        assert response.status_code == 200
        assert "patterns" in response.json()

class TestDocGenerator:
    def test_generate_docs(self):
        response = client.post("/doc-generator/generate", json={
            "owner": "test",
            "repo": "repo",
            "file_path": "src/main.py",
            "doc_type": "readme"
        })
        assert response.status_code == 200
        data = response.json()
        assert "generated_doc" in data

    def test_coverage(self):
        response = client.get("/doc-generator/coverage/test/repo")
        assert response.status_code == 200
        assert "coverage_percentage" in response.json()

class TestSecurityScanner:
    def test_scan_security(self):
        response = client.post("/security-scanner/scan", json={
            "owner": "test",
            "repo": "repo",
            "scan_type": "full"
        })
        assert response.status_code == 200
        data = response.json()
        assert "issues" in data
        assert "security_score" in data

    def test_security_report(self):
        response = client.get("/security-scanner/report/test/repo")
        assert response.status_code == 200
        assert "security_score" in response.json()

class TestTestGenerator:
    def test_generate_tests(self):
        response = client.post("/test-generator/generate", json={
            "owner": "test",
            "repo": "repo",
            "file_path": "src/main.py",
            "test_framework": "pytest"
        })
        assert response.status_code == 200
        data = response.json()
        assert "tests" in data
        assert "total_coverage" in data

    def test_coverage(self):
        response = client.get("/test-generator/coverage/test/repo")
        assert response.status_code == 200
        assert "overall_coverage" in response.json()
