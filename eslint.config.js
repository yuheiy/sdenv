import astro from 'eslint-plugin-astro';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  // globally ignoring
  {
    ignores: ['dist/'],
  },

  // global configurations
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },

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
