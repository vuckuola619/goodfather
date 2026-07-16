# Developer and Contribution Guide

Welcome to the **GoodFather** codebase! This document details the conventions and workflows for local development, code review, issues, commits, and deploying with Git Worktrees.

---

## 🛠️ Core Development Tools

### Pre-commit Hooks
We use the python `pre-commit` framework to automate code formatting, lint checking, and tests before any commit is finalized.
- **Ruff**: For fast Python code formatting and lint checking.
- **Pytest**: To ensure all unit tests pass before a commit is allowed.

**Installation & Setup:**
```powershell
# Install development packages
pip install -r requirements.txt

# Register pre-commit hooks locally
pre-commit install

# Manually run hooks against all files
pre-commit run --all-files
```

### CI/CD Pipeline
Every time you push to the `main` branch or open a Pull Request, GitHub Actions will trigger our CI workflow (`.github/workflows/ci.yml`). This workflow:
1. Installs all python dependencies.
2. Checks code formatting and syntax style using Ruff.
3. Executes unit tests (`pytest`).

---

## 🌲 Git Worktree Workflow

**Git Worktree** allows you to have multiple branches checked out in separate folders simultaneously. This is extremely useful for:
- Testing a bug fix on `main` without losing current progress on a feature branch.
- Performing code reviews in an isolated, runnable directory.

### Basic Commands
1. **Add a worktree** for a new feature branch:
   ```powershell
   # Syntax: git worktree add <directory-path> -b <branch-name>
   git worktree add ../goodfather-feature -b feature/new-mission
   ```
   This creates a new folder `../goodfather-feature` containing a clean checkout of your new feature branch.

2. **List all active worktrees**:
   ```powershell
   git worktree list
   ```

3. **Remove a worktree** when done:
   ```powershell
   # Syntax: git worktree remove <directory-path>
   git worktree remove ../goodfather-feature
   ```
   *Note: Don't forget to delete the feature branch if no longer needed (`git branch -d feature/new-mission`).*

---

## 📋 Issue Tracker & PR Flow

All feature requirements and tasks live locally on the file system under the `.scratch/` directory.

### 1. Creating and Tracking Issues
Issues and PRDs are defined in `.scratch/` files:
- **Feature Directory**: `.scratch/<feature-slug>/`
- **PRD**: `.scratch/<feature-slug>/PRD.md`
- **Sub-Tasks**: `.scratch/<feature-slug>/issues/NN-<slug>.md` (numbered from `01`)

Each issue has a `Status:` header at the top (e.g., `Status: triage`, `Status: claimed`, `Status: resolved`).

### 2. Standard Commit Messages
Commit messages should follow standard prefixes:
- `feat: <description>` — For new features/capabilities.
- `fix: <description>` — For bug fixes.
- `docs: <description>` — For documentation edits.
- `refactor: <description>` — For code changes that neither fix a bug nor add a feature.

*Recommendation*: Reference the issue ID/slug in the commit message description, e.g., `feat: integrate database schema for quest progression`.

### 3. Running Code Reviews
Before merging your code, you should execute a two-axis code review:
- **Standards Axis**: Conformity with coding standards and Fowler code smells.
- **Spec Axis**: Compliance with the PRD or spec in the issue tracker.

You can invoke the automated code review agent from your coding workspace to run a review against a specific commit or branch.

### 4. Pull Requests
Once pre-commit checks pass and the code review is complete:
1. Push your branch to GitHub.
2. Open a Pull Request on GitHub to target the `main` branch.
3. Verify that the GitHub Actions build successfully passes.
4. Merge the PR.
