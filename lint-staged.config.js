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

  // Ensure all other files are formatted
  '!*.{js,jsx,ts,tsx,css,scss,md,json,yml,yaml}': ['prettier --write'],
};
