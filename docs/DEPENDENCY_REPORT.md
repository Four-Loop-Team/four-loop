# Dependency Report

> 🤖 Auto-generated dependency analysis

## Summary

- **Total Dependencies**: 79
- **Production**: 3
- **Development**: 76

## Core Technologies

| Technology  | Version | Type        |
| ----------- | ------- | ----------- |
| Next.js     | ^15.3.4 | Production  |
| React       | ^19.1.0 | Production  |
| TypeScript  | ^5.3.3  | Development |
| Material-UI | ^7.1.2  | Development |

## Security Status

✅ **No security vulnerabilities found**

## Dependency Categories

### Production Dependencies (3)

These are essential for the application to run in production:

- **next**: ^15.3.4 - React framework for production
- **react**: ^19.1.0 - Core React library
- **react-dom**: ^19.1.0 - React DOM bindings

### Development Dependencies (76)

Development tools, testing, and build utilities:

#### Testing & Quality Assurance

- **@testing-library/react**: ^16.3.0 - React testing utilities
- **@testing-library/jest-dom**: ^6.6.3 - Jest DOM matchers
- **@testing-library/user-event**: ^14.6.1 - User interaction testing
- **jest**: ^30.0.3 - JavaScript testing framework
- **@playwright/test**: ^1.53.1 - End-to-end testing
- **@axe-core/playwright**: ^4.10.2 - Accessibility testing
- **eslint**: ^8.56.0 - JavaScript linting
- **prettier**: ^3.2.5 - Code formatting
- **stylelint**: ^16.2.1 - CSS linting

#### TypeScript & Build Tools

- **typescript**: ^5.3.3 - TypeScript compiler
- **@types/node**: ^24.0.4 - Node.js type definitions
- **@types/react**: ^19.1.8 - React type definitions
- **@types/react-dom**: ^19.1.6 - React DOM type definitions
- **ts-jest**: ^29.1.2 - TypeScript Jest preprocessor

#### UI & Styling

- **@mui/material**: ^7.1.2 - Material-UI components
- **@mui/icons-material**: ^7.1.2 - Material-UI icons
- **@emotion/react**: ^11.11.3 - CSS-in-JS library
- **@emotion/styled**: ^11.11.0 - Styled components
- **tailwindcss**: ^4.1.10 - Utility-first CSS framework
- **sass**: ^1.71.0 - CSS preprocessor

#### Development Workflow

- **husky**: ^9.0.11 - Git hooks
- **lint-staged**: ^15.2.2 - Pre-commit linting
- **audit-ci**: ^7.1.0 - Security auditing in CI

## Dependency Health

### Update Status

All dependencies are up-to-date and actively maintained.

### Security Audit

No known security vulnerabilities detected in the current dependency tree.

### Bundle Impact

The production bundle only includes the 3 production dependencies:

- Next.js handles code splitting and optimization
- React provides the component framework
- React DOM provides browser rendering

Development dependencies do not impact production bundle size.

## Recommendations

### Maintenance

- **Regular Updates**: Keep dependencies updated monthly
- **Security Audits**: Run `npm audit` before each release
- **Dependency Review**: Review new dependencies before adding

### Optimization

- **Bundle Analysis**: Use Next.js Bundle Analyzer periodically
- **Tree Shaking**: Ensure unused code is eliminated
- **Code Splitting**: Leverage Next.js automatic code splitting

## Version Management

### Semantic Versioning

The project follows semantic versioning for dependencies:

- **Caret (^)**: Allows patch and minor updates
- **Exact**: Used for critical dependencies requiring specific versions

### Update Strategy

1. **Patch Updates**: Automated via Dependabot
2. **Minor Updates**: Manual review and testing
3. **Major Updates**: Thorough testing and migration planning

---

_Report generated: June 26, 2025_ _Dependencies analyzed: 79 total_ _Security scan: Clean_
