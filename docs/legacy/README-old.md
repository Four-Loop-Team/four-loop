# Four Loop Digital

A modern, responsive web application built with the latest Next.js 15, React 19, TypeScript, and
Material UI 7, featuring advanced styling architecture, responsive grid system, and smooth
navigation animations.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
open http://localhost:3000
```

## ✨ Key Features

- **Cutting-Edge Tech Stack**: Next.js 15, React 19, TypeScript 5.8, Material UI 7, TailwindCSS 4
- **Advanced Styling System**: SCSS variables, CSS custom properties, semantic design tokens
- **12-Column Grid System**: Comprehensive responsive layout system
- **Smooth Navigation**: Performance-optimized animations with scroll detection
- **Type-Safe Development**: Full TypeScript implementation with strict configuration
- **Quality Assured**: ESLint, Prettier, Stylelint, and comprehensive testing
- **Enterprise-Level Testing**: Comprehensive test coverage with 313+ passing tests
- **Zero Security Vulnerabilities**: All dependencies up-to-date and security-patched

## 🎉 Recently Updated (June 2025)

This application has been completely modernized with the latest stable versions:

- **✅ React 19.1.0** - Latest React with new features and performance improvements
- **✅ Next.js 15.3.4** - Latest Next.js with enhanced App Router and optimizations
- **✅ Material UI 7.1.2** - Latest MUI with new design system and components
- **✅ TailwindCSS 4.1.10** - Latest TailwindCSS with new CSS engine
- **✅ Jest 30.0.3** - Latest testing framework with improved performance
- **✅ TypeScript 5.8.3** - Latest TypeScript with enhanced type checking
- **✅ Zero Security Vulnerabilities** - All dependencies security-patched

**All 313 tests passing** | **Comprehensive test coverage maintained** | **Production build
successful**

## 📚 Documentation

### 📖 **[Complete Application Documentation](./docs/architecture/COMPREHENSIVE_APPLICATION_DOCUMENTATION.md)**

_Master documentation covering the entire application architecture, systems, and implementation
details._

### Specialized Documentation

- **[Styling System](./docs/architecture/STYLING_SYSTEM_DOCUMENTATION.md)** - SCSS variables, CSS
  custom properties, theming
- **[Grid System](./docs/architecture/GRID_SYSTEM_DOCUMENTATION.md)** - 12-column responsive grid
  implementation
- **[Navigation System](./docs/architecture/NAVIGATION_IMPLEMENTATION.md)** - Navigation animations
  and scroll detection
- **[Code Quality Automation](./docs/quality/CODE_QUALITY_AUTOMATION.md)** - Git hooks, CI/CD, and
  quality gates
- **[Testing Strategy](./docs/quality/TESTING_STRATEGY_IMPLEMENTATION.md)** - Comprehensive testing
  approach
- **[SEO Implementation](./docs/performance/SEO_IMPLEMENTATION_SUMMARY.md)** - SEO optimization and
  perfect score achievement
- **[Accessibility Improvements](./docs/performance/ACCESSIBILITY_IMPROVEMENTS_SUMMARY.md)** -
  Perfect 100/100 accessibility score
- **[Performance Guide](./docs/performance/PERFORMANCE_UPDATE_GUIDE.md)** - Performance optimization
  strategies
- **[Documentation Index](./DOCUMENTATION_INDEX.md)** - Complete documentation navigation

## 🛠️ Development

### Available Scripts

| Script                       | Description                                 |
| ---------------------------- | ------------------------------------------- |
| `npm run dev`                | Start development server                    |
| `npm run build`              | Production build with quality checks        |
| `npm run start`              | Start production server                     |
| `npm run lint`               | Run linting and type checking               |
| `npm run lint:js`            | Run ESLint on JavaScript/TypeScript files   |
| `npm run lint:styles`        | Run Stylelint on CSS/SCSS files             |
| `npm run lint:fix`           | Fix auto-fixable linting issues             |
| `npm run lint:check`         | Check linting without fixing                |
| `npm run format`             | Format code with Prettier                   |
| `npm run format:check`       | Check code formatting                       |
| `npm run type-check`         | Run TypeScript type checking                |
| `npm run build:local`        | Local build with quality checks             |
| `npm run test`               | Run test suite                              |
| `npm run test:watch`         | Run tests in watch mode                     |
| `npm run test:coverage`      | Run tests with coverage report              |
| `npm run test:e2e`           | Run end-to-end tests                        |
| `npm run test:e2e:ui`        | Run E2E tests with UI                       |
| `npm run test:accessibility` | Run accessibility tests                     |
| `npm run test:all`           | Run all tests (unit + E2E)                  |
| `npm run deps:check`         | Check for outdated dependencies             |
| `npm run deps:update`        | Update dependencies and fix security issues |
| `npm run security:audit`     | Run security vulnerability audit            |
| `npm run security:audit:fix` | Fix security vulnerabilities                |
| `npm run quality:check`      | Comprehensive quality validation            |
| `npm run quality:fix`        | Fix common quality issues                   |
| `npm run validate`           | Complete validation (all checks + tests)    |
| `npm run prerelease`         | Pre-release validation and build            |

### Documentation Updates

**Important**: Documentation generation has been removed from pre-commit hooks to prevent infinite
loops.

| Script                  | Description                                |
| ----------------------- | ------------------------------------------ |
| `npm run docs:generate` | Generate all documentation files           |
| `npm run docs:update`   | Generate docs and stage changes for commit |
| `npm run docs:validate` | Validate documentation completeness        |
| `npm run docs:api`      | Generate and open API documentation        |
| `npm run docs:deps`     | Generate and open dependency report        |

**When to update documentation:**

- After adding new components, hooks, or utilities
- After changing package.json dependencies
- Before creating pull requests
- Manually run: `npm run docs:generate` then commit the changes

### Technology Stack

- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript 5.8.3
- **UI Library**: Material UI 7.1.2 + Emotion 11.14.0
- **Styling**: SCSS + CSS Custom Properties + TailwindCSS 4.1.10
- **Testing**: Jest 30.0.3 + React Testing Library 16.3.0 + Playwright 1.53.1
- **Quality**: ESLint 8.57.1 + Prettier 3.6.1 + Stylelint 16.21.0
- **Automation**: Husky 9.1.7 + lint-staged 15.5.2 + audit-ci 7.2.0
- **Build Tools**: Latest stable versions of all dependencies

## 🏗️ Project Structure

```text
Four Loop Digital/
├── .github/                    # GitHub workflows and templates
│   ├── workflows/              # CI/CD automation
│   ├── ISSUE_TEMPLATE/         # Bug report and feature request templates
│   └── PULL_REQUEST_TEMPLATE.md # PR template
├── .husky/                     # Git hooks for code quality
│   ├── _/                      # Husky internal files
│   ├── pre-commit              # Pre-commit validation
│   ├── commit-msg              # Commit message format validation
│   ├── post-commit             # Post-commit checks
│   └── pre-push                # Pre-push comprehensive validation
├── .vscode/                    # VS Code configuration
│   ├── settings.json           # Editor settings for team consistency
│   ├── extensions.json         # Recommended extensions
│   └── launch.json             # Debug configuration
├── e2e/                        # End-to-end tests (Playwright)
├── public/                     # Static assets
│   ├── android-chrome-192x192.png # Android app icons
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png    # iOS app icons
│   ├── favicon-16x16.png       # Favicon variants
│   ├── favicon-32x32.png
│   ├── favicon.ico
│   ├── mstile-150x150.png      # Windows tile icon
│   ├── safari-pinned-tab.svg   # Safari pinned tab icon
│   ├── browserconfig.xml       # Browser configuration
│   ├── site.webmanifest        # Web app manifest
│   ├── robots.txt              # SEO robots file
│   ├── logo.png                # Company logo
│   ├── next.svg                # Next.js logo
│   └── vercel.svg              # Vercel logo
├── src/                        # Source code
│   ├── app/                    # Next.js App Router
│   │   ├── __tests__/          # App-level tests
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── faq/                # FAQ page
│   │   ├── work/               # Work/Portfolio page
│   │   ├── ui/                 # UI utilities and styles
│   │   │   ├── __tests__/      # UI component tests
│   │   │   ├── fonts.ts        # Font configuration
│   │   │   ├── images/         # UI images and assets
│   │   │   └── styles/         # Global SCSS styles
│   │   │       ├── _variables.scss     # Design tokens
│   │   │       ├── _global.scss        # Global styles
│   │   │       └── _accessibility.scss # A11y styles
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Homepage
│   │   ├── page.spec.tsx       # Homepage tests
│   │   └── sitemap.ts          # Dynamic sitemap
│   ├── components/             # Reusable React components
│   │   ├── __tests__/          # Component tests
│   │   ├── layout/             # Layout components
│   │   │   ├── Navigation/     # Navigation system
│   │   │   ├── BreadcrumbNav.tsx # Breadcrumb navigation
│   │   │   ├── SkipNavigationLink.tsx # Accessibility skip link
│   │   │   └── index.ts        # Layout exports
│   │   ├── system/             # System-level components
│   │   │   ├── Grid/           # Grid system components
│   │   │   ├── MuiThemeProvider/ # Theme configuration
│   │   │   ├── GridSystemDemo.tsx # Grid demonstration
│   │   │   └── index.ts        # System exports
│   │   ├── brand/              # Brand components
│   │   │   ├── Logo.tsx        # Company logo component
│   │   │   └── index.ts        # Brand exports
│   │   ├── ui/                 # Basic UI components (placeholder)
│   │   │   └── index.ts        # UI exports
│   │   └── index.ts            # All component exports
│   ├── lib/                    # Utility libraries
│   │   ├── __tests__/          # Library tests
│   │   ├── utils/              # General utilities
│   │   │   ├── format.ts       # Formatting functions
│   │   │   ├── validation.ts   # Validation utilities
│   │   │   ├── helpers.ts      # Helper functions
│   │   │   └── index.ts        # Utils exports
│   │   ├── hooks/              # Custom React hooks
│   │   │   ├── useLocalStorage.ts # localStorage hook
│   │   │   ├── useMediaQuery.ts   # Media query hooks
│   │   │   ├── useScrollPosition.ts # Scroll tracking
│   │   │   └── index.ts        # Hooks exports
│   │   ├── metadata.ts         # SEO and metadata utilities
│   │   ├── performance.ts      # Performance monitoring
│   │   └── structured-data.ts  # JSON-LD structured data
│   ├── types/                  # TypeScript type definitions
│   │   ├── global.ts           # Global types
│   │   ├── components.ts       # Component prop types
│   │   ├── api.ts              # API-related types
│   │   └── index.ts            # Type exports
│   ├── constants/              # Application constants
│   │   ├── routes.ts           # Route definitions
│   │   ├── breakpoints.ts      # Responsive breakpoints
│   │   ├── colors.ts           # Design system colors
│   │   └── index.ts            # Constants exports
│   └── test/                   # Test utilities
│       ├── __mocks__/          # Jest mocks
│       ├── setup.ts            # Test setup configuration
│       ├── utils.tsx           # Test utilities
│       └── globals.d.ts        # Test type definitions
├── coverage/                   # Test coverage reports
├── test-results/              # Playwright test results
├── playwright-report/         # Playwright HTML reports
├── Configuration Files:
│   ├── babel.config.ts         # Babel configuration
│   ├── jest.config.js          # Jest testing configuration
│   ├── lint-staged.config.js   # Lint-staged configuration
│   ├── next.config.js          # Next.js configuration
│   ├── playwright.config.ts    # Playwright E2E configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── tailwind.config.ts      # TailwindCSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── .eslintrc.js            # ESLint configuration
│   ├── .prettierrc             # Prettier configuration
│   └── .stylelintrc.json       # Stylelint configuration
├── Documentation:
│   ├── README.md               # Project overview and quick start
│   ├── DOCUMENTATION_INDEX.md  # Documentation navigation
│   └── docs/                   # Organized documentation
│       ├── README.md           # Documentation index
│       ├── architecture/       # Architecture and design docs
│       ├── quality/            # Testing and quality docs
│       ├── performance/        # Performance and optimization docs
│       └── reports/            # Audit reports and achievements
├── Automation Scripts:
│   ├── check-automation-status.sh # Automation status checker
│   └── setup-dev-env.sh        # Development environment setup
└── package.json                # Dependencies and scripts
```

## 🎯 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher (currently using 22.16.0)
- **npm**: 8.x or higher (currently using 11.4.2)
- **Git**: For version control and automation hooks

### Quick Setup

1. **Clone and install**

   ```bash
   git clone <repository-url>
   cd four-loop
   npm install
   ```

2. **Set up development environment (automated)**

   ```bash
   # Run the automated setup script
   ./setup-dev-env.sh
   ```

3. **Start development**

   ```bash
   npm run dev
   ```

4. **Verify setup**

   ```bash
   # Check automation status
   ./check-automation-status.sh

   # Run quality checks
   npm run validate
   ```

### Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Install dependencies
npm ci

# Install Playwright browsers
npx playwright install

# Initialize Git hooks
npm run prepare

# Run initial quality check
npm run quality:check
```

