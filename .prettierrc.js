/** @type {import('prettier').Config} */
export default {
  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-css-order',
    'prettier-plugin-organize-imports',
    'prettier-plugin-tailwindcss', // MUST come last
  ],
  printWidth: 100,
  singleQuote: true,
  organizeImportsSkipDestructiveCodeActions: true,
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
