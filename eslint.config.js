import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import ts from 'typescript-eslint';

/** @type {import('eslint').Linter.Config} */
export default [
  // globally ignoring
  {
    ignores: ['dist/', '.astro/'],
  },

  js.configs.recommended,

  ...ts.configs.recommended,
  ...ts.configs.stylistic,
  {
    rules: {
      // TypeScript already catches unused variables
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  ...astro.configs['flat/jsx-a11y-recommended'],
];
