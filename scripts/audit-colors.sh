#!/bin/bash

# Color Audit Script - Finds hardcoded colors in the codebase
# Usage: npm run audit:colors

echo "🎨 Four Loop Digital - Color Audit"
echo "=================================="
echo ""

# Function to search for patterns and format output
search_pattern() {
    local pattern=$1
    local message=$2
    local files=$3

    echo "🔍 Searching for: $message"

    # Use grep to find matches
    if command -v rg &> /dev/null; then
        # Use ripgrep if available (faster)
        results=$(rg "$pattern" $files --type-not markdown --type-not json 2>/dev/null || true)
    else
        # Fallback to grep
        results=$(grep -r -n -E "$pattern" $files --exclude-dir=node_modules --exclude-dir=.git --exclude="*.md" --exclude="*.json" 2>/dev/null || true)
    fi

    if [ -n "$results" ]; then
        echo "❌ Found violations:"
        echo "$results" | while read -r line; do
            echo "   $line"
        done
        echo ""
        return 1
    else
        echo "✅ No violations found"
        echo ""
        return 0
    fi
}

# Initialize error counter
error_count=0

# Search for 6-digit hex colors
if ! search_pattern "#[0-9A-Fa-f]{6}" "6-digit hex colors (#RRGGBB)" "src/"; then
    ((error_count++))
fi

# Search for 3-digit hex colors
if ! search_pattern "#[0-9A-Fa-f]{3}" "3-digit hex colors (#RGB)" "src/"; then
    ((error_count++))
fi

# Search for RGB colors
if ! search_pattern "rgb\s*\(" "RGB color values" "src/"; then
    ((error_count++))
fi

# Search for RGBA colors
if ! search_pattern "rgba\s*\(" "RGBA color values" "src/"; then
    ((error_count++))
fi

# Search for HSL colors
if ! search_pattern "hsl\s*\(" "HSL color values" "src/"; then
    ((error_count++))
fi

# Search for common color names that should use our system
if ! search_pattern "\b(white|black|red|green|blue|yellow|purple|orange|pink|brown|gray|grey)\b.*:" "Common color names in styles" "src/"; then
    ((error_count++))
fi

# Search for specific problematic colors we've seen before
if ! search_pattern "#A8E6A3" "Specific problematic green color" "src/"; then
    ((error_count++))
fi

if ! search_pattern "#E2E8F0" "Specific problematic gray color" "src/"; then
    ((error_count++))
fi

echo "📊 AUDIT SUMMARY"
echo "================"

if [ $error_count -eq 0 ]; then
    echo "🎉 All checks passed! No hardcoded colors found."
    echo ""
    echo "✨ Your codebase is using the brand color system correctly!"
    exit 0
else
    echo "⚠️  Found $error_count violation(s)"
    echo ""
    echo "🔧 To fix these issues:"
    echo "   • Replace hex colors with CSS custom properties: var(--color-*)"
    echo "   • Use theme colors: import { colors } from '@/lib/theme'"
    echo "   • Use SCSS utility classes: .text-highlight, .bg-secondary-dark"
    echo ""
    echo "📖 See docs/COLOR_GUIDELINES.md for detailed instructions"
    exit 1
fi
