import astro from 'eslint-plugin-astro';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
  // global configurations
  {
    ignores: ['dist/**'],
    linterOptions: {
      reportUnusedDisableDirectives: 'warn',
    },
  },

  // eslint-plugin-astro
  ...astro.configs['flat/jsx-a11y-recommended'],

  // eslint-plugin-tailwindcss
  {
    languageOptions: {
      parserOptions: tailwindcss.configs.recommended.parserOptions,
    },
    plugins: { tailwindcss },
    rules: {
      ...tailwindcss.configs.recommended.rules,
      // use prettier-plugin-tailwindcss for class sorting
      'tailwindcss/classnames-order': 'off',
    },
  },
];
