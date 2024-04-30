import astro from 'eslint-plugin-astro';
import tailwindcss from 'eslint-plugin-tailwindcss';

const tailwindcssConfig = {
  languageOptions: {
    parserOptions: tailwindcss.configs.recommended.parserOptions,
  },
  plugins: {
    tailwindcss,
  },
  rules: tailwindcss.configs.recommended.rules,
};

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
  tailwindcssConfig,
  {
    rules: {
      // use prettier-plugin-tailwindcss for class sorting
      'tailwindcss/classnames-order': 'off',
    },
  },
];
