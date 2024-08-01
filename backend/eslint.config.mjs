import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  // Apply configuration to all JavaScript files
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs', // Use CommonJS modules
      ecmaVersion: 2021, // Specify ECMAScript version (adjust as needed)
      globals: {
        // Define global variables for Node.js
        ...globals.node, // Include Node.js globals such as process
      },
    },
    rules: {
      'no-console': 'error', // Disallow console statements
      'no-debugger': 'error', // Disallow debugger statements
    },
  },
  {
    languageOptions: {
      globals: globals.browser, // Include browser-specific globals if needed
    },
  },
  pluginJs.configs.recommended, // Extend recommended ESLint rules
];
