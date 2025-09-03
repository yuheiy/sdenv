/**
 * @see https://prettier.io/docs/configuration
 * @type {import('prettier').Config}
 */
export default {
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-css-order',
    'prettier-plugin-organize-imports',
  ],
  printWidth: 100,
  singleQuote: true,

  // prettier-plugin-organize-imports
  organizeImportsSkipDestructiveCodeActions: true,

  overrides: [
    // prettier-plugin-astro
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
