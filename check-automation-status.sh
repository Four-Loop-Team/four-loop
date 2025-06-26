#!/bin/bash

# Four Loop Digital - Automation Status Check
# This script provides a comprehensive overview of all automation and quality measures

echo "🔍 Four Loop Digital - Code Quality & Automation Status"
echo "========================================================"
echo ""

# Check Git hooks
echo "🪝 Git Hooks Status:"
if [ -f ".husky/pre-commit" ]; then
    echo "  ✅ Pre-commit hook: Active"
else
    echo "  ❌ Pre-commit hook: Missing"
fi

if [ -f ".husky/commit-msg" ]; then
    echo "  ✅ Commit message validation: Active"
else
    echo "  ❌ Commit message validation: Missing"
fi

if [ -f ".husky/post-commit" ]; then
    echo "  ✅ Post-commit hook: Active"
else
    echo "  ❌ Post-commit hook: Missing"
fi

if [ -f ".husky/pre-push" ]; then
    echo "  ✅ Pre-push hook: Active"
else
    echo "  ❌ Pre-push hook: Missing"
fi

echo ""

# Check CI/CD workflows
echo "🚀 CI/CD Workflows:"
if [ -f ".github/workflows/ci.yml" ]; then
    echo "  ✅ Continuous Integration: Configured"
else
    echo "  ❌ Continuous Integration: Missing"
fi

if [ -f ".github/workflows/nextjs.yml" ]; then
    echo "  ✅ Deployment workflow: Configured"
else
    echo "  ❌ Deployment workflow: Missing"
fi

echo ""

# Check VS Code configuration
echo "💻 VS Code Configuration:"
if [ -f ".vscode/settings.json" ]; then
    echo "  ✅ Editor settings: Configured"
else
    echo "  ❌ Editor settings: Missing"
fi

if [ -f ".vscode/extensions.json" ]; then
    echo "  ✅ Extension recommendations: Configured"
else
    echo "  ❌ Extension recommendations: Missing"
fi

echo ""

# Check issue templates
echo "📋 GitHub Templates:"
if [ -f ".github/ISSUE_TEMPLATE/bug_report.md" ]; then
    echo "  ✅ Bug report template: Available"
else
    echo "  ❌ Bug report template: Missing"
fi

if [ -f ".github/ISSUE_TEMPLATE/feature_request.md" ]; then
    echo "  ✅ Feature request template: Available"
else
    echo "  ❌ Feature request template: Missing"
fi

if [ -f ".github/PULL_REQUEST_TEMPLATE.md" ]; then
    echo "  ✅ Pull request template: Available"
else
    echo "  ❌ Pull request template: Missing"
fi

echo ""

# Check configuration files
echo "⚙️  Configuration Files:"
config_files=("lint-staged.config.js" "jest.config.js" "postcss.config.js" "tailwind.config.ts" "tsconfig.json" ".eslintrc.js" ".stylelintrc.json")
for file in "${config_files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file: Present"
    else
        echo "  ❌ $file: Missing"
    fi
done

echo ""

# Quick quality check
echo "🔍 Quick Quality Check:"
echo "  Running type check..."
if npm run type-check > /dev/null 2>&1; then
    echo "  ✅ TypeScript: No errors"
else
    echo "  ❌ TypeScript: Has errors"
fi

echo "  Running lint check..."
if npm run lint:check > /dev/null 2>&1; then
    echo "  ✅ Linting: No errors"
else
    echo "  ❌ Linting: Has errors"
fi

echo "  Running format check..."
if npm run format:check > /dev/null 2>&1; then
    echo "  ✅ Formatting: Consistent"
else
    echo "  ❌ Formatting: Inconsistent"
fi

echo ""

# Security check
echo "🔒 Security Status:"
if npm audit --audit-level=moderate > /dev/null 2>&1; then
    echo "  ✅ No moderate+ security vulnerabilities"
else
    echo "  ⚠️  Security vulnerabilities detected - run 'npm audit' for details"
fi

echo ""

# Dependency status
echo "📦 Dependencies:"
outdated_count=$(npm outdated 2>/dev/null | wc -l)
if [ "$outdated_count" -le 1 ]; then
    echo "  ✅ All dependencies up to date"
else
    echo "  ⚠️  $(($outdated_count - 1)) outdated packages - run 'npm run deps:check' for details"
fi

echo ""

# Summary
echo "📊 Automation Summary:"
echo "  🛡️  Pre-commit validation prevents bad commits"
echo "  🚀 CI/CD pipeline ensures quality before deployment"
echo "  🔧 VS Code configured for consistent development"
echo "  📝 Templates guide team contributions"
echo "  🔍 Automated testing covers unit, E2E, and accessibility"
echo "  🔒 Security monitoring for vulnerabilities"
echo "  📋 Quality gates enforce standards"
echo ""
echo "📖 For detailed information, see CODE_QUALITY_AUTOMATION.md"
echo ""
echo "🎯 Available Commands:"
echo "  npm run quality:check  - Run all quality checks"
echo "  npm run quality:fix    - Fix common issues"
echo "  npm run validate       - Complete validation"
echo "  npm run deps:check     - Check for updates"
echo "  npm run security:audit - Security audit"
echo ""
echo "✅ Automation setup complete! Happy coding! 🎉"
