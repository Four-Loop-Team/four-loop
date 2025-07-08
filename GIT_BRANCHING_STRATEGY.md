# Git Branching Strategy & Workflow

## Overview

This document outlines the Git branching strategy for the Four Loop team and serves as a template
for all future projects. This strategy is designed to support multiple developers working
simultaneously while maintaining code quality and enabling automated deployments.

## Team Structure

- **Current**: 3 Engineers
- **Future**: Scalable to additional team members
- **Deployment**: Automated deployment to production on `main` branch pushes

## Branch Structure

### Core Branches

#### `main` (Production)

- **Purpose**: Production-ready code
- **Deployment**: Auto-deploys to live site
- **Protection**: Heavily protected, only accepts merges from `release/*` branches
- **Merge Strategy**: Merge commits (to maintain release history)

#### `develop` (Integration)

- **Purpose**: Integration branch for all feature development
- **Source**: Feature branches merge here
- **Target**: Creates release branches
- **Testing**: All CI/CD checks must pass before merging

### Supporting Branches

#### `feature/<feature-name>` (Feature Development)

- **Purpose**: Individual feature development
- **Naming**: `feature/user-authentication`, `feature/payment-integration`
- **Source**: Created from `develop`
- **Target**: Merges back to `develop`
- **Lifetime**: Short-lived (1-2 weeks max)

#### `release/<version>` (Release Preparation)

- **Purpose**: Prepare and stabilize releases
- **Naming**: `release/v1.2.0`, `release/2024-01-15`
- **Source**: Created from `develop`
- **Target**: Merges to `main` and back to `develop`
- **Activities**: Bug fixes, documentation updates, version bumps

#### `hotfix/<issue>` (Emergency Fixes)

- **Purpose**: Critical production fixes
- **Naming**: `hotfix/security-vulnerability`, `hotfix/payment-bug`
- **Source**: Created from `main`
- **Target**: Merges to both `main` and `develop`
- **Priority**: Immediate deployment path

## Workflow Process

### 1. Feature Development Workflow

```bash
# 1. Start new feature
git checkout develop
git pull origin develop
git checkout -b feature/new-awesome-feature

# 2. Develop and commit
git add .
git commit -m "feat: add awesome new feature"
git push origin feature/new-awesome-feature

# 3. Create Pull Request to develop
# - Run all automated checks
# - Require code review from at least 1 team member
# - Ensure all tests pass

# 4. After approval, merge and cleanup
git checkout develop
git pull origin develop
git branch -d feature/new-awesome-feature
git push origin --delete feature/new-awesome-feature
```

### 2. Release Workflow

```bash
# 1. Create release branch from develop
git checkout develop
git pull origin develop
git checkout -b release/v1.2.0

# 2. Prepare release (version bumps, docs, final testing)
git add .
git commit -m "chore: prepare release v1.2.0"
git push origin release/v1.2.0

# 3. Create PR to main for deployment
# - Comprehensive testing
# - Final review
# - Merge to main (triggers deployment)

# 4. Merge release changes back to develop
git checkout develop
git merge release/v1.2.0
git push origin develop

# 5. Clean up release branch
git branch -d release/v1.2.0
git push origin --delete release/v1.2.0
```

### 3. Hotfix Workflow

```bash
# 1. Create hotfix from main
git checkout main
git pull origin main
git checkout -b hotfix/critical-bug-fix

# 2. Fix and test
git add .
git commit -m "fix: resolve critical production issue"
git push origin hotfix/critical-bug-fix

# 3. Create PR to main (fast-track review)
# 4. After merge to main, also merge to develop
git checkout develop
git merge hotfix/critical-bug-fix
git push origin develop

# 5. Cleanup
git branch -d hotfix/critical-bug-fix
git push origin --delete hotfix/critical-bug-fix
```

## Branch Protection Rules

### `main` Branch

- Require pull request reviews (2 reviewers)
- Dismiss stale reviews when new commits are pushed
- Require status checks to pass before merging
- Require up-to-date branches before merging
- Include administrators in restrictions
- Allow force pushes: **NO**
- Allow deletions: **NO**

### `develop` Branch

