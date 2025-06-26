/* eslint-env node */
const path = require('path');

const eslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' --file ')}`;

module.exports = {
  // TypeScript/JavaScript files
  '*.{js,jsx,ts,tsx}': ['prettier --write', eslintCommand],

  // Styles
  '*.{css,scss}': ['prettier --write', 'stylelint --fix'],

  // Documentation and config
  '*.{md,json,yml,yaml}': ['prettier --write'],

  // Shell scripts (no formatting, just make executable)
  '*.sh': ['chmod +x'],

  // Auto-update documentation when component files change
  'src/components/**/*.{ts,tsx}': [
    'npm run docs:generate',
    'git add docs/API_DOCUMENTATION.md docs/PROJECT_STATISTICS.md',
  ],

  // Auto-update documentation when package.json changes
  'package.json': [
    'npm run docs:generate',
    'git add docs/DEPENDENCY_REPORT.md docs/PROJECT_STATISTICS.md',
  ],

  // Auto-update README when documentation changes
  'docs/**/*.md': ['npm run docs:generate', 'git add README.md'],
};
