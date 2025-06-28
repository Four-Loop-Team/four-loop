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

  // Component files - trigger documentation update check
  'src/components/**/*.{ts,tsx}': ['npm run docs:generate --silent || true'],

  // Package.json changes - trigger dependency report update
  'package.json': ['npm run docs:generate --silent || true'],

  // Note: Documentation generation runs conditionally to prevent infinite loops
  // Full standards enforcement runs in pre-commit hook
};
