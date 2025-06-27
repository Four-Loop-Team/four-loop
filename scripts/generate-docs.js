#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('🚀 Starting documentation generation...');

// Define directories
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const docsDir = path.join(rootDir, 'docs');
const templatesDir = path.join(docsDir, 'templates');

// Ensure docs directory structure exists
const requiredDirs = [
  docsDir,
  path.join(docsDir, 'architecture'),
  path.join(docsDir, 'quality'),
  path.join(docsDir, 'reports'),
  templatesDir,
];

requiredDirs.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// Count files and components
function countFiles() {
  const patterns = {
    components: 'src/components/**/*.tsx',
    tests: '**/*.test.{ts,tsx,js,jsx}',
    stories: '**/*.stories.{ts,tsx,js,jsx}',
    pages: 'src/app/**/page.tsx',
    hooks: 'src/hooks/**/*.{ts,tsx}',
    utils: 'src/utils/**/*.{ts,tsx}',
    types: 'src/types/**/*.{ts,tsx}',
    styles: 'src/**/*.{css,scss,sass}',
    docs: 'docs/**/*.md',
  };

  const counts = {};
  for (const [key, pattern] of Object.entries(patterns)) {
    try {
      const files = glob.sync(pattern, { cwd: rootDir });
      counts[key] = files.length;
    } catch (error) {
      console.warn(`⚠️ Error counting ${key}: ${error.message}`);
      counts[key] = 0;
    }
  }

  return counts;
}