## 📈 Performance & Quality

- **Comprehensive Testing**: Comprehensive test coverage with 313+ passing tests
- **Automated Code Quality**: Git hooks, CI/CD, and quality gates enforce standards
- **Build Pipeline**: Automated linting, formatting, and type checking
- **Git Hooks**: Pre-commit, commit-msg, post-commit, and pre-push automation
- **CI/CD Integration**: GitHub Actions with quality checks, security audits, and E2E testing
- **VS Code Configuration**: Team-wide editor settings and extension recommendations
- **Optimized Animations**: Hardware-accelerated transitions with performance monitoring
- **Responsive Design**: Mobile-first approach with 5 breakpoints
- **Type Safety**: Strict TypeScript configuration with full type coverage
- **Security Monitoring**: Automated vulnerability scanning and dependency updates

### Code Quality Automation

This project includes comprehensive automation to enforce code quality across the team:

- **🪝 Git Hooks**: Automated pre-commit validation, commit message formatting, and pre-push checks
- **🚀 CI/CD Pipeline**: GitHub Actions workflows for quality, testing, security, and deployment
- **💻 VS Code Integration**: Consistent editor settings and recommended extensions
- **📋 Templates**: GitHub issue and PR templates for consistent contributions
- **🔒 Security**: Automated vulnerability scanning and dependency monitoring

For complete automation details, see
[docs/quality/CODE_QUALITY_AUTOMATION.md](./docs/quality/CODE_QUALITY_AUTOMATION.md).

#### Quick Setup for New Team Members

```bash
# Run the automated setup script
./setup-dev-env.sh

# Check automation status
./check-automation-status.sh
```

### Testing

The project maintains **enterprise-level test coverage**:

```bash
# Run all tests
npm run test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Current Coverage: 96.86%

- 305+ passing tests
- 100% coverage for all utility libraries
- Comprehensive component and integration testing
- Accessibility-focused test patterns

---

For comprehensive documentation including architecture details, implementation guides, and
troubleshooting, see the
[Complete Application Documentation](./docs/architecture/COMPREHENSIVE_APPLICATION_DOCUMENTATION.md).
