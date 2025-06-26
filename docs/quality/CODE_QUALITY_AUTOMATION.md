# Code Quality & Team Automation Guide

This document outlines the automated code quality measures and processes implemented in the Four
Loop Digital project to ensure consistent, high-quality code across the team.

## 🛠️ Automation Overview

### Pre-commit Hooks (Husky)

Our project uses Husky to run automated checks before each commit:

#### 1. **Pre-commit Hook** (`.husky/pre-commit`)

- **Lint-staged**: Runs linting and formatting on staged files only
- **Type checking**: Validates TypeScript types across the project
- **Related tests**: Runs tests for files being committed (faster than full suite)

#### 2. **Commit Message Validation** (`.husky/commit-msg`)

- Enforces [Conventional Commits](https://conventionalcommits.org/) format
- Required format: `<type>[optional scope]: <description>`
- Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `build`, `perf`

**Examples:**

```
feat: add user authentication system
fix(ui): resolve button alignment issue
docs: update README with new setup instructions
```

#### 3. **Post-commit Hook** (`.husky/post-commit`)

- Checks for package.json changes and reminds about dependency audits
- Identifies TODO/FIXME comments in committed files
- Provides helpful reminders for project maintenance

### Lint-staged Configuration

The `lint-staged.config.js` file defines what happens to staged files:

- **TypeScript/JavaScript**: Prettier formatting + ESLint fixes
- **CSS/SCSS**: Prettier formatting + Stylelint fixes
- **Documentation**: Prettier formatting for Markdown, JSON, YAML
- **Other files**: Prettier formatting for consistency

## 🚀 GitHub Actions CI/CD

### Continuous Integration (`.github/workflows/ci.yml`)

Comprehensive CI pipeline that runs on all pull requests and pushes:

#### **Quality Checks Job**

- Runs on Node.js 18 and 20 (matrix testing)
- Type checking with TypeScript
- ESLint and Stylelint validation
- Prettier format checking
- Unit tests with coverage reporting
- Coverage uploaded to Codecov

#### **E2E Testing Job**

- Playwright end-to-end tests
- Built application testing
- Automatic artifact upload on failures

#### **Accessibility Testing Job**

- Automated accessibility checks using axe-core
- Ensures WCAG compliance

#### **Security Audit Job**

- npm audit for known vulnerabilities
- audit-ci for enhanced security checking
- Fails on moderate+ severity issues

#### **Build Verification Job**

- Validates successful Next.js build
- Ensures production readiness

### Deployment (`.github/workflows/nextjs.yml`)

- Automated deployment to GitHub Pages
- Runs on pushes to main branch
- Includes proper caching for faster builds

## 📋 npm Scripts for Quality

### Core Quality Commands

```bash
# Run all linting checks
npm run lint

# Fix all auto-fixable issues
npm run lint:fix

# Check code formatting
npm run format:check

# Format all files
npm run format

# Type checking
npm run type-check

# Comprehensive quality check
npm run quality:check

# Fix common quality issues
npm run quality:fix
```

### Testing Commands

```bash
# Unit tests
npm run test

# Unit tests with coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:accessibility

# All tests
npm run test:all

# Complete validation (all checks + tests)
npm run validate
```

### Security & Dependencies

```bash
# Check for outdated packages
npm run deps:check

# Update dependencies
npm run deps:update

# Security audit
npm run security:audit

# Fix security issues
npm run security:audit:fix
```

## 🔧 VS Code Configuration

### Automatic Formatting & Linting

The `.vscode/settings.json` enforces:

- **Format on save**: All files formatted automatically
- **Auto-fix on save**: ESLint and Stylelint issues fixed
- **Import organization**: Imports sorted automatically
- **Consistent indentation**: 2 spaces, no tabs
- **Line length rulers**: 80 and 120 character guides
- **Trim whitespace**: Removes trailing spaces
- **Final newlines**: Ensures files end with newline

### Required Extensions

The `.vscode/extensions.json` recommends essential extensions:

- **Prettier**: Code formatting
- **ESLint**: JavaScript/TypeScript linting
- **Stylelint**: CSS/SCSS linting
- **Playwright**: E2E test runner
- **Jest Runner**: Unit test runner
- **GitLens**: Enhanced Git integration
- **Error Lens**: Inline error display
- **Todo Tree**: TODO/FIXME tracking
- **Accessibility Linter**: Automated a11y checks

## 🚨 Quality Gates

### Pre-commit Requirements

Before any commit is allowed:

1. ✅ All staged files must pass linting
2. ✅ All staged files must be properly formatted
3. ✅ TypeScript must compile without errors
4. ✅ Related tests must pass
5. ✅ Commit message must follow conventions

### Pre-merge Requirements (CI)

Before merging to main:

1. ✅ All tests pass (unit, E2E, accessibility)
2. ✅ Code coverage meets requirements
3. ✅ No linting or formatting errors
4. ✅ No TypeScript compilation errors
5. ✅ No security vulnerabilities (moderate+)
6. ✅ Application builds successfully
7. ✅ Multiple Node.js versions supported

### Pre-release Requirements

Before any release:

1. ✅ Complete validation suite passes
2. ✅ All dependencies are up to date
3. ✅ Security audit clean
4. ✅ Documentation is current

## 🎯 Best Practices for Team Members

### Daily Development

1. **Pull latest changes** before starting work
2. **Run `npm run quality:fix`** to catch issues early
3. **Write tests** for new features
4. **Use descriptive commit messages** following conventions
5. **Review your changes** before committing

### Before Creating PRs

1. **Run `npm run validate`** to ensure everything passes
2. **Check for TODO/FIXME** comments and address them
3. **Update documentation** if needed
4. **Ensure tests cover new functionality**

### Code Review Focus

1. **Functionality**: Does it work as intended?
2. **Tests**: Are there adequate tests?
3. **Performance**: Any performance implications?
4. **Accessibility**: Is it accessible to all users?
5. **Security**: Any security concerns?
6. **Documentation**: Is code well-documented?

## 🔍 Monitoring & Maintenance

### Regular Maintenance Tasks

- **Weekly**: Check `npm run deps:check` for updates
- **Monthly**: Run `npm run security:audit` for vulnerabilities
- **Quarterly**: Review and update automation rules
- **Before releases**: Full `npm run validate` check

### Troubleshooting Common Issues

#### Commit Message Rejected

```bash
# Fix: Use conventional commit format
git commit -m "feat: add new feature description"
```

#### Pre-commit Hook Fails

```bash
# Fix linting issues
npm run lint:fix

# Fix formatting
npm run format

# Fix type errors manually, then retry commit
```

#### CI Pipeline Fails

1. Run `npm run validate` locally first
2. Fix any failing tests or linting issues
3. Ensure all dependencies are installed
4. Check for security vulnerabilities

## 📈 Benefits

This automation setup provides:

- **Consistency**: Same standards across all team members
- **Quality**: Automated detection of issues before they reach production
- **Efficiency**: Fast feedback loop for developers
- **Security**: Automated vulnerability detection
- **Accessibility**: Ensures inclusive design
- **Documentation**: Enforced documentation standards
- **Collaboration**: Clear processes for team development

## 🔄 Continuous Improvement

This automation setup is designed to evolve with the project. Regular reviews ensure:

- Tools stay up to date
- Rules remain relevant
- Performance stays optimal
- New best practices are adopted

For suggestions or improvements to this automation setup, please create an issue or discuss with the
team.