// Extract JSDoc from components
function extractComponentDocs() {
  try {
    const componentFiles = glob.sync('src/components/**/*.tsx', {
      cwd: rootDir,
    });
    const componentDocs = [];

    componentFiles.forEach((filePath) => {
      const fullPath = path.join(rootDir, filePath);
      try {
        const content = fs.readFileSync(fullPath, 'utf8');

        // Extract component name from file path
        const componentName = path.basename(filePath, '.tsx');

        // Extract JSDoc comments
        const jsdocRegex = /\/\*\*\n([\s\S]*?)\*\//g;
        const matches = content.match(jsdocRegex);

        if (matches) {
          const description = matches[0]
            .replace(/\/\*\*\n|\*\//g, '')
            .replace(/\n\s*\*/g, '\n')
            .trim();

          componentDocs.push({
            name: componentName,
            file: filePath,
            description,
          });
        }
      } catch (error) {
        console.warn(`⚠️ Error processing ${filePath}: ${error.message}`);
      }
    });

    return componentDocs;
  } catch (error) {
    console.warn(`⚠️ Error extracting component docs: ${error.message}`);
    return [];
  }
}

// Generate dependency report
function generateDependencyReport() {
  try {
    const packageJsonPath = path.join(rootDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const dependencies = packageJson.dependencies || {};
    const devDependencies = packageJson.devDependencies || {};

    const report = {
      production: Object.keys(dependencies).length,
      development: Object.keys(devDependencies).length,
      total:
        Object.keys(dependencies).length + Object.keys(devDependencies).length,
      details: {
        dependencies,
        devDependencies,
      },
    };

    return report;
  } catch (error) {
    console.warn(`⚠️ Error generating dependency report: ${error.message}`);
    return { production: 0, development: 0, total: 0, details: {} };
  }
}

// Generate project statistics
function generateProjectStats() {
  console.log('📊 Generating project statistics...');

  const counts = countFiles();
  const componentDocs = extractComponentDocs();
  const depReport = generateDependencyReport();

  const stats = {
    generatedAt: new Date().toISOString(),
    files: counts,
    components: {
      total: counts.components,
      documented: componentDocs.length,
      coverage:
        counts.components > 0
          ? Math.round((componentDocs.length / counts.components) * 100)
          : 0,
    },
    testing: {
      testFiles: counts.tests,
      coverage: 'Run npm run test:coverage for detailed coverage',
    },
    dependencies: depReport,
    documentation: {
      pages: counts.docs,
      lastUpdated: new Date().toISOString(),
    },
  };

  // Write to PROJECT_STATISTICS.md
  const statsContent = `# Project Statistics

> 🤖 Auto-generated on ${stats.generatedAt}

## 📊 Overview

| Metric | Count |
|--------|-------|
| Components | ${stats.components.total} |
| Test Files | ${stats.testing.testFiles} |
| Documentation Pages | ${stats.documentation.pages} |
| Dependencies | ${stats.dependencies.total} |
| Hooks | ${stats.files.hooks} |
| Utils | ${stats.files.utils} |
| Types | ${stats.files.types} |

## 🧩 Components

- **Total Components**: ${stats.components.total}
- **Documented Components**: ${stats.components.documented}
- **Documentation Coverage**: ${stats.components.coverage}%

## 📦 Dependencies

- **Production**: ${stats.dependencies.production}
- **Development**: ${stats.dependencies.development}
- **Total**: ${stats.dependencies.total}

## 🧪 Testing

- **Test Files**: ${stats.testing.testFiles}
- **Coverage**: ${stats.testing.coverage}

## 📝 Documentation

- **Documentation Pages**: ${stats.documentation.pages}
- **Last Updated**: ${stats.documentation.lastUpdated}

---

*This report is automatically generated by the documentation system.*
`;

  fs.writeFileSync(path.join(docsDir, 'PROJECT_STATISTICS.md'), statsContent);
  console.log('✅ Generated PROJECT_STATISTICS.md');

  return stats;
}

// Generate API documentation
function generateApiDocs() {
  console.log('📖 Generating API documentation...');

  const componentDocs = extractComponentDocs();

  let apiContent = `# API Documentation

> 🤖 Auto-generated on ${new Date().toISOString()}

## Component API Reference

`;

  if (componentDocs.length === 0) {
    apiContent += `No documented components found. Add JSDoc comments to your components for automatic API documentation.

### Example JSDoc Comment:

\`\`\`typescript
/**
 * A reusable button component with multiple variants and sizes.
 *
 * @param variant - The button style variant (primary, secondary, danger)
 * @param size - The button size (sm, md, lg)
 * @param disabled - Whether the button is disabled
 * @param children - The button content
 */
export const Button = ({ variant, size, disabled, children }: ButtonProps) => {
  // component implementation
};
\`\`\`
`;
  } else {
    componentDocs.forEach((component) => {
      apiContent += `### ${component.name}

**File**: \`${component.file}\`

${component.description}

---

`;
    });
  }

  apiContent += `
## Adding Documentation

To add API documentation for your components:

1. Add JSDoc comments above your component declarations
2. Run \`npm run docs:generate\` to update this file
3. Documentation will be automatically extracted and formatted

---

*This documentation is automatically generated from JSDoc comments in your components.*
`;

  fs.writeFileSync(path.join(docsDir, 'API_DOCUMENTATION.md'), apiContent);
  console.log('✅ Generated API_DOCUMENTATION.md');

  return componentDocs;
}

// Generate dependency report
function generateDepReport() {
  console.log('📦 Generating dependency report...');

  const depData = generateDependencyReport();

  let depContent = `# Dependency Report

> 🤖 Auto-generated on ${new Date().toISOString()}

## 📊 Summary

| Type | Count |
|------|-------|
| Production Dependencies | ${depData.production} |
| Development Dependencies | ${depData.development} |
| **Total Dependencies** | **${depData.total}** |

## 🏗️ Production Dependencies

`;

  if (Object.keys(depData.details.dependencies || {}).length > 0) {
    Object.entries(depData.details.dependencies).forEach(([name, version]) => {
      depContent += `- **${name}**: ${version}\n`;
    });
  } else {
    depContent += 'No production dependencies found.\n';
  }

  depContent += `
## 🔧 Development Dependencies

`;

  if (Object.keys(depData.details.devDependencies || {}).length > 0) {
    Object.entries(depData.details.devDependencies).forEach(
      ([name, version]) => {
        depContent += `- **${name}**: ${version}\n`;
      }
    );
  } else {
    depContent += 'No development dependencies found.\n';
  }

  depContent += `
## 🔄 Maintenance

To update dependencies:

\`\`\`bash
# Check for outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm install package-name@latest
\`\`\`

---

*This report is automatically generated from package.json.*
`;

  fs.writeFileSync(path.join(docsDir, 'DEPENDENCY_REPORT.md'), depContent);
  console.log('✅ Generated DEPENDENCY_REPORT.md');

  return depData;
}

// Update README.md with current stats
function updateReadme() {
  console.log('📝 Updating README.md...');

  const readmePath = path.join(rootDir, 'README.md');
  const templatePath = path.join(templatesDir, 'README.template.md');

  if (!fs.existsSync(readmePath)) {
    console.log('⚠️ README.md not found, skipping update');
    return;
  }

  const stats = countFiles();
  const readme = fs.readFileSync(readmePath, 'utf8');

  // Update badge-like content with current stats
  let updatedReadme = readme;

  // Update component count if badge exists
  const componentBadgeRegex = /Components-\d+-blue/g;
  if (componentBadgeRegex.test(updatedReadme)) {
    updatedReadme = updatedReadme.replace(
      componentBadgeRegex,
      `Components-${stats.components}-blue`
    );
  }

  // Update test count if badge exists
  const testBadgeRegex = /Tests-\d+-green/g;
  if (testBadgeRegex.test(updatedReadme)) {
    updatedReadme = updatedReadme.replace(
      testBadgeRegex,
      `Tests-${stats.tests}-green`
    );
  }

  if (updatedReadme !== readme) {
    fs.writeFileSync(readmePath, updatedReadme);
    console.log('✅ Updated README.md with current stats');
  } else {
    console.log('ℹ️ No stat badges found in README.md to update');
  }
}

// Main execution
async function main() {
  try {
    console.log('🏗️ Setting up documentation structure...');

    // Generate all documentation
    const stats = generateProjectStats();
    const apiDocs = generateApiDocs();
    const depReport = generateDepReport();

    // Update README
    updateReadme();

    console.log('\n🎉 Documentation generation complete!');
    console.log(`📊 Generated stats for ${stats.components.total} components`);
    console.log(`📖 Documented ${apiDocs.length} components with JSDoc`);
    console.log(`📦 Tracked ${depReport.total} dependencies`);
  } catch (error) {
    console.error('❌ Error during documentation generation:', error);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  main,
  generateProjectStats,
  generateApiDocs,
  generateDepReport,
};