- Require pull request reviews (1 reviewer)
- Require status checks to pass before merging
- Require up-to-date branches before merging
- Allow force pushes: **NO**
- Allow deletions: **NO**

## Commit Message Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit messages:

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
feat(auth): add user authentication system
fix(payment): resolve checkout validation error
docs(readme): update installation instructions
chore(deps): update dependencies to latest versions
```

## Pull Request Guidelines

### Feature PRs (to `develop`)

- **Title**: Clear, descriptive summary
- **Description**: What, why, and how
- **Checklist**:
  - [ ] All tests pass
  - [ ] Code follows style guidelines
  - [ ] Documentation updated if needed
  - [ ] No console.log statements left
  - [ ] Performance impact considered

### Release PRs (to `main`)

- **Title**: `Release v<version>`
- **Description**: Release notes with all features and fixes
- **Checklist**:
  - [ ] Version bumped in package.json
  - [ ] CHANGELOG.md updated
  - [ ] All tests pass
  - [ ] Performance tests pass
  - [ ] Security checks complete

## CI/CD Integration

### Pre-commit Hooks (Already implemented)

- ESLint and Prettier formatting
- Type checking
- Unit tests
- Style validation

### Pre-push Hooks (Already implemented)

- Full test suite
- Build verification
- Security audit
- Performance budget check

### GitHub Actions (Recommended)

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  pull_request:
    branches: [develop, main]
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Run build
        run: npm run build

  deploy:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: echo "Deploy to production"
```

## Conflict Resolution

### Common Conflict Scenarios

1. **Same file, different sections**: Usually auto-resolvable
2. **Same file, same lines**: Requires manual resolution
3. **Package.json conflicts**: Coordinate dependency updates

### Resolution Strategy

1. **Communicate**: Use team chat when working on related features
2. **Frequent pulls**: Pull from `develop` daily
3. **Small commits**: Keep changes focused and atomic
4. **Early integration**: Don't let feature branches live too long

## Team Collaboration Guidelines

### Branch Naming Conventions

```bash
feature/user-authentication
feature/payment-gateway-integration
bugfix/login-validation-error
hotfix/security-patch-auth
release/v1.2.0
release/2024-q1-launch
```

### Daily Workflow

1. **Start of day**: Pull latest `develop`
2. **During development**: Commit frequently with clear messages
3. **End of day**: Push work to feature branch
4. **Before PR**: Rebase on latest `develop` if needed

### Code Review Process

1. **Self-review**: Review your own PR first
2. **Automated checks**: Ensure all CI passes
3. **Peer review**: At least one team member review
4. **Address feedback**: Make requested changes promptly
5. **Approval**: Merge after approval and passing checks

## Template Repository Setup

When using this repository as a template:

1. **Copy these files**:
   - `.github/workflows/` (CI/CD configurations)
   - `.husky/` (Git hooks)
   - `lint-staged.config.js`
   - `jest.config.js`
   - This `GIT_BRANCHING_STRATEGY.md`

2. **Update project-specific settings**:
   - Repository name in package.json
   - Update README.md
   - Configure deployment targets
   - Update team member permissions

3. **Set up branch protection rules** (as outlined above)

## Troubleshooting

### Common Issues

#### "Branch is behind main"

```bash
git checkout feature/my-feature
git rebase develop
# Resolve conflicts if any
git push --force-with-lease origin feature/my-feature
```

#### "Merge conflicts in package-lock.json"

```bash
# Delete lock file and reinstall
rm package-lock.json
npm install
git add package-lock.json
git commit -m "fix: resolve package-lock conflicts"
```

#### "Failed to push because branch is protected"

- Ensure you're creating a PR instead of pushing directly
- Check that you have the correct permissions
- Verify the branch protection rules

## Metrics and Monitoring

Track these metrics for team efficiency:

- Average PR review time
- Number of merge conflicts per week
- Time from feature start to production
- Hotfix frequency
- Test coverage trends

## Questions & Support

For questions about this workflow:

1. Check this document first
2. Ask in team chat
3. Create an issue in the repository
4. Schedule team discussion if needed

---

_This document should be reviewed and updated quarterly or when team structure changes._
