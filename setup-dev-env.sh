#!/bin/bash

# Four Loop Digital - Development Environment Setup
# This script helps new team members set up their development environment

echo "🚀 Setting up Four Loop Digital development environment..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to Node.js 18 or higher."
    exit 1
fi

echo "✅ Node.js $(node -v) is installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Install Playwright browsers for E2E testing
echo "🎭 Installing Playwright browsers..."
npx playwright install

# Initialize Husky (if not already done)
echo "🪝 Setting up Git hooks..."
npm run prepare

# Run initial quality check
echo "🔍 Running initial quality check..."
npm run quality:check

echo ""
echo "✅ Development environment setup complete!"
echo ""
echo "📋 Quick commands to remember:"
echo "  npm run dev          - Start development server"
echo "  npm run test         - Run unit tests"
echo "  npm run test:e2e     - Run E2E tests"
echo "  npm run lint         - Check code quality"
echo "  npm run lint:fix     - Fix auto-fixable issues"
echo "  npm run quality:fix  - Fix common quality issues"
echo "  npm run validate     - Run all checks (before PR)"
echo ""
echo "📖 See CODE_QUALITY_AUTOMATION.md for detailed automation info"
echo ""
echo "🎉 Happy coding!"
