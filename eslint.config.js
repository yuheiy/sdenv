import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tailwindcss from 'eslint-plugin-tailwindcss';
import ts from 'typescript-eslint';

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

  // eslint built-in
  js.configs.recommended,

  // typescript-eslint
  ...ts.configs.recommended,

  // eslint-plugin-astro
  ...astro.configs['flat/jsx-a11y-recommended'],

  // eslint-plugin-tailwindcss
  ...tailwindcss.configs['flat/recommended'],
  {
    rules: {
      // use prettier-plugin-tailwindcss for class sorting
      'tailwindcss/classnames-order': 'off',
    },
  },
];
