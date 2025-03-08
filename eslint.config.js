import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import { defineConfig, globalIgnores } from 'eslint/config';
import ts from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['.astro/', 'dist/']),

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
]);
