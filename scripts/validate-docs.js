#!/usr/bin/env node

/* eslint-disable no-console */

/**
 * Documentation Validation Script
 * Validates documentation for consistency, broken links, and completeness
 */

const fs = require('fs');
const path = require('path');

class DocumentationValidator {
  constructor() {
    this.projectRoot = process.cwd();
    this.errors = [];
    this.warnings = [];
    this.stats = {
      documentsChecked: 0,
      linksChecked: 0,
      imagesChecked: 0,
    };
  }

  logError(message) {
    this.errors.push(message);
    console.error(`❌ ERROR: ${message}`);
  }

  logWarning(message) {
    this.warnings.push(message);
    console.warn(`⚠️  WARNING: ${message}`);
  }

  logInfo(message) {
    console.log(`ℹ️  ${message}`);
  }

  validateFileStructure() {
    console.log('🏗️  Validating documentation structure...');

    const requiredFiles = [
      'README.md',
      'DOCUMENTATION_INDEX.md',
      'docs/README.md',
      'docs/API_DOCUMENTATION.md',
      'docs/DEPENDENCY_REPORT.md',
      'docs/PROJECT_STATISTICS.md',
      'docs/architecture/UI_COMPONENT_LIBRARY.md',
      'docs/reports/NEXT_STEPS_IMPLEMENTATION_COMPLETE.md',
    ];

    for (const file of requiredFiles) {
      const filePath = path.join(this.projectRoot, file);
      if (!fs.existsSync(filePath)) {
        this.logError(`Required documentation file missing: ${file}`);
      } else {
        this.logInfo(`✅ Found: ${file}`);
      }
    }
  }

  validateMarkdownSyntax() {
    console.log('📝 Validating Markdown syntax...');

    const markdownFiles = this.findMarkdownFiles('.');

    for (const file of markdownFiles) {
      this.stats.documentsChecked++;
      const content = fs.readFileSync(file, 'utf8');

      // Check for basic markdown issues
      this.validateMarkdownFile(file, content);
    }
  }

  validateMarkdownFile(file, content) {
    const lines = content.split('\n');

    // Check for unclosed code blocks
    let codeBlockCount = 0;
    let inCodeBlock = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNum = i + 1;

      // Check for code blocks
      if (line.startsWith('```')) {
        codeBlockCount++;
        inCodeBlock = !inCodeBlock;
      }

      // Check for common markdown issues
      if (line.includes('](') && !this.isValidLink(line, file)) {
        this.logWarning(
          `Potential broken link in ${file}:${lineNum}: ${line.trim()}`
        );
      }

      // Check for missing alt text in images
      if (line.includes('![](')) {
        this.logWarning(`Missing alt text in image in ${file}:${lineNum}`);
      }
    }

