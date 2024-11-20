module.exports = {
  env: {
    jest: true, // Adds Jest globals like describe, it, expect, etc.
    browser: true, // if you're working with browser-based code
    node: true, // if you're working with Node.js code
  },
  extends: [
    'eslint:recommended', // Recommended ESLint rules
    'plugin:react/recommended', // React-specific linting rules
    'plugin:jest/recommended', // Jest-specific linting rules (optional but recommended)
  ],
  rules: {
    // Custom rules go here
    // For example, if you have specific preferences for test-related rules
  },
};
