import { FlatCompat } from '@eslint/eslintrc';
import eslintPluginAstro from 'eslint-plugin-astro';

const compat = new FlatCompat();

export default [
  ...eslintPluginAstro.configs['flat/jsx-a11y-recommended'],
  ...compat.extends('plugin:tailwindcss/recommended'),
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
    rules: {
      // use prettier-plugin-tailwindcss for class sorting
      'tailwindcss/classnames-order': 'off',
    },
  },
];