    // Check for unclosed code blocks
    if (codeBlockCount % 2 !== 0) {
      this.logError(`Unclosed code block in ${file}`);
    }
  }

  isValidLink(line, file) {
    // Extract all markdown links from the line
    const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
    let match;
    let allValid = true;

    while ((match = linkRegex.exec(line)) !== null) {
      const linkUrl = match[2];
      this.stats.linksChecked++;

      // Skip external URLs (http/https) for now
      if (linkUrl.startsWith('http://') || linkUrl.startsWith('https://')) {
        continue;
      }

      // Check if local file exists
      if (
        linkUrl.startsWith('./') ||
        linkUrl.startsWith('../') ||
        !linkUrl.startsWith('http')
      ) {
        const resolvedPath = path.resolve(
          path.dirname(file),
          linkUrl.split('#')[0]
        );
        if (!fs.existsSync(resolvedPath)) {
          this.logError(`Broken local link: ${linkUrl} (from ${file})`);
          allValid = false;
        }
      }
    }

    return allValid;
  }

  validateCodeSamples() {
    console.log('💻 Validating code samples...');

    const markdownFiles = this.findMarkdownFiles('.');

    for (const file of markdownFiles) {
      const content = fs.readFileSync(file, 'utf8');
      this.validateCodeInFile(file, content);
    }
  }

  validateCodeInFile(file, content) {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1];
      const code = match[2];

      // Validate TypeScript/JavaScript code blocks
      if (
        language === 'tsx' ||
        language === 'ts' ||
        language === 'javascript' ||
        language === 'js'
      ) {
        this.validateJavaScriptCode(file, code, language);
      }

      // Validate JSON code blocks
      if (language === 'json') {
        this.validateJsonCode(file, code);
      }
    }
  }

  validateJavaScriptCode(file, code, language) {
    // Basic validation - check for obvious syntax errors
    try {
      // Check for unmatched brackets/braces
      const openBrackets = (code.match(/\{/g) || []).length;
      const closeBrackets = (code.match(/\}/g) || []).length;
      const openParens = (code.match(/\(/g) || []).length;
      const closeParens = (code.match(/\)/g) || []).length;

      if (openBrackets !== closeBrackets) {
        this.logWarning(
          `Unmatched braces in ${language} code block in ${file}`
        );
      }

      if (openParens !== closeParens) {
        this.logWarning(
          `Unmatched parentheses in ${language} code block in ${file}`
        );
      }

      // Check for common import issues
      if (code.includes('import') && !code.includes('from')) {
        this.logWarning(`Incomplete import statement in ${file}`);
      }
    } catch (error) {
      this.logWarning(
        `Could not validate ${language} code in ${file}: ${error.message}`
      );
    }
  }

  validateJsonCode(file, code) {
    try {
      JSON.parse(code);
    } catch (error) {
      this.logError(`Invalid JSON in code block in ${file}: ${error.message}`);
    }
  }

  validateConsistency() {
    console.log('🔍 Validating documentation consistency...');

    // Check if README stats match generated docs
    try {
      const readmeContent = fs.readFileSync('README.md', 'utf8');
      const statsContent = fs.readFileSync(
        'docs/PROJECT_STATISTICS.md',
        'utf8'
      );

      // Extract test count from both files
      const readmeTestMatch = readmeContent.match(/(\d+)\s+tests?\s+passing/i);
      const statsTestMatch = statsContent.match(/Tests.*?(\d+)\s+passing/i);

      if (readmeTestMatch && statsTestMatch) {
        if (readmeTestMatch[1] !== statsTestMatch[1]) {
          this.logWarning(
            `Test count mismatch: README shows ${readmeTestMatch[1]}, stats show ${statsTestMatch[1]}`
          );
        }
      }
    } catch (error) {
      this.logWarning(`Could not validate consistency: ${error.message}`);
    }
  }

  validateImages() {
    console.log('🖼️  Validating images...');

    const markdownFiles = this.findMarkdownFiles('.');

    for (const file of markdownFiles) {
      const content = fs.readFileSync(file, 'utf8');
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      let match;

      while ((match = imageRegex.exec(content)) !== null) {
        const imagePath = match[2];
        this.stats.imagesChecked++;

        // Skip external images
        if (
          imagePath.startsWith('http://') ||
          imagePath.startsWith('https://')
        ) {
          continue;
        }

        // Check if local image exists
        const resolvedPath = path.resolve(path.dirname(file), imagePath);
        if (!fs.existsSync(resolvedPath)) {
          this.logError(`Missing image: ${imagePath} (referenced in ${file})`);
        }
      }
    }
  }

  findMarkdownFiles(dir) {
    const files = [];
    const items = fs.readdirSync(dir);

    for (const item of items) {
      if (item.startsWith('.') || item === 'node_modules') continue;

      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Skip template directories
        if (item === 'templates') continue;
        files.push(...this.findMarkdownFiles(itemPath));
      } else if (item.endsWith('.md')) {
        // Skip template files and validation report during validation
        if (item.includes('.template.') || item === 'VALIDATION_REPORT.md') {
          continue;
        }
        files.push(itemPath);
      }
    }

    return files;
  }

  generateValidationReport() {
    console.log('\n📊 Generating validation report...');

    const report = `# Documentation Validation Report

> 🤖 Auto-generated on ${new Date().toISOString()}

## Summary

- **Documents Checked**: ${this.stats.documentsChecked}
- **Links Checked**: ${this.stats.linksChecked}
- **Images Checked**: ${this.stats.imagesChecked}
- **Errors**: ${this.errors.length}
- **Warnings**: ${this.warnings.length}

## Validation Results

${this.errors.length === 0 ? '✅ **No errors found!**' : `❌ **${this.errors.length} errors found**`}
${this.warnings.length === 0 ? '✅ **No warnings**' : `⚠️ **${this.warnings.length} warnings**`}

${
  this.errors.length > 0
    ? `## Errors

${this.errors.map((error) => `- ${error}`).join('\n')}
`
    : ''
}

${
  this.warnings.length > 0
    ? `## Warnings

${this.warnings.map((warning) => `- ${warning}`).join('\n')}
`
    : ''
}

## Validation Checks Performed

- ✅ File structure validation
- ✅ Markdown syntax validation
- ✅ Link validation (local files)
- ✅ Image reference validation
- ✅ Code sample validation
- ✅ Documentation consistency checks

---

*This report is automatically generated. Run \`npm run docs:validate\` to update.*
`;

    // Ensure docs directory exists
    if (!fs.existsSync('docs')) {
      fs.mkdirSync('docs', { recursive: true });
    }

    fs.writeFileSync('docs/VALIDATION_REPORT.md', report);
    console.log('✅ Validation report saved to docs/VALIDATION_REPORT.md');
  }

  async run() {
    console.log('🚀 Starting documentation validation...\n');

    this.validateFileStructure();
    this.validateMarkdownSyntax();
    this.validateCodeSamples();
    this.validateConsistency();
    this.validateImages();

    this.generateValidationReport();

    console.log('\n🎉 Documentation validation complete!\n');
    console.log(`📊 Summary:`);
    console.log(`  • Documents: ${this.stats.documentsChecked} checked`);
    console.log(`  • Links: ${this.stats.linksChecked} validated`);
    console.log(`  • Images: ${this.stats.imagesChecked} verified`);
    console.log(`  • Errors: ${this.errors.length}`);
    console.log(`  • Warnings: ${this.warnings.length}`);

    if (this.errors.length > 0) {
      console.log(
        '\n❌ Validation failed with errors. Please fix them before proceeding.'
      );
      process.exit(1);
    } else if (this.warnings.length > 0) {
      console.log(
        '\n⚠️  Validation completed with warnings. Consider reviewing them.'
      );
      process.exit(0);
    } else {
      console.log('\n✅ All documentation validation checks passed!');
      process.exit(0);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const validator = new DocumentationValidator();
  validator.run().catch(console.error);
}

module.exports = DocumentationValidator;
