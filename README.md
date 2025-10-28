# Four Loop Digital

A modern, high-performance web application built with Next.js 15, React 19, TypeScript, and Material
UI 7, featuring advanced styling architecture, responsive grid system, and comprehensive quality
automation.

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

- **🔥 Modern Tech Stack**: Next.js 15, React 19, TypeScript 5.8, Material UI 7
- **🎨 Advanced Styling**: SCSS variables, CSS custom properties, Design System
- **📱 Responsive Design**: 12-column grid system with mobile-first approach
- **⚡ Performance Optimized**: Smooth animations, scroll detection
- **🔒 Type-Safe Development**: Full TypeScript implementation
- **✅ Quality Assured**: ESLint, Prettier, Stylelint with automated enforcement
- **🧪 Enterprise Testing**: 72 test suites, 1,215 passing tests
- **🛡️ Zero Vulnerabilities**: All dependencies up-to-date and security-patched
- **♿ Accessibility First**: WCAG 2.1 AA compliant with perfect Lighthouse scores

## 📊 Project Status

- **✅ Tests**: 1,215 passing tests across 72 test suites
- **✅ Coverage**: 85.44% comprehensive test coverage
- **✅ Security**: 0 vulnerabilities, all dependencies current
- **✅ Performance**: Optimized builds, fast loading times
- **✅ Accessibility**: Perfect 100/100 Lighthouse accessibility score
- **✅ SEO**: Perfect 100/100 Lighthouse SEO score

## 📚 Documentation

### 🎯 Quick Navigation

