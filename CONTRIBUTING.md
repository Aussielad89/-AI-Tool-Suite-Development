# Contributing to GitHub AI Toolkit

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/Aussielad89/-AI-Tool-Suite-Development.git`
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Install dependencies:
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   
   # Frontend
   cd frontend
   npm install
   ```
5. Make your changes
6. Run tests: `cd backend && pytest tests/ -v`
7. Commit your changes: `git commit -m "feat: add new feature"`
8. Push to your fork: `git push origin feature/my-feature`
9. Open a Pull Request

## Code Standards

### Python (Backend)
- Follow PEP 8
- Use type hints for all function signatures
- Write docstrings for public functions
- Use async/await for I/O operations
- Pydantic models for request/response schemas

### TypeScript/React (Frontend)
- Follow ESLint configuration
- Use functional components with hooks
- Implement proper TypeScript types
- Use Tailwind CSS for styling

## Commit Message Convention

We use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `test:` - Adding tests
- `refactor:` - Code refactoring
- `style:` - Code style changes

## Reporting Bugs

Please use the bug report issue template and include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details

## Suggesting Features

Please use the feature request issue template and include:
- Clear use case
- Proposed solution
- Alternatives considered

## Questions?

Feel free to open an issue with the question label.
