import globals from 'globals'
import pluginJs from '@eslint/js'
// import eslintConfigPrettierRecommended from "eslint-config-prettier/recommended";
import pluginJest from 'eslint-plugin-jest'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    ignores: ['reports/', 'coverage/*'],
  },
  { files: ['**/*.spec.js', '**/*.test.js', '**/*.spec.ts'] },
  { plugins: { jest: pluginJest } },
  {
    languageOptions: {
      globals: pluginJest.environments.globals.globals,
    },
  },
  {
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
]
