# Build Scripts Documentation

This directory contains comprehensive build scripts for generating SCSS variables and managing the
build process.

## Available Scripts

### Core Build Scripts

#### `build.ts` - Main Build Script

Comprehensive build script that handles the complete build process.

```bash
# Production build (default)
npm run build
tsx scripts/build.ts --prod

# Development build (less strict)
npm run build:dev
tsx scripts/build.ts --dev

# CI build (most strict)
npm run build:ci
tsx scripts/build.ts --ci

# Custom options
tsx scripts/build.ts --skip-tests --skip-linting --verbose
```

**Features:**

- Pre-build SCSS variable generation
- Linting (ESLint + Stylelint)
- TypeScript type checking
- Test execution (optional)
- Next.js build
- Post-build validation
- Colored output with timestamps

#### `build-scss.ts` - SCSS Variables Generator

Specialized script for generating SCSS variables from TypeScript design tokens.

```bash
# Generate once
npm run build:scss
tsx scripts/build-scss.ts

# Watch mode for development
npm run build:scss:watch
tsx scripts/build-scss.ts --watch

# Generate with validation
npm run build:scss:validate
tsx scripts/build-scss.ts --validate

# Custom output directory
tsx scripts/build-scss.ts --output-dir ./dist/styles

# All options combined
tsx scripts/build-scss.ts --watch --validate --verbose --output-dir ./custom
```

**Features:**

- Generate SCSS variables (`_generated-variables.scss`)
- Generate CSS custom properties (`generated-design-system.css`)
- Watch mode for automatic regeneration
- File validation with linting
- Custom output directories
- Verbose logging with timestamps

#### `build-scss.sh` - Shell Wrapper Script

Convenient shell script wrapper for common build tasks.

```bash
# Make executable (first time only)
chmod +x scripts/build-scss.sh

# Generate SCSS variables
./scripts/build-scss.sh generate

# Watch for changes
./scripts/build-scss.sh watch

# Generate and validate
./scripts/build-scss.sh validate

# Full build process
./scripts/build-scss.sh build

# Clean generated files
./scripts/build-scss.sh clean

# Show help
./scripts/build-scss.sh help
```

### Legacy Scripts

#### `generate-scss-variables.ts` - Original Generator

Original SCSS generation script (still functional but deprecated in favor of `build-scss.ts`).

```bash
tsx scripts/generate-scss-variables.ts
```

## Package.json Scripts

The following npm scripts are available:

### Primary Build Commands

```json
{
  "build": "tsx scripts/build.ts --prod",
  "build:dev": "tsx scripts/build.ts --dev",
  "build:ci": "tsx scripts/build.ts --ci"
}
```

### SCSS Generation Commands

```json
{
  "build:scss": "tsx scripts/build-scss.ts",
  "build:scss:watch": "tsx scripts/build-scss.ts --watch",
  "build:scss:validate": "tsx scripts/build-scss.ts --validate"
}
```

### Token Management (Aliases)

```json
{
  "tokens:generate": "tsx scripts/build-scss.ts",
  "tokens:watch": "tsx scripts/build-scss.ts --watch",
  "tokens:validate": "tsx scripts/build-scss.ts --validate"
}
```

## Integration with Existing Workflow

### Pre-commit Hooks

The SCSS generation is automatically triggered during:

- Pre-commit hooks (via lint-staged)
- Main build process
- CI/CD pipeline

### Watch Mode for Development

Use watch mode during development to automatically regenerate SCSS variables when design tokens
change:

```bash
npm run build:scss:watch
# or
./scripts/build-scss.sh watch
```

### Production Builds

For production builds, SCSS generation is automatically included:

```bash
npm run build
# This runs: generate SCSS → lint → type check → build Next.js
```

## Output Files

### Generated SCSS Variables

**Location:** `src/app/ui/styles/_generated-variables.scss`

Contains SCSS variables for all design tokens:

```scss
// Brand Colors
$brand-primary: #e2e891;
$brand-secondary: #353535;

// Spacing Scale
$spacing-xs: 0.5rem;
$spacing-sm: 1rem;
// ... etc
```

### Generated CSS Custom Properties

**Location:** `src/styles/generated-design-system.css`

Contains CSS custom properties for runtime theming:

```css
:root {
  /* Brand Colors */
  --brand-primary: #e2e891;
  --brand-secondary: #353535;

  /* Theme Colors (Light) */
  --color-surface-primary: #fff;
  /* ... etc */
}

[data-theme='dark'] {
  --color-surface-primary: #353535;
  /* ... etc */
}
```

## Environment Variables

Set these environment variables to customize build behavior:

- `NODE_ENV`: Build environment (`development`|`production`|`test`)
- `SCSS_OUTPUT_DIR`: Custom output directory for SCSS files
- `CI`: Set to `true` for CI environment detection

## Error Handling

All build scripts include comprehensive error handling:

- **TypeScript Errors**: Build fails if type checking fails
- **Linting Errors**: Build fails in production, warnings in development
- **File Generation Errors**: Build fails if SCSS/CSS generation fails
- **Validation Errors**: Optional validation can catch output issues

## Development Workflow

### Recommended Development Setup

1. **Start watch mode** for automatic SCSS regeneration:

   ```bash
   npm run build:scss:watch
   ```

2. **Start Next.js development server** in another terminal:

   ```bash
   npm run dev
   ```

3. **Edit design tokens** in `src/constants/design-tokens-consolidated.ts`
4. **Watch automatic regeneration** of SCSS and CSS files
5. **See changes reflected** in the browser immediately

### Production Deployment

1. **Run full build** with all validations:

   ```bash
   npm run build
   ```

2. **Or use CI build** for maximum strictness:
   ```bash
   npm run build:ci
   ```

## Troubleshooting

### Common Issues

**SCSS Generation Fails:**

- Check TypeScript compilation in design tokens file
- Ensure all required dependencies are installed
- Run `npm run type-check` to identify issues

**Watch Mode Not Working:**

- Verify file permissions on the watched file
- Check if the design tokens file path is correct
- Restart watch mode if files are not being detected

**Build Fails in CI:**

- Ensure all environment variables are set
- Check that all dependencies are installed
- Review error logs for specific failure points

**Linting Errors:**

- Run `npm run lint:fix` to auto-fix common issues
- Check generated CSS against Stylelint rules
- Verify that generated files are properly formatted

### Debug Mode

Enable verbose output for detailed information:

```bash
tsx scripts/build.ts --verbose
tsx scripts/build-scss.ts --verbose
./scripts/build-scss.sh build --verbose
```

## Contributing

When modifying build scripts:

1. **Test all modes** (dev, prod, CI) before committing
2. **Update documentation** for any new features or options
3. **Maintain backward compatibility** with existing npm scripts
4. **Add comprehensive error handling** for new features
5. **Include TypeScript types** for all new interfaces