| What you need         | Link                                            |
| --------------------- | ----------------------------------------------- |
| **Getting started**   | [Development Setup](#️-development)             |
| **Architecture**      | [Complete Documentation][architecture-docs]     |
| **All documentation** | [Documentation Index](./DOCUMENTATION_INDEX.md) |

### 📖 Key Documentation

- **[Styling System][styling-docs]** - SCSS variables, CSS custom properties
- **[Grid System][grid-docs]** - 12-column responsive grid implementation
- **[Navigation System][nav-docs]** - Navigation animations and scroll detection
- **[Code Quality][quality-docs]** - Git hooks, CI/CD, and quality gates
- **[Testing Strategy][testing-docs]** - Comprehensive testing approach
- **[Performance Guide][performance-docs]** - Performance optimization strategies

## 🛠️ Development

### Available Scripts

| Script                  | Description                                |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Start development server                   |
| `npm run build`         | Production build with quality checks       |
| `npm run build:dev`     | Development build with SCSS generation     |
| `npm run build:ci`      | CI build optimized for automation          |
| `npm run start`         | Start production server                    |
| `npm run scss:generate` | Generate SCSS variables from design tokens |
| `npm run scss:watch`    | Watch mode SCSS generation                 |
| `npm run scss:validate` | Validate generated SCSS files              |
| `npm run lint`          | Run all linting checks                     |
| `npm run lint:fix`      | Fix auto-fixable linting issues            |
| `npm run format`        | Format code with Prettier                  |
| `npm run type-check`    | Run TypeScript type checking               |
| `npm test`              | Run test suite                             |
| `npm run test:coverage` | Run tests with coverage report             |
| `npm run test:e2e`      | Run end-to-end tests                       |
| `npm run quality:check` | Comprehensive quality validation           |
| `npm run docs:generate` | Generate documentation                     |

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.8
- **UI Library**: Material UI 7 + Emotion 11
- **Styling**: SCSS + CSS Custom Properties + Design System
- **Testing**: Jest 30 + React Testing Library + Playwright
- **Quality**: ESLint 8 + Prettier 3 + Stylelint 16
- **Automation**: Husky 9 + lint-staged 15

### Build System

The project includes a comprehensive build system with specialized scripts for SCSS variable
generation:

- **Build Scripts**: TypeScript-based build automation in `scripts/` directory
- **SCSS Generation**: Automated conversion of design tokens to SCSS variables and CSS custom
  properties
- **Watch Mode**: Real-time regeneration of SCSS files during development
- **Validation**: Automated linting and validation of generated files
- **Shell Interface**: Convenient command-line wrapper (`./scripts/build-scss.sh`)

For detailed build system documentation, see [`scripts/README.md`](scripts/README.md).

## 🏗️ Project Structure

```text
four-loop/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── work/               # Portfolio page
│   │   └── ui/                 # Global styles and fonts
│   ├── components/             # React components
│   │   ├── layout/             # Layout components
│   │   ├── sections/           # Page sections
│   │   ├── system/             # System components
│   │   └── ui/                 # UI components
│   ├── lib/                    # Utilities and hooks
│   └── constants/              # Application constants
├── docs/                       # Organized documentation
│   ├── architecture/           # Architecture docs
│   ├── quality/                # Testing and quality docs
│   ├── performance/            # Performance docs
│   ├── development/            # Development guides
│   └── reports/                # Audit reports
├── e2e/                        # End-to-end tests
└── public/                     # Static assets
```

## 🎯 Getting Started

### Prerequisites

- **Node.js**: 18+ (currently using 22.16.0)
- **npm**: 8+ (currently using 11.4.2)

### Setup

1. **Clone and install**

   ```bash
   git clone <repository-url>
   cd four-loop
   npm install
   ```

2. **Start development**

   ```bash
   npm run dev
   ```

3. **Verify setup**

   ```bash
   npm run quality:check
   npm test
   ```

## 📈 Quality & Performance

### Code Quality Automation

- **🪝 Git Hooks**: Automated pre-commit validation and formatting
- **🔍 CI/CD Pipeline**: GitHub Actions for quality, testing, and security
- **⚡ Real-time Validation**: ESLint, Prettier, and Stylelint integration
- **🛡️ Security Monitoring**: Automated vulnerability scanning

### Testing Excellence

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

**Current Coverage**: 85.44% with 1,215 passing tests

- Unit tests for all components and utilities
- Integration tests for key user flows
- End-to-end tests for critical paths
- Accessibility testing automation

## 🤝 Contributing

1. Follow the [Git Branching Strategy](./docs/development/GIT_BRANCHING_STRATEGY.md)
2. Ensure all quality checks pass: `npm run quality:check`
3. Write tests for new features
4. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🚀 Deploying to Vercel (recommended)

We recommend hosting this Next.js application on Vercel. Vercel fully supports Next.js features
including API routes, Edge functions, and Image Optimization which are incompatible with a GitHub
Pages static export.

Quick steps:

1. Go to https://vercel.com/new and import the GitHub repository `Four-Loop-Team/four-loop`.
2. Framework Preset: Next.js (should be auto-detected).
3. Root Directory: leave blank unless the app lives in a subfolder.
4. Build Command: `npm run build` (the project already runs lint, tests, and other validation as
   part of the build script).
5. Output Directory: leave blank (Vercel handles Next.js builds automatically).
6. Add environment variables under Project Settings → Environment Variables. Recommended variables:
   - `NEXT_PUBLIC_SHOW_NAVIGATION` — Set to `false` to hide the navigation in production, or leave
     unset/`true` to show it.
   - Any third-party API keys (Optimizely, Shopify, Resend, etc.) — do not commit secrets to the
     repo.
7. Set the Production Branch to `main` and finish the import. Vercel will create Preview deployments
   for PRs automatically.

Optional files:

- `vercel.json` (included) — minimal config to ensure Next.js is used and API routes are preserved.
  You can extend this with rewrites or headers if needed.

Cleanup note:

- The GitHub Pages deployment workflow has been disabled and archived at
  `.github/workflows/disabled/nextjs.pages.yml`. Remove any GitHub Pages settings in the
  repository's Settings → Pages if you previously enabled them.

**Documentation**: [Complete Documentation Index](./DOCUMENTATION_INDEX.md) | **Architecture**:
[System Overview][architecture-docs]

<!-- Link References -->

[architecture-docs]: ./docs/architecture/COMPREHENSIVE_APPLICATION_DOCUMENTATION.md
[styling-docs]: ./docs/architecture/STYLING_SYSTEM_DOCUMENTATION.md
[grid-docs]: ./docs/architecture/GRID_SYSTEM_DOCUMENTATION.md
[nav-docs]: ./docs/architecture/NAVIGATION_IMPLEMENTATION.md
[quality-docs]: ./docs/quality/CODE_QUALITY_AUTOMATION.md
[testing-docs]: ./docs/quality/TESTING_STRATEGY_IMPLEMENTATION.md
[performance-docs]: ./docs/performance/PERFORMANCE_UPDATE_GUIDE.md
