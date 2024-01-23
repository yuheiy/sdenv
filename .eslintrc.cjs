module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:astro/jsx-a11y-strict',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
    'prettier', // make sure to put this line last
  ],
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-import-type-side-effects': 'error',
    // TypeScript already catches unused variables
    '@typescript-eslint/no-unused-vars': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: ['^astro:.+'],
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    // use prettier-plugin-tailwindcss for class sorting
    'tailwindcss/classnames-order': 'off',
  },
  reportUnusedDisableDirectives: true,
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  overrides: [
    {
      files: ['*.astro'],
      rules: {
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
  ],
};
