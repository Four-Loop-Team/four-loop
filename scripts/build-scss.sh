#!/bin/bash

# Build Scripts for SCSS Variables Generation
# ==========================================
#
# This script provides convenient commands for generating and managing
# SCSS variables and CSS custom properties from TypeScript design tokens.
#
# Usage: ./scripts/build-scss.sh [command] [options]

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Helper functions
log() {
    echo -e "${BLUE}[$(date +'%T')] $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

info() {
    echo -e "${PURPLE}ℹ️  $1${NC}"
}

# Show usage information
show_usage() {
    cat << EOF
Build Scripts for SCSS Variables Generation

Usage: ./scripts/build-scss.sh [command] [options]

Commands:
  generate              Generate SCSS variables and CSS custom properties once
  watch                 Watch for changes and regenerate automatically
  validate              Generate and validate output files
  build                 Run full build process (generate + validate + build app)
  clean                 Clean generated files
  help                  Show this help message

Options:
  --verbose             Enable verbose output
  --output-dir <path>   Custom output directory
  --skip-validation     Skip file validation
  --skip-linting        Skip linting checks

Examples:
  ./scripts/build-scss.sh generate
  ./scripts/build-scss.sh watch --verbose
  ./scripts/build-scss.sh validate --output-dir ./dist
  ./scripts/build-scss.sh build --skip-validation

Environment Variables:
  SCSS_OUTPUT_DIR       Default output directory for SCSS files
  NODE_ENV              Build environment (development|production|test)
EOF
}

# Generate SCSS variables
generate_scss() {
    log "Generating SCSS variables and CSS custom properties..."

    if command -v npm >/dev/null 2>&1; then
        npm run build:scss "$@"
    elif command -v tsx >/dev/null 2>&1; then
        tsx scripts/build-scss.ts "$@"
    else
        error "Neither npm nor tsx found. Please install Node.js and dependencies."
        exit 1
    fi

    success "SCSS generation completed"
}

# Watch for changes
watch_scss() {
    log "Starting watch mode for SCSS variables..."
    info "Press Ctrl+C to stop watching"

    if command -v npm >/dev/null 2>&1; then
        npm run build:scss:watch "$@"
    else
        tsx scripts/build-scss.ts --watch "$@"
    fi
}

# Validate generated files
validate_scss() {
    log "Generating and validating SCSS files..."

    if command -v npm >/dev/null 2>&1; then
        npm run build:scss:validate "$@"
    else
        tsx scripts/build-scss.ts --validate "$@"
    fi

    success "Validation completed"
}

# Full build process
build_full() {
    log "Running full build process..."

    # Set environment
    export NODE_ENV=${NODE_ENV:-production}

    # Generate SCSS
    generate_scss "$@"

    # Run main build
    if command -v npm >/dev/null 2>&1; then
        case $NODE_ENV in
            development)
                npm run build:dev
                ;;
            test)
                npm run build:ci
                ;;
            *)
                npm run build
                ;;
        esac
    else
        error "npm not found. Please install Node.js and dependencies."
        exit 1
    fi

    success "Full build completed"
}

# Clean generated files
clean_generated() {
    log "Cleaning generated SCSS and CSS files..."

    # Default paths
    local scss_path="src/app/ui/styles/_generated-variables.scss"
    local css_path="src/styles/generated-design-system.css"

    # Remove files if they exist
    if [ -f "$scss_path" ]; then
        rm "$scss_path"
        info "Removed: $scss_path"
    fi

    if [ -f "$css_path" ]; then
        rm "$css_path"
        info "Removed: $css_path"
    fi

    # Clean Next.js build cache
    if [ -d ".next" ]; then
        rm -rf .next
        info "Removed: .next/"
    fi

    success "Cleanup completed"
}

# Main script logic
main() {
    # Change to project root
    cd "$(dirname "$0")/.."

    local command="$1"
    shift  # Remove command from arguments

    case "$command" in
        generate|gen|g)
            generate_scss "$@"
            ;;
        watch|w)
            watch_scss "$@"
            ;;
        validate|v)
            validate_scss "$@"
            ;;
        build|b)
            build_full "$@"
            ;;
        clean|c)
            clean_generated "$@"
            ;;
        help|h|--help|-h|"")
            show_usage
            ;;
        *)
            error "Unknown command: $command"
            echo
            show_usage
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
