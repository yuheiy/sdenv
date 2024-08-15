import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tailwindcss from 'eslint-plugin-tailwindcss';
import ts from 'typescript-eslint';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
export default [
  // globally ignoring
  {
    ignores: ['dist/', '.astro/'],
  },

  // global configurations
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
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

  ...tailwindcss.configs['flat/recommended'],
  {
    rules: {
      // use prettier-plugin-tailwindcss for class sorting
      'tailwindcss/classnames-order': 'off',
    },
  },
];
