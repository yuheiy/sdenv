module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:astro/jsx-a11y-recommended',
    'plugin:tailwindcss/recommended',
    'prettier', // make sure to put this line last
  ],
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
      files: ['*.cjs'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
